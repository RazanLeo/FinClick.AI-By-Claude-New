import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { useAnalysis } from '@/contexts/AnalysisContext';
import { useDropzone } from 'react-dropzone';
import Select from 'react-select';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import toast from 'react-hot-toast';
import {
  CloudArrowUpIcon,
  DocumentTextIcon,
  ChartBarIcon,
  SparklesIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';

// Import sectors and activities data
import { sectors, legalEntities, comparisonLevels } from '@/data/constants';

const DashboardPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { user, checkSubscription } = useAuth();
  const { 
    financialData, 
    setFinancialData, 
    startAnalysis, 
    isAnalyzing, 
    progress,
    analysisResult,
    exportReport 
  } = useAnalysis();

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    companyName: '',
    sector: '',
    activity: '',
    legalEntity: '',
    comparisonLevel: '',
    yearsCount: 1,
    analysisTypes: [] as string[],
    language: i18n.language as 'ar' | 'en',
  });

  // Check subscription
  React.useEffect(() => {
    if (!checkSubscription()) {
      toast.error('يرجى تجديد اشتراكك للمتابعة');
      router.push('/pricing');
    }
  }, []);

  // File upload handler
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => {
      const validTypes = [
        'application/pdf',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
      ];
      return validTypes.includes(file.type);
    });

    if (validFiles.length !== acceptedFiles.length) {
      toast.error('بعض الملفات غير مدعومة');
    }

    if (uploadedFiles.length + validFiles.length > 10) {
      toast.error('الحد الأقصى 10 ملفات');
      return;
    }

    setUploadedFiles([...uploadedFiles, ...validFiles]);
    toast.success(`تم رفع ${validFiles.length} ملف بنجاح`);
  }, [uploadedFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 10,
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  // Remove file handler
  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  // Form handlers
  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  // Analysis types
  const analysisTypes = [
    { value: 'basic', label: 'التحليل الأساسي الكلاسيكي (55 نوع)' },
    { value: 'applied', label: 'التحليل التطبيقي المتوسط (38 نوع)' },
    { value: 'advanced', label: 'التحليل المتقدم والمتطور (88 نوع)' },
    { value: 'comprehensive', label: 'التحليل الشامل (181 نوع)' },
  ];

  // Start analysis handler
  const handleStartAnalysis = async () => {
    // Validation
    if (uploadedFiles.length === 0) {
      toast.error('يرجى رفع الملفات المالية');
      return;
    }

    if (!formData.companyName || !formData.sector || !formData.activity) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (formData.analysisTypes.length === 0) {
      toast.error('يرجى اختيار نوع التحليل');
      return;
    }

    // Prepare financial data
    setFinancialData({
      companyName: formData.companyName,
      sector: formData.sector,
      activity: formData.activity,
      legalEntity: formData.legalEntity,
      comparisonLevel: formData.comparisonLevel,
      yearsCount: formData.yearsCount,
      analysisType: formData.analysisTypes,
      language: formData.language,
      files: uploadedFiles,
    });

    // Start analysis
    await startAnalysis();
  };

  // Export handlers
  const handleExport = async (format: 'pdf' | 'word' | 'excel' | 'ppt') => {
    await exportReport(format);
  };

  return (
    <>
      <Head>
        <title>لوحة التحكم - FinClick.AI</title>
      </Head>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-gradient mb-2">
                مرحباً {user?.name || user?.email}
              </h1>
              <p className="text-primary/70">
                ابدأ تحليلك المالي الشامل بـ 3 خطوات بسيطة
              </p>
            </motion.div>

            {!isAnalyzing && !analysisResult ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Step 1: Upload Files */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-effect rounded-xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-background flex items-center justify-center font-bold mr-3 rtl:ml-3">
                      1
                    </div>
                    <h2 className="text-xl font-bold text-primary">
                      ارفق القوائم المالية
                    </h2>
                  </div>

                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                      isDragActive
                        ? 'border-primary bg-primary/10'
                        : 'border-primary/30 hover:border-primary hover:bg-primary/5'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <CloudArrowUpIcon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="text-primary mb-2">
                      {isDragActive
                        ? 'أفلت الملفات هنا...'
                        : 'اسحب وأفلت الملفات هنا أو انقر للاختيار'}
                    </p>
                    <p className="text-xs text-primary/50">
                      PDF, Excel, Word, صور (حتى 10 ملفات، 50MB لكل ملف)
                    </p>
                  </div>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between p-2 bg-primary/10 rounded-lg"
                        >
                          <div className="flex items-center">
                            <DocumentTextIcon className="w-5 h-5 text-primary mr-2 rtl:ml-2" />
                            <span className="text-sm text-primary truncate max-w-[200px]">
                              {file.name}
                            </span>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-danger hover:text-danger/80"
                          >
                            <XMarkIcon className="w-5 h-5" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Step 2: Select Options */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-effect rounded-xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-background flex items-center justify-center font-bold mr-3 rtl:ml-3">
                      2
                    </div>
                    <h2 className="text-xl font-bold text-primary">
                      حدد خيارات التحليل
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {/* Company Name */}
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">
                        اسم الشركة
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className="input-gold w-full"
                        placeholder="شركة النجاح"
                      />
                    </div>

                    {/* Sector */}
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">
                        القطاع
                      </label>
                      <Select
                        value={sectors.find(s => s.value === formData.sector)}
                        onChange={(option) => handleInputChange('sector', option?.value)}
                        options={sectors}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="اختر القطاع"
                        isSearchable
                        styles={{
                          control: (base) => ({
                            ...base,
                            backgroundColor: 'transparent',
                            borderColor: 'rgba(212, 175, 55, 0.3)',
                            color: '#D4AF37',
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: '#000000',
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                          }),
                          option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isFocused ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                            color: '#D4AF37',
                          }),
                          singleValue: (base) => ({
                            ...base,
                            color: '#D4AF37',
                          }),
                        }}
                      />
                    </div>

                    {/* Activity */}
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">
                        النشاط
                      </label>
                      <input
                        type="text"
                        value={formData.activity}
                        onChange={(e) => handleInputChange('activity', e.target.value)}
                        className="input-gold w-full"
                        placeholder="التجارة الإلكترونية"
                      />
                    </div>

                    {/* Legal Entity */}
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">
                        الكيان القانوني
                      </label>
                      <Select
                        value={legalEntities.find(l => l.value === formData.legalEntity)}
                        onChange={(option) => handleInputChange('legalEntity', option?.value)}
                        options={legalEntities}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="اختر الكيان"
                        isSearchable
                        styles={{
                          control: (base) => ({
                            ...base,
                            backgroundColor: 'transparent',
                            borderColor: 'rgba(212, 175, 55, 0.3)',
                            color: '#D4AF37',
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: '#000000',
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                          }),
                          option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isFocused ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                            color: '#D4AF37',
                          }),
                          singleValue: (base) => ({
                            ...base,
                            color: '#D4AF37',
                          }),
                        }}
                      />
                    </div>

                    {/* Comparison Level */}
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">
                        مستوى المقارنة
                      </label>
                      <Select
                        value={comparisonLevels.find(c => c.value === formData.comparisonLevel)}
                        onChange={(option) => handleInputChange('comparisonLevel', option?.value)}
                        options={comparisonLevels}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="اختر المستوى"
                        styles={{
                          control: (base) => ({
                            ...base,
                            backgroundColor: 'transparent',
                            borderColor: 'rgba(212, 175, 55, 0.3)',
                            color: '#D4AF37',
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: '#000000',
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                          }),
                          option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isFocused ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                            color: '#D4AF37',
                          }),
                          singleValue: (base) => ({
                            ...base,
                            color: '#D4AF37',
                          }),
                        }}
                      />
                    </div>

                    {/* Years Count */}
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">
                        عدد السنوات
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={formData.yearsCount}
                        onChange={(e) => handleInputChange('yearsCount', parseInt(e.target.value))}
                        className="input-gold w-full"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Step 3: Start Analysis */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-effect rounded-xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-background flex items-center justify-center font-bold mr-3 rtl:ml-3">
                      3
                    </div>
                    <h2 className="text-xl font-bold text-primary">
                      اختر نوع التحليل
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {analysisTypes.map((type) => (
                      <label
                        key={type.value}
                        className="flex items-center p-3 rounded-lg border border-primary/30 hover:bg-primary/10 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          value={type.value}
                          checked={formData.analysisTypes.includes(type.value)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleInputChange('analysisTypes', [...formData.analysisTypes, type.value]);
                            } else {
                              handleInputChange('analysisTypes', formData.analysisTypes.filter(t => t !== type.value));
                            }
                          }}
                          className="rounded border-primary/30 text-primary focus:ring-primary"
                        />
                        <span className="ml-3 rtl:mr-3 text-primary">
                          {type.label}
                        </span>
                      </label>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStartAnalysis}
                    disabled={isAnalyzing}
                    className="btn-gold w-full mt-6 py-4 text-lg flex items-center justify-center space-x-2 rtl:space-x-reverse"
                  >
                    <PlayIcon className="w-6 h-6" />
                    <span>ابدأ التحليل</span>
                  </motion.button>

                  <p className="text-xs text-primary/50 text-center mt-4">
                    سيستغرق التحليل بضع ثوانٍ فقط
                  </p>
                </motion.div>
              </div>
            ) : isAnalyzing ? (
              /* Analysis Progress */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl mx-auto"
              >
                <div className="glass-effect rounded-xl p-8 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 mx-auto mb-6"
                  >
                    <SparklesIcon className="w-full h-full text-primary" />
                  </motion.div>

                  <h2 className="text-2xl font-bold text-primary mb-4">
                    جاري التحليل...
                  </h2>

                  <div className="w-full bg-primary/20 rounded-full h-4 mb-4">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-primary-light h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <p className="text-primary/70">
                    {progress < 20 && 'معالجة الملفات المرفوعة...'}
                    {progress >= 20 && progress < 40 && 'استخراج البيانات المالية...'}
                    {progress >= 40 && progress < 60 && 'جلب بيانات السوق...'}
                    {progress >= 60 && progress < 90 && 'تنفيذ التحليلات المالية...'}
                    {progress >= 90 && 'إنشاء التقارير والرسوم البيانية...'}
                  </p>

                  <p className="text-2xl font-bold text-gradient mt-4">
                    {progress}%
                  </p>
                </div>
              </motion.div>
            ) : analysisResult ? (
              /* Analysis Results */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gradient">
                    نتائج التحليل
                  </h2>
                  <div className="flex space-x-3 rtl:space-x-reverse">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleExport('pdf')}
                      className="btn-gold px-4 py-2 flex items-center space-x-2 rtl:space-x-reverse"
                    >
                      <ArrowDownTrayIcon className="w-5 h-5" />
                      <span>PDF</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleExport('word')}
                      className="btn-gold px-4 py-2 flex items-center space-x-2 rtl:space-x-reverse"
                    >
                      <ArrowDownTrayIcon className="w-5 h-5" />
                      <span>Word</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleExport('excel')}
                      className="btn-gold px-4 py-2 flex items-center space-x-2 rtl:space-x-reverse"
                    >
                      <ArrowDownTrayIcon className="w-5 h-5" />
                      <span>Excel</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleExport('ppt')}
                      className="btn-gold px-4 py-2 flex items-center space-x-2 rtl:space-x-reverse"
                    >
                      <ArrowDownTrayIcon className="w-5 h-5" />
                      <span>PPT</span>
                    </motion.button>
                  </div>
                </div>

                {/* Results Display - Placeholder */}
                <div className="glass-effect rounded-xl p-8">
                  <p className="text-center text-primary">
                    عرض نتائج التحليل المفصلة هنا...
                  </p>
                </div>
              </motion.div>
            ) : null}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DashboardPage;
