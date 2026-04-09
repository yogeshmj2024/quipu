import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Zap, TrendingUp } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-quipu-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-quipu-sage/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-quipu-sage/20 border border-quipu-sage/30 text-quipu-gold text-xs font-bold tracking-widest uppercase mb-6">
            <Zap size={14} />
            The AI Guru for Smarter Investments
          </div>
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
            Wealth that <span className="text-quipu-gold italic">evolves</span> with you.
          </h1>
          <p className="text-lg text-quipu-cream/60 mb-8 max-w-lg leading-relaxed">
            Quipu is a self-learning AI designed to eliminate bias and provide transparent, data-driven financial intelligence for your mutual fund portfolio.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onStart}
              className="px-8 py-4 bg-quipu-gold text-quipu-deep font-bold rounded-lg flex items-center gap-2 hover:bg-quipu-gold/90 transition-all active:scale-95 shadow-lg shadow-quipu-gold/20"
            >
              Start AI Onboarding
              <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 bg-transparent border border-quipu-sage/50 text-quipu-cream font-bold rounded-lg hover:bg-quipu-sage/10 transition-all">
              Explore Strategy
            </button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-quipu-gold mb-1">₹49L Cr</div>
              <div className="text-xs text-quipu-cream/40 uppercase tracking-wider">Market Potential</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-quipu-gold mb-1">100%</div>
              <div className="text-xs text-quipu-cream/40 uppercase tracking-wider">Data Driven</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-quipu-gold mb-1">0%</div>
              <div className="text-xs text-quipu-cream/40 uppercase tracking-wider">Human Bias</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 bg-quipu-forest/40 backdrop-blur-xl border border-quipu-sage/30 p-8 rounded-3xl shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-quipu-gold rounded-full flex items-center justify-center text-quipu-deep font-bold">Q</div>
                <div>
                  <div className="font-bold">AI Portfolio Analysis</div>
                  <div className="text-xs text-quipu-cream/40">Real-time Optimization</div>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-quipu-gold/10 text-quipu-gold text-[10px] font-bold uppercase">Active</div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-quipu-cream/60">Risk Tolerance</span>
                  <span className="text-quipu-gold">Moderate-Aggressive</span>
                </div>
                <div className="h-2 bg-quipu-deep rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-quipu-gold" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-quipu-deep/50 p-4 rounded-xl border border-quipu-sage/20">
                  <div className="text-[10px] text-quipu-cream/40 uppercase mb-1">Expected Return</div>
                  <div className="text-xl font-bold text-quipu-gold">+18.4%</div>
                </div>
                <div className="bg-quipu-deep/50 p-4 rounded-xl border border-quipu-sage/20">
                  <div className="text-[10px] text-quipu-cream/40 uppercase mb-1">Volatility Score</div>
                  <div className="text-xl font-bold text-quipu-gold">Low</div>
                </div>
              </div>

              <div className="pt-4 border-t border-quipu-sage/20">
                <div className="text-xs text-quipu-cream/60 mb-3 italic">"Based on current market sentiment and your long-term goals, I recommend increasing exposure to Small-cap funds by 5%."</div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-quipu-gold">
                  <ShieldCheck size={12} />
                  AI JUSTIFICATION VERIFIED
                </div>
              </div>
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-quipu-gold/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-quipu-sage/20 rounded-full blur-2xl animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
