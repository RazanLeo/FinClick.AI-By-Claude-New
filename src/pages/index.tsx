import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  SparklesIcon, 
  BoltIcon, 
  ShieldCheckIcon,
  ChartBarIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  StarIcon,
  ArrowRightIcon,
  CloudArrowUpIcon,
  AdjustmentsHorizontalIcon,
  BeakerIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  ChatBubbleBottomCenterTextIcon,
  NewspaperIcon,
  CalculatorIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true });
  const [marketMood, setMarketMood] = useState(75);

  // Hero Section Animation
  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Features Data
  const features = [
    {
      icon: RocketLaunchIcon,
      title: t('features.revolution'),
      description: t('features.revolutionDesc'),
      color: 'from-primary to-primary-dark'
    },
    {
      icon: ChartBarIcon,
      title: t('features.allUsers'),
      description: t('features.allUsersDesc'),
      color: 'from-primary-light to-primary'
    },
    {
      icon: SparklesIcon,
      title: t('features.aiPowered'),
      description: t('features.aiPoweredDesc'),
      color: 'from-primary to-primary-light'
    },
    {
      icon: GlobeAltIcon,
      title: t('features.allAnalysis'),
      description: t('features.allAnalysisDesc'),
      color: 'from-primary-dark to-primary'
    },
    {
      icon: CloudArrowUpIcon,
      title: t('features.cloudBased'),
      description: t('features.cloudBasedDesc'),
      color: 'from-primary to-primary-dark'
    },
    {
      icon: AdjustmentsHorizontalIcon,
      title: t('features.professional'),
      description: t('features.professionalDesc'),
      color: 'from-primary-light to-primary-dark'
    },
    {
      icon: BoltIcon,
      title: t('features.speed'),
      description: t('features.speedDesc'),
      color: 'from-primary to-primary-light'
    },
    {
      icon: BeakerIcon,
      title: t('features.simplicity'),
      description: t('features.simplicityDesc'),
      color: 'from-primary-dark to-primary-light'
    },
    {
      icon: ShieldCheckIcon,
      title: t('features.accuracy'),
      description: t('features.accuracyDesc'),
      color: 'from-primary to-primary-dark'
    },
    {
      icon: ShieldCheckIcon,
      title: t('features.security'),
      description: t('features.securityDesc'),
      color: 'from-primary-light to-primary'
    },
    {
      icon: ChartPieIcon,
      title: t('features.genius'),
      description: t('features.geniusDesc'),
      color: 'from-primary to-primary-light'
    },
    {
      icon: DocumentTextIcon,
      title: t('features.reports'),
      description: t('features.reportsDesc'),
      color: 'from-primary-dark to-primary'
    },
    {
      icon: GlobeAltIcon,
      title: t('features.comparisons'),
      description: t('features.comparisonsDesc'),
      color: 'from-primary to-primary-dark'
    },
    {
      icon: StarIcon,
      title: t('features.quality'),
      description: t('features.qualityDesc'),
      color: 'from-primary-light to-primary-dark'
    },
  ];

  // Analysis Types Data
  const analysisTypes = [
    {
      category: t('analysis.basic'),
      count: 55,
      subcategories: [
        { name: t('analysis.structural'), count: 15 },
        { name: t('analysis.ratios'), count: 30 },
        { name: t('analysis.flow'), count: 10 }
      ],
      color: 'bg-gradient-to-r from-success/20 to-success/10'
    },
    {
      category: t('analysis.applied'),
      count: 38,
      subcategories: [
        { name: t('analysis.comparison'), count: 10 },
        { name: t('analysis.valuation'), count: 16 },
        { name: t('analysis.performance'), count: 12 }
      ],
      color: 'bg-gradient-to-r from-warning/20 to-warning/10'
    },
    {
      category: t('analysis.advanced'),
      count: 88,
      subcategories: [
        { name: t('analysis.modeling'), count: 15 },
        { name: t('analysis.statistical'), count: 20 },
        { name: t('analysis.portfolio'), count: 35 },
        { name: t('analysis.prediction'), count: 18 }
      ],
      color: 'bg-gradient-to-r from-danger/20 to-danger/10'
    }
  ];

  // Testimonials Data
  const testimonials = [
    {
      name: t('testimonials.client1.name'),
      role: t('testimonials.client1.role'),
      content: t('testimonials.client1.content'),
      rating: 5,
      image: '/avatars/client1.jpg'
    },
    {
      name: t('testimonials.client2.name'),
      role: t('testimonials.client2.role'),
      content: t('testimonials.client2.content'),
      rating: 5,
      image: '/avatars/client2.jpg'
    },
    {
      name: t('testimonials.client3.name'),
      role: t('testimonials.client3.role'),
      content: t('testimonials.client3.content'),
      rating: 5,
      image: '/avatars/client3.jpg'
    },
    {
      name: t('testimonials.client4.name'),
      role: t('testimonials.client4.role'),
      content: t('testimonials.client4.content'),
      rating: 5,
      image: '/avatars/client4.jpg'
    }
  ];

  return (
    <>
      <Head>
        <title>FinClick.AI - Revolutionary Intelligent Financial Analysis Platform</title>
        <meta name="description" content="منصة التحليل المالي الذكي الثوري - 181 نوع تحليل مالي بضغطة زر" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-background">
        {/* Neural Network Background */}
        <div className="neural-bg"></div>

        <Header />

        <main className="pt-32">
          {/* Hero Section */}
          <section className="relative overflow-hidden py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={heroVariants}
                className="text-center"
              >
                <div className="relative w-64 h-64 mx-auto mb-8">
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src="/logo.png"
                      alt="FinClick.AI"
                      fill
                      className="object-contain filter drop-shadow-[0_0_30px_rgba(212,175,55,0.8)]"
                      priority
                    />
                  </motion.div>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  <span className="text-gradient">FinClick.AI</span>
                </h1>
                <p className="text-xl md:text-2xl text-primary/80 mb-8 max-w-4xl mx-auto">
                  {t('hero.subtitle')}
                </p>
                <p className="text-lg text-primary/60 mb-12 max-w-3xl mx-auto">
                  {t('hero.description')}
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Link href="/auth/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-gold text-lg px-8 py-4 flex items-center justify-center space-x-2 rtl:space-x-reverse"
                    >
                      <span>{t('hero.startNow')}</span>
                      <ArrowRightIcon className="w-5 h-5 rtl:rotate-180" />
                    </motion.button>
                  </Link>
                  <Link href="/demo">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition-all text-lg"
                    >
                      {t('hero.watchDemo')}
                    </motion.button>
                  </Link>
                </div>

                {/* Stats Counter */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16" ref={ref}>
                  {[
                    { label: t('stats.analyses'), value: 181, suffix: '+' },
                    { label: t('stats.accuracy'), value: 99, suffix: '%' },
                    { label: t('stats.speed'), value: 3, suffix: 's' },
                    { label: t('stats.reports'), value: 50, suffix: '+' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                        {inView && (
                          <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
                        )}
                      </div>
                      <p className="text-primary/70">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Why FinClick Section */}
          <section className="py-20 relative">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                  {t('why.title')}
                </h2>
                <p className="text-xl text-primary/70 max-w-3xl mx-auto">
                  {t('why.subtitle')}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -10 }}
                    className="glass-effect rounded-xl p-6 card-hover group"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-6 h-6 text-background" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-primary/60">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 3 Steps Section */}
          <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                  {t('steps.title')}
                </h2>
                <p className="text-xl text-primary/70">
                  {t('steps.subtitle')}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    step: 1,
                    icon: CloudArrowUpIcon,
                    title: t('steps.step1.title'),
                    description: t('steps.step1.description')
                  },
                  {
                    step: 2,
                    icon: AdjustmentsHorizontalIcon,
                    title: t('steps.step2.title'),
                    description: t('steps.step2.description')
                  },
                  {
                    step: 3,
                    icon: ChartBarIcon,
                    title: t('steps.step3.title'),
                    description: t('steps.step3.description')
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="text-center"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-primary-dark p-1"
                      >
                        <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                          <item.icon className="w-12 h-12 text-primary" />
                        </div>
                      </motion.div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 text-6xl font-bold text-primary/20">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-4">
                      {item.title}
                    </h3>
                    <p className="text-primary/70">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Analysis Types Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                  {t('analysis.title')}
                </h2>
                <p className="text-xl text-primary/70">
                  {t('analysis.subtitle')}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {analysisTypes.map((type, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className={`${type.color} rounded-2xl p-8 border border-primary/20`}
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-primary mb-2">
                        {type.category}
                      </h3>
                      <div className="text-5xl font-bold text-gradient">
                        {type.count}
                      </div>
                      <p className="text-primary/60">{t('analysis.types')}</p>
                    </div>
                    <div className="space-y-3">
                      {type.subcategories.map((sub, subIndex) => (
                        <div
                          key={subIndex}
                          className="flex justify-between items-center p-3 bg-background/50 rounded-lg"
                        >
                          <span className="text-primary/80">{sub.name}</span>
                          <span className="text-primary font-bold">{sub.count}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link href="/analysis-types">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-gold"
                  >
                    {t('analysis.viewAll')}
                  </motion.button>
                </Link>
              </div>
            </div>
          </section>

          {/* Free Tools Section */}
          <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                  {t('tools.title')}
                </h2>
                <p className="text-xl text-primary/70">
                  {t('tools.subtitle')}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Financial News */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-effect rounded-xl p-6"
                >
                  <NewspaperIcon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {t('tools.news.title')}
                  </h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-3 bg-background/50 rounded-lg">
                        <p className="text-sm text-primary font-medium mb-1">
                          {t(`tools.news.item${i}.title`)}
                        </p>
                        <p className="text-xs text-primary/50">
                          {t(`tools.news.item${i}.time`)}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Economic Calendar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="glass-effect rounded-xl p-6"
                >
                  <CalendarDaysIcon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {t('tools.calendar.title')}
                  </h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-3 bg-background/50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-primary">
                            {t(`tools.calendar.event${i}`)}
                          </span>
                          <span className="text-xs text-warning">
                            {t(`tools.calendar.time${i}`)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Fair Price Calculator */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="glass-effect rounded-xl p-6"
                >
                  <CalculatorIcon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {t('tools.calculator.title')}
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder={t('tools.calculator.placeholder')}
                      className="input-gold w-full"
                    />
                    <button className="btn-gold w-full text-sm">
                      {t('tools.calculator.calculate')}
                    </button>
                    <div className="p-3 bg-background/50 rounded-lg">
                      <p className="text-sm text-primary/70">
                        {t('tools.calculator.result')}
                      </p>
                      <p className="text-2xl font-bold text-gradient">
                        SAR 125.50
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Market Mood Indicator */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="glass-effect rounded-xl p-6"
                >
                  <ChartPieIcon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {t('tools.mood.title')}
                  </h3>
                  <div className="relative h-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gradient">
                          {marketMood}%
                        </div>
                        <p className="text-sm text-success">
                          {t('tools.mood.bullish')}
                        </p>
                      </div>
                    </div>
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        fill="none"
                        stroke="rgba(212, 175, 55, 0.1)"
                        strokeWidth="20"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="20"
                        strokeDasharray={`${marketMood * 2.51} 251`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient">
                          <stop offset="0%" stopColor="#10B981" />
                          <stop offset="100%" stopColor="#D4AF37" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </motion.div>

                {/* GPT Financial Bot */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="glass-effect rounded-xl p-6 lg:col-span-2"
                >
                  <ChatBubbleBottomCenterTextIcon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {t('tools.bot.title')}
                  </h3>
                  <div className="space-y-3">
                    <div className="h-48 bg-background/50 rounded-lg p-4 overflow-y-auto">
                      <div className="space-y-3">
                        <div className="flex justify-start">
                          <div className="bg-primary/10 rounded-lg p-3 max-w-xs">
                            <p className="text-sm text-primary">
                              {t('tools.bot.welcome')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <input
                        type="text"
                        placeholder={t('tools.bot.placeholder')}
                        className="input-gold flex-1"
                      />
                      <button className="btn-gold px-6">
                        {t('tools.bot.send')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                  {t('testimonials.title')}
                </h2>
                <p className="text-xl text-primary/70">
                  {t('testimonials.subtitle')}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-effect rounded-xl p-6"
                  >
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <StarSolid
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating ? 'text-primary' : 'text-primary/20'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-primary/70 mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-12 h-12 rounded-full bg-primary/20"></div>
                      <div>
                        <p className="font-bold text-primary">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-primary/50">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                  {t('pricing.title')}
                </h2>
                <p className="text-xl text-primary/70">
                  {t('pricing.subtitle')}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Monthly Plan */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-effect rounded-2xl p-8 text-center"
                >
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    {t('pricing.monthly.title')}
                  </h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gradient">5,000</span>
                    <span className="text-xl text-primary/70 ml-2">
                      {t('pricing.monthly.currency')}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8 text-left">
                    {[1, 2, 3, 4].map((i) => (
                      <li key={i} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <CheckCircleIcon className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-primary/70">
                          {t(`pricing.features.feature${i}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/signup?plan=monthly">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-gold w-full"
                    >
                      {t('pricing.subscribe')}
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Annual Plan */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-effect rounded-2xl p-8 text-center relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-danger to-warning px-4 py-1 rounded-full">
                    <span className="text-xs font-bold text-white">
                      {t('pricing.annual.save')}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    {t('pricing.annual.title')}
                  </h3>
                  <div className="mb-6">
                    <span className="text-3xl text-primary/50 line-through">60,000</span>
                    <span className="text-5xl font-bold text-gradient block">54,000</span>
                    <span className="text-xl text-primary/70">
                      {t('pricing.annual.currency')}
                    </span>
                    <p className="text-sm text-success mt-2">
                      {t('pricing.annual.saveAmount')}
                    </p>
                  </div>
                  <ul className="space-y-3 mb-8 text-left">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <CheckCircleIcon className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-primary/70">
                          {t(`pricing.features.feature${i}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/signup?plan=annual">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-gold w-full"
                    >
                      {t('pricing.subscribeBest')}
                    </motion.button>
                  </Link>
                </motion.div>
              </div>

              {/* Payment Methods */}
              <div className="mt-12 text-center">
                <p className="text-primary/70 mb-4">{t('pricing.paymentMethods')}</p>
                <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                  {['mada', 'visa', 'mastercard', 'paypal', 'applepay'].map((method) => (
                    <div
                      key={method}
                      className="w-16 h-10 bg-primary/10 rounded flex items-center justify-center"
                    >
                      <span className="text-xs text-primary uppercase">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-3xl p-12 text-center"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
                  {t('cta.title')}
                </h2>
                <p className="text-xl text-primary/70 mb-8 max-w-3xl mx-auto">
                  {t('cta.subtitle')}
                </p>
                <Link href="/auth/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-gold text-lg px-10 py-4"
                  >
                    {t('cta.button')}
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
