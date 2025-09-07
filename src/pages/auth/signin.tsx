import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon,
  UserCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const signInSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

type SignInData = z.infer<typeof signInSchema>;

const SignInPage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInData) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = async (type: 'admin' | 'guest') => {
    setIsLoading(true);
    try {
      if (type === 'admin') {
        await signIn('Razan@FinClick.AI', 'RazanFinClickAI@056300');
      } else {
        await signIn('Guest@FinClick.AI', 'GuestFinClickAI@123321');
      }
    } catch (error) {
      console.error('Quick login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>تسجيل الدخول - FinClick.AI</title>
      </Head>

      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-dark/10 rounded-full filter blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex justify-center mb-8"
            >
              <div className="relative w-32 h-32">
                <Image
                  src="/logo.png"
                  alt="FinClick.AI"
                  fill
                  className="object-contain filter drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                />
              </div>
            </motion.div>
          </Link>

          {/* Form Card */}
          <div className="glass-effect rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-center text-gradient mb-2">
              مرحباً بعودتك
            </h2>
            <p className="text-center text-primary/70 mb-8">
              سجل دخولك للوصول إلى لوحة التحكم
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <input
                    {...register('email')}
                    type="email"
                    className="input-gold w-full pl-10 rtl:pl-4 rtl:pr-10"
                    placeholder="example@company.com"
                    disabled={isLoading}
                  />
                  <EnvelopeIcon className="absolute left-3 rtl:right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/50" />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-danger">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    className="input-gold w-full pl-10 pr-10"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <LockClosedIcon className="absolute left-3 rtl:right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/50" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 rtl:left-3 top-1/2 transform -translate-y-1/2 text-primary/50 hover:text-primary"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-danger">{errors.password.message}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-primary/30 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 rtl:mr-2 text-sm text-primary/70">
                    تذكرني
                  </span>
                </label>
                <Link href="/auth/forgot-password">
                  <span className="text-sm text-primary hover:text-primary-light">
                    نسيت كلمة المرور؟
                  </span>
                </Link>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="btn-gold w-full py-3 flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                {isLoading ? (
                  <div className="loading-dots flex space-x-1 rtl:space-x-reverse">
                    <span className="w-2 h-2 bg-background rounded-full"></span>
                    <span className="w-2 h-2 bg-background rounded-full"></span>
                    <span className="w-2 h-2 bg-background rounded-full"></span>
                  </div>
                ) : (
                  <>
                    <span>تسجيل الدخول</span>
                    <SparklesIcon className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-primary/50">أو</span>
              </div>
            </div>

            {/* Quick Login Options */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => quickLogin('admin')}
                disabled={isLoading}
                className="w-full py-3 border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <UserCircleIcon className="w-5 h-5 text-primary" />
                <span className="text-primary">دخول كمدير</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => quickLogin('guest')}
                disabled={isLoading}
                className="w-full py-3 border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <UserCircleIcon className="w-5 h-5 text-primary" />
                <span className="text-primary">دخول كضيف</span>
              </motion.button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-primary/70 mt-8">
              ليس لديك حساب؟{' '}
              <Link href="/auth/signup">
                <span className="text-primary hover:text-primary-light font-medium">
                  سجل الآن
                </span>
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link href="/">
              <motion.span
                whileHover={{ x: -5 }}
                className="inline-flex items-center text-primary/70 hover:text-primary"
              >
                <svg
                  className="w-5 h-5 mr-2 rtl:ml-2 rtl:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                العودة للصفحة الرئيسية
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SignInPage;
