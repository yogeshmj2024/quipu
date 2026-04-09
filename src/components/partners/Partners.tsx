import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Shield, Briefcase, TrendingUp, Globe } from 'lucide-react';

const partners = [
  {
    name: "CAMS NPS",
    description: "National Pension System (NPS) registration and management via CAMS CRA.",
    url: "https://app.camsnps.in/CRA/auth/enps/register?source=eNPS&users=IPRUP&rm=PFM000029141",
    icon: Shield,
    color: "text-blue-400"
  },
  {
    name: "ZFunds",
    description: "Personalized mutual fund investments and expert financial guidance.",
    url: "https://www.zfunds.in/visiting-card/da1a27e2-7ec5-4e0e-b527-069a21277a13",
    icon: Briefcase,
    color: "text-quipu-gold"
  },
  {
    name: "FundzBazar",
    description: "Comprehensive online platform for mutual funds, insurance, and more.",
    url: "https://fundzbazar.com/Link/CFC5SrvXqvw",
    icon: TrendingUp,
    color: "text-green-400"
  },
  {
    name: "Creso",
    description: "Professional wealth management and distributor services.",
    url: "https://partners.creso.in/mfd/m-j-yogesh",
    icon: Globe,
    color: "text-purple-400"
  }
];

export default function Partners() {
  return (
    <div className="max-w-6xl mx-auto py-24 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">National <span className="text-quipu-gold">Distributor</span> Network</h2>
        <p className="text-quipu-cream/60 max-w-2xl mx-auto">
          Quipu integrates with India's leading financial distributors to ensure seamless execution and management of your wealth across all asset classes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {partners.map((partner, index) => (
          <motion.a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-quipu-forest/10 border border-quipu-sage/20 rounded-3xl p-8 hover:border-quipu-gold/50 transition-all hover:shadow-2xl hover:shadow-quipu-gold/5"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`w-14 h-14 rounded-2xl bg-quipu-deep flex items-center justify-center ${partner.color} border border-quipu-sage/30 group-hover:scale-110 transition-transform`}>
                <partner.icon size={28} />
              </div>
              <div className="p-2 bg-quipu-gold/10 rounded-full text-quipu-gold opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={16} />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-quipu-cream group-hover:text-quipu-gold transition-colors">{partner.name}</h3>
            <p className="text-quipu-cream/40 text-sm leading-relaxed mb-6">
              {partner.description}
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-quipu-gold uppercase tracking-widest">
              Access Platform <ExternalLink size={12} />
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mt-24 p-12 bg-quipu-gold/5 border border-quipu-gold/20 rounded-[40px] text-center">
        <h3 className="text-2xl font-bold mb-4">Seamless Multi-Platform Execution</h3>
        <p className="text-quipu-cream/60 text-sm max-w-xl mx-auto leading-relaxed">
          Our partner network allows you to execute the AI-generated plans directly through official SEBI-registered distributors, ensuring your investments are always secure and compliant.
        </p>
      </div>
    </div>
  );
}
