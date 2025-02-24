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
    <div>
      <AddProductModal />
      <UpdateProductModal productId={selectedProductId} />
      <DeleteConfirmModal productId={selectedProductId} />

      <div className="flex justify-end items-center gap-5 px-4 pt-2">
        <h1 className="me-auto font-semibold">All Products</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-between bg-gray-100 rounded-full w-60">
          <input
            type="text"
            placeholder="Search here..."
            className="w-40 bg-transparent px-3 focus:outline-none"
            {...register("search", { required: false })}
          />
          <input className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full cursor-pointer" type="submit" value="Search" />
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

      <div>
        <table className="table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>
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
              <th className="flex justify-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product:ItemType) => (
              <tr key={product._id}>
                {columns.map((column) => (
                  <td key={column.key}>
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
                <td>
                  <button
                    onClick={() => {
                      setSelectedProductId(product._id);
                      const modal = document.getElementById('update-product-modal') as HTMLDialogElement;
            modal?.showModal();
                    }}
                    className="btn text-white hover:text-black btn-ghost btn-xs bg-purple-500"
                  >
                    Update
                  </button>
                </td>
                <td className="text-end">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-xl text-red-500 hover:text-red-700"
                  >
                    <BsTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
      </div>

      {numOfPages > 1 && (
        <div className="flex justify-end my-3 items-end h-full">
          <div className="join gap-2">
            {Array.from({ length: numOfPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`join-item px-3 py-1 border ${currentPage === page ? "bg-purple-500 text-white" : ""}`}
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