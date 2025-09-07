import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';
import { extractFinancialData } from '@/lib/file-processing/extractors';
import { processWithAI } from '@/lib/ai/processor';
import { validateApiKey } from '@/lib/auth/api-validation';

export const config = {
  api: {
    bodyParser: false,
    maxDuration: 300, // 5 minutes timeout
  },
};

interface ProcessedData {
  success: boolean;
  data?: any;
  error?: string;
  processedAt?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProcessedData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    // Validate API key
    const apiKey = req.headers['x-api-key'] as string;
    const isValid = await validateApiKey(apiKey);
    if (!isValid) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid API key' 
      });
    }

    // Parse form data
    const form = formidable({
      maxFiles: 10,
      maxFileSize: 100 * 1024 * 1024, // 100MB
      uploadDir: path.join(process.cwd(), 'temp'),
      keepExtensions: true,
      multiples: true,
    });

    const [fields, files] = await form.parse(req);

    // Extract options from fields
    const options = {
      companyName: fields.companyName?.[0] || '',
      sector: fields.sector?.[0] || '',
      activity: fields.activity?.[0] || '',
      legalEntity: fields.legalEntity?.[0] || '',
      comparisonLevel: fields.comparisonLevel?.[0] || 'local',
      yearsCount: parseInt(fields.yearsCount?.[0] || '1'),
      analysisTypes: fields.analysisTypes || [],
      language: fields.language?.[0] || 'ar',
      budget: fields.budget || null,
    };

    // Process uploaded files
    const uploadedFiles = Array.isArray(files.files) ? files.files : [files.files];
    const processedFiles = [];

    for (const file of uploadedFiles) {
      if (!file) continue;

      // Read file content
      const fileContent = await fs.readFile(file.filepath);
      
      // Extract financial data based on file type
      const extractedData = await extractFinancialData(
        fileContent,
        file.mimetype || '',
        file.originalFilename || ''
      );

      // Process with AI for data structuring
      const structuredData = await processWithAI(extractedData, {
        type: 'structure',
        context: options,
      });

      processedFiles.push({
        filename: file.originalFilename,
        data: structuredData,
        size: file.size,
        type: file.mimetype,
      });

      // Clean up temp file
      await fs.unlink(file.filepath).catch(console.error);
    }

    // Combine all processed data
    const combinedData = combineFinancialData(processedFiles, options);

    // Validate data completeness
    const validation = validateFinancialData(combinedData);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: `بيانات غير مكتملة: ${validation.errors.join(', ')}`,
      });
    }

    // Store in session or temporary storage for analysis
    const sessionId = generateSessionId();
    await storeProcessedData(sessionId, {
      ...combinedData,
      options,
      processedAt: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      data: {
        sessionId,
        filesProcessed: processedFiles.length,
        dataStructure: combinedData.structure,
        readyForAnalysis: true,
      },
      processedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('File processing error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'خطأ في معالجة الملفات',
    });
  }
}

function combineFinancialData(files: any[], options: any) {
  const combined = {
    structure: {
      balanceSheets: [],
      incomeStatements: [],
      cashFlows: [],
      trialBalances: [],
      budgets: [],
    },
    metadata: {
      companyName: options.companyName,
      sector: options.sector,
      activity: options.activity,
      legalEntity: options.legalEntity,
      yearsDetected: [],
      currency: 'SAR',
      accountingStandard: 'IFRS',
    },
    rawData: [],
  };

  // Process each file and organize by statement type and year
  files.forEach(file => {
    const { data } = file;
    
    // Detect statement type and year
    if (data.type === 'balance_sheet') {
      combined.structure.balanceSheets.push(data);
    } else if (data.type === 'income_statement') {
      combined.structure.incomeStatements.push(data);
    } else if (data.type === 'cash_flow') {
      combined.structure.cashFlows.push(data);
    } else if (data.type === 'trial_balance') {
      combined.structure.trialBalances.push(data);
    } else if (data.type === 'budget') {
      combined.structure.budgets.push(data);
    }

    // Extract years
    if (data.year && !combined.metadata.yearsDetected.includes(data.year)) {
      combined.metadata.yearsDetected.push(data.year);
    }

    combined.rawData.push(file);
  });

  // Sort years
  combined.metadata.yearsDetected.sort((a, b) => b - a);

  return combined;
}

function validateFinancialData(data: any) {
  const errors = [];
  
  // Check for at least one financial statement
  const hasStatements = 
    data.structure.balanceSheets.length > 0 ||
    data.structure.incomeStatements.length > 0 ||
    data.structure.cashFlows.length > 0 ||
    data.structure.trialBalances.length > 0;

  if (!hasStatements) {
    errors.push('لم يتم العثور على قوائم مالية صالحة');
  }

  // Check for company information
  if (!data.metadata.companyName) {
    errors.push('اسم الشركة مطلوب');
  }

  if (!data.metadata.sector) {
    errors.push('قطاع الشركة مطلوب');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

async function storeProcessedData(sessionId: string, data: any) {
  // Store in Redis, database, or file system
  // For now, using file system
  const dataPath = path.join(process.cwd(), 'data', 'sessions', `${sessionId}.json`);
  await fs.mkdir(path.dirname(dataPath), { recursive: true });
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
}
