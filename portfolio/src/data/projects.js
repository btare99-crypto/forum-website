/**
 * Real projects data with device mockup images
 */
export const projects = [
  {
    id: 1,
    title: 'AutoCimi',
    subtitle: 'Precision and Performance',
    description:
      'A complete website for a vehicle dealership. Features a powerful dark/red design with live statistics, vehicle galleries, advanced filter system, and contact form. Fully responsive for all devices.',
    mockup: '/mockup-autocini.png',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Node.js'],
    color: '#ef4444',
    accent: '#dc2626',
    category: 'Web Design',
    live: 'https://pjese-franceze-auto-cimi.com/',
    github: 'https://github.com/btare99/Auto-Cimi',
    stats: [
      { label: 'Visitors/month', value: '10k+' },
      { label: 'Clients', value: '500+' },
      { label: 'Vehicles', value: '6+' },
    ],
  },
  {
    id: 2,
    title: 'Pizza Oxhaku',
    subtitle: 'The Taste that Prevails',
    description:
      'A digital platform for a premium restaurant. Features an interactive menu, online reservations, a complete product gallery, and a review system. Elegant dark/gold design reflecting culinary luxury.',
    mockup: '/mockup-restaurant.png',
    tech: ['React', 'CSS Animations', 'Firebase', 'Stripe'],
    color: '#f59e0b',
    accent: '#d97706',
    category: 'Web Design',
    live: 'https://pizza-catalog.vercel.app/',
    github: 'https://github.com/btare99/Pizza-Catalog',
    stats: [
      { label: 'Products', value: '30+' },
      { label: 'Reservations', value: '18+' },
      { label: 'Rating', value: '4.9★' },
    ],
  },
  {
    id: 3,
    title: "Lala's Cleaning",
    subtitle: 'Professional Cleaning Services',
    description:
      'A professional website for a cleaning service company. Features service presentations, portfolio gallery, online quote requests, and client testimonials. Clean teal/dark design with effective calls to action.',
    mockup: '/mockup-cleaning.png',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'EmailJS'],
    color: '#10b981',
    accent: '#059669',
    category: 'Web Design',
    live: 'https://cleaning-company-6uwg.vercel.app/',
    github: 'https://github.com/btare99/Cleaning-Company',
    stats: [
      { label: 'Clients', value: '200+' },
      { label: 'Services', value: '15+' },
      { label: 'Rating', value: '5★' },
    ],
  },
];
