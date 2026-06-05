import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { getCategoriesRoot } from '../../services/category.service';
import LoadingSpinner from '../LoadingSpinner';
import { createProduct } from '../../services/product.service';
import { toast } from 'sonner';

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  children?: Category[];
}

interface ProductFormInputs {
  name: string;
  sku: string;
  brand?: string;
  categoryId: string;       
  parentCategoryId: string; 
  subCategoryId: string;    
  image: FileList | null;
}

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormInputs>({
    defaultValues: {
      name: '',
      sku: '',
      brand: '',
      categoryId: '',
      parentCategoryId: '',
      subCategoryId: '',
      image: null,
    },
  });

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories-root'],
    queryFn: getCategoriesRoot, 
  });

  const { mutate, isPending } = useMutation({
    mutationFn:createProduct,
    onSuccess: (data) => {
        toast.success(data.message || "Product Added!!!");
        setSelectedFileName(null);
        reset();
    },
    onError: (error) => {
        toast.error(error.message || "Couldn't add product")
    }
  })

  const selectedParentId = useWatch({ control, name: 'parentCategoryId' });
  const selectedSubCategoryId = useWatch({ control, name: 'subCategoryId' });

  const parentCategories = useMemo(() => {
    if (!categories) return [];
    return categories.filter((cat: Category) => !cat.parentId);
  }, [categories]);

  const activeParentCategory = useMemo(() => {
    if (!selectedParentId || !parentCategories) return null;
    return parentCategories.find((cat) => cat.id === selectedParentId) || null;
  }, [selectedParentId, parentCategories]);

  const handleParentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const parentId = e.target.value;
    setValue('parentCategoryId', parentId);
    setValue('subCategoryId', '');
    setValue('categoryId', '', { shouldValidate: false });

    if (!parentId) return;

    const targetParent = parentCategories.find((cat) => cat.id === parentId);
    if (targetParent) {
      if (!targetParent.children || targetParent.children.length === 0) {
        setValue('categoryId', parentId, { shouldValidate: true });
      } else {
        setValue('categoryId', '', { shouldValidate: true });
      }
    }
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subId = e.target.value;
    setValue('subCategoryId', subId);

    if (subId) {
      setValue('categoryId', subId, { shouldValidate: true });
    } else {
      setValue('categoryId', '', { shouldValidate: true });
    }
  };

  // Triggers smoothly only when native manual file picker picks an asset
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFileName(e.target.files[0].name);
      clearErrors('image'); // Clean out validation state alerts instantly
    } else {
      setSelectedFileName(null);
    }
  };

  const onSubmit = async (data: ProductFormInputs) => {
    const { parentCategoryId, subCategoryId, ...payload } = data;
    
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('sku', payload.sku);
    formData.append('categoryId', payload.categoryId);
    if (payload.brand) formData.append('brand', payload.brand);
    
    if (payload.image && payload.image.length > 0) {
      formData.append('image', payload.image[0]);
    }

    mutate(formData);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const hasSubCategories = !!(activeParentCategory?.children && activeParentCategory.children.length > 0);

  const labelStyle = "block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5";
  const inputStyle = "w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 p-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 shadow-sm";
  const errorStyle = "text-red-500 dark:text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1";

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="w-full max-w-7xl space-y-6 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-2xl border border-gray-100 dark:border-gray-900 transition-colors duration-300"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Add Trading Product
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Fill out the details below to register a new system item.
        </p>
      </div>

      {/* Product Name */}
      <div>
        <label className={labelStyle}>Product Name</label>
        <input
          type="text"
          placeholder="e.g., Enterprise Core Router"
          {...register('name', { required: 'Product name is required' })}
          className={inputStyle}
        />
        {errors.name && <p className={errorStyle}>⚠️ {errors.name.message}</p>}
      </div>

      {/* SKU */}
      <div>
        <label className={labelStyle}>SKU Code</label>
        <input
          type="text"
          placeholder="e.g., RT-24GHZ-01"
          {...register('sku', { required: 'SKU code is required' })}
          className={inputStyle}
        />
        {errors.sku && <p className={errorStyle}>⚠️ {errors.sku.message}</p>}
      </div>

      {/* Brand */}
      <div>
        <label className={labelStyle}>Brand <span className="text-gray-400 font-normal">(Optional)</span></label>
        <input
          type="text"
          placeholder="e.g., Cisco, TP-Link"
          {...register('brand')}
          className={inputStyle}
        />
      </div>

      <input
        type="hidden"
        {...register('categoryId', { required: 'You must complete the category selection process' })}
      />

      {/* CATEGORY SELECTORS SECTION */}
      <div className="space-y-4 border-t border-gray-100 dark:border-gray-900 pt-5">
        <label className={labelStyle}>Category Classification</label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="w-full">
            <select
              value={selectedParentId}
              onChange={handleParentChange}
              className={`${inputStyle} appearance-none cursor-pointer`}
              style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
            >
              <option value="" className="bg-white dark:bg-gray-950">Select Category</option>
              {parentCategories.map((cat: Category) => (
                <option key={cat.id} value={cat.id} className="bg-white dark:bg-gray-950">
                  {cat.name} {cat.children && cat.children.length > 0 ? ' ↳' : ''}
                </option>
              ))}
            </select>
          </div>

          {selectedParentId && hasSubCategories && (
            <div className="w-full transition-all duration-300 transform translate-y-0 scale-100">
              <select
                value={selectedSubCategoryId}
                onChange={handleSubCategoryChange}
                className={`${inputStyle} appearance-none cursor-pointer border-emerald-500/40 dark:border-emerald-500/30 focus:ring-emerald-500/30`}
                style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2310b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
              >
                <option value="" className="bg-white dark:bg-gray-950">Select Subcategory</option>
                {activeParentCategory?.children?.map((subCat) => (
                  <option key={subCat.id} value={subCat.id} className="bg-white dark:bg-gray-950">
                    {subCat.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {errors.categoryId && (
          <div className="text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50/60 dark:bg-amber-950/20 p-3 rounded-xl border border-amber-200/50 dark:border-amber-900/30 flex items-start gap-2 backdrop-blur-sm">
            <span className="mt-0.5">⚠️</span>
            <span>Please select a category.</span>
          </div>
        )}
      </div>

      {/* Simplified Native Click File Upload Section */}
      <div className="space-y-2 border-t border-gray-100 dark:border-gray-900 pt-5">
        <label className={labelStyle}>Product Graphic Asset</label>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="inline-flex items-center justify-center px-4 py-2.5 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium text-xs rounded-lg cursor-pointer transition-colors border border-gray-200 dark:border-gray-800 focus-within:ring-2 focus-within:ring-emerald-500/40">
            <span>Choose Image File</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...register("image", { 
                required: 'Product image is required',
                onChange: handleFileChange 
              })}
            />
          </label>

          {selectedFileName ? (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium truncate max-w-xs bg-emerald-50/50 dark:bg-emerald-950/20 px-2.5 py-1 rounded-md border border-emerald-200/40 dark:border-emerald-900/30">
              ✓ {selectedFileName}
            </span>
          ) : (
            <span className="text-xs text-gray-400 dark:text-gray-500 italic">
              No asset selected
            </span>
          )}
        </div>
        
        {errors.image && <p className={errorStyle}>⚠️ {errors.image.message}</p>}
      </div>

      {/* Action Button */}
      <button
        type="submit"
        disabled={isPending || isSubmitting}
        className="w-full mt-2 p-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-gray-300 disabled:to-gray-300 dark:disabled:from-gray-800 dark:disabled:to-gray-800 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-600/10 dark:shadow-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950 disabled:cursor-not-allowed hover:shadow-emerald-500/20 active:scale-[0.99]"
      >
        {(isPending || isSubmitting) ? 'Processing Entry...' : 'Register Asset Item'}
      </button>
    </form>
  );
}