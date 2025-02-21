import { IoAddCircleOutline } from "react-icons/io5";
import { useDeleteProductMutation, useGetAllProductsQuery } from "../../../../../redux/features/products/productsApi";
import { useState, useMemo } from "react";
import { BsTrash } from "react-icons/bs";
import { TProduct } from "../../../../Products/Products";
import AddProductModal from "./AddProcuctModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import FilterDropdown from "./FilterDropdown";
import UpdateProductModal from "./UpdateProductModal";
import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";

export default function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const [sort, setSort] = useState<{ field: string; order: "asc" | "desc" } | null>(
    {
      field: "name",
      order: "asc"
    }
  );

  const query = useMemo(() => {
    const filters = [];

    if (selectedCategories.length > 0) {
      selectedCategories.forEach(category => {
        filters.push({ name: "category", value: category });
      });
    }

    if (sort) {
      if (sort.field === 'name') {
        if (sort.order === 'asc') {
          filters.push({ name: "sortBy", value: "name" });
        } else {
          filters.push({ name: "sortBy", value: "-name" });
        }
      }
      if (sort.field === 'price') {
        if (sort.order === 'asc') {
          filters.push({ name: "sortBy", value: "price" });
        } else {
          filters.push({ name: "sortBy", value: "-price" });
        }
      }
    }

    if (currentPage) {
      filters.push({ name: "page", value: currentPage });
    }

    return filters;
  }, [selectedCategories, sort, currentPage]);

  const { data, isLoading, error } = useGetAllProductsQuery(query);

  console.log(data?.data?.totalData)
  const [deleteProduct] = useDeleteProductMutation();

  const numOfPages = Math.ceil((data?.data?.totalData)/itemsPerPage);

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Failed to load products.</p>;

  const allProducts = data?.data?.result || [];

  const handleSort = (field: "name" | "price") => {
    setSort(prevSort => {
      if (prevSort?.field === field) {
        return { field, order: prevSort.order === "asc" ? "desc" : "asc" };
      }
      return { field, order: "asc" };
    });
  };

  const handleDelete = (productId: string) => {
    document.getElementById('delete-confirm-modal')?.showModal();
    setSelectedProductId(productId);
  };

  return (
    <div className="">
      <AddProductModal />
      <UpdateProductModal productId={selectedProductId} />
      <DeleteConfirmModal productId={selectedProductId} deleteProduct={deleteProduct} />

      <div className="flex justify-end items-center gap-5 px-4 pt-2">
        <h1 className="me-auto font-semibold">All Products</h1>
        <button onClick={() => document.getElementById('add-product-modal')?.showModal()} className="text-2xl hover:text-primary">
          <IoAddCircleOutline />
        </button>
      </div>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th>
                <div className="inline-flex items-center gap-2">
                  <p>Name</p>
                  <div className="flex text-base">
                    <span
                      onClick={() => handleSort("name")}
                      className={`${sort?.field === "name" && sort.order === "asc" ? "text-red-500" : ""} cursor-pointer`}
                    >
                      <BiArrowToBottom />
                    </span>
                    <span
                      onClick={() => handleSort("name")}
                      className={`${sort?.field === "name" && sort.order === "desc" ? "text-red-500" : ""} cursor-pointer`}
                    >
                      <BiArrowToTop />
                    </span>
                  </div>
                </div>
              </th>

              {/* Category Column with Filter */}
              <th>
                <div className="inline-flex items-center gap-2">
                  <p>Category</p>
                  <FilterDropdown selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
                </div>
              </th>

              {/* Price Column with Sorting */}
              <th>
                <div className="inline-flex items-center gap-2">
                  <p>Price</p>
                  <div className="flex text-base">
                    <span
                      onClick={() => handleSort("price")}
                      className={`${sort?.field === "price" && sort.order === "asc" ? "text-red-500" : ""} cursor-pointer`}
                    >
                      <BiArrowToBottom />
                    </span>
                    <span
                      onClick={() => handleSort("price")}
                      className={`${sort?.field === "price" && sort.order === "desc" ? "text-red-500" : ""} cursor-pointer`}
                    >
                      <BiArrowToTop />
                    </span>
                  </div>
                </div>
              </th>

              {/* Stock Column with Sorting */}
              <th>
                <div className="inline-flex items-center gap-2">
                  <p>Stock</p>
                </div>
              </th>

              <th className="flex justify-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {allProducts.map((product: TProduct) => (
              <tr key={product._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-10 w-10">
                        <img src={product.product_image} alt={product.name} />
                      </div>
                    </div>
                    <div className="font-semibold">{product.name}
                      </div>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.available_quantity}</td>
                <td className="flex justify-center">
                  <button
                    onClick={() => {
                      setSelectedProductId(product._id);
                      document.getElementById('update-product-modal')?.showModal();
                    }}
                    className="btn text-white hover:text-black btn-ghost btn-xs bg-purple-500"
                  >
                    Update
                  </button>
                </td>
                <td className=" text-end">
                  <button onClick={() => handleDelete(product._id)} className="text-xl text-red-500 hover:text-red-700">
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
                onClick={() => document.getElementById('add-product-modal')?.showModal()}
                className="my-2 border border-purple-500 rounded-md px-3 py-1 font-medium hover:bg-purple-500"
              >
                Create Product
              </button>
            </div>
          </div>
        )}
      </div>
      {/* <div className="flex justify-end">
        <div className="join gap-3">
          <button className="join-item">1</button>
          <button className="join-item btn-active">2</button>
          <button className="join-item">3</button>
          <button className="join-item">4</button>
        </div> 
      </div> */}
      {numOfPages > 1 && (
        <div className="flex justify-end my-3 items-end h-full">
          <div className="join gap-2">
            {Array.from({ length: numOfPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`join-item px-3 py-1 border ${currentPage === page ? "bg-purple-500 text-white" : ""
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
