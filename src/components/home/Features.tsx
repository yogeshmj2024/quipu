import React from 'react';
import { motion } from 'motion/react';
import { Brain, Target, BarChart3, Shield, Cpu, Globe } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "AI Justification Engine",
    description: "Every recommendation comes with a detailed data-backed explanation. No more black-box advice."
  },
  {
    icon: Target,
    title: "Dynamic Optimization",
    description: "AI continuously monitors market conditions and adjusts your portfolio allocations in real-time."
  },
  {
    icon: BarChart3,
    title: "Deep Learning Models",
    description: "Advanced forecasting models predict fund performance and risk factors with high precision."
  },
  {
    icon: Shield,
    title: "Zero Bias",
    description: "No commissions, no hidden agendas. Only pure, data-driven decisions optimized for your goals."
  },
  {
    icon: Cpu,
    title: "Self-Learning AI",
    description: "Our core engine evolves, training itself on global financial topics to perform autonomous tasks."
  },
  {
    icon: Globe,
    title: "Universal Scalability",
    description: "From mutual funds to stocks and crypto, Quipu scales across all financial asset classes."
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-quipu-deep relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">The Technology of <span className="text-quipu-gold">Intelligence</span></h2>
          <p className="text-quipu-cream/60 max-w-2xl mx-auto">
            Quipu leverages state-of-the-art machine learning to revolutionize how you interact with your wealth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-quipu-forest/20 border border-quipu-sage/20 hover:border-quipu-gold/30 transition-all group"
            >
              <div className="w-12 h-12 bg-quipu-gold/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="text-quipu-gold" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-sm text-quipu-cream/50 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
