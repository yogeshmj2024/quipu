import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, IndianRupee, Target, Calendar, Shield, ArrowRight, Loader2 } from 'lucide-react';
import { UserProfile, RiskAppetite, InvestmentHorizon } from '../../types';
import { cn } from '../../lib/utils';

interface OnboardingFormProps {
  onComplete: (profile: UserProfile) => void;
  isGenerating: boolean;
}

export default function OnboardingForm({ onComplete, isGenerating }: OnboardingFormProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: 30,
    income: 100000,
    expenses: 40000,
    riskAppetite: 'Moderate',
    horizon: 'Medium-term',
    goals: [],
    kycStatus: 'Pending',
    amcConnected: false
  });

  const goalsList = [
    "Retirement", "Child Education", "Home Purchase", 
    "Wealth Creation", "Tax Saving", "Emergency Fund", "Travel"
  ];

  const handleGoalToggle = (goal: string) => {
    setProfile(prev => ({
      ...prev,
      goals: prev.goals.includes(goal) 
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">AI Risk Profiling</h2>
          <span className="text-quipu-gold font-mono text-sm">Step {step} of 3</span>
        </div>
        <div className="h-1 bg-quipu-sage/20 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-quipu-gold"
            initial={{ width: "33%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-quipu-forest/20 border border-quipu-sage/20 p-8 rounded-3xl backdrop-blur-xl">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-quipu-cream/40 flex items-center gap-2">
                <User size={14} /> Full Name
              </label>
              <input 
                type="text" 
                value={profile.name}
                onChange={e => setProfile({...profile, name: e.target.value})}
                placeholder="Enter your name"
                className="w-full bg-quipu-deep/50 border border-quipu-sage/30 rounded-xl px-4 py-3 focus:border-quipu-gold outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-quipu-cream/40 flex items-center gap-2">
                <Calendar size={14} /> Age
              </label>
              <input 
                type="number" 
                value={profile.age}
                onChange={e => setProfile({...profile, age: parseInt(e.target.value)})}
                className="w-full bg-quipu-deep/50 border border-quipu-sage/30 rounded-xl px-4 py-3 focus:border-quipu-gold outline-none transition-colors"
              />
            </div>
            <button 
              onClick={nextStep}
              disabled={!profile.name}
              className="w-full py-4 bg-quipu-gold text-quipu-deep font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              Continue <ArrowRight size={18} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-quipu-cream/40 flex items-center gap-2">
                <IndianRupee size={14} /> Monthly Income
              </label>
              <input 
                type="number" 
                value={profile.income}
                onChange={e => setProfile({...profile, income: parseInt(e.target.value)})}
                className="w-full bg-quipu-deep/50 border border-quipu-sage/30 rounded-xl px-4 py-3 focus:border-quipu-gold outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-quipu-cream/40 flex items-center gap-2">
                <IndianRupee size={14} /> Monthly Expenses
              </label>
              <input 
                type="number" 
                value={profile.expenses}
                onChange={e => setProfile({...profile, expenses: parseInt(e.target.value)})}
                className="w-full bg-quipu-deep/50 border border-quipu-sage/30 rounded-xl px-4 py-3 focus:border-quipu-gold outline-none transition-colors"
              />
            </div>
            <div className="flex gap-4">
              <button onClick={prevStep} className="flex-1 py-4 border border-quipu-sage/30 rounded-xl font-bold">Back</button>
              <button onClick={nextStep} className="flex-1 py-4 bg-quipu-gold text-quipu-deep font-bold rounded-xl">Continue</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-quipu-cream/40 flex items-center gap-2">
                <Shield size={14} /> Risk Appetite
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Conservative', 'Moderate', 'Aggressive'].map(r => (
                  <button
                    key={r}
                    onClick={() => setProfile({...profile, riskAppetite: r as RiskAppetite})}
                    className={cn(
                      "py-3 rounded-xl border text-sm font-medium transition-all",
                      profile.riskAppetite === r ? "bg-quipu-gold border-quipu-gold text-quipu-deep" : "border-quipu-sage/30 text-quipu-cream/60"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-quipu-cream/40 flex items-center gap-2">
                <Target size={14} /> Financial Goals
              </label>
              <div className="flex flex-wrap gap-2">
                {goalsList.map(goal => (
                  <button
                    key={goal}
                    onClick={() => handleGoalToggle(goal)}
                    className={cn(
                      "px-4 py-2 rounded-full border text-xs font-medium transition-all",
                      profile.goals.includes(goal) ? "bg-quipu-sage border-quipu-sage text-white" : "border-quipu-sage/30 text-quipu-cream/60"
                    )}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={prevStep} className="flex-1 py-4 border border-quipu-sage/30 rounded-xl font-bold">Back</button>
              <button 
                onClick={() => onComplete(profile)}
                disabled={isGenerating}
                className="flex-[2] py-4 bg-quipu-gold text-quipu-deep font-bold rounded-xl flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Generating Plan...
                  </>
                ) : (
                  <>
                    Generate AI Plan <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
