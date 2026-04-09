import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from './lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Users, CalendarCheck, PhoneCall, DollarSign, Activity, TrendingUp, Briefcase } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [revenue, setRevenue] = useState('');
  const [clients, setClients] = useState('');
  const [goal, setGoal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/');
        return;
      }

      // Fetch user profile from public.users table (created during signup)
      const { data: profiles, error: profileErr } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', session.user.id)
        .limit(1);

      if (!profileErr && profiles && profiles.length > 0) {
        setProfile(profiles[0]);
        
        // Fetch any existing user_data
        const { data: uData } = await supabase
          .from('user_data')
          .select('*')
          .eq('user_id', profiles[0].id)
          .limit(1);
          
        if (uData && uData.length > 0) {
          setUserData(uData[0]);
          setRevenue(uData[0].monthly_revenue || '');
          setClients(uData[0].number_of_clients || '');
          setGoal(uData[0].business_goal || '');
        }
      }
      
      setLoading(false);
    }
    loadData();
  }, [navigate]);

  const handleSaveData = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!profile) return;

      if (userData?.id) {
        // Update existing
        const { data, error } = await supabase
          .from('user_data')
          .update({
            monthly_revenue: revenue,
            number_of_clients: clients,
            business_goal: goal
          })
          .eq('id', userData.id)
          .select();
          
        if (data) setUserData(data[0]);
      } else {
        // Insert new
        const { data, error } = await supabase
          .from('user_data')
          .insert({
            user_id: profile.id,
            monthly_revenue: revenue,
            number_of_clients: clients,
            business_goal: goal
          })
          .select();
          
        if (data) setUserData(data[0]);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Dynamic Metrics Logic
  // If user_data exists, scale up the numbers to show a bigger impact. Otherwise show the standard template.
  const hasData = !!userData;
  
  // Base numbers
  let estimatedLeads = 45;
  let bookedAppointments = 18;
  let missedCalls = 12;
  let revenuePot = "R25,000+";

  // Dynamic override
  if (hasData) {
    // Basic heuristics to make the demo feel personalized
    const clientVal = parseInt(clients, 10) || 10;
    estimatedLeads = Math.floor(clientVal * 2.5);
    bookedAppointments = Math.floor(estimatedLeads * 0.4);
    missedCalls = Math.max(5, Math.floor(clientVal * 0.5));
    // revenue calculation parsing
    const revNum = parseInt(revenue.replace(/\D/g, ''), 10);
    if (revNum > 0) {
      const extraRev = Math.floor(revNum * 0.35); // 35% growth
      revenuePot = `R${extraRev.toLocaleString()}+`;
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-900 selection:text-blue-100">
      {/* Top Navbar */}
      <nav className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="block">
            <img src="/logo.jpg" alt="Intecube Logo" className="h-10 w-auto filter invert opacity-90 object-contain" />
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-slate-400 hidden sm:block">
              {profile?.full_name}
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-blue-500/20">
              {profile?.full_name?.charAt(0) || 'U'}
            </div>
            <button onClick={handleLogout} className="text-sm text-slate-400 hover:text-white transition-colors ml-4">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Personalized Greeting */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">{profile?.full_name?.split(' ')[0]}</span> — here's your AI growth demo for <span className="text-white">{profile?.business_name}</span>.
          </h1>
          <p className="text-slate-400 text-lg">
            Based on our analysis, here is what an automated lead capture system could do for your service business in the next 30 days.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard title="Est. Monthly Leads" value={estimatedLeads.toString()} icon={<Users />} color="blue" hasData={hasData} />
          <MetricCard title="Booked Appointments" value={bookedAppointments.toString()} icon={<CalendarCheck />} color="emerald" hasData={hasData} />
          <MetricCard title="Missed Calls Recovered" value={missedCalls.toString()} icon={<PhoneCall />} color="amber" hasData={hasData} />
          <MetricCard title="Revenue Potential" value={revenuePot} icon={<DollarSign />} color="violet" hasData={hasData} />
        </div>

        {/* Informational insight based on whether they filled data */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 to-violet-900/40 border border-blue-500/20 flex items-start gap-4">
          <div className="mt-1 bg-blue-500 text-white p-2 rounded-lg">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-1">AI Insight</h3>
            <p className="text-blue-200/80 leading-relaxed">
              {hasData 
                ? `Based on your specific input of ${clients} clients, we estimate a 30–50% increase in booked appointments within 60 days using automated follow-ups.` 
                : "This demo uses estimated metrics based on similar service businesses. Tell us more below to generate a tailored forecast."}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Secondary Form */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-8 rounded-3xl bg-slate-900 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-violet-400" /> Unlock Deeper Insights
              </h2>
              <p className="text-slate-400 mb-8 text-sm">Provide a few more details to dynamically adjust your AI growth forecast using live math.</p>

              <form onSubmit={handleSaveData} className="space-y-5 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Average Monthly Revenue</label>
                  <input type="text" placeholder="e.g. 50000" className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-white transition-all"
                    value={revenue} onChange={e => setRevenue(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Current Clients Per Month</label>
                  <input type="number" placeholder="e.g. 25" className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-white transition-all"
                    value={clients} onChange={e => setClients(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Primary Business Goal</label>
                  <select className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-white transition-all appearance-none"
                    value={goal} onChange={e => setGoal(e.target.value)} required>
                    <option value="" disabled>Select a goal...</option>
                    <option value="More Leads">More Leads Overall</option>
                    <option value="Better Conversions">Higher Conversion Rate</option>
                    <option value="Save Time">Automate Admin / Save Time</option>
                  </select>
                </div>
                
                <button type="submit" disabled={isSubmitting} className="w-full bg-violet-600 text-white py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-violet-500 transition-colors shadow-lg shadow-violet-900/20 disabled:opacity-70 mt-4">
                  {isSubmitting ? 'Optimizing Forecast...' : (userData ? 'Update Forecast' : 'Generate Custom Forecast')}
                </button>
              </form>
            </motion.div>
          </div>

          {/* CTA Area */}
          <div className="lg:col-span-3 flex flex-col justify-center">
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="p-12 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-violet-600 text-center shadow-2xl shadow-blue-900/40 relative overflow-hidden border border-white/20">
               {/* Decorative background elements */}
               <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
               <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/20 blur-3xl rounded-full pointer-events-none" />
               <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-black/20 blur-3xl rounded-full pointer-events-none" />

               <div className="relative z-10 flex flex-col items-center">
                 <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                    <Briefcase className="w-8 h-8 text-white" />
                 </div>
                 <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 leading-tight">Ready to see these numbers in real life?</h2>
                 <p className="text-blue-100 text-lg mb-10 max-w-lg mx-auto">
                   Let's build an autonomous lead-generating website for {profile?.business_name}. Book a 15-minute activation call with our team.
                 </p>
                 <a href="#book-call" className="bg-white text-blue-900 px-10 py-5 rounded-xl text-xl font-black hover:scale-105 hover:shadow-xl hover:shadow-blue-900/50 transition-all block max-w-max mx-auto">
                   Book a Call to Activate Your AI System
                 </a>
               </div>
             </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub Component for the metrics
function MetricCard({ title, value, icon, color, hasData }: { title: string, value: string, icon: React.ReactNode, color: string, hasData: boolean }) {
  const colorMap: Record<string, string> = {
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    violet: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded-2xl border bg-slate-900/50 backdrop-blur-sm ${colorMap[color]} relative group hover:bg-slate-800 transition-colors`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-950 rounded-xl shadow-inner">
          {icon}
        </div>
      </div>
      <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white mb-2">{value}</p>
      
      {/* Subtle label showing if it's default or personalized */}
      {!hasData ? (
        <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
          Estimated demo based on similar businesses
        </p>
      ) : (
        <p className="text-xs text-emerald-400 opacity-80 flex items-center gap-1">
          <Activity className="w-3 h-3" /> Personalized Forecast
        </p>
      )}
    </motion.div>
  );
}
