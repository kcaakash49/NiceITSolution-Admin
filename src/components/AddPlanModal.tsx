// components/AddPlanModal.tsx
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createPlan } from "../api/plan";

type AddPlanModalProps = {
  serviceId: string;
  isOpen: boolean;
  onClose: () => void;

};

type PlanType = "devlopment" | "hosting" | 'bundle'

export default function AddPlanModal({ serviceId, isOpen, onClose }: AddPlanModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "devlopment" as PlanType,
    priceMonthly: "",
    priceOneTime: "",
    contractDuration: "",
    features: [""],
    isActive: true,
  });

  if (!isOpen) return null;

  const planMutation = useMutation({
    mutationFn: createPlan,
    onSuccess: (data) => {
        alert("Adding Success");
        console.log(data);
    },
    onError: () => {
        alert("Adding Failed");
        console.log("Something happened");
    }
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement; // cast here
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }));
  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      productId: serviceId,
      priceMonthly: formData.priceMonthly ? parseFloat(formData.priceMonthly) : undefined,
      priceOneTime: formData.priceOneTime ? parseFloat(formData.priceOneTime) : undefined,
      contractDuration: formData.contractDuration ? parseInt(formData.contractDuration) : undefined,
    };

    planMutation.mutate(payload);

     
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Add Plan</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Plan Name */}
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-200">Plan Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded dark:bg-gray-700 dark:text-gray-100"
              required
            />
          </div>

          {/* Plan Type */}
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-200">Plan Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border p-2 rounded dark:bg-gray-700 dark:text-gray-100"
              required
            >
              <option value="devlopment">Development</option>
              <option value="hosting">Hosting</option>
              <option value="bundle">Bundle</option>
            </select>
          </div>

          {/* Prices */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-semibold text-gray-700 dark:text-gray-200">Monthly Price</label>
              <input
                type="number"
                name="priceMonthly"
                value={formData.priceMonthly}
                onChange={handleChange}
                className="w-full border p-2 rounded dark:bg-gray-700 dark:text-gray-100"
                min={0}
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold text-gray-700 dark:text-gray-200">One-Time Price</label>
              <input
                type="number"
                name="priceOneTime"
                value={formData.priceOneTime}
                onChange={handleChange}
                className="w-full border p-2 rounded dark:bg-gray-700 dark:text-gray-100"
                min={0}
              />
            </div>
          </div>

          {/* Contract Duration */}
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-200">Contract Duration (months)</label>
            <input
              type="number"
              name="contractDuration"
              value={formData.contractDuration}
              onChange={handleChange}
              className="w-full border p-2 rounded dark:bg-gray-700 dark:text-gray-100"
              min={0}
            />
          </div>

          {/* Features */}
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">Features</label>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="flex-1 border p-2 rounded dark:bg-gray-700 dark:text-gray-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 rounded"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
            >
              Add Feature
            </button>
          </div>

          {/* Is Active */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <label className="text-gray-700 dark:text-gray-200 font-medium">Active</label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              Save Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
