

# CostOptima Cloud

**A unified FinOps platform for multi-cloud cost visibility, anomaly detection, and AI-driven optimization recommendations.**

CostOptima Cloud helps organizations monitor, analyze, and optimize their cloud spending across AWS, Azure, and GCP. It leverages Google's Gemini models to provide intelligent insights, root cause analysis for cost anomalies, and executive summaries of financial health.

## 🚀 Key Features

* **📊 Unified Dashboard:** Get a high-level view of total spend, monthly forecasts, and savings potential.
* **🤖 AI-Powered Insights:** * **Gemini Financial Advisor:** Generates executive summaries of your cloud spend and forecasts.
    * **Anomaly Analysis:** Automatically detects spending spikes and uses AI to suggest root causes and remediation steps.
* **🔍 Cost Explorer:** Deep dive into costs with filtering by:
    * Service (e.g., EC2, RDS, BigQuery)
    * Region
    * Account/Project
    * Tags
* **⚡ Optimization Hub:** Actionable recommendations to reduce costs (e.g., "Right-size EC2 Instances", "Delete Unattached EBS Volumes") with estimated savings calculations.
* **☁️ Multi-Cloud Support:** Native support for visualizing data from AWS, Azure, and Google Cloud Platform.

## 🛠️ Tech Stack

* **Framework:** React 19 + TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS (via CDN)
* **AI/LLM:** Google Gemini API (`@google/genai`)
* **Icons:** Lucide React
* **Charts:** Recharts

## ⚡ Getting Started

### Prerequisites

* Node.js (v18 or higher recommended)
* npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/costoptima-cloud.git](https://github.com/yourusername/costoptima-cloud.git)
    cd costoptima-cloud
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` (or `.env.local`) file in the root directory and add your Google Gemini API Key. This is required for the AI features to work.
    
    ```env
    GEMINI_API_KEY=your_actual_api_key_here
    ```
    
    > **Note:** If no API key is provided, the AI features (Executive Summary and Anomaly Analysis) will degrade gracefully and show error messages or mock data.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open your browser:**
    Navigate to `http://localhost:3000` (or the port shown in your terminal).

## 📂 Project Structure

```text
src/
├── components/
│   ├── Anomalies.tsx        # AI-driven anomaly detection view
│   ├── CostExplorer.tsx     # Data table with filters for cost analysis
│   ├── Dashboard.tsx        # Main landing view with KPIs and charts
│   ├── OptimizationHub.tsx  # Recommendations and "Fix Now" actions
│   ├── Settings.tsx         # Integration configuration (AWS/Azure/GCP)
│   └── Sidebar.tsx          # Navigation
├── services/
│   └── geminiService.ts     # Interface with Google Gemini API
├── App.tsx                  # Main application layout and routing
├── constants.ts             # Mock data for demonstration
├── types.ts                 # TypeScript interfaces
└── main.tsx                 # Entry point
