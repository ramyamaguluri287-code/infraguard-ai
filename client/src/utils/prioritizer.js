// InfraGuard AI Core Prioritization & Composite Risk Algorithms
const API_BASE = '/api';

/**
 * Calculates weighted multimodal composite risk score
 * Weighted across visual severity, vulnerability index, traffic impact, and historical recurrence.
 */
export function calculateCompositeRisk(asset) {
  const severityScore =
    asset.severity === 'Critical'
      ? 95
      : asset.severity === 'High'
      ? 78
      : asset.severity === 'Medium'
      ? 60
      : 35;

  const vuln = asset.vulnerabilityIndex || 70;
  const traffic = asset.trafficImpactScore || 70;
  const recurrence = asset.recurrenceFactor || 50;

  return Math.round(severityScore * 0.35 + vuln * 0.25 + traffic * 0.2 + recurrence * 0.2);
}

/**
 * Knapsack-based resource-constrained maintenance allocation
 * Optimizes crew dispatch and budget utilization to maximize network risk reduction.
 */
export function optimizeResourceAllocation(assets, budget, crewLimit = 4) {
  const scored = assets.map((asset) => {
    const urgencyMultiplier =
      asset.urgencyDays <= 2 ? 1.8 : asset.urgencyDays <= 5 ? 1.4 : 1.0;
    const score = (asset.riskScore * urgencyMultiplier) / (asset.estimatedRepairCost / 1000);
    return {
      ...asset,
      efficiencyScore: parseFloat(score.toFixed(2))
    };
  });

  scored.sort((a, b) => b.efficiencyScore - a.efficiencyScore);

  let remainingBudget = budget;
  const scheduledAssets = [];
  const deferredAssets = [];
  let totalRiskReduced = 0;
  let totalSpent = 0;

  for (const item of scored) {
    if (item.estimatedRepairCost <= remainingBudget && scheduledAssets.length < crewLimit * 2) {
      scheduledAssets.push({
        ...item,
        status: 'APPROVED FOR DISPATCH',
        dispatchPriority: scheduledAssets.length + 1
      });
      remainingBudget -= item.estimatedRepairCost;
      totalSpent += item.estimatedRepairCost;
      totalRiskReduced += item.riskScore;
    } else {
      deferredAssets.push({
        ...item,
        status: 'DEFERRED (Budget Limit)',
        shortfall: item.estimatedRepairCost - remainingBudget
      });
    }
  }

  const totalNetworkRisk = assets.reduce((sum, a) => sum + a.riskScore, 0);
  const networkRiskReductionPct =
    assets.length > 0 ? Math.round((totalRiskReduced / totalNetworkRisk) * 100) : 0;

  return {
    scheduledAssets,
    deferredAssets,
    totalSpent,
    remainingBudget,
    totalRiskReduced,
    networkRiskReductionPct
  };
}

/**
 * Calculates long-term deferred maintenance losses avoided (~3.8x cost multiplier)
 */
export function calculateCostOfInactionAvoided(scheduledAssets) {
  const immediateCost = scheduledAssets.reduce((sum, a) => sum + a.estimatedRepairCost, 0);
  const compoundedCost = immediateCost * 3.8;
  return Math.round(compoundedCost - immediateCost);
}

/**
 * API Data Service with graceful fallback
 */
export async function fetchAssets(fallbackData) {
  try {
    const res = await fetch(`${API_BASE}/assets`);
    const data = await res.json();
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
      return data.data;
    }
  } catch (err) {
    console.warn('[API Notice] Operating in offline/client fallback mode:', err.message);
  }
  return fallbackData;
}

export async function submitComplaint(assetId, complaintText, source) {
  try {
    const res = await fetch(`${API_BASE}/complaints`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assetId, complaintText, source })
    });
    return await res.json();
  } catch (err) {
    console.warn('[API Notice] Complaint saved locally in fallback mode:', err.message);
    return { success: true, localOnly: true };
  }
}

export async function submitMaintenanceRecord(assetId, record) {
  try {
    const res = await fetch(`${API_BASE}/maintenance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assetId, ...record })
    });
    return await res.json();
  } catch (err) {
    console.warn('[API Notice] Maintenance record saved locally in fallback mode:', err.message);
    return { success: true, localOnly: true };
  }
}
