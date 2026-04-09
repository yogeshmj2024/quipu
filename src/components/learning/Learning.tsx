import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Trophy, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  RotateCcw,
  GraduationCap,
  TrendingUp,
  Shield,
  PieChart as PieIcon,
  Calculator,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip as RechartsTooltip, 
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';

// --- Interactive Graphics Components ---

const RiskRewardGraphic = () => {
  const data = [
    { name: 'Liquid Funds', risk: 10, reward: 6, color: '#4A8B6F' },
    { name: 'Debt Funds', risk: 30, reward: 8, color: '#2D5A47' },
    { name: 'Hybrid Funds', risk: 50, reward: 11, color: '#C9A84C' },
    { name: 'Large Cap', risk: 70, reward: 13, color: '#C9A84C' },
    { name: 'Mid Cap', risk: 85, reward: 16, color: '#C9A84C' },
    { name: 'Small Cap', risk: 95, reward: 20, color: '#C9A84C' },
  ];

  return (
    <div className="h-64 w-full bg-quipu-deep/30 rounded-2xl p-4 border border-quipu-sage/10">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <XAxis type="number" dataKey="risk" name="Risk" unit="%" stroke="#F5F0E860" fontSize={10} />
          <YAxis type="number" dataKey="reward" name="Reward" unit="%" stroke="#F5F0E860" fontSize={10} />
          <ZAxis type="number" range={[100, 400]} />
          <RechartsTooltip 
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{ backgroundColor: '#0D1F1A', border: '1px solid #C9A84C', borderRadius: '8px', fontSize: '12px' }}
          />
          <Scatter name="Funds" data={data} fill="#C9A84C">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <div className="text-[10px] text-center text-quipu-cream/40 mt-2 uppercase tracking-widest">Interactive Risk-Reward Frontier</div>
    </div>
  );
};

