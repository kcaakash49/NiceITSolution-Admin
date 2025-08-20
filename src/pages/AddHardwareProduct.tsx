
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/hardware";
import AddCategoryModal from "../components/AddCategoryModal";

export default function AddHardwareProduct() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        categoryId: "",
        price: "",
        stock: "",
        length: "",
    });

    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    const { data: categories, isLoading, isError } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
        retry: false,
        staleTime: 50 * 60 * 1000,
        refetchInterval: 60 * 60 * 1000,
        refetchOnMount: data => !data
    })
    console.log(categories, isLoading, isError);

    const user = useAuthStore(state => state.user);
    console.log(user?.role);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Product Submitted:", formData);
        // TODO: send to backend
    };

    return (
        <div className="w-full">
            <div className="w-full max-w-7xl dark:bg-gray-900 bg-white md:p-10 p-4">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
                    Add New Product
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter product description"
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">
                            Category
                        </label>
                        <div className="flex items-center space-x-3">
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                className={`flex-1 px-4 py-2 rounded-lg border dark:border-gray-700 
    bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
    focus:ring-2 focus:ring-blue-500 
    ${isLoading || isError ? "opacity-60 cursor-not-allowed" : ""}`}
                            >
                                <option value="" disabled hidden>
                                    Select Category
                                </option>

                                {/* Loading state */}
                                {isLoading && (
                                    <option disabled className="text-gray-500 text-center">
                                        Loading categories...
                                    </option>
                                )}

                                {/* Error state */}
                                {isError && (
                                    <option disabled className="text-red-500 dark:text-red-500 font-semibold text-center">
                                        ⚠ Error loading categories
                                    </option>
                                )}

                                {/* Normal state */}
                                {!isLoading &&
                                    !isError &&
                                    categories?.categories?.map((cat: any) => (

                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                        

                                        
                                    ))}
                            </select>


                            {user?.role === "superadmin" && (
                                <button
                                    type="button"
                                    className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                    onClick={() => setModalOpen(true)}
                                >
                                    Add Category
                                </button>
                            )}
                        </div>

                    </div>

                    {/* Price & Stock */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                                className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                Stock
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="Enter stock quantity"
                                className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Length */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">
                            Length (if applicable)
                        </label>
                        <input
                            type="text"
                            name="length"
                            
                            value={formData.length}
                            onChange={handleChange}
                            placeholder="Enter length (e.g., 100m)"
                            className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700"
                        >
                            Save Product
                        </button>
                    </div>
                </form>
            </div>
            {
                isModalOpen && <AddCategoryModal isOpen = {isModalOpen} onClose={() => setModalOpen(false)}/>
            }
        </div>
    );
}
