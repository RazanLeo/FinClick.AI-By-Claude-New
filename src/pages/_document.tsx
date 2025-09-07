import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ar" dir="rtl">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="FinClick.AI - منصة التحليل المالي الذكي الثوري. 181 نوع تحليل مالي بضغطة زر واحدة" />
        <meta name="keywords" content="تحليل مالي, ذكاء اصطناعي, تقارير مالية, نسب مالية, تحليل استثماري, FinClick, Financial Analysis, AI" />
        <meta name="author" content="FinClick.AI" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FinClick.AI - Revolutionary Intelligent Financial Analysis Platform" />
        <meta property="og:description" content="181 نوع تحليل مالي شامل بضغطة زر واحدة مع الذكاء الاصطناعي" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://finclick.ai" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FinClick.AI" />
        <meta name="twitter:description" content="منصة التحليل المالي الذكي الثوري" />
        <meta name="twitter:image" content="/twitter-card.png" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className="bg-background text-primary">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
