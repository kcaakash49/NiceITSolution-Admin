import type { CreateServiceProductSchema } from "@kcaakash/validators";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createService } from "../api/service";

export default function AddService() {
  const [formData, setFormData] = useState<CreateServiceProductSchema>({
    name: "",
    description: "",
  });

  const serviceMutation = useMutation({
    mutationFn: createService,
    onSuccess: (data) => {
        console.log(data);
        alert("Service Added Successfully");
    },
    onError: () => {
        alert("Adding Failed");
    }

  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    serviceMutation.mutate(formData);
    
  };

  return (
    <div className="max-w-7xl bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
        Add New Service
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Name */}
        <div>
          <label className="block font-semibold text-sm sm:text-base md:text-lg mb-1">
            Service Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm sm:text-base md:text-lg text-black dark:text-white dark:bg-gray-700"
            placeholder="e.g. Web Hosting"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold text-sm sm:text-base md:text-lg mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm sm:text-base md:text-lg text-black dark:text-white dark:bg-gray-700"
            placeholder="Describe the service"
            rows={4}
            required
          />
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled = {serviceMutation.isPending}
            className="
              w-full sm:w-auto 
              px-6 py-2 
              bg-blue-600 text-white 
              rounded-lg hover:bg-blue-700
              text-sm sm:text-base md:text-lg
            "
          >
            Save Service
          </button>
        </div>
      </form>
    </div>
  );
}
