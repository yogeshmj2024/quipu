import { UserProfile, FundRecommendation, InvestmentPlan } from '../types';
import { generateInvestmentPlan } from './gemini';

/**
 * Test Suite for Onboarding and AUM Mapping
 */
export async function runOnboardingTests() {
  console.log("🚀 Starting Onboarding & AUM Mapping Tests...");
  
  const testProfiles: UserProfile[] = [
    {
      name: "Conservative Investor",
      age: 45,
      income: 200000,
      expenses: 100000,
      riskAppetite: 'Conservative',
      horizon: 'Short-term',
      goals: ["Capital Protection", "Emergency Fund"],
      kycStatus: 'Verified',
      amcConnected: true
    },
    {
      name: "Aggressive Growth",
      age: 25,
      income: 150000,
      expenses: 50000,
      riskAppetite: 'Aggressive',
      horizon: 'Long-term',
      goals: ["Early Retirement", "Wealth Creation"],
      kycStatus: 'Verified',
      amcConnected: true
    }
  ];

  const results = [];

  for (const profile of testProfiles) {
    console.log(`Testing profile: ${profile.name}...`);
    try {
      const plan = await generateInvestmentPlan(profile);
      
      // Verify AUM Mapping (Allocation adds up to 100%)
      const totalAllocation = plan.recommendations.reduce((sum, r) => sum + r.allocation, 0);
      const isAumMappedCorrectly = Math.abs(totalAllocation - 100) < 0.1;

      // Verify Fund Details presence
      const hasDetails = plan.recommendations.every(r => 
        r.fundManager && r.aum && r.expenseRatio
      );

      results.push({
        profile: profile.name,
        status: isAumMappedCorrectly && hasDetails ? 'PASSED' : 'FAILED',
        totalAllocation: `${totalAllocation}%`,
        hasFundDetails: hasDetails,
        recommendationsCount: plan.recommendations.length
      });
    } catch (error) {
      results.push({
        profile: profile.name,
        status: 'ERROR',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  console.table(results);
  return results;
}
