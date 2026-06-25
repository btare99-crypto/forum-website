import { Mail, Code2, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { motion } from 'framer-motion';

const SOCIAL_LINKS = [
  { icon: GithubIcon, href: 'https://github.com/btare99', label: 'GitHub', color: '#8b5cf6' },
  { icon: LinkedinIcon, href: 'https://linkedin.com/in/bjornitare', label: 'LinkedIn', color: '#06b6d4' },
  { icon: Mail, href: 'mailto:btare99@gmail.com', label: 'Email', color: '#6366f1' },
];

const FOOTER_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Redesigned premium site footer
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-gradient-to-b from-transparent to-[#000000] py-14 overflow-hidden" role="contentinfo">
      {/* Background Glow */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[500px] h-[150px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Top separator line with glowing dot */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-center opacity-40 pointer-events-none" aria-hidden="true">
        <div className="w-[30%] sm:w-[40%] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-indigo-500/35" />
        <div className="w-1 h-1 rounded-full bg-indigo-400/50 shadow-[0_0_6px_rgba(99,102,241,0.6)] mx-3" />
        <div className="w-[30%] sm:w-[40%] h-[1px] bg-gradient-to-l from-transparent via-indigo-500/20 to-indigo-500/35" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/5">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start gap-2.5">
            <motion.div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleScrollToTop}
              whileHover={{ scale: 1.02 }}
              aria-label="Back to top"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Code2 size={16} className="text-white" />
              </div>
              <span className="font-extrabold text-white tracking-wide text-base">
                Bjorni Tare<span className="text-indigo-400">.</span>
              </span>
            </motion.div>
            <p className="text-slate-400 text-xs sm:text-sm font-medium text-center md:text-left leading-relaxed max-w-[280px]">
              Computer Engineering Student &amp; Full Stack Developer.
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5" aria-label="Footer navigation">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-400 hover:text-indigo-300 text-xs sm:text-sm font-semibold transition-all duration-300 relative group/link"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-indigo-400 transition-all duration-300 group-hover/link:w-full" />
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3" role="list" aria-label="Social media links">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                role="listitem"
                className="w-9.5 h-9.5 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                whileHover={{ 
                  scale: 1.06, 
                  y: -2,
                  borderColor: `${color}40`,
                  backgroundColor: `${color}10`,
                  boxShadow: `0 8px 20px ${color}15`
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={17} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs font-semibold">
          <p>© {currentYear} Bjorni Tare. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-slate-400">
            Crafted with <Heart size={12} className="text-red-500 fill-red-500/25 animate-pulse" /> by Bjorni Tare
          </p>
        </div>
      </div>
    </footer>
  );
}
