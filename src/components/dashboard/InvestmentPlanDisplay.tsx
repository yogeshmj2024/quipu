import React from 'react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { InvestmentPlan } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { TrendingUp, ShieldCheck, Info, ArrowRight, User, Database, Percent } from 'lucide-react';
import FeedbackForm from './FeedbackForm';

interface PlanDisplayProps {
  plan: InvestmentPlan;
  onFeedbackSubmit?: (rating: number, comment: string) => void;
}

const COLORS = ['#C9A84C', '#2D5A47', '#4A8B6F', '#1A3A2F', '#0D1F1A'];

export default function InvestmentPlanDisplay({ plan, onFeedbackSubmit }: PlanDisplayProps) {
  const chartData = plan.recommendations.map(r => ({
    name: r.category,
    value: r.allocation
  }));

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="space-y-2">
          <div className="text-quipu-gold font-mono text-sm uppercase tracking-widest">AI Generated Strategy</div>
          <h2 className="text-4xl font-bold">Investment Roadmap for {plan.profile.name}</h2>
          <p className="text-quipu-cream/60 max-w-2xl">{plan.summary}</p>
        </div>
        <div className="bg-quipu-gold/10 border border-quipu-gold/20 p-4 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-quipu-gold rounded-full flex items-center justify-center text-quipu-deep font-bold">Q</div>
          <div>
            <div className="text-[10px] text-quipu-gold font-bold uppercase">AI Trust Score</div>
            <div className="text-xl font-bold">98.4%</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-quipu-forest/20 border border-quipu-sage/20 rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="text-quipu-gold" size={20} />
              Fund Recommendations
            </h3>
            <div className="space-y-6">
              {plan.recommendations.map((fund, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 bg-quipu-deep/40 rounded-2xl border border-quipu-sage/10 hover:border-quipu-gold/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-xs text-quipu-gold font-bold uppercase mb-1">{fund.category}</div>
                      <h4 className="text-lg font-bold">{fund.name}</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-quipu-gold">{fund.allocation}%</div>
                      <div className="text-[10px] text-quipu-cream/40 uppercase">Allocation</div>
                    </div>
                  </div>
                  <p className="text-sm text-quipu-cream/60 mb-6 italic">"{fund.justification}"</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 p-4 bg-quipu-forest/10 rounded-xl border border-quipu-sage/5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-quipu-gold font-bold uppercase tracking-wider">
                        <User size={12} /> Manager
                      </div>
                      <div className="text-sm font-medium text-quipu-cream">{fund.fundManager}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-quipu-gold font-bold uppercase tracking-wider">
                        <Database size={12} /> AUM
                      </div>
                      <div className="text-sm font-medium text-quipu-cream">{fund.aum}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-quipu-gold font-bold uppercase tracking-wider">
                        <Percent size={12} /> Exp. Ratio
                      </div>
                      <div className="text-sm font-medium text-quipu-cream">{fund.expenseRatio}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1 text-quipu-sage">
                      <TrendingUp size={14} />
                      Exp. Return: {fund.expectedReturn}%
                    </div>
                    <div className="flex items-center gap-1 text-quipu-gold">
                      <ShieldCheck size={14} />
                      AI Verified
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {onFeedbackSubmit && (
            <FeedbackForm 
              onSubmit={onFeedbackSubmit} 
              existingFeedback={plan.feedback}
            />
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-quipu-forest/20 border border-quipu-sage/20 rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-6">Asset Allocation</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0D1F1A', border: '1px solid #2D5A47', borderRadius: '8px' }}
                    itemStyle={{ color: '#F5F0E8' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {chartData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="text-quipu-cream/60">{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-quipu-gold text-quipu-deep p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-4">Next Steps</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <div className="w-6 h-6 bg-quipu-deep text-quipu-gold rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</div>
                <p className="text-sm font-medium">Complete your KYC verification in the dashboard.</p>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-6 h-6 bg-quipu-deep text-quipu-gold rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</div>
                <p className="text-sm font-medium">Link your bank account for seamless SIP execution.</p>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-6 h-6 bg-quipu-deep text-quipu-gold rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</div>
                <p className="text-sm font-medium">Authorize the AI to start the initial allocation.</p>
              </li>
            </ul>
            <button className="w-full mt-8 py-4 bg-quipu-deep text-quipu-gold font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-quipu-forest transition-all">
              Execute Strategy <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
