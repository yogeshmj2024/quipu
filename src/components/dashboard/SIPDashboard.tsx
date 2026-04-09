import React from 'react';
import { motion } from 'motion/react';
import { 
  Coins, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { InvestmentPlan } from '../../types';
import { formatCurrency } from '../../lib/utils';

interface SIPDashboardProps {
  plans: InvestmentPlan[];
}

export default function SIPDashboard({ plans }: SIPDashboardProps) {
  // Filter plans that have recommendations (simulating active SIPs)
  const activeSips = plans.flatMap(plan => 
    plan.recommendations.map(fund => ({
      ...fund,
      planId: plan.id,
      timestamp: plan.timestamp,
      status: 'Active',
      nextInstallment: '15th Apr 2026',
      totalInvested: fund.allocation * 1000, // Mock data
      currentValue: fund.allocation * 1200, // Mock data
    }))
  );

  return (
    <div className="max-w-6xl mx-auto py-24 px-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-bold mb-4">SIP <span className="text-quipu-gold">Command Center</span></h2>
          <p className="text-quipu-cream/60">Manage your recurring wealth engines and track automated growth.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-quipu-forest/20 border border-quipu-sage/20 px-6 py-4 rounded-2xl">
            <div className="text-[10px] text-quipu-gold font-bold uppercase mb-1">Total Monthly SIP</div>
            <div className="text-2xl font-bold">₹45,000</div>
          </div>
          <div className="bg-quipu-forest/20 border border-quipu-sage/20 px-6 py-4 rounded-2xl">
            <div className="text-[10px] text-quipu-gold font-bold uppercase mb-1">Active Mandates</div>
            <div className="text-2xl font-bold">{activeSips.length}</div>
          </div>
        </div>
      </div>

      {activeSips.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeSips.map((sip, idx) => (
            <motion.div
              key={`${sip.planId}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-quipu-forest/10 border border-quipu-sage/20 rounded-3xl p-6 hover:border-quipu-gold/50 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-quipu-gold/10 rounded-2xl flex items-center justify-center text-quipu-gold">
                  <Coins size={24} />
                </div>
                <div className="px-3 py-1 bg-quipu-sage/20 text-quipu-sage text-[10px] font-bold rounded-full uppercase tracking-widest flex items-center gap-1">
                  <CheckCircle2 size={10} /> {sip.status}
                </div>
              </div>

              <div className="mb-6">
                <div className="text-[10px] text-quipu-gold font-bold uppercase mb-1">{sip.category}</div>
                <h3 className="text-lg font-bold text-quipu-cream group-hover:text-quipu-gold transition-colors">{sip.name}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-[10px] text-quipu-cream/40 font-bold uppercase mb-1">Invested</div>
                  <div className="text-sm font-bold">₹{sip.totalInvested.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[10px] text-quipu-cream/40 font-bold uppercase mb-1">Current</div>
                  <div className="text-sm font-bold text-quipu-sage flex items-center gap-1">
                    ₹{sip.currentValue.toLocaleString()}
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-quipu-sage/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-quipu-cream/60">
                  <Calendar size={14} />
                  Next: {sip.nextInstallment}
                </div>
                <button className="text-quipu-gold text-xs font-bold hover:underline">Manage</button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-quipu-forest/5 border border-quipu-sage/10 rounded-[40px] p-24 text-center">
          <div className="w-20 h-20 bg-quipu-gold/10 rounded-full flex items-center justify-center mx-auto text-quipu-gold mb-6">
            <AlertCircle size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-2">No Active SIPs Found</h3>
          <p className="text-quipu-cream/40 max-w-sm mx-auto mb-8">
            You haven't started any automated wealth engines yet. Generate a plan to get started.
          </p>
          <button className="bg-quipu-gold text-quipu-deep px-8 py-3 rounded-xl font-bold hover:bg-quipu-gold/90 transition-transform active:scale-95">
            Create Investment Plan
          </button>
        </div>
      )}
    </div>
  );
}
