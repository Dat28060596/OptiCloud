import { CloudProvider } from './types';

// Generate large mock data
const generateData = (size: number) => {
  return Array.from({ length: size }, (_, i) => ({
    service: `service-${i % 50}`,
    region: `region-${i % 10}`,
    account: `account-${i % 5}`,
    tag: `tag-${i % 20}`
  }));
};

const data = generateData(1000000);

const activeFilters = {
  service: Array.from({ length: 25 }, (_, i) => `service-${i}`),
  region: Array.from({ length: 5 }, (_, i) => `region-${i}`),
  account: Array.from({ length: 3 }, (_, i) => `account-${i}`),
  tag: Array.from({ length: 10 }, (_, i) => `tag-${i}`)
};

console.time('Array.includes');
const filteredWithArray = data.filter(item => {
  if (activeFilters.service.length && !activeFilters.service.includes(item.service)) return false;
  if (activeFilters.region.length && !activeFilters.region.includes(item.region)) return false;
  if (activeFilters.account.length && !activeFilters.account.includes(item.account)) return false;
  if (activeFilters.tag.length && !activeFilters.tag.includes(item.tag)) return false;
  return true;
});
console.timeEnd('Array.includes');

console.time('Set.has');
const serviceSet = new Set(activeFilters.service);
const regionSet = new Set(activeFilters.region);
const accountSet = new Set(activeFilters.account);
const tagSet = new Set(activeFilters.tag);

const filteredWithSet = data.filter(item => {
  if (serviceSet.size && !serviceSet.has(item.service)) return false;
  if (regionSet.size && !regionSet.has(item.region)) return false;
  if (accountSet.size && !accountSet.has(item.account)) return false;
  if (tagSet.size && !tagSet.has(item.tag)) return false;
  return true;
});
console.timeEnd('Set.has');
