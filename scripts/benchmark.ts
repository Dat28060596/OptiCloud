import { CloudProvider, CostMetric } from './types';

// Generate a large dataset
const generateData = (count: number): CostMetric[] => {
  const providers = Object.values(CloudProvider);
  const services = ['EC2', 'S3', 'RDS', 'Lambda', 'EKS', 'DynamoDB', 'CloudFront', 'Route53'];
  const regions = ['us-east-1', 'us-west-2', 'eu-central-1', 'ap-northeast-1', 'sa-east-1'];
  const accounts = ['prod-1', 'prod-2', 'dev-1', 'qa-1', 'staging'];
  const tags = ['env:prod', 'env:dev', 'team:backend', 'team:frontend', 'project:alpha'];

  return Array.from({ length: count }, () => ({
    date: new Date().toISOString(),
    amount: Math.random() * 1000,
    currency: 'USD',
    provider: providers[Math.floor(Math.random() * providers.length)],
    service: services[Math.floor(Math.random() * services.length)],
    region: regions[Math.floor(Math.random() * regions.length)],
    account: accounts[Math.floor(Math.random() * accounts.length)],
    tag: tags[Math.floor(Math.random() * tags.length)],
  }));
};

const data = generateData(100000); // 100k items

// Set up filters (simulating user selecting a few options)
const activeFilters = {
  service: ['EC2', 'S3', 'RDS', 'Lambda'],
  region: ['us-east-1', 'us-west-2'],
  account: ['prod-1', 'prod-2'],
  tag: ['env:prod', 'team:backend'],
};

// --- Array.includes (Old method) ---
const startArray = performance.now();
const filteredArray = data.filter(item => {
  if (activeFilters.service.length && !activeFilters.service.includes(item.service)) return false;
  if (activeFilters.region.length && !activeFilters.region.includes(item.region)) return false;
  if (activeFilters.account.length && !activeFilters.account.includes(item.account)) return false;
  if (activeFilters.tag.length && !activeFilters.tag.includes(item.tag)) return false;
  return true;
});
const endArray = performance.now();
const arrayTime = endArray - startArray;

// --- Set.has (New method) ---
const startSetSetup = performance.now();
const serviceSet = new Set(activeFilters.service);
const regionSet = new Set(activeFilters.region);
const accountSet = new Set(activeFilters.account);
const tagSet = new Set(activeFilters.tag);
const endSetSetup = performance.now();

const startSetFilter = performance.now();
const filteredSet = data.filter(item => {
  if (serviceSet.size > 0 && !serviceSet.has(item.service)) return false;
  if (regionSet.size > 0 && !regionSet.has(item.region)) return false;
  if (accountSet.size > 0 && !accountSet.has(item.account)) return false;
  if (tagSet.size > 0 && !tagSet.has(item.tag)) return false;
  return true;
});
const endSetFilter = performance.now();
const setTime = (endSetSetup - startSetSetup) + (endSetFilter - startSetFilter);


console.log(`--- Benchmark Results (${data.length} items) ---`);
console.log(`Array.includes (Old): ${arrayTime.toFixed(2)} ms`);
console.log(`Set.has (New):        ${setTime.toFixed(2)} ms`);
console.log(`Improvement:          ${((arrayTime - setTime) / arrayTime * 100).toFixed(2)}% faster`);
console.log(`Same Results?         ${filteredArray.length === filteredSet.length ? 'Yes' : 'No'}`);
