import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPlan } from "../api/plan";
import LoadingSpinner from "../components/LoadingSpinner";
import PlanCard from "../components/PlanCard";

// TypeScript type for Plan
type PlanType = {
  id: string;
  productId: string;
  name: string;
  type: "devlopment" | "hosting" | "bundle";
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

export default function ListPlan() {
  const { data: plans, isLoading, isError } = useQuery<PlanType[]>({
    queryKey: ["Plan-List"],
    queryFn: getPlan,
    retry: false,
  });

  const [activeOnly, setActiveOnly] = useState(false);
  const [serviceFilter, setServiceFilter] = useState("");

  // Extract unique service names for dropdown
  const serviceNames = useMemo(() => {
    if (!plans) return [];
    return Array.from(new Set(plans.map((p) => p.serviceProduct.name)));
  }, [plans]);

  // Filtered plans
  const filteredPlans = useMemo(() => {
    if (!plans) return [];
    return plans.filter((plan) => {
      const activeCheck = activeOnly ? plan.isActive : true;
      const serviceCheck = serviceFilter ? plan.serviceProduct.name === serviceFilter : true;
      return activeCheck && serviceCheck;
    });
  }, [plans, activeOnly, serviceFilter]);

  if (isLoading) return <div className="flex flex-1 items-center justify-center"><LoadingSpinner /></div>;
  if (isError) return <div className="flex flex-1 items-center justify-center">Please try again</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        All Plans
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={activeOnly}
            onChange={() => setActiveOnly(!activeOnly)}
            className="accent-indigo-600"
          />
          Show Active Plans Only
        </label>

        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          className="border rounded-lg p-2 dark:bg-gray-800 dark:text-gray-100"
        >
          <option value="">All Services</option>
          {serviceNames.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <PlanCard
            key={plan.id}
            name={plan.name}
            type={plan.type}
            priceMonthly={plan.priceMonthly ?? undefined}
            priceOneTime={plan.priceOneTime ?? undefined}
            contractDuration={plan.contractDuration ?? undefined}
            features={plan.features || []}
          />
        ))}
      </div>
    </div>
  );
}