const CompoundingGraphic = () => {
  const [years, setYears] = useState(20);
  
  const data = useMemo(() => {
    const result = [];
    const principal = 10000;
    const rate = 0.12;
    for (let i = 0; i <= years; i++) {
      result.push({
        year: i,
        value: Math.round(principal * Math.pow(1 + rate, i))
      });
    }
    return result;
  }, [years]);

  return (
    <div className="bg-quipu-deep/30 rounded-2xl p-6 border border-quipu-sage/10">
      <div className="flex justify-between items-center mb-6">
        <div className="text-xs font-bold text-quipu-gold uppercase tracking-wider">Time Horizon: {years} Years</div>
        <input 
          type="range" 
          min="5" 
          max="40" 
          value={years} 
          onChange={(e) => setYears(parseInt(e.target.value))}
          className="accent-quipu-gold w-32"
        />
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#C9A84C" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke="#C9A84C" fillOpacity={1} fill="url(#colorValue)" />
            <RechartsTooltip 
              contentStyle={{ backgroundColor: '#0D1F1A', border: '1px solid #C9A84C', borderRadius: '8px', fontSize: '12px' }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Wealth']}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="text-[10px] text-center text-quipu-cream/40 mt-4 uppercase tracking-widest italic">The "Hockey Stick" Effect of Long-term Investing</div>
    </div>
  );
};

const AllocationGraphic = () => {
  const [activeBucket, setActiveBucket] = useState(0);
  const buckets = [
    { name: 'Conservative', equity: 20, debt: 80, desc: 'Capital Protection' },
    { name: 'Balanced', equity: 50, debt: 50, desc: 'Growth with Stability' },
    { name: 'Aggressive', equity: 85, debt: 15, desc: 'Wealth Creation' }
  ];

  return (
    <div className="bg-quipu-deep/30 rounded-2xl p-6 border border-quipu-sage/10">
      <div className="flex gap-2 mb-6">
        {buckets.map((b, i) => (
          <button 
            key={i}
            onClick={() => setActiveBucket(i)}
            className={cn(
              "flex-1 py-2 text-[10px] font-bold rounded-lg border transition-all",
              activeBucket === i ? "bg-quipu-gold text-quipu-deep border-quipu-gold" : "bg-quipu-deep border-quipu-sage/20 text-quipu-cream/40"
            )}
          >
            {b.name}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-quipu-deep rounded-full overflow-hidden flex border border-quipu-sage/10">
          <motion.div 
            animate={{ width: `${buckets[activeBucket].equity}%` }}
            className="h-full bg-quipu-gold"
          />
          <motion.div 
            animate={{ width: `${buckets[activeBucket].debt}%` }}
            className="h-full bg-quipu-sage"
          />
        </div>
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
          <span className="text-quipu-gold">Equity: {buckets[activeBucket].equity}%</span>
          <span className="text-quipu-sage">Debt: {buckets[activeBucket].debt}%</span>
        </div>
        <p className="text-xs text-quipu-cream/60 text-center italic mt-4">"{buckets[activeBucket].desc}"</p>
      </div>
    </div>
  );
};

// --- Articles Data ---

const articles = [
  {
    id: 'selection',
    title: "Mastering Fund Selection",
    category: "Selection",
    icon: Shield,
    content: "Selecting a mutual fund isn't just about looking at last year's returns. It's about understanding the risk-reward frontier. A fund that delivers 20% return with 40% volatility might be inferior to one that delivers 15% with 10% volatility. Key metrics to watch: Alpha, Beta, and the Sharpe Ratio.",
    graphic: <RiskRewardGraphic />
  },
  {
    id: 'strategy',
    title: "The Strategy of Wealth",
    category: "Strategy",
    icon: TrendingUp,
    content: "Wealth isn't built overnight; it's built through consistency. The Systematic Investment Plan (SIP) is your greatest tool. By investing a fixed amount regularly, you benefit from Rupee Cost Averaging—buying more units when the market is low and fewer when it's high. Time in the market beats timing the market.",
    graphic: <CompoundingGraphic />
  },
  {
    id: 'allocation',
    title: "The Art of Asset Allocation",
    category: "Allocation",
    icon: PieIcon,
    content: "Asset allocation is the only 'free lunch' in finance. By diversifying across Equity, Debt, and Gold, you ensure that your portfolio doesn't crash when one sector fails. Your allocation should shift as you age: Aggressive in your 20s, Balanced in your 40s, and Conservative as you approach retirement.",
    graphic: <AllocationGraphic />
  }
];

const quizQuestions = [
  {
    question: "What does NAV stand for in Mutual Funds?",
    options: [
      "Net Asset Value",
      "New Asset Venture",
      "Nominal Asset Valuation",
      "Net Annual Value"
    ],
    correct: 0,
    explanation: "NAV (Net Asset Value) represents the market value per unit of a mutual fund scheme."
  },
  {
    question: "Which of these is a benefit of SIP?",
    options: [
      "Guaranteed Returns",
      "Rupee Cost Averaging",
      "No Market Risk",
      "Instant Wealth"
    ],
    correct: 1,
    explanation: "SIP (Systematic Investment Plan) helps in Rupee Cost Averaging by buying more units when prices are low and fewer when prices are high."
  },
  {
    question: "What is an ELSS fund primarily used for?",
    options: [
      "High Liquidity",
      "Tax Saving under 80C",
      "Short term trading",
      "Fixed monthly income"
    ],
    correct: 1,
    explanation: "ELSS (Equity Linked Savings Scheme) is a type of mutual fund that offers tax benefits under Section 80C of the Income Tax Act."
  },
  {
    question: "What is the 'Expense Ratio' in a Mutual Fund?",
    options: [
      "The profit made by the fund",
      "The fee charged for managing the fund",
      "The tax paid on returns",
      "The amount invested by the AMC"
    ],
    correct: 1,
    explanation: "The Expense Ratio is the annual fee charged by the AMC to manage the mutual fund scheme."
  }
];

export default function Learning() {
  const [activeSection, setActiveSection] = useState<'articles' | 'quiz'>('articles');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
  };

  return (
    <div className="max-w-6xl mx-auto py-24 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Investor <span className="text-quipu-gold">Academy</span></h2>
        <p className="text-quipu-cream/60 max-w-2xl mx-auto">
          Empower yourself with financial knowledge. Explore interactive concepts and test your investment IQ.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-12">
        <button 
          onClick={() => setActiveSection('articles')}
          className={cn(
            "px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2",
            activeSection === 'articles' 
              ? "bg-quipu-gold text-quipu-deep" 
              : "bg-quipu-forest/20 text-quipu-cream/60 hover:bg-quipu-forest/40"
          )}
        >
          <BookOpen size={18} /> Learning Articles
        </button>
        <button 
          onClick={() => setActiveSection('quiz')}
          className={cn(
            "px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2",
            activeSection === 'quiz' 
              ? "bg-quipu-gold text-quipu-deep" 
              : "bg-quipu-forest/20 text-quipu-cream/60 hover:bg-quipu-forest/40"
          )}
        >
          <GraduationCap size={18} /> Knowledge Quiz
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeSection === 'articles' ? (
          <motion.div 
            key="articles"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            {articles.map((article, idx) => (
              <div 
                key={article.id} 
                className={cn(
                  "flex flex-col lg:flex-row gap-12 items-center p-8 rounded-[40px] bg-quipu-forest/5 border border-quipu-sage/10",
                  idx % 2 === 1 && "lg:flex-row-reverse"
                )}
              >
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-3 text-quipu-gold">
                    <div className="p-2 bg-quipu-gold/10 rounded-lg">
                      <article.icon size={20} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">{article.category}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-quipu-cream">{article.title}</h3>
                  <p className="text-quipu-cream/60 leading-relaxed text-lg">
                    {article.content}
                  </p>
                  <button className="flex items-center gap-2 text-quipu-gold font-bold text-sm group">
                    Read Full Article <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="flex-1 w-full max-w-md">
                  {article.graphic}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto"
          >
            {!showResult ? (
              <div className="bg-quipu-forest/10 border border-quipu-sage/20 rounded-[40px] p-10 backdrop-blur-xl">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-[10px] font-bold text-quipu-gold uppercase tracking-widest">Question {currentQuestion + 1} of {quizQuestions.length}</span>
                  <div className="h-1 w-32 bg-quipu-sage/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-quipu-gold transition-all duration-500" 
                      style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-quipu-cream mb-8 leading-tight">
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-4">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className={cn(
                        "w-full p-5 rounded-2xl text-left font-medium transition-all border flex items-center justify-between",
                        !isAnswered 
                          ? "bg-quipu-deep/50 border-quipu-sage/30 hover:border-quipu-gold/50 hover:bg-quipu-gold/5"
                          : index === quizQuestions[currentQuestion].correct
                            ? "bg-quipu-sage/20 border-quipu-sage text-quipu-sage"
                            : index === selectedOption
                              ? "bg-red-500/10 border-red-500/50 text-red-400"
                              : "bg-quipu-deep/50 border-quipu-sage/10 opacity-50"
                      )}
                    >
                      {option}
                      {isAnswered && index === quizQuestions[currentQuestion].correct && <CheckCircle2 size={20} />}
                      {isAnswered && index === selectedOption && index !== quizQuestions[currentQuestion].correct && <XCircle size={20} />}
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  {isAnswered && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-8 p-6 bg-quipu-gold/5 rounded-2xl border border-quipu-gold/20"
                    >
                      <p className="text-sm text-quipu-gold/80 leading-relaxed">
                        <span className="font-bold block mb-1">Explanation:</span>
                        {quizQuestions[currentQuestion].explanation}
                      </p>
                      <button 
                        onClick={handleNextQuestion}
                        className="mt-6 w-full py-4 bg-quipu-gold text-quipu-deep font-bold rounded-xl flex items-center justify-center gap-2"
                      >
                        {currentQuestion === quizQuestions.length - 1 ? "See Results" : "Next Question"} <ArrowRight size={18} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-quipu-forest/10 border border-quipu-sage/20 rounded-[40px] p-12 text-center">
                <div className="w-24 h-24 bg-quipu-gold/10 rounded-full flex items-center justify-center mx-auto text-quipu-gold mb-8">
                  <Trophy size={48} />
                </div>
                <h3 className="text-3xl font-bold mb-2">Quiz Completed!</h3>
                <p className="text-quipu-cream/40 mb-8">You scored {score} out of {quizQuestions.length}</p>
                
                <div className="text-6xl font-bold text-quipu-gold mb-12">
                  {Math.round((score / quizQuestions.length) * 100)}%
                </div>

                <div className="flex flex-col gap-4">
                  <button 
                    onClick={resetQuiz}
                    className="w-full py-4 bg-quipu-gold text-quipu-deep font-bold rounded-xl flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={18} /> Try Again
                  </button>
                  <button 
                    onClick={() => setActiveSection('articles')}
                    className="w-full py-4 bg-quipu-forest/20 text-quipu-cream font-bold rounded-xl flex items-center justify-center gap-2"
                  >
                    <BookOpen size={18} /> Back to Articles
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
