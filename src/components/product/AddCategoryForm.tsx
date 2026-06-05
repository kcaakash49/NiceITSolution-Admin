import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, getCategories } from "../../services/category.service";
import type { CategoriesType } from "../../types/category";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "sonner";


type FormValues = {
    name: string;
    slug: string;
    parentId?: string | null;
    image?: FileList;
};

const AddCategoryForm = () => {
    const queryClient = useQueryClient();

    // Fetch parent categories
    const { data: categories, isLoading } = useQuery<CategoriesType[]>({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    console.log(categories);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    const mutation = useMutation({
        mutationFn: createCategory,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
            toast.success("Category created successfully");
            reset();
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create category");
        }
    });

    const onSubmit = (data: FormValues) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("slug", data.slug);
        if (data.parentId) {
            formData.append("parentId", data.parentId);
        }
        if (data.image && data.image.length > 0) {
            formData.append("image", data.image[0]);
        }
        mutation.mutate(formData);
    };
    console.log(isLoading);
    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="max-w-lg rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">
                Add Category
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                {/* Name */}
                <div>
                    <label className="mb-1 block">
                        Category Name
                    </label>

                    <input
                        type="text"
                        {...register("name", {
                            required: "Name is required",
                        })}
                        className="w-full rounded border p-2"
                    />

                    {errors.name && (
                        <p className="text-sm text-red-500">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Slug */}
                <div>
                    <label className="mb-1 block">
                        Slug
                    </label>

                    <input
                        type="text"
                        {...register("slug", {
                            required: "Slug is required",
                        })}
                        className="w-full rounded border p-2"
                    />

                    {errors.slug && (
                        <p className="text-sm text-red-500">
                            {errors.slug.message}
                        </p>
                    )}
                </div>

                {/* Parent Category */}
                <div>
                    <label className="mb-1 block">
                        Parent Category
                    </label>

                    <select
                        {...register("parentId")}
                        className="w-full rounded border p-2"
                    >
                        <option value="">
                            No Parent Category
                        </option>

                        {categories?.length ? (
                            categories.map((category: CategoriesType) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))
                        ) : (
                            <option disabled>
                                No categories available
                            </option>
                        )}
                    </select>
                </div>
                <div>
                    <label className="mb-1 block">
                        Category Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        className="w-full rounded border p-2"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="rounded bg-black px-4 py-2 text-white"
                >
                    {mutation.isPending
                        ? "Creating..."
                        : "Create Category"}
                </button>
            </form>
        </div>
    );
};

export default AddCategoryForm;