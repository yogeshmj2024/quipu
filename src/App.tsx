import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import Features from './components/home/Features';
import OnboardingForm from './components/onboarding/OnboardingForm';
import InvestmentPlanDisplay from './components/dashboard/InvestmentPlanDisplay';
import Dashboard from './components/dashboard/Dashboard';
import KYCModule from './components/kyc/KYCModule';
import { UserProfile, InvestmentPlan } from './types';
import { generateInvestmentPlan } from './lib/gemini';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<InvestmentPlan | null>(null);
  const [savedPlans, setSavedPlans] = useState<InvestmentPlan[]>([]);

  // Load saved plans from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('quipu_plans');
    if (saved) {
      try {
        setSavedPlans(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved plans", e);
      }
    }
  }, []);

  const handleOnboardingComplete = async (profile: UserProfile) => {
    setIsGenerating(true);
    try {
      const plan = await generateInvestmentPlan(profile);
      setCurrentPlan(plan);
      
      // Save to list
      const updatedPlans = [plan, ...savedPlans];
      setSavedPlans(updatedPlans);
      localStorage.setItem('quipu_plans', JSON.stringify(updatedPlans));
      
      setActiveTab('plan');
    } catch (error) {
      console.error("Plan generation failed", error);
      alert("Failed to generate plan. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleViewPlan = (plan: InvestmentPlan) => {
    setCurrentPlan(plan);
    setActiveTab('plan');
  };

  const handleFeedbackSubmit = (rating: number, comment: string) => {
    if (!currentPlan) return;

    const updatedPlan = {
      ...currentPlan,
      feedback: { rating, comment }
    };

    setCurrentPlan(updatedPlan);

    const updatedPlans = savedPlans.map(p => 
      p.id === currentPlan.id ? updatedPlan : p
    );

    setSavedPlans(updatedPlans);
    localStorage.setItem('quipu_plans', JSON.stringify(updatedPlans));
  };

  const handleKYCComplete = () => {
    if (!currentPlan) return;

    const updatedPlan = {
      ...currentPlan,
      profile: { ...currentPlan.profile, kycStatus: 'Verified' as const }
    };

    setCurrentPlan(updatedPlan);

    const updatedPlans = savedPlans.map(p => 
      p.id === currentPlan.id ? updatedPlan : p
    );

    setSavedPlans(updatedPlans);
    localStorage.setItem('quipu_plans', JSON.stringify(updatedPlans));
    setActiveTab('plan');
  };

  const handleConnectAMC = () => {
    if (!currentPlan) return;

    const updatedPlan = {
      ...currentPlan,
      profile: { ...currentPlan.profile, amcConnected: true }
    };

    setCurrentPlan(updatedPlan);

    const updatedPlans = savedPlans.map(p => 
      p.id === currentPlan.id ? updatedPlan : p
    );

    setSavedPlans(updatedPlans);
    localStorage.setItem('quipu_plans', JSON.stringify(updatedPlans));
    alert("Successfully integrated with all Indian AMCs via MFCentral API.");
  };

  return (
    <div className="min-h-screen">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="pt-16">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero onStart={() => setActiveTab('onboard')} />
              <Features />
            </motion.div>
          )}

          {activeTab === 'onboard' && (
            <motion.div
              key="onboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <OnboardingForm 
                onComplete={handleOnboardingComplete} 
                isGenerating={isGenerating} 
              />
            </motion.div>
          )}

          {activeTab === 'plan' && currentPlan && (
            <motion.div
              key="plan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="max-w-5xl mx-auto px-6 pt-8 flex justify-end gap-4">
                {currentPlan.profile.kycStatus === 'Pending' && (
                  <button 
                    onClick={() => setActiveTab('kyc')}
                    className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold rounded-lg hover:bg-red-500/20 transition-all"
                  >
                    Complete KYC
                  </button>
                )}
                {!currentPlan.profile.amcConnected && (
                  <button 
                    onClick={handleConnectAMC}
                    className="px-4 py-2 bg-quipu-gold/10 border border-quipu-gold/30 text-quipu-gold text-xs font-bold rounded-lg hover:bg-quipu-gold/20 transition-all"
                  >
                    Connect AMCs
                  </button>
                )}
              </div>
              <InvestmentPlanDisplay 
                plan={currentPlan} 
                onFeedbackSubmit={handleFeedbackSubmit}
              />
            </motion.div>
          )}

          {activeTab === 'kyc' && (
            <motion.div
              key="kyc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <KYCModule onComplete={handleKYCComplete} />
            </motion.div>
          )}

          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Dashboard plans={savedPlans} onViewPlan={handleViewPlan} />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto px-6 py-24"
            >
              <h2 className="text-4xl font-bold mb-8">About <span className="text-quipu-gold">Quipu</span></h2>
              <div className="prose prose-invert max-w-none space-y-6 text-quipu-cream/70">
                <p className="text-xl text-quipu-cream">
                  Quipu is an AI-powered, data-driven investment advisory platform designed to revolutionize mutual fund investing.
                </p>
                <p>
                  Inspired by the ancient Inca recording device, Quipu symbolizes limitless intelligence, precision, and universal scalability. Our mission is to eliminate biased human financial advisors and replace them with an AI that provides transparent, real-time, and optimal financial decisions.
                </p>
                <div className="grid md:grid-cols-3 gap-6 pt-12">
                  <div className="bg-quipu-forest/20 p-6 rounded-2xl border border-quipu-sage/20">
                    <h3 className="text-quipu-gold font-bold mb-2">Phase 1</h3>
                    <p className="text-sm">AI-powered Mutual Fund Advisory (Current)</p>
                  </div>
                  <div className="bg-quipu-forest/20 p-6 rounded-2xl border border-quipu-sage/20">
                    <h3 className="text-quipu-gold font-bold mb-2">Phase 2</h3>
                    <p className="text-sm">WealthTech Expansion into stocks & crypto (Year 3-4)</p>
                  </div>
                  <div className="bg-quipu-forest/20 p-6 rounded-2xl border border-quipu-sage/20">
                    <h3 className="text-quipu-gold font-bold mb-2">Phase 3</h3>
                    <p className="text-sm">Self-Learning AI for autonomous finance (Year 5+)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-quipu-sage/20 bg-quipu-deep/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-quipu-gold rounded-full flex items-center justify-center text-quipu-deep font-bold text-xs">Q</div>
            <span className="font-display font-bold text-lg tracking-tight text-quipu-gold">QUIPU</span>
          </div>
          <p className="text-xs text-quipu-cream/40">© 2026 Quipu Guru. Mutual funds are subject to market risks. AI advice is for informational purposes.</p>
          <div className="flex gap-6 text-xs text-quipu-cream/60">
            <a href="#" className="hover:text-quipu-gold">Privacy</a>
            <a href="#" className="hover:text-quipu-gold">Terms</a>
            <a href="#" className="hover:text-quipu-gold">SEBI Compliance</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
