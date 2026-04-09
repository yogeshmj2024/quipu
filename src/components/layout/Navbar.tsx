import React from 'react';
import { motion } from 'motion/react';
import { Compass, LayoutDashboard, UserPlus, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'onboard', label: 'Onboard', icon: UserPlus },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-quipu-deep/80 backdrop-blur-md border-b border-quipu-sage/30 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setActiveTab('home')}
        >
          <div className="w-8 h-8 bg-quipu-gold rounded-full flex items-center justify-center">
            <span className="text-quipu-deep font-bold text-lg">Q</span>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-quipu-gold">QUIPU</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors relative py-2",
                activeTab === tab.id ? "text-quipu-gold" : "text-quipu-cream/60 hover:text-quipu-cream"
              )}
            >
              <tab.icon size={16} />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-quipu-gold"
                />
              )}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setActiveTab('onboard')}
          className="bg-quipu-gold text-quipu-deep px-4 py-2 rounded-md text-sm font-bold hover:bg-quipu-gold/90 transition-transform active:scale-95"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}
