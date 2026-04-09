import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, InvestmentPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateInvestmentPlan(profile: UserProfile): Promise<InvestmentPlan> {
  const prompt = `
    You are Quipu, an AI-powered financial advisor. 
    Create a personalized mutual fund investment plan for the following profile:
    - Name: ${profile.name}
    - Age: ${profile.age}
    - Monthly Income: ₹${profile.income}
    - Monthly Expenses: ₹${profile.expenses}
    - Risk Appetite: ${profile.riskAppetite}
    - Horizon: ${profile.horizon}
    - Goals: ${profile.goals.join(', ')}

    Provide a summary of the strategy and 3-5 specific fund category recommendations with justifications.
    For each fund, include the fund manager's name, current AUM (Assets Under Management in ₹ Crores), and the expense ratio percentage.
    Be professional, data-driven, and explain the "why" behind each choice.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                category: { type: Type.STRING },
                allocation: { type: Type.NUMBER, description: "Percentage allocation (0-100)" },
                expectedReturn: { type: Type.NUMBER, description: "Annualized expected return percentage" },
                justification: { type: Type.STRING },
                fundManager: { type: Type.STRING },
                aum: { type: Type.STRING, description: "AUM in ₹ Crores (e.g., '₹12,450 Cr')" },
                expenseRatio: { type: Type.STRING, description: "Expense ratio percentage (e.g., '0.75%')" }
              },
              required: ["name", "category", "allocation", "expectedReturn", "justification", "fundManager", "aum", "expenseRatio"]
            }
          }
        },
        required: ["summary", "recommendations"]
      }
    }
  });

  const data = JSON.parse(response.text || '{}');
  
  return {
    id: crypto.randomUUID(),
    profile,
    summary: data.summary || "Unable to generate summary.",
    recommendations: data.recommendations || [],
    timestamp: new Date().toISOString()
  };
}
