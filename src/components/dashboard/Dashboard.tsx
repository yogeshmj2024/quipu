import React from 'react';
import { motion } from 'motion/react';
import { InvestmentPlan } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { Calendar, TrendingUp, ArrowUpRight, User } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DashboardProps {
  plans: InvestmentPlan[];
  onViewPlan: (plan: InvestmentPlan) => void;
}

export default function Dashboard({ plans, onViewPlan }: DashboardProps) {
  if (plans.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="w-20 h-20 bg-quipu-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="text-quipu-gold" size={32} />
        </div>
        <h2 className="text-3xl font-bold mb-4">No Investment Plans Yet</h2>
        <p className="text-quipu-cream/60 mb-8 max-w-md mx-auto">
          Start your journey by completing the AI onboarding to generate your first personalized investment strategy.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-bold mb-2">Your <span className="text-quipu-gold">Intelligence</span> Hub</h2>
          <p className="text-quipu-cream/60">Manage your AI-generated investment strategies and portfolio insights.</p>
        </div>
        <div className="hidden md:grid grid-cols-2 gap-4">
          <div className="bg-quipu-forest/20 border border-quipu-sage/20 p-4 rounded-2xl">
            <div className="text-[10px] text-quipu-cream/40 uppercase mb-1">Total Strategies</div>
            <div className="text-2xl font-bold text-quipu-gold">{plans.length}</div>
          </div>
          <div className="bg-quipu-forest/20 border border-quipu-sage/20 p-4 rounded-2xl">
            <div className="text-[10px] text-quipu-cream/40 uppercase mb-1">Active AI Nodes</div>
            <div className="text-2xl font-bold text-quipu-gold">4</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => onViewPlan(plan)}
            className="group bg-quipu-forest/20 border border-quipu-sage/20 p-6 rounded-3xl hover:border-quipu-gold/50 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="text-quipu-gold" size={20} />
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-quipu-gold rounded-full flex items-center justify-center text-quipu-deep font-bold">
                {plan.profile.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold">{plan.profile.name}</h3>
                <div className="text-[10px] text-quipu-cream/40 uppercase">{new Date(plan.timestamp).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-quipu-cream/40">Risk Profile</span>
                <span className="text-quipu-gold font-medium">{plan.profile.riskAppetite}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-quipu-cream/40">KYC Status</span>
                <span className={cn(
                  "font-medium",
                  plan.profile.kycStatus === 'Verified' ? "text-quipu-sage" : "text-red-400"
                )}>
                  {plan.profile.kycStatus}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-quipu-cream/40">AMC Link</span>
                <span className={cn(
                  "font-medium",
                  plan.profile.amcConnected ? "text-quipu-sage" : "text-quipu-cream/40"
                )}>
                  {plan.profile.amcConnected ? "Connected" : "Not Linked"}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-quipu-sage/10 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[10px] font-bold text-quipu-sage uppercase">
                <TrendingUp size={12} />
                {plan.recommendations.length} Funds
              </div>
              <div className="text-[10px] font-bold text-quipu-gold uppercase">View Strategy</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
