import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import toast, { Toaster } from 'react-hot-toast';
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper';

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: 'btare99@gmail.com',
    href: 'mailto:btare99@gmail.com',
    color: '#6366f1',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/bjornitare',
    href: 'https://linkedin.com/in/bjornitare',
    color: '#06b6d4',
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'github.com/btare99',
    href: 'https://github.com/btare99',
    color: '#8b5cf6',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Available Globally',
    href: null,
    color: '#10b981',
  },
];

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

/**
 * Contact section with validated form and info panel
 */
export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.subject.trim() || form.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.';
    }
    if (!form.message.trim() || form.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters.';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix the errors below.', {
        icon: <AlertCircle size={16} className="text-red-400" />,
      });
      return;
    }

    setSending(true);

    // Simulate API call (replace with EmailJS or your backend)
    await new Promise((resolve) => setTimeout(resolve, 1800));

    setSending(false);
    setForm(INITIAL_FORM);
    setErrors({});

    toast.custom((t) => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : 20 }}
        className="flex items-center gap-3 bg-[#0b0b0e] border border-emerald-500/30 text-white px-5 py-4 rounded-xl shadow-2xl"
      >
        <CheckCircle size={18} className="text-emerald-400" />
        <div>
          <p className="font-semibold text-sm">Message sent successfully!</p>
          <p className="text-slate-400 text-xs">I'll get back to you within 24 hours.</p>
        </div>
      </motion.div>
    ));
  };

  return (
    <SectionWrapper id="contact">
      <Toaster position="top-right" />

      <SectionHeader
        tag="Contact"
        title={<>Let's <span className="gradient-text">Connect</span></>}
        subtitle="Have a project in mind or want to chat? I'd love to hear from you."
      />

      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* ── Left: Info panel ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="space-y-3">
            <h3 className="text-white font-bold text-xl">Start a Conversation</h3>
            <p className="text-slate-400 leading-relaxed">
              I'm always open to discussing new opportunities, interesting projects,
              or just having a conversation about tech. My inbox is always open.
            </p>
          </div>

          {/* Contact info cards */}
          <div className="space-y-3">
            {CONTACT_INFO.map(({ icon: Icon, label, value, href, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ x: 4 }}
                className="card glass-hover flex items-center gap-4 p-4 rounded-xl"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}20`, border: `1px solid ${color}30` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-slate-500 text-xs uppercase tracking-wider font-mono mb-0.5">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-white text-sm font-medium hover:text-indigo-400 transition-colors truncate block"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-white text-sm font-medium">{value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Availability badge */}
          <div className="glass rounded-xl p-4 border border-emerald-500/20">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <p className="text-emerald-400 font-semibold text-sm">Available for Opportunities</p>
                <p className="text-slate-500 text-xs mt-0.5">
                  Open to internships, junior positions & freelance work
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Right: Contact form ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <form
            onSubmit={handleSubmit}
            noValidate
            className="card p-6 rounded-2xl space-y-5"
            id="contact-form"
            aria-label="Contact form"
          >
            {/* Name + Email row */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="form-label">
                  Your Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`form-input ${errors.name ? 'border-red-500/50 focus:border-red-500' : ''}`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="form-label">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`form-input ${errors.email ? 'border-red-500/50' : ''}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="contact-subject" className="form-label">
                Subject <span className="text-red-400">*</span>
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project inquiry, collaboration, hiring..."
                className={`form-input ${errors.subject ? 'border-red-500/50' : ''}`}
                aria-invalid={!!errors.subject}
              />
              {errors.subject && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.subject}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="form-label">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project, opportunity, or just say hello..."
                className={`form-input resize-none ${errors.message ? 'border-red-500/50' : ''}`}
                aria-invalid={!!errors.message}
              />
              <div className="flex justify-between mt-1">
                {errors.message ? (
                  <p className="text-red-400 text-xs flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.message}
                  </p>
                ) : <span />}
                <span className={`text-xs font-mono ${form.message.length < 20 ? 'text-slate-600' : 'text-emerald-500'}`}>
                  {form.message.length}/500
                </span>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              id="contact-submit-btn"
              disabled={sending}
              whileHover={!sending ? { scale: 1.01 } : {}}
              whileTap={!sending ? { scale: 0.99 } : {}}
              className="btn-primary w-full justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? (
                <>
                  <motion.div
                    className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
