import { useState, useMemo } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useGetAllProductsQuery } from "../../../../../redux/features/products/productsApi";
import DeleteConfirmModal from "./DeleteConfirmModal";
import UpdateProductModal from "./UpdateProductModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TableSkeleton } from "../../../shared/TableSkeleton";
import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import FilterDropdown from "./FilterDropdown";
import AddProductModal from "./AddProcuctModal";
import { ItemType } from "../../../../../interfaces/interfaces";

export default function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const { register, handleSubmit } = useForm();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | "">("");
  const [sort, setSort] = useState<{ field: string; order: "asc" | "desc" } | null>({
    field: "name",
    order: "asc",
  });
  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const brands: string[] = [];

  const query = useMemo(() => {
    const filters = [];

    if (selectedCategories.length > 0) {
      selectedCategories.forEach((category) => {
        filters.push({ name: "category", value: category });
      });
    }

    if (sort) {
      if (sort.field === "name") {
        filters.push({ name: "sortBy", value: sort.order === "asc" ? "name" : "-name" });
      }
      if (sort.field === "price") {
        filters.push({ name: "sortBy", value: sort.order === "asc" ? "price" : "-price" });
      }
      if (sort.field === "available_quantity") {
        filters.push({ name: "sortBy", value: sort.order === "asc" ? "available_quantity" : "-available_quantity" });
      }
    }

    if (currentPage) {
      filters.push({ name: "page", value: currentPage });
    }

    if (search) {
      filters.push({ name: "search", value: search.search });
    }

    return filters;
  }, [selectedCategories, sort, currentPage, search]);

  const { data, isLoading, error } = useGetAllProductsQuery(query);
  const numOfPages = Math.ceil(data?.data?.totalData / itemsPerPage);

  if (isLoading) return <TableSkeleton />;
  if (error) return <p>Failed to load products.</p>;

  const allProducts = data?.data?.result || [];

  const handleSort = (field: string) => {
    setSort((prevSort) => {
      if (prevSort?.field === field) {
        return { field, order: prevSort.order === "asc" ? "desc" : "asc" };
      }
      return { field, order: "asc" };
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const search = data.search;
    setSearch(search);
  };

  const handleDelete = (productId: string) => {
    const modal = document.getElementById('delete-confirm-modal') as HTMLDialogElement;
    modal?.showModal();
    setSelectedProductId(productId);
  };

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "category", label: "Category", filterable: true },
    { key: "price", label: "Price", sortable: true },
    { key: "available_quantity", label: "Stock", sortable: true },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <AddProductModal />
      <UpdateProductModal productId={selectedProductId} />
      <DeleteConfirmModal productId={selectedProductId} />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold">All Products</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-between bg-gray-100 rounded-full w-full md:w-60">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full md:w-40 bg-transparent px-3 focus:outline-none"
              {...register("search", { required: false })}
            />
            <input
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full cursor-pointer"
              type="submit"
              value="Search"
            />
          </form>
          <button
            onClick={() => {
              const modal = document.getElementById('add-product-modal') as HTMLDialogElement;
              modal?.showModal();
            }}
            className="text-2xl hover:text-primary"
          >
            <IoAddCircleOutline />
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                >
                  <div className="inline-flex items-center gap-2">
                    <p>{column.label}</p>
                    {column.sortable && (
                      <div className="flex text-base">
                        <span
                          onClick={() => handleSort(column.key)}
                          className={`${
                            sort?.field === column.key && sort.order === "asc"
                              ? "text-red-500"
                              : ""
                          } cursor-pointer`}
                        >
                          <BiArrowToBottom />
                        </span>
                        <span
                          onClick={() => handleSort(column.key)}
                          className={`${
                            sort?.field === column.key && sort.order === "desc"
                              ? "text-red-500"
                              : ""
                          } cursor-pointer`}
                        >
                          <BiArrowToTop />
                        </span>
                      </div>
                    )}
                    {column.filterable && (
                      <FilterDropdown
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        brands={brands}
                        selectedBrands={selectedBrands}
                        setSelectedBrands={setSelectedBrands}
                      />
                    )}
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {allProducts.map((product: ItemType) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-sm text-gray-700">
                    {column.key === "name" ? (
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-10 w-10">
                            <img src={product.product_image} alt={product.name} />
                          </div>
                        </div>
                        <div className="font-semibold">{product.name}</div>
                      </div>
                    ) : column.key === "available_quantity" ? (
                      <span
                        className={`px-2 py-1 text-white ${
                          product.available_quantity < 20 ? "bg-red-500" : "bg-green-500"
                        }`}
                      >
                        {product.available_quantity}
                      </span>
                    ) : (
                      product[column.key as keyof typeof product]
                    )}
                  </td>
                ))}
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedProductId(product._id);
                        const modal = document.getElementById('update-product-modal') as HTMLDialogElement;
                        modal?.showModal();
                      }}
                      className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-xl text-red-500 hover:text-red-700"
                    >
                      <BsTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Table (Stacked Layout) */}
      <div className="lg:hidden space-y-4">
        {allProducts.map((product: ItemType) => (
          <div key={product._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-10 w-10">
                    <img src={product.product_image} alt={product.name} />
                  </div>
                </div>
                <div className="font-semibold">{product.name}</div>
              </div>
              <p className="text-sm text-gray-600">Category: {product.category}</p>
              <div className="flex justify-between">
              <p className="text-sm text-gray-600">Price: ${product.price}</p>
              <p className="text-sm text-gray-600">
                Stock:{" "}
                <span
                  className={`px-[2px] text-white ${
                    product.available_quantity < 20 ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {product.available_quantity}
                </span>
              </p>
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedProductId(product._id);
                    const modal = document.getElementById('update-product-modal') as HTMLDialogElement;
                    modal?.showModal();
                  }}
                  className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Products Found */}
      {allProducts.length < 1 && (
        <div className="flex justify-center items-center text-center mt-20">
          <div>
            <h2>No products found. Please add some in the admin dashboard.</h2>
            <button
              onClick={() => {
                const modal = document.getElementById('add-product-modal') as HTMLDialogElement;
                modal?.showModal();
              }}
              className="my-2 border border-purple-500 rounded-md px-3 py-1 font-medium hover:bg-purple-500"
            >
              Create Product
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      {numOfPages > 1 && (
        <div className="flex justify-end my-3 items-end h-full">
          <div className="join gap-2">
            {Array.from({ length: numOfPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`join-item px-3 py-1 border ${
                  currentPage === page ? "bg-purple-500 text-white" : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}