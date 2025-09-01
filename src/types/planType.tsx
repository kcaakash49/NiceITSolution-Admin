//Plan type for each plans for services

export type PlanType = "starter" | "professional" | 'premium' | "enterprise"

export type PlanScheme = {
    id: string;
    productId: string;
    name: string;
    type: PlanType;
    priceMonthly?: number | null;
    priceOneTime?: number | null;
    contractDuration?: number | null;
    features: string[];
    isActive: boolean;
    serviceProduct: {
      name: string;
      description: string;
    };
  };