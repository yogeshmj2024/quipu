import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  TrendingUp, 
  Target, 
  Coins, 
  ArrowRight,
  Info,
  ArrowUpCircle,
  RefreshCw,
  ArrowRightCircle,
  ArrowDownCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#C9A84C', '#2D5A47'];

type CalcType = 'sip' | 'lumpsum' | 'goal' | 'stepup' | 'swing' | 'stp' | 'swp' | 'mfd';

export default function Calculators() {
  const [calcType, setCalcType] = useState<CalcType>('sip');
  
  // SIP State
  const [monthlySip, setMonthlySip] = useState(5000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(10);

  // Lumpsum State
  const [lumpsumAmount, setLumpsumAmount] = useState(100000);
  const [lumpsumRate, setLumpsumRate] = useState(12);
  const [lumpsumYears, setLumpsumYears] = useState(10);

  // Goal State
  const [targetAmount, setTargetAmount] = useState(1000000);
  const [goalRate, setGoalRate] = useState(12);
  const [goalYears, setGoalYears] = useState(10);

  // Step-up State
  const [stepUpSip, setStepUpSip] = useState(5000);
  const [stepUpPercent, setStepUpPercent] = useState(10);
  const [stepUpRate, setStepUpRate] = useState(12);
  const [stepUpYears, setStepUpYears] = useState(10);

  // Swing State (Simplified Value Averaging)
  const [swingSip, setSwingSip] = useState(5000);
  const [swingTargetRate, setSwingTargetRate] = useState(12);
  const [swingYears, setSwingYears] = useState(10);

  const swingData = useMemo(() => {
    const data = [];
    let totalInvested = 0;
    let currentValue = 0;
    const monthlyTargetRate = swingTargetRate / 100 / 12;
    const actualMonthlyRate = (swingTargetRate + 2) / 100 / 12; // Assume slightly better performance for visualization

    for (let i = 0; i <= swingYears; i++) {
      if (i > 0) {
        for (let m = 0; m < 12; m++) {
          const monthIndex = (i - 1) * 12 + m + 1;
          // Target value based on constant growth
          const targetValue = swingSip * ((Math.pow(1 + monthlyTargetRate, monthIndex) - 1) / monthlyTargetRate);
          
          // Investment needed to reach target
          const investmentNeeded = Math.max(swingSip * 0.5, Math.min(swingSip * 2, targetValue - currentValue));
          
          totalInvested += investmentNeeded;
          currentValue = (currentValue + investmentNeeded) * (1 + actualMonthlyRate);
        }
      }
      data.push({
        year: i,
        invested: Math.round(totalInvested),
        wealth: Math.round(currentValue),
        returns: Math.round(currentValue - totalInvested)
      });
    }
    return data;
  }, [swingSip, swingTargetRate, swingYears]);

  // STP State
  const [stpLumpsum, setStpLumpsum] = useState(500000);
  const [stpTransfer, setStpTransfer] = useState(10000);
  const [stpSourceRate, setStpSourceRate] = useState(6);
  const [stpTargetRate, setStpTargetRate] = useState(12);
  const [stpYears, setStpYears] = useState(5);

  // SWP State
  const [swpLumpsum, setSwpLumpsum] = useState(1000000);
  const [swpWithdrawal, setSwpWithdrawal] = useState(8000);
  const [swpRate, setSwpRate] = useState(8);
  const [swpYears, setSwpYears] = useState(15);

  // MFD State
  const [mfdAum, setMfdAum] = useState(10000000); // 1 Cr
  const [mfdCommission, setMfdCommission] = useState(0.75);
  const [mfdGrowth, setMfdGrowth] = useState(15); // Annual AUM growth

  const mfdData = useMemo(() => {
    const data = [];
    let currentAum = mfdAum;
    const growthRate = mfdGrowth / 100;
    const commRate = mfdCommission / 100;

    for (let i = 0; i <= 10; i++) {
      const annualRevenue = currentAum * commRate;
      data.push({
        year: i,
        aum: Math.round(currentAum),
        revenue: Math.round(annualRevenue),
        monthly: Math.round(annualRevenue / 12)
      });
      currentAum = currentAum * (1 + growthRate);
    }
    return data;
  }, [mfdAum, mfdCommission, mfdGrowth]);

  const sipData = useMemo(() => {
    const data = [];
    let totalInvested = 0;
    let currentValue = 0;
    const monthlyRate = sipRate / 100 / 12;

    for (let i = 0; i <= sipYears; i++) {
      if (i > 0) {
        for (let m = 0; m < 12; m++) {
          totalInvested += monthlySip;
          currentValue = (currentValue + monthlySip) * (1 + monthlyRate);
        }
      }
      data.push({
        year: i,
        invested: totalInvested,
        wealth: Math.round(currentValue),
        returns: Math.round(currentValue - totalInvested)
      });
    }
    return data;
  }, [monthlySip, sipRate, sipYears]);

  const lumpsumData = useMemo(() => {
    const data = [];
    const rate = lumpsumRate / 100;
    for (let i = 0; i <= lumpsumYears; i++) {
      const wealth = Math.round(lumpsumAmount * Math.pow(1 + rate, i));
      data.push({
        year: i,
        invested: lumpsumAmount,
        wealth: wealth,
        returns: wealth - lumpsumAmount
      });
    }
    return data;
  }, [lumpsumAmount, lumpsumRate, lumpsumYears]);

  const stepUpData = useMemo(() => {
    const data = [];
    let totalInvested = 0;
    let currentValue = 0;
    let currentSip = stepUpSip;
    const monthlyRate = stepUpRate / 100 / 12;

    for (let i = 0; i <= stepUpYears; i++) {
      if (i > 0) {
        for (let m = 0; m < 12; m++) {
          totalInvested += currentSip;
          currentValue = (currentValue + currentSip) * (1 + monthlyRate);
        }
        currentSip = currentSip * (1 + stepUpPercent / 100);
      }
      data.push({
        year: i,
        invested: totalInvested,
        wealth: Math.round(currentValue),
        returns: Math.round(currentValue - totalInvested)
      });
    }
    return data;
  }, [stepUpSip, stepUpPercent, stepUpRate, stepUpYears]);

  const stpData = useMemo(() => {
    const data = [];
    let sourceValue = stpLumpsum;
    let targetValue = 0;
    const sourceMonthlyRate = stpSourceRate / 100 / 12;
    const targetMonthlyRate = stpTargetRate / 100 / 12;

    for (let i = 0; i <= stpYears; i++) {
      if (i > 0) {
        for (let m = 0; m < 12; m++) {
          if (sourceValue >= stpTransfer) {
            sourceValue -= stpTransfer;
            targetValue += stpTransfer;
          } else {
            targetValue += sourceValue;
            sourceValue = 0;
          }
          sourceValue = sourceValue * (1 + sourceMonthlyRate);
          targetValue = targetValue * (1 + targetMonthlyRate);
        }
      }
      data.push({
        year: i,
        source: Math.round(sourceValue),
        target: Math.round(targetValue),
        wealth: Math.round(sourceValue + targetValue)
      });
    }
    return data;
  }, [stpLumpsum, stpTransfer, stpSourceRate, stpTargetRate, stpYears]);

  const swpData = useMemo(() => {
    const data = [];
    let currentValue = swpLumpsum;
    let totalWithdrawn = 0;
    const monthlyRate = swpRate / 100 / 12;

    for (let i = 0; i <= swpYears; i++) {
      if (i > 0) {
        for (let m = 0; m < 12; m++) {
          if (currentValue >= swpWithdrawal) {
            currentValue -= swpWithdrawal;
            totalWithdrawn += swpWithdrawal;
          } else {
            totalWithdrawn += currentValue;
            currentValue = 0;
          }
          currentValue = currentValue * (1 + monthlyRate);
        }
      }
      data.push({
        year: i,
        wealth: Math.round(currentValue),
        withdrawn: totalWithdrawn
      });
    }
    return data;
  }, [swpLumpsum, swpWithdrawal, swpRate, swpYears]);

  const goalRequiredSip = useMemo(() => {
    const r = goalRate / 100 / 12;
    const n = goalYears * 12;
    const sip = (targetAmount * r) / (Math.pow(1 + r, n + 1) - (1 + r));
    return Math.round(Math.abs(sip));
  }, [targetAmount, goalRate, goalYears]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const getChartData = () => {
    switch (calcType) {
      case 'sip': return sipData;
      case 'lumpsum': return lumpsumData;
      case 'stepup': return stepUpData;
      case 'swing': return swingData;
      case 'stp': return stpData;
      case 'swp': return swpData;
      case 'mfd': return mfdData;
      default: return sipData;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-24 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Wealth <span className="text-quipu-gold">Calculators</span></h2>
        <p className="text-quipu-cream/60 max-w-2xl mx-auto">
          Visualize your financial future with our high-precision growth models.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {[
          { id: 'sip', label: 'SIP', icon: Coins },
          { id: 'stepup', label: 'Step-up SIP', icon: ArrowUpCircle },
          { id: 'swing', label: 'Swing SIP', icon: RefreshCw },
          { id: 'lumpsum', label: 'Lumpsum', icon: TrendingUp },
          { id: 'goal', label: 'Goal Planner', icon: Target },
          { id: 'stp', label: 'STP', icon: ArrowRightCircle },
          { id: 'swp', label: 'SWP', icon: ArrowDownCircle },
          { id: 'mfd', label: 'MFD Revenue', icon: Calculator },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCalcType(tab.id as any)}
            className={cn(
              "px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2 border",
              calcType === tab.id 
                ? "bg-quipu-gold text-quipu-deep border-quipu-gold" 
                : "bg-quipu-forest/20 text-quipu-cream/60 border-quipu-sage/20 hover:bg-quipu-forest/40"
            )}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="bg-quipu-forest/10 border border-quipu-sage/20 rounded-[40px] p-8 space-y-8">
          {calcType === 'sip' && (
            <>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Monthly SIP</span>
                  <span>{formatCurrency(monthlySip)}</span>
                </div>
                <input 
                  type="range" min="500" max="100000" step="500" 
                  value={monthlySip} onChange={(e) => setMonthlySip(parseInt(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Expected Return</span>
                  <span>{sipRate}%</span>
                </div>
                <input 
                  type="range" min="1" max="30" step="0.5" 
                  value={sipRate} onChange={(e) => setSipRate(parseFloat(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Time Period</span>
                  <span>{sipYears} Years</span>
                </div>
                <input 
                  type="range" min="1" max="40" 
                  value={sipYears} onChange={(e) => setSipYears(parseInt(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
            </>
          )}

          {calcType === 'stepup' && (
            <>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Initial SIP</span>
                  <span>{formatCurrency(stepUpSip)}</span>
                </div>
                <input 
                  type="range" min="500" max="100000" step="500" 
                  value={stepUpSip} onChange={(e) => setStepUpSip(parseInt(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Annual Step-up</span>
                  <span>{stepUpPercent}%</span>
                </div>
                <input 
                  type="range" min="1" max="50" 
                  value={stepUpPercent} onChange={(e) => setStepUpPercent(parseInt(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Expected Return</span>
                  <span>{stepUpRate}%</span>
                </div>
                <input 
                  type="range" min="1" max="30" step="0.5" 
                  value={stepUpRate} onChange={(e) => setStepUpRate(parseFloat(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Time Period</span>
                  <span>{stepUpYears} Years</span>
                </div>
                <input 
                  type="range" min="1" max="40" 
                  value={stepUpYears} onChange={(e) => setStepUpYears(parseInt(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
            </>
          )}

          {calcType === 'swing' && (
            <>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Base SIP</span>
                  <span>{formatCurrency(swingSip)}</span>
                </div>
                <input 
                  type="range" min="500" max="100000" step="500" 
                  value={swingSip} onChange={(e) => setSwingSip(parseInt(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Target Return</span>
                  <span>{swingTargetRate}%</span>
                </div>
                <input 
                  type="range" min="1" max="30" step="0.5" 
                  value={swingTargetRate} onChange={(e) => setSwingTargetRate(parseFloat(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Time Period</span>
                  <span>{swingYears} Years</span>
                </div>
                <input 
                  type="range" min="1" max="40" 
                  value={swingYears} onChange={(e) => setSwingYears(parseInt(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="p-4 bg-quipu-gold/10 rounded-xl border border-quipu-gold/20">
                <p className="text-[10px] text-quipu-gold leading-relaxed">
                  <span className="font-bold block mb-1">Swing SIP Logic:</span>
                  Adjusts monthly investment to maintain a target portfolio value. Invests more when markets are down and less when markets are up.
                </p>
              </div>
            </>
          )}

          {calcType === 'lumpsum' && (
            <>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Investment</span>
                  <span>{formatCurrency(lumpsumAmount)}</span>
                </div>
                <input 
                  type="range" min="5000" max="10000000" step="5000" 
                  value={lumpsumAmount} onChange={(e) => setLumpsumAmount(parseInt(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Expected Return</span>
                  <span>{lumpsumRate}%</span>
                </div>
                <input 
                  type="range" min="1" max="30" step="0.5" 
                  value={lumpsumRate} onChange={(e) => setLumpsumRate(parseFloat(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Time Period</span>
                  <span>{lumpsumYears} Years</span>
                </div>
                <input 
                  type="range" min="1" max="40" 
                  value={lumpsumYears} onChange={(e) => setLumpsumYears(parseInt(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
            </>
          )}

          {calcType === 'goal' && (
            <>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Target Goal</span>
                  <span>{formatCurrency(targetAmount)}</span>
                </div>
                <input 
                  type="range" min="100000" max="100000000" step="100000" 
                  value={targetAmount} onChange={(e) => setTargetAmount(parseInt(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Expected Return</span>
                  <span>{goalRate}%</span>
                </div>
                <input 
                  type="range" min="1" max="30" step="0.5" 
                  value={goalRate} onChange={(e) => setGoalRate(parseFloat(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Years to Goal</span>
                  <span>{goalYears} Years</span>
                </div>
                <input 
                  type="range" min="1" max="40" 
                  value={goalYears} onChange={(e) => setGoalYears(parseInt(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
            </>
          )}

          {calcType === 'stp' && (
            <>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Lumpsum in Source</span>
                  <span>{formatCurrency(stpLumpsum)}</span>
                </div>
                <input 
                  type="range" min="10000" max="10000000" step="10000" 
                  value={stpLumpsum} onChange={(e) => setStpLumpsum(parseInt(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Monthly Transfer</span>
                  <span>{formatCurrency(stpTransfer)}</span>
                </div>
                <input 
                  type="range" min="500" max="500000" step="500" 
                  value={stpTransfer} onChange={(e) => setStpTransfer(parseInt(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Source Return (Debt)</span>
                  <span>{stpSourceRate}%</span>
                </div>
                <input 
                  type="range" min="1" max="15" step="0.5" 
                  value={stpSourceRate} onChange={(e) => setStpSourceRate(parseFloat(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Target Return (Equity)</span>
                  <span>{stpTargetRate}%</span>
                </div>
                <input 
                  type="range" min="1" max="30" step="0.5" 
                  value={stpTargetRate} onChange={(e) => setStpTargetRate(parseFloat(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Time Period</span>
                  <span>{stpYears} Years</span>
                </div>
                <input 
                  type="range" min="1" max="40" 
                  value={stpYears} onChange={(e) => setStpYears(parseInt(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
            </>
          )}

          {calcType === 'swp' && (
            <>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Total Investment</span>
                  <span>{formatCurrency(swpLumpsum)}</span>
                </div>
                <input 
                  type="range" min="10000" max="50000000" step="10000" 
                  value={swpLumpsum} onChange={(e) => setSwpLumpsum(parseInt(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Monthly Withdrawal</span>
                  <span>{formatCurrency(swpWithdrawal)}</span>
                </div>
                <input 
                  type="range" min="500" max="500000" step="500" 
                  value={swpWithdrawal} onChange={(e) => setSwpWithdrawal(parseInt(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Expected Return</span>
                  <span>{swpRate}%</span>
                </div>
                <input 
                  type="range" min="1" max="20" step="0.5" 
                  value={swpRate} onChange={(e) => setSwpRate(parseFloat(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Time Period</span>
                  <span>{swpYears} Years</span>
                </div>
                <input 
                  type="range" min="1" max="40" 
                  value={swpYears} onChange={(e) => setSwpYears(parseInt(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
            </>
          )}

          {calcType === 'mfd' && (
            <>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Total AUM</span>
                  <span>{formatCurrency(mfdAum)}</span>
                </div>
                <input 
                  type="range" min="1000000" max="1000000000" step="1000000" 
                  value={mfdAum} onChange={(e) => setMfdAum(parseInt(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Avg. Commission</span>
                  <span>{mfdCommission}%</span>
                </div>
                <input 
                  type="range" min="0.1" max="2" step="0.05" 
                  value={mfdCommission} onChange={(e) => setMfdCommission(parseFloat(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-quipu-gold">
                  <span>Annual AUM Growth</span>
                  <span>{mfdGrowth}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" 
                  value={mfdGrowth} onChange={(e) => setMfdGrowth(parseInt(e.target.value))}
                  className="w-full accent-quipu-gold"
                />
              </div>
              <div className="p-4 bg-quipu-gold/10 rounded-xl border border-quipu-gold/20">
                <p className="text-[10px] text-quipu-gold leading-relaxed">
                  <span className="font-bold block mb-1">MFD Revenue Logic:</span>
                  Calculates your trail commission based on total AUM and projected growth over 10 years.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Visualization */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-quipu-forest/10 border border-quipu-sage/20 rounded-[40px] p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold">Growth Projection</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-quipu-sage" />
                  <span className="text-[10px] font-bold uppercase text-quipu-cream/40">
                    {calcType === 'swp' ? 'Withdrawn' : calcType === 'stp' ? 'Source Fund' : calcType === 'mfd' ? 'AUM' : 'Invested'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-quipu-gold" />
                  <span className="text-[10px] font-bold uppercase text-quipu-cream/40">
                    {calcType === 'swp' ? 'Remaining Wealth' : calcType === 'stp' ? 'Target Fund' : calcType === 'mfd' ? 'Revenue' : 'Wealth'}
                  </span>
                </div>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getChartData()}>
                  <defs>
                    <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#C9A84C" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" stroke="#F5F0E820" fontSize={10} />
                  <YAxis 
                    stroke="#F5F0E820" 
                    fontSize={10} 
                    tickFormatter={(val) => `₹${(val/100000).toFixed(1)}L`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0D1F1A', border: '1px solid #2D5A47', borderRadius: '12px' }}
                    formatter={(val: number) => [formatCurrency(val), '']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey={calcType === 'swp' ? 'withdrawn' : calcType === 'stp' ? 'source' : calcType === 'mfd' ? 'aum' : 'invested'} 
                    stroke="#2D5A47" 
                    fill="#2D5A47" 
                    fillOpacity={0.1} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey={calcType === 'stp' ? 'target' : calcType === 'mfd' ? 'revenue' : 'wealth'} 
                    stroke="#C9A84C" 
                    fillOpacity={1} 
                    fill="url(#colorWealth)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="p-4 bg-quipu-deep/40 rounded-2xl border border-quipu-sage/10">
                <div className="text-[10px] text-quipu-cream/40 font-bold uppercase mb-1">
                  {calcType === 'swp' ? 'Total Withdrawn' : calcType === 'stp' ? 'Initial Lumpsum' : 'Total Invested'}
                </div>
                <div className="text-lg font-bold">
                  {calcType === 'sip' ? formatCurrency(sipData[sipData.length-1].invested) : 
                   calcType === 'stepup' ? formatCurrency(stepUpData[stepUpData.length-1].invested) :
                   calcType === 'swing' ? formatCurrency(swingData[swingData.length-1].invested) :
                   calcType === 'lumpsum' ? formatCurrency(lumpsumAmount) :
                   calcType === 'stp' ? formatCurrency(stpLumpsum) :
                   calcType === 'swp' ? formatCurrency(swpData[swpData.length-1].withdrawn) :
                   calcType === 'mfd' ? formatCurrency(mfdData[mfdData.length-1].aum) :
                   formatCurrency(0)}
                </div>
              </div>
              <div className="p-4 bg-quipu-deep/40 rounded-2xl border border-quipu-sage/10">
                <div className="text-[10px] text-quipu-gold font-bold uppercase mb-1">
                  {calcType === 'swp' ? 'Remaining Value' : calcType === 'stp' ? 'Target Value' : calcType === 'mfd' ? 'Annual Revenue' : 'Est. Returns'}
                </div>
                <div className="text-lg font-bold text-quipu-gold">
                  {calcType === 'sip' ? formatCurrency(sipData[sipData.length-1].returns) : 
                   calcType === 'stepup' ? formatCurrency(stepUpData[stepUpData.length-1].returns) :
                   calcType === 'swing' ? formatCurrency(swingData[swingData.length-1].returns) :
                   calcType === 'lumpsum' ? formatCurrency(lumpsumData[lumpsumData.length-1].returns) :
                   calcType === 'stp' ? formatCurrency(stpData[stpData.length-1].target) :
                   calcType === 'swp' ? formatCurrency(swpData[swpData.length-1].wealth) :
                   calcType === 'mfd' ? formatCurrency(mfdData[mfdData.length-1].revenue) :
                   formatCurrency(0)}
                </div>
              </div>
              <div className="p-4 bg-quipu-deep/40 rounded-2xl border border-quipu-sage/10">
                <div className="text-[10px] text-quipu-cream/40 font-bold uppercase mb-1">
                  {calcType === 'stp' ? 'Total Portfolio' : calcType === 'mfd' ? 'Monthly Revenue' : 'Total Value'}
                </div>
                <div className="text-lg font-bold">
                  {calcType === 'sip' ? formatCurrency(sipData[sipData.length-1].wealth) : 
                   calcType === 'stepup' ? formatCurrency(stepUpData[stepUpData.length-1].wealth) :
                   calcType === 'swing' ? formatCurrency(swingData[swingData.length-1].wealth) :
                   calcType === 'lumpsum' ? formatCurrency(lumpsumData[lumpsumData.length-1].wealth) :
                   calcType === 'stp' ? formatCurrency(stpData[stpData.length-1].wealth) :
                   calcType === 'swp' ? formatCurrency(swpData[swpData.length-1].wealth + swpData[swpData.length-1].withdrawn) :
                   calcType === 'mfd' ? formatCurrency(mfdData[mfdData.length-1].monthly) :
                   formatCurrency(0)}
                </div>
              </div>
            </div>
          </div>

          {calcType === 'goal' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-quipu-gold text-quipu-deep p-8 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Goal Roadmap</h3>
                <p className="text-quipu-deep/60 text-sm">To reach {formatCurrency(targetAmount)} in {goalYears} years at {goalRate}% returns:</p>
              </div>
              <div className="text-center md:text-right">
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1">Required Monthly SIP</div>
                <div className="text-4xl font-black">{formatCurrency(goalRequiredSip)}</div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
