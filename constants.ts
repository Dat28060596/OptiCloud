import { Anomaly, CloudProvider, CostMetric, OptimizationOpportunity } from "./types";

export const MOCK_COST_DATA: CostMetric[] = Array.from({ length: 30 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const dateStr = date.toISOString().split('T')[0];
  
  return [
    { date: dateStr, amount: Math.floor(Math.random() * 500) + 1200, currency: 'USD', provider: CloudProvider.AWS, service: 'EC2' },
    { date: dateStr, amount: Math.floor(Math.random() * 200) + 400, currency: 'USD', provider: CloudProvider.AWS, service: 'RDS' },
    { date: dateStr, amount: Math.floor(Math.random() * 100) + 300, currency: 'USD', provider: CloudProvider.GCP, service: 'BigQuery' },
    { date: dateStr, amount: Math.floor(Math.random() * 150) + 200, currency: 'USD', provider: CloudProvider.AZURE, service: 'Virtual Machines' },
  ];
}).flat();

export const MOCK_OPPORTUNITIES: OptimizationOpportunity[] = [
  {
    id: 'opt-1',
    title: 'Right-size EC2 Instances',
    description: '34 instances in us-east-1 are operating below 5% CPU utilization.',
    estimatedSavings: 1240.50,
    effort: 'Medium',
    risk: 'Low',
    provider: CloudProvider.AWS,
    resourceId: 'i-0123456789abcdef0',
    type: 'Right-sizing'
  },
  {
    id: 'opt-2',
    title: 'Delete Unattached EBS Volumes',
    description: 'Found 12 unattached EBS volumes accumulating storage costs.',
    estimatedSavings: 450.00,
    effort: 'Low',
    risk: 'Low',
    provider: CloudProvider.AWS,
    resourceId: 'vol-0abcdef1234567890',
    type: 'Idle'
  },
  {
    id: 'opt-3',
    title: 'Purchase Azure Reserved Instances',
    description: 'Consistent usage detected for VM Scale Sets in West Europe.',
    estimatedSavings: 3100.00,
    effort: 'Low',
    risk: 'Medium',
    provider: CloudProvider.AZURE,
    resourceId: 'vmss-weu-prod',
    type: 'Commitment'
  },
  {
    id: 'opt-4',
    title: 'GCP Idle Cloud SQL',
    description: 'Development database "dev-db-01" has zero connections for 14 days.',
    estimatedSavings: 180.25,
    effort: 'Low',
    risk: 'Low',
    provider: CloudProvider.GCP,
    resourceId: 'dev-db-01',
    type: 'Idle'
  }
];

export const MOCK_ANOMALIES: Anomaly[] = [
  {
    id: 'anom-1',
    date: new Date().toISOString().split('T')[0],
    service: 'AWS Lambda',
    provider: CloudProvider.AWS,
    costSpike: 450.00,
    percentageChange: 312,
    status: 'Detected',
    severity: 'Critical'
  },
  {
    id: 'anom-2',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    service: 'Azure Cosmos DB',
    provider: CloudProvider.AZURE,
    costSpike: 120.00,
    percentageChange: 45,
    status: 'Investigating',
    severity: 'Warning'
  }
];

export const KPIS = {
  totalSpend: 42530.00,
  forecast: 48100.00,
  budget: 45000.00,
  savingsPotential: 5420.00
};