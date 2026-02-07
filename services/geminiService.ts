import { GoogleGenAI } from "@google/genai";
import { Anomaly, OptimizationOpportunity } from "../types";

// Initialize Gemini
// Note: In a real app, ensure process.env.API_KEY is available.
// If missing, the app will degrade gracefully in the UI.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateExecutiveSummary = async (
  totalSpend: number,
  forecast: number,
  anomalies: Anomaly[],
  opportunities: OptimizationOpportunity[]
): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key not configured. Unable to generate AI insights.";
  }

  try {
    const prompt = `
      You are a FinOps expert assistant. Analyze the following cloud cost data and provide a concise executive summary (max 3 sentences).
      
      Data:
      - Current Month Spend: $${totalSpend}
      - End of Month Forecast: $${forecast}
      - Active Anomalies: ${anomalies.length} (Top severity: ${anomalies[0]?.severity || 'None'})
      - Optimization Opportunities: ${opportunities.length} (Total potential savings: $${opportunities.reduce((acc, curr) => acc + curr.estimatedSavings, 0)})
      
      Focus on the most critical action items.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "No insights generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate insights at this time due to an API error.";
  }
};

export const analyzeAnomaly = async (anomaly: Anomaly): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key not configured.";
  }

  try {
    const prompt = `
      Analyze this cloud cost anomaly and suggest 3 potential root causes and investigation steps.
      
      Anomaly Details:
      - Service: ${anomaly.service} (${anomaly.provider})
      - Cost Spike: $${anomaly.costSpike} (+${anomaly.percentageChange}%)
      - Date: ${anomaly.date}
      
      Format as a markdown list.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "No analysis available.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error analyzing anomaly.";
  }
};