export class LandingDTO {
  constructor(data = {}) {
    this.id = data.id ?? null;
    this.templateId = data.templateId ?? null;
    this.name = data.name ?? null;
    this.client = data.client ?? null;
    this.status = data.status ?? null;
    this.fields = data.fields ?? {};
    this.leadCount = data.leadCount ?? 0;
    this.createdAt = data.createdAt ?? null;
  }
}

export class LandingSummaryDTO {
  constructor(data = {}) {
    this.id = data.id ?? null;
    this.name = data.name ?? null;
    this.client = data.client ?? null;
    this.status = data.status ?? null;
    this.leadCount = data.leadCount ?? 0;
  }
}

export class LeadDTO {
  constructor(data = {}) {
    this.id = data.id ?? null;
    this.landingId = data.landingId ?? null;
    this.name = data.name ?? null;
    this.email = data.email ?? null;
    this.phone = data.phone ?? null;
    this.message = data.message ?? null;
    this.createdAt = data.createdAt ?? null;
  }
}
