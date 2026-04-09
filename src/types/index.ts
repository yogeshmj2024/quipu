export type RiskAppetite = 'Conservative' | 'Moderate' | 'Aggressive';

export type InvestmentHorizon = 'Short-term' | 'Medium-term' | 'Long-term';

export interface UserProfile {
  name: string;
  age: number;
  income: number;
  expenses: number;
  riskAppetite: RiskAppetite;
  horizon: InvestmentHorizon;
  goals: string[];
  kycStatus: 'Pending' | 'Verified';
  amcConnected: boolean;
}

export interface FundRecommendation {
  name: string;
  category: string;
  allocation: number;
  expectedReturn: number;
  justification: string;
  fundManager: string;
  aum: string;
  expenseRatio: string;
}

export interface InvestmentPlan {
  id: string;
  profile: UserProfile;
  recommendations: FundRecommendation[];
  summary: string;
  timestamp: string;
  feedback?: {
    rating: number;
    comment: string;
  };
}
