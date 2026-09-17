const API_BASE_URL = 'sales-api-qwnl.onrender.com';

async function getJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }
  return response.json();
}

export function getAllSales() {
  return getJson('/sales');
}

export function getSalesSummary() {
  return getJson('/sales/summary');
}

export function getSalesByRegion() {
  return getJson('/sales/by-region');
}

export function getSalesByDate() {
  return getJson('/sales/by-date');
}

export function getPipelineStatus() {
  return getJson('/pipeline/status');
}
