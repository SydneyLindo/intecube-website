import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, MessageSquare, Globe, Zap, CheckCircle2, ArrowRight, Menu, X, Star, Users, BarChart3, ShieldCheck
} from 'lucide-react';
import { supabase } from './lib/supabase';

// --- Types ---
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'elevenlabs-convai': any;
      }
    }
  }
}

// --- Logo Component ---
const IntecubeLogo = ({ dark = true }: { dark?: boolean }) => (
  <span className={`text-xl font-bold tracking-tight ${dark ? 'text-slate-900' : 'text-white'}`}>Intecube</span>
);

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Why Us', href: '#why-us' },
  ];

  return (
    <nav className={`fixed top-4 left-4 right-4 max-w-7xl mx-auto z-50 transition-all duration-300 rounded-2xl ${
        isScrolled ? 'bg-white/90 backdrop-blur-lg border border-slate-200 py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="hover:opacity-80 transition-opacity">
          <IntecubeLogo dark={true} />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              {link.name}
            </a>
          ))}
          <a href="#contact" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200"> 
            Get Demo
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-lg font-medium text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.name}
                </a>
              ))}
              <a href="#contact" className="bg-blue-600 text-white px-6 py-3 rounded-xl text-center font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Get Your Free Website Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">        
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-violet-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
            The Future of Service Business Websites
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            We Build Websites That Turn <br className="hidden md:block" />
            <span className="text-gradient hover:opacity-90 transition-opacity">Visitors Into Paying Customers</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            High-performance, AI-powered websites and intelligent chat widgets designed specifically for service businesses to capture more leads automatically.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4"> 
            <a href="#contact" className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-200 flex items-center justify-center gap-2 group">
              Get Your Free Website Demo
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#services" className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-50 transition-all flex items-center justify-center">
              View Services
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-20 relative max-w-5xl mx-auto">
          <div className="aspect-video bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-violet-500/20 opacity-50 group-hover:opacity-70 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-8 glass-card rounded-2xl max-w-md text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <MessageSquare className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">AI Assistant</p>    
                    <p className="text-xs text-slate-500">Online & Ready</p>
                  </div>
                </div>
                <p className="text-sm text-slate-700 mb-4">"Hello! I noticed you're looking for a plumber. Would you like to book a free quote for tomorrow morning?"</p>       
                <div className="flex gap-2">
                  <div className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-200">Yes, please!</div>
                  <div className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg cursor-pointer hover:bg-slate-200 transition-colors duration-200">Not now</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-6 -left-6 p-4 glass-card rounded-xl hidden md:block animate-bounce" style={{ animationDuration: '3s' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-xs font-bold text-slate-700">+24% Conversion</span> 
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 p-4 glass-card rounded-xl hidden md:block animate-bounce" style={{ animationDuration: '4s' }}>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-700">12 New Leads Today</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const stats = [
    { label: 'Websites Built', value: '50+' },
    { label: 'Lead Increase', value: '3x' },
    { label: 'Client Satisfaction', value: '99%' },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by local service businesses</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
            {['Apex Plumbing', 'Zenith HVAC', 'Luxe Landscaping', 'Prime Electric', 'Nova Cleaning'].map(logo => (
              <span key={logo} className="text-xl font-bold text-slate-900 italic">{logo}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow"
            >
              <p className="text-4xl font-extrabold text-slate-900 mb-2">{stat.value}</p>
              <p className="text-slate-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <div className="p-10 bg-white rounded-3xl shadow-sm border border-slate-100 relative">
            <div className="absolute -top-5 left-10 text-blue-600">
              <Star className="w-10 h-10 fill-current" />
            </div>
            <p className="text-xl md:text-2xl text-slate-700 italic leading-relaxed mb-8">
              "Intecube transformed our online presence. Our new AI-powered site doesn't just look great — it's actually booking appointments for us while we sleep. We saw a 40% increase in leads in the first month."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">     
                <img src="https://picsum.photos/seed/person1/100/100" alt="Client" referrerPolicy="no-referrer" />
              </div>
              <div>
                <p className="font-bold text-slate-900">David Miller</p>
                <p className="text-sm text-slate-600">Owner, Miller & Sons HVAC</p>     
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: 'AI Website Design', description: 'High-speed, conversion-optimized websites built to showcase your services and turn visitors into customers.', icon: <Globe className="w-6 h-6 text-white" />, color: 'bg-blue-600', benefits: ['Mobile-First Design', 'SEO Optimized', 'Fast Load Times'] },
    { title: 'Website Chat Widgets', description: 'Intelligent AI chat that engages visitors 24/7, answers questions, and captures lead information automatically.', icon: <MessageSquare className="w-6 h-6 text-white" />, color: 'bg-violet-600', benefits: ['24/7 Lead Capture', 'Instant Responses', 'Appointment Booking'] },
    { title: 'Lead Capture Systems', description: 'Complete automation systems that funnel leads directly to your phone or CRM, ensuring no customer is missed.', icon: <Zap className="w-6 h-6 text-white" />, color: 'bg-amber-500', benefits: ['Automated Follow-ups', 'CRM Integration', 'Instant Notifications'] }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Our Core Solutions</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We combine high-end design with cutting-edge AI to give your business a competitive edge.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300 cursor-pointer group"
            >
              <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-blue-500/30 transition-shadow duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">{service.description}</p>
              <ul className="space-y-3 mb-8">
                {service.benefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { number: '01', title: 'Tell us about your business', description: 'We start with a quick discovery call to understand your services, goals, and target audience.' },       
    { number: '02', title: 'We build your AI-powered site', description: 'Our team designs and develops your custom website and integrates intelligent lead capture tools.' },  
    { number: '03', title: 'You get more leads & customers', description: 'Launch your new site and watch as our AI automation turns more visitors into booked appointments.' } 
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] -z-0" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple 3-Step Process</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Getting a high-converting website shouldn't be complicated. We handle the tech, you handle the new business.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2 }} className="relative">
              <div className="text-6xl font-black text-white/10 mb-6">{step.number}</div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">{step.description}</p>      
              {idx < 2 && <div className="hidden lg:block absolute top-10 -right-4 w-12 h-px bg-gradient-to-r from-blue-500 to-transparent" />}
            </motion.div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <a href="#contact" className="inline-flex bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/20">
            Start Your Project Today
          </a>
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const reasons = [
    { title: 'Built for Conversions', description: 'We don\'t just build pretty sites. We build sales machines designed to convert traffic into revenue.', icon: <BarChart3 className="w-6 h-6" /> },
    { title: 'AI-Powered Automation', description: 'Our websites work for you 24/7, capturing leads and answering questions even when you\'re offline.', icon: <Zap className="w-6 h-6" /> },
    { title: 'Fast Turnaround', description: 'Get your professional, high-end website live in weeks, not months, without sacrificing quality.', icon: <CheckCircle2 className="w-6 h-6" /> },
    { title: 'Tailored for Local Business', description: 'We understand the unique needs of service providers like plumbers, HVAC, and landscapers.', icon: <ShieldCheck className="w-6 h-6" /> }
  ];

  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
              Why Service Businesses <br /> <span className="text-blue-600">Trust Intecube</span>
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Most agencies build websites that look good but don't perform. We focus on the only metric that matters for your business: Leads.
            </p>
            <div className="space-y-8">
              {reasons.map((reason, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    {reason.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{reason.title}</h4>
                    <p className="text-slate-600">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden relative shadow-2xl">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" alt="Our Team" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" referrerPolicy="no-referrer" />        
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 p-6 glass-card rounded-2xl border border-white/10 backdrop-blur-md">
                <p className="text-white font-bold text-lg mb-1">"Our mission is simple:"</p>
                <p className="text-slate-200 italic">To help local service businesses dominate their market through superior technology and design.</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-violet-600/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

const LeadCapture = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: '',
    business: '',
    contact: '',
    service: 'AI Website Design'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let email = formState.contact;
      if (!email.includes('@')) {
        const cleanName = formState.name.replace(/\s+/g, '').toLowerCase() || 'user';
        email = `${cleanName}@${formState.business.replace(/\s+/g, '').toLowerCase() || 'company'}.demo`;
      }

      const password = Math.random().toString(36).slice(-10) + 'A1!';

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: dbError } = await supabase
          .from('users')
          .insert({
            auth_id: authData.user.id,
            full_name: formState.name,
            business_name: formState.business,
            contact_info: formState.contact,
            service_needed: formState.service
          });

        if (dbError) throw dbError;
      }

      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
          
          {/* Left Panel */}
          <div className="md:w-2/5 bg-slate-900 p-10 md:p-16 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Grow Your Business?</h2>
              <p className="text-slate-400 mb-10 leading-relaxed">
                Fill out the form and we'll build you a custom demo showing exactly how AI can transform your website.
              </p>
              <div className="space-y-5">
                {['Free Strategy Session', 'Custom AI Demo', 'No-Obligation Quote'].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-600/20 border border-blue-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-12 pt-10 border-t border-white/10">
                <p className="text-xs text-slate-500 leading-relaxed">Use the form to submit your request and our team will follow up with a tailored proposal.</p>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="md:w-3/5 p-10 md:p-12">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Get Your Free Demo</h3>
              <p className="text-slate-500 text-sm">Takes less than 60 seconds to fill out.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input
                    id="fullName" required type="text" placeholder="John Doe"
                    style={{width:'100%',padding:'14px 16px',border:'2px solid #cbd5e1',borderRadius:'12px',fontSize:'14px',fontWeight:500,outline:'none',backgroundColor:'white',boxSizing:'border-box'}}
                    value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="businessName" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Business Name</label>
                  <input
                    id="businessName" required type="text" placeholder="Doe Plumbing Co."
                    style={{width:'100%',padding:'14px 16px',border:'2px solid #cbd5e1',borderRadius:'12px',fontSize:'14px',fontWeight:500,outline:'none',backgroundColor:'white',boxSizing:'border-box'}}
                    value={formState.business} onChange={(e) => setFormState({...formState, business: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contactInfo" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email or Phone Number</label>
                <input
                  id="contactInfo" required type="text" placeholder="john@example.com or +27 82 000 0000"
                  style={{width:'100%',padding:'14px 16px',border:'2px solid #cbd5e1',borderRadius:'12px',fontSize:'14px',fontWeight:500,outline:'none',backgroundColor:'white',boxSizing:'border-box'}}
                  value={formState.contact} onChange={(e) => setFormState({...formState, contact: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Service Needed</label>
                <div className="relative">
                  <select
                    style={{width:'100%',padding:'14px 16px',border:'2px solid #cbd5e1',borderRadius:'12px',fontSize:'14px',fontWeight:500,outline:'none',backgroundColor:'white',appearance:'none',cursor:'pointer',boxSizing:'border-box'}}
                    value={formState.service} onChange={(e) => setFormState({...formState, service: e.target.value})}
                  >
                    <option>AI Website Design</option>
                    <option>Website Chat Widgets</option>
                    <option>Automation / Lead Systems</option>
                    <option>Full Digital Package</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                disabled={isLoading} type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-base hover:bg-blue-700 active:scale-[0.99] transition-all duration-200 shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Setting up your dashboard...
                  </>
                ) : (
                  <>
                    Get My Free Website Demo
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-400">By clicking, you agree to our privacy policy. We'll never spam you.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <IntecubeLogo dark={true} />
            </div>
            <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
              We build high-performance, AI-powered websites for service businesses. Our mission is to help local providers dominate their market through superior technology.  
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Navigation</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="text-slate-600 hover:text-blue-600 transition-colors">Services</a></li>
              <li><a href="#how-it-works" className="text-slate-600 hover:text-blue-600 transition-colors">How It Works</a></li>
              <li><a href="#why-us" className="text-slate-600 hover:text-blue-600 transition-colors">Why Choose Us</a></li>
              <li><a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors">Get Started</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">© 2026 Intecube Digital Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900 font-sans">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Services />
        <HowItWorks />
        <WhyChooseUs />
        <LeadCapture />
      </main>
      <Footer />
      <elevenlabs-convai agent-id="agent_1101knc5rfvyez8v3zxc2t9x8cd3"></elevenlabs-convai>
    </div>
  );
}
