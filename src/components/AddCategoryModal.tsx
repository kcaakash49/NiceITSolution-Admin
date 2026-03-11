import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createCategory } from "../api/hardware";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void; // optional callback to update categories list
}

export default function AddCategoryModal({ isOpen, onClose }: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const [isLengthNeeded, setIsLengthNeeded] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [showValidation, setValidation] = useState(false);
  const queryClient = useQueryClient();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image){
      setValidation(true);
      return;
    }

    setValidation(false);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("isLengthNeeded", String(isLengthNeeded));
    if (image) {
      formData.append("image", image);
    }
    categoryMutation.mutate(formData);
  };

  const categoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      alert(data.message);
      queryClient.invalidateQueries({
        queryKey: ['categories']
      });
      onClose();

    },
    onError: (data) => {
      alert(data.message);
    }
  })

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Add Category
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category name */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isLengthNeeded}
              onChange={() => setIsLengthNeeded(!isLengthNeeded)}
              id="lengthNeeded"
              className="h-4 w-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-600 rounded"
            />
            <label htmlFor="lengthNeeded" className="text-gray-700 dark:text-gray-300">
              Is Length Needed
            </label>
          </div>

          {/* Single Image Upload */}
          <div className="flex flex-col">
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Category Image</label>

            <div className="flex items-center space-x-4">
              {/* Styled button */}
              <label
                htmlFor="category-image"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                {image ? "Change Image" : "Choose Image"}
              </label>

              {/* File input */}
              <input
                id="category-image"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="hidden"
                
              />

              {/* Preview */}
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Category"
                  className="w-16 h-16 object-cover rounded-md border dark:border-gray-600"
                />
              )}
            </div>

            {/* Validation message */}
            {!image && showValidation && (
              <span className="text-red-500 text-sm mt-1">
                Please select a file
              </span>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={categoryMutation.isPending}
              className="px-4 py-2 rounded-lg border dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={categoryMutation.isPending}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {categoryMutation.isPending ? "Adding..." : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
