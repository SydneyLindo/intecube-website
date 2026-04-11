/** * @license * SPDX-License-Identifier: Apache-2.0 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, MessageSquare, Globe, CheckCircle2, ArrowRight, Menu, X, Star, Users, BarChart3, ShieldCheck } from 'lucide-react';
import IntecubeLogo from './IntecubeLogo';

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'elevenlabs-convai': any;
      }
    }
  }
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Why Us', href: '#why-us' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg border-b border-slate-200 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3"><IntecubeLogo /></div>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-slate-600 hover:text-[var(--color-primary)] transition-colors">{link.name}</a>
          ))}
          <a href="#contact" className="btn-primary text-sm font-medium">Get Demo</a>
        </div>
        <button className="md:hidden text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 md:hidden shadow-xl">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-lg font-medium text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>{link.name}</a>
              ))}
              <a href="#contact" className="btn-primary w-full text-center font-medium" onClick={() => setIsMobileMenuOpen(false)}>Get Your Free Website Demo</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--color-primary)]/10 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-[var(--color-secondary)]/10 rounded-full blur-3xl opacity-60" />
    </div>
    <div className="max-w-7xl mx-auto px-6 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">The Future of Service Business Websites</span>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
          We Build Websites That Turn <br className="hidden md:block" />
          <span className="text-gradient">Visitors Into Paying Customers</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">High-performance, AI-powered websites and intelligent chat widgets designed specifically for service businesses to capture more leads automatically.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact" className="btn-primary w-full sm:w-auto text-lg font-semibold flex items-center justify-center gap-2">
            Get Your Free Website Demo <ChevronRight className="w-5 h-5" />
          </a>
          <a href="#services" className="btn-secondary w-full sm:w-auto text-lg font-semibold flex items-center justify-center">View Services</a>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-20 relative max-w-5xl mx-auto">
        <div className="aspect-video bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 opacity-50 group-hover:opacity-70 transition-opacity" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-8 glass-card rounded-2xl max-w-md text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center"><MessageSquare className="text-white w-5 h-5" /></div>
                <div><p className="text-sm font-bold text-[var(--color-text)]">AI Assistant</p><p className="text-xs text-slate-500">Online & Ready</p></div>
              </div>
              <p className="text-sm text-slate-700 mb-4">"Hello! I noticed you're looking for a plumber. Would you like to book a free quote for tomorrow morning?"</p>
              <div className="flex gap-2">
                <div className="px-4 py-2 bg-[var(--color-cta)] text-white text-xs font-bold rounded-lg">Yes, please!</div>
                <div className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg">Not now</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -top-6 -left-6 p-4 glass-card rounded-xl hidden md:block animate-bounce" style={{ animationDuration: '3s' }}>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[var(--color-cta)] rounded-full" /><span className="text-xs font-bold text-[var(--color-text)]">+24% Conversion</span></div>
        </div>
        <div className="absolute -bottom-6 -right-6 p-4 glass-card rounded-xl hidden md:block animate-bounce" style={{ animationDuration: '4s' }}>
          <div className="flex items-center gap-2"><Users className="w-4 h-4 text-[var(--color-primary)]" /><span className="text-xs font-bold text-[var(--color-text)]">12 New Leads Today</span></div>
        </div>
      </motion.div>
    </div>
  </section>
);

const SocialProof = () => {
  const stats = [{ label: 'Websites Built', value: '50+' }, { label: 'Lead Increase', value: '3x' }, { label: 'Client Satisfaction', value: '99%' }];
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by local service businesses</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
            {['Apex Plumbing', 'Zenith HVAC', 'Luxe Landscaping', 'Prime Electric', 'Nova Cleaning'].map(logo => (
              <span key={logo} className="text-xl font-bold text-[var(--color-text)] italic">{logo}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {stats.map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="text-center p-8 bg-[var(--color-background)] rounded-2xl shadow-sm border border-slate-100">
              <p className="text-4xl font-extrabold text-[var(--color-text)] mb-2">{stat.value}</p>
              <p className="text-slate-500 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="p-10 bg-white rounded-3xl shadow-sm border border-slate-100 relative">
            <div className="absolute -top-5 left-10 text-[var(--color-primary)]"><Star className="w-10 h-10 fill-current" /></div>
            <p className="text-xl md:text-2xl text-slate-700 italic leading-relaxed mb-8">"Intecube transformed our online presence. Our new AI-powered site doesn't just look great — it's actually booking appointments for us while we sleep. We saw a 40% increase in leads in the first month."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden"><img src="https://picsum.photos/seed/person1/100/100" alt="Client" referrerPolicy="no-referrer" /></div>
              <div><p className="font-bold text-[var(--color-text)]">David Miller</p><p className="text-sm text-slate-500">Owner, Miller & Sons HVAC</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: 'AI Website Design', description: 'High-speed, conversion-optimized websites built to showcase your services and turn visitors into customers.', icon: <Globe className="w-6 h-6 text-white" />, color: 'bg-[var(--color-primary)]', benefits: ['Mobile-First Design', 'SEO Optimized', 'Fast Load Times'] },
    { title: 'Website Chat Widgets', description: 'Intelligent AI chat that engages visitors 24/7, answers questions, and captures lead information automatically.', icon: <MessageSquare className="w-6 h-6 text-white" />, color: 'bg-[var(--color-secondary)]', benefits: ['24/7 Lead Capture', 'Instant Responses', 'Appointment Booking'] },
    { title: 'Lead Capture Systems', description: 'Complete automation systems that funnel leads directly to your phone or CRM, ensuring no customer is missed.', icon: <BarChart3 className="w-6 h-6 text-white" />, color: 'bg-[var(--color-cta)]', benefits: ['Automated Follow-ups', 'CRM Integration', 'Instant Notifications'] }
  ];
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Our Core Solutions</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">We combine high-end design with cutting-edge AI to give your business a competitive edge.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="card p-8 rounded-3xl border border-slate-100 bg-white hover:bg-[var(--color-background)] group">
              <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-200`}>{service.icon}</div>
              <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4">{service.title}</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">{service.description}</p>
              <ul className="space-y-3 mb-8">
                {service.benefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-center gap-2 text-sm font-medium text-slate-700"><CheckCircle2 className="w-4 h-4 text-green-500" />{benefit}</li>
                ))}
              </ul>
              <a href="#contact" className="text-[var(--color-primary)] font-bold flex items-center gap-2 hover:gap-3 transition-all duration-200">Learn More <ArrowRight className="w-4 h-4" /></a>
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
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-primary)]/10 blur-[120px] -z-0" />
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
              {idx < 2 && <div className="hidden lg:block absolute top-10 -right-4 w-12 h-px bg-gradient-to-r from-[var(--color-primary)] to-transparent" />}
            </motion.div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <a href="#contact" className="btn-primary inline-flex text-white px-10 py-4 rounded-full text-lg font-bold">Start Your Project Today</a>
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const reasons = [
    { title: 'Built for Conversions', description: "We don't just build pretty sites. We build sales machines designed to convert traffic into revenue.", icon: <BarChart3 className="w-6 h-6" /> },
    { title: 'AI-Powered Automation', description: "Our websites work for you 24/7, capturing leads and answering questions even when you're offline.", icon: <CheckCircle2 className="w-6 h-6" /> },
    { title: 'Fast Turnaround', description: 'Get your professional, high-end website live in weeks, not months, without sacrificing quality.', icon: <CheckCircle2 className="w-6 h-6" /> },
    { title: 'Tailored for Local Business', description: 'We understand the unique needs of service providers like plumbers, HVAC, and landscapers.', icon: <ShieldCheck className="w-6 h-6" /> }
  ];
  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text)] mb-8 leading-tight">Why Service Businesses <br /><span className="text-gradient">Trust Intecube</span></h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">Most agencies build websites that look good but don't perform. We focus on the only metric that matters for your business: Leads.</p>
            <div className="space-y-8">
              {reasons.map((reason, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[var(--color-background)] text-[var(--color-primary)] rounded-xl flex items-center justify-center shadow-sm">{reason.icon}</div>
                  <div><h4 className="text-xl font-bold text-[var(--color-text)] mb-2">{reason.title}</h4><p className="text-slate-600">{reason.description}</p></div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" alt="Our Team" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 p-6 glass-card rounded-2xl">
                <p className="text-slate-900 font-bold text-lg mb-1">"Our mission is simple:"</p>
                <p className="text-slate-600 italic">To help local service businesses dominate their market through superior technology and design.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LeadCapture = () => {
  const [formState, setFormState] = useState({ name: '', business: '', contact: '', service: 'AI Website Design' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch("https://formspree.io/f/meepydej", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          business: formState.business,
          contact: formState.contact,
          service: formState.service
        })
      });
      if (res.ok) {
        setIsSubmitted(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
          <div className="md:w-2/5 bg-slate-900 p-10 md:p-16 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Grow Your Business?</h2>
              <p className="text-slate-400 mb-10 leading-relaxed">Fill out the form and we'll build you a custom demo showing exactly how AI can transform your website.</p>
              <div className="space-y-6">
                {['Free Strategy Session', 'Custom AI Demo', 'No-Obligation Quote'].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-[var(--color-cta)]" /></div>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 pt-12 border-t border-white/10">
              <p className="text-sm text-slate-400 leading-relaxed">Use the form to submit your request and our team will follow up with a tailored proposal.</p>
            </div>
          </div>
          <div className="md:w-3/5 p-10 md:p-16">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && <div className="p-4 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100">{error}</div>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <input required type="text" placeholder="John Doe" className="input w-full" value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Business Name</label>
                    <input required type="text" placeholder="Doe Plumbing Co." className="input w-full" value={formState.business} onChange={(e) => setFormState({...formState, business: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email or Phone Number</label>
                  <input required type="text" placeholder="john@example.com" className="input w-full" value={formState.contact} onChange={(e) => setFormState({...formState, contact: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Service Needed</label>
                  <select className="input w-full appearance-none" value={formState.service} onChange={(e) => setFormState({...formState, service: e.target.value})}>
                    <option>AI Website Design</option>
                    <option>Website Chat Widgets</option>
                    <option>Automation / Lead Systems</option>
                    <option>Full Digital Package</option>
                  </select>
                </div>
                <button type="submit" disabled={isLoading} className="btn-primary w-full text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                  {isLoading ? 'Sending...' : <><span>Get My Free Website Demo</span><ArrowRight className="w-5 h-5" /></>}
                </button>
                <p className="text-center text-xs text-slate-400">By clicking, you agree to our privacy policy. We'll never spam you.</p>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"><CheckCircle2 className="w-10 h-10" /></div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Request Received!</h3>
                <p className="text-slate-600 text-lg mb-8">Thanks for reaching out, {formState.name.split(' ')[0]}. Our team is already reviewing your business and will be in touch within 24 hours with your custom demo.</p>
                <button onClick={() => setIsSubmitted(false)} className="text-blue-600 font-bold hover:underline">Send another request</button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6"><IntecubeLogo /></div>
          <p className="text-slate-500 max-w-xl leading-relaxed">We build high-performance, AI-powered websites for service businesses. Our mission is to help local providers dominate their market through superior technology.</p>
        </div>
        <div>
          <h4 className="font-bold text-[var(--color-text)] mb-6 uppercase text-xs tracking-widest">Explore</h4>
          <ul className="space-y-4">
            <li><a href="#services" className="text-slate-500 hover:text-[var(--color-primary)] transition-colors">Services</a></li>
            <li><a href="#how-it-works" className="text-slate-500 hover:text-[var(--color-primary)] transition-colors">How It Works</a></li>
            <li><a href="#why-us" className="text-slate-500 hover:text-[var(--color-primary)] transition-colors">Why Choose Us</a></li>
            <li><a href="#contact" className="text-slate-500 hover:text-[var(--color-primary)] transition-colors">Get Started</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-slate-400">© 2026 Intecube Digital Agency. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="text-xs text-slate-400 hover:text-slate-600">Privacy Policy</a>
          <a href="#" className="text-xs text-slate-400 hover:text-slate-600">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen selection:bg-[var(--color-primary)] selection:text-white">
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
