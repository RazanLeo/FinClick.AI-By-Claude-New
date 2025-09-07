import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Snapchat', icon: '/icons/snapchat.svg', href: '#' },
    { name: 'Instagram', icon: '/icons/instagram.svg', href: '#' },
    { name: 'TikTok', icon: '/icons/tiktok.svg', href: '#' },
    { name: 'Telegram', icon: '/icons/telegram.svg', href: '#' },
    { name: 'Twitter', icon: '/icons/twitter.svg', href: '#' },
    { name: 'LinkedIn', icon: '/icons/linkedin.svg', href: '#' },
  ];

  const footerSections = [
    {
      title: t('footer.contact'),
      links: [
        { 
          icon: MapPinIcon, 
          text: 'Kingdom of Saudi Arabia, Jeddah',
          href: null 
        },
        { 
          icon: EnvelopeIcon, 
          text: 'finclick.ai@gmail.com',
          href: 'mailto:finclick.ai@gmail.com' 
        },
        { 
          icon: PhoneIcon, 
          text: '00966544827213',
          href: 'tel:00966544827213' 
        },
        { 
          icon: ChatBubbleLeftRightIcon, 
          text: 'WhatsApp: 00966544827213',
          href: 'https://wa.me/966544827213' 
        },
        { 
          icon: ChatBubbleLeftRightIcon, 
          text: 'Telegram: 00966544827213',
          href: 'https://t.me/966544827213' 
        },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { text: t('footer.privacy'), href: '/privacy' },
        { text: t('footer.terms'), href: '/terms' },
        { text: t('footer.security'), href: '/security' },
        { text: t('footer.compliance'), href: '/compliance' },
        { text: t('footer.intellectual'), href: '/intellectual' },
        { text: t('footer.payment'), href: '/payment' },
        { text: t('footer.otherPolicies'), href: '/policies' },
      ],
    },
    {
      title: t('footer.system'),
      links: [
        { text: t('footer.features'), href: '/features' },
        { text: t('footer.analysisTypes'), href: '/analysis-types' },
        { text: t('footer.pricing'), href: '/pricing' },
        { text: t('footer.manual'), href: '/manual' },
        { text: t('footer.faq'), href: '/faq' },
      ],
    },
    {
      title: t('footer.company'),
      links: [
        { text: t('footer.vision'), href: '/about#vision' },
        { text: t('footer.events'), href: '/events' },
        { text: t('footer.blog'), href: '/blog' },
        { text: t('footer.media'), href: '/media' },
        { text: t('footer.careers'), href: '/careers' },
      ],
    },
  ];

  return (
    <footer className="relative bg-background border-t border-primary/20 mt-20">
      {/* Neural Network Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-dark rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        {/* Logo and Description */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="relative w-32 h-32 mb-4">
              <Image
                src="/logo.png"
                alt="FinClick.AI"
                fill
                className="object-contain filter drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]"
              />
            </div>
            <h3 className="text-3xl font-bold text-gradient mb-2">FinClick.AI</h3>
            <p className="text-primary/70 max-w-2xl">
              {t('footer.description')}
            </p>
          </motion.div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-lg font-bold text-primary mb-4 border-b border-primary/30 pb-2">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href ? (
                      <Link href={link.href}>
                        <motion.div
                          whileHover={{ x: i18n.language === 'ar' ? -5 : 5 }}
                          className="flex items-center space-x-2 rtl:space-x-reverse text-primary/70 hover:text-primary transition-colors"
                        >
                          {link.icon && <link.icon className="w-4 h-4" />}
                          <span className="text-sm">{link.text}</span>
                        </motion.div>
                      </Link>
                    ) : (
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-primary/70">
                        {link.icon && <link.icon className="w-4 h-4" />}
                        <span className="text-sm">{link.text}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 rtl:space-x-reverse mb-8">
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label={social.name}
            >
              <Image
                src={social.icon}
                alt={social.name}
                width={20}
                height={20}
                className="filter brightness-0 invert"
              />
            </motion.a>
          ))}
        </div>

        {/* Live Chat Widget */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-8 left-8 rtl:right-8 z-40"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-gold hover:shadow-gold-lg transition-all"
            aria-label="Live Chat"
          >
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-background" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-success rounded-full animate-pulse"></span>
          </motion.button>
        </motion.div>

        {/* Copyright Section */}
        <div className="border-t border-primary/20 pt-8">
          <div className="text-center space-y-2">
            <p className="text-primary/70 text-sm">
              © {currentYear} FinClick.AI - {t('footer.rights')}
            </p>
            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
              <span className="text-primary/70 text-sm">{t('footer.madeWith')}</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-danger text-xl"
              >
                ❤️
              </motion.span>
              <span className="text-primary/70 text-sm">{t('footer.inKSA')}</span>
              <Image
                src="/flags/sa.svg"
                alt="Saudi Arabia"
                width={24}
                height={18}
                className="inline-block"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
