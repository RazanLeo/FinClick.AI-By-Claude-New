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
  UserIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const signUpSchema = z.object({
  name: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string()
    .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .regex(/[A-Z]/, 'يجب أن تحتوي على حرف كبير واحد على الأقل')
    .regex(/[0-9]/, 'يجب أن تحتوي على رقم واحد على الأقل'),
  confirmPassword: z.string(),
  company: z.string().min(2, 'اسم الشركة مطلوب'),
  phone: z.string().regex(/^[0-9+\-\s]+$/, 'رقم الهاتف غير صحيح'),
  acceptTerms: z.boolean().refine(val => val === true, 'يجب الموافقة على الشروط والأحكام'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
});

type SignUpData = z.infer<typeof signUpSchema>;

const SignUpPage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const watchedValues = watch();

  const onSubmit = async (data: SignUpData) => {
    setIsLoading(true);
    try {
      await signUp({
        email: data.email,
        password: data.password,
        name: data.name,
        company: data.company,
        phone: data.phone,
      });
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const strength = passwordStrength(watchedValues.password || '');

  return (
    <>
      <Head>
        <title>إنشاء حساب جديد - FinClick.AI</title>
      </Head>

      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-dark/10 rounded-full filter blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-2xl"
        >
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex justify-center mb-8"
            >
              <div className="relative w-24 h-24">
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
              إنشاء حساب جديد
            </h2>
            <p className="text-center text-primary/70 mb-8">
              انضم إلى آلاف الشركات التي تستخدم FinClick.AI
            </p>

            {/* Progress Steps */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-primary text-background' : 'bg-primary/20 text-primary/50'
                }`}>
                  1
                </div>
                <div className={`w-20 h-1 ${step >= 2 ? 'bg-primary' : 'bg-primary/20'}`}></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-primary text-background' : 'bg-primary/20 text-primary/50'
                }`}>
                  2
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 ? (
                <>
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        الاسم الكامل
                      </label>
                      <div className="relative">
                        <input
                          {...register('name')}
                          type="text"
                          className="input-gold w-full pl-10 rtl:pl-4 rtl:pr-10"
                          placeholder="أحمد محمد"
                          disabled={isLoading}
                        />
                        <UserIcon className="absolute left-3 rtl:right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/50" />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-danger">{errors.name.message}</p>
                      )}
                    </div>

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

                    {/* Company Field */}
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        اسم الشركة
                      </label>
                      <div className="relative">
                        <input
                          {...register('company')}
                          type="text"
                          className="input-gold w-full pl-10 rtl:pl-4 rtl:pr-10"
                          placeholder="شركة النجاح"
                          disabled={isLoading}
                        />
                        <BuildingOfficeIcon className="absolute left-3 rtl:right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/50" />
                      </div>
                      {errors.company && (
                        <p className="mt-1 text-sm text-danger">{errors.company.message}</p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        رقم الهاتف
                      </label>
                      <div className="relative">
                        <input
                          {...register('phone')}
                          type="tel"
                          className="input-gold w-full pl-10 rtl:pl-4 rtl:pr-10"
                          placeholder="00966501234567"
                          disabled={isLoading}
                        />
                        <PhoneIcon className="absolute left-3 rtl:right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/50" />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-danger">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Next Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn-gold w-full py-3"
                  >
                    التالي
                  </motion.button>
                </>
              ) : (
                <>
                  {/* Security Information */}
                  <div className="space-y-6">
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
                      
                      {/* Password Strength Indicator */}
                      {watchedValues.password && (
                        <div className="mt-2">
                          <div className="flex space-x-1 rtl:space-x-reverse">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`flex-1 h-1 rounded ${
                                  i < strength
                                    ? strength <= 2
                                      ? 'bg-danger'
                                      : strength <= 3
                                      ? 'bg-warning'
                                      : 'bg-success'
                                    : 'bg-primary/20'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-primary/50 mt-1">
                            قوة كلمة المرور: {
                              strength <= 2 ? 'ضعيفة' :
                              strength <= 3 ? 'متوسطة' : 'قوية'
                            }
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        تأكيد كلمة المرور
                      </label>
                      <div className="relative">
                        <input
                          {...register('confirmPassword')}
                          type={showConfirmPassword ? 'text' : 'password'}
                          className="input-gold w-full pl-10 pr-10"
                          placeholder="••••••••"
                          disabled={isLoading}
                        />
                        <LockClosedIcon className="absolute left-3 rtl:right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/50" />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 rtl:left-3 top-1/2 transform -translate-y-1/2 text-primary/50 hover:text-primary"
                        >
                          {showConfirmPassword ? (
                            <EyeSlashIcon className="w-5 h-5" />
                          ) : (
                            <EyeIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-danger">{errors.confirmPassword.message}</p>
                      )}
                    </div>

                    {/* Terms and Conditions */}
                    <div>
                      <label className="flex items-start">
                        <input
                          {...register('acceptTerms')}
                          type="checkbox"
                          className="rounded border-primary/30 text-primary focus:ring-primary mt-1"
                        />
                        <span className="ml-2 rtl:mr-2 text-sm text-primary/70">
                          أوافق على{' '}
                          <Link href="/terms">
                            <span className="text-primary hover:text-primary-light">
                              الشروط والأحكام
                            </span>
                          </Link>
                          {' '}و{' '}
                          <Link href="/privacy">
                            <span className="text-primary hover:text-primary-light">
                              سياسة الخصوصية
                            </span>
                          </Link>
                        </span>
                      </label>
                      {errors.acceptTerms && (
                        <p className="mt-1 text-sm text-danger">{errors.acceptTerms.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 rtl:space-x-reverse">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors"
                    >
                      السابق
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="btn-gold flex-1 py-3 flex items-center justify-center space-x-2 rtl:space-x-reverse"
                    >
                      {isLoading ? (
                        <div className="loading-dots flex space-x-1 rtl:space-x-reverse">
                          <span className="w-2 h-2 bg-background rounded-full"></span>
                          <span className="w-2 h-2 bg-background rounded-full"></span>
                          <span className="w-2 h-2 bg-background rounded-full"></span>
                        </div>
                      ) : (
                        <>
                          <span>إنشاء الحساب</span>
                          <CheckCircleIcon className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </>
              )}
            </form>

            {/* Sign In Link */}
            <p className="text-center text-primary/70 mt-8">
              لديك حساب بالفعل؟{' '}
              <Link href="/auth/signin">
                <span className="text-primary hover:text-primary-light font-medium">
                  سجل الدخول
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

export default SignUpPage;
