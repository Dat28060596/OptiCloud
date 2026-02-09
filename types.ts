export enum CloudProvider {
  AWS = 'AWS',
  AZURE = 'Azure',
  GCP = 'GCP',
  K8S = 'Kubernetes'
}

export interface CostMetric {
  date: string;
  amount: number;
  currency: string;
  provider: CloudProvider;
  service: string;
  region: string;
  account: string;
  tag: string;
}

export interface OptimizationOpportunity {
  id: string;
  title: string;
  description: string;
  estimatedSavings: number;
  effort: 'Low' | 'Medium' | 'High';
  risk: 'Low' | 'Medium' | 'High';
  provider: CloudProvider;
  resourceId: string;
  type: 'Right-sizing' | 'Idle' | 'Commitment' | 'Architecture';
}

export interface Anomaly {
  id: string;
  date: string;
  service: string;
  provider: CloudProvider;
  costSpike: number;
  percentageChange: number;
  status: 'Detected' | 'Investigating' | 'Resolved';
  severity: 'Critical' | 'Warning' | 'Info';
}

export interface UserProfile {
  name: string;
  role: string;
  organization: string;
}