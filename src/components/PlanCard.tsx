import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type PlanCardProps = {
  name: string;
  type: string;
  priceMonthly?: number;
  priceOneTime?: number;
  features: string[];
  contractDuration?: number;
//   onEdit: () => void;
//   onViewInquiries: () => void;
};

export default function PlanCard({
  name,
  type,
  priceMonthly,
  priceOneTime,
  features,
  contractDuration,
//   onEdit,
//   onViewInquiries,
}: PlanCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="rounded-2xl shadow-md border bg-white dark:bg-gray-900 dark:border-gray-700 p-6 flex flex-col justify-between transition-all"
    >
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
          {name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {type} {contractDuration ? `• ${contractDuration} months` : ""}
        </p>

        {/* Pricing */}
        <div className="mb-4">
          {priceMonthly && (
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              ${priceMonthly}/mo
            </p>
          )}
          {priceOneTime && (
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              One-time: ${priceOneTime}
            </p>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button
          
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
        >
          List Inquiries
        </button>
        <button
          
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
        >
          Edit Plan
        </button>
      </div>
    </motion.div>
  );
}
