import { useEffect, useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { useCreateProductMutation, useGetProductByIdQuery, useUpdateProductMutation } from "../../../../../redux/features/products/productsApi";
import toast from "react-hot-toast";

export default function ProductForm({ action, productId }: { action: string; productId: string | null }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const [imagePreview, setImagePreview] = useState(false);

  const image = watch("product_image");

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const { data: productData, isLoading } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });
  useEffect(() => {
    if (productData) {
      setValue("name", productData.data.name);
      setValue("category", productData.data.category);
      setValue("brand", productData.data.brand);
      setValue("price", productData.data.price);
      setValue("description", productData.data.description);
      setValue("available_quantity", productData.data.available_quantity);
      setValue("product_image", productData.data.product_image);
      setImagePreview(productData.product_image);

      if (productData.data.features?.length) {
        reset({ features: productData.data.features });
      }
    }
  }, [productData, setValue, reset]);

  const onSubmit = async (data: FieldValues) => {
    
    if (action === "add") {
      const updatedData = {
        ...data,
        available_quantity: Number(data.available_quantity),
        price: Number(data.price)
      }
      try {
        const res = await createProduct(updatedData).unwrap();
        toast.success("New product added successfully");
        reset();
        setImagePreview(false);
      } catch (error) {
        toast.error(error?.data?.message || "Something went wrong.");
      }
      document.getElementById("add-product-modal")?.close();
    }
    if (action === "update") {
      const updatedData = {
        ...data,
        _id: productId,
        available_quantity: Number(data.available_quantity),
        price: Number(data.price)
      }
      try {
        const res = await updateProduct(updatedData).unwrap();
        toast.success("Product updated successfully");
        reset();
        setImagePreview(false);
      } catch (error) {
        toast.error(error?.data?.message || "Something went wrong.");
      }
      document.getElementById("update-product-modal")?.close();
    }
  };

  if (isLoading) return <p>Loading product data...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 capitalize">{action} a Bike</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-2">
          <input {...register("name", { required: true })} className={`${errors.name && "border-red-500 focus:outline-red-500"} border p-1 w-full`} placeholder="Bike Name" />
          <select {...register("category", { required: true })} className={`${errors.category && "border-red-500 focus:outline-red-500"} border p-1 w-full`}>
            <option value="">Select Category</option>
            <option value="Mountain">Mountain</option>
            <option value="Road">Road</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        <div className="flex gap-2">
          <input {...register("brand", { required: true })} className={`${errors.brand && "border-red-500 focus:outline-red-500"} border p-1 w-full`} placeholder="Brand" />
          <input type="number" {...register("price", { required: true})} placeholder="Price" className={`${errors.price && "border-red-500 focus:outline-red-500"} border p-1 w-full`} />
        </div>

        <div className="flex gap-2 items-start">
          <textarea {...register("description", { required: true })} className={`${errors.description && "border-red-500 focus:outline-red-500"} border p-1 w-full`} placeholder="Bike description"></textarea>
          <input type="number" {...register("available_quantity", { required: true })} placeholder="Quantity" className={`${errors.available_quantity && "border-red-500 focus:outline-red-500"} border p-1 w-full`} />
        </div>

        <div className="flex gap-2">
          <div className="w-1/2">
            <input
              {...register("product_image", { required: true })}
              className={`${errors.product_image && "border-red-500 focus:outline-red-500"} border p-1 w-full`}
              placeholder="Image URL"
              onChange={(e) => {
                // setValue("product_image", e.target.value);
                setImagePreview(true);
              }}
            />
            {imagePreview && <img src={image} alt="Bike Preview" className="w-full h-40 object-cover mt-2 rounded-md" />}
          </div>

          <div className="w-1/2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mb-2">
                <input {...register(`features.${index}`, { required: true })} className={`${errors.features && "border-red-500 focus:outline-red-500"} border p-1 w-full`} placeholder="Feature" />
                {index > 0 && (
                  <button type="button" className="border-2 border-red-400 px-2 text-red-400" onClick={() => remove(index)}>
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="" onClick={() => append("")}>
              + Add More Feature
            </button>
          </div>
        </div>

        <input className="btn w-full btn-primary" type="submit" />
      </form>
    </div>
  );
}
