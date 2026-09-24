export class CampaignDTO {
  constructor(data = {}) {
    this.id = data.id ?? null;
    this.name = data.name ?? null;
    this.client = data.client ?? null;
    this.type = data.type ?? null;
    this.status = data.status ?? null;
    this.budget = data.budget ?? 0;
    this.spent = data.spent ?? 0;
    this.currency = data.currency ?? null;
    this.startDate = data.startDate ?? null;
    this.endDate = data.endDate ?? null;
  }
}

export class GlobalBudgetSummaryDTO {
  constructor(data = {}) {
    this.activeCampaigns = data.activeCampaigns ?? 0;
    this.totalBudget = data.totalBudget ?? 0;
    this.totalSpent = data.totalSpent ?? 0;
    this.totalAvailable = data.totalAvailable ?? 0;
    this.consumptionPercentage = data.consumptionPercentage ?? 0;
  }
}

export class BudgetSummaryDTO {
  constructor(data = {}) {
    this.campaignId = data.campaignId ?? null;
    this.campaignName = data.campaignName ?? null;
    this.client = data.client ?? null;
    this.totalBudget = data.totalBudget ?? 0;
    this.spent = data.spent ?? 0;
    this.remaining = data.remaining ?? 0;
    this.percentageUsed = data.percentageUsed ?? 0;
  }
}

export class ExpenseDTO {
  constructor(data = {}) {
    this.id = data.id ?? null;
    this.campaignId = data.campaignId ?? null;
    this.description = data.description ?? null;
    this.amount = data.amount ?? 0;
    this.category = data.category ?? null;
    this.date = data.date ?? null;
  }
}
