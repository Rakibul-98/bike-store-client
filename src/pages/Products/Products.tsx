import { useMemo, useState } from "react";
import { useGetAllProductsQuery } from "../../redux/features/products/productsApi";
import FilterDropdown from "../Dashboard/Admin/components/AllProducts/FilterDropdown";
import ProductCard from "./ProductCard";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";
import noProductImg from '../../assets/images/no-product.svg';
import { ItemType } from "../../interfaces/interfaces";

export default function Products() {
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [search, setSearch] = useState("");
  const { register, handleSubmit } = useForm();
  const [sort, setSort] = useState<{ field: string; order: "asc" | "desc" } | null>({
    field: "price",
    order: "desc",
  });

  const query = useMemo(() => {
    const filters = [];

    if (selectedCategories.length > 0) {
      selectedCategories.forEach((category) => {
        filters.push({ name: "category", value: category });
      });
    }
    if (selectedBrands.length > 0) {
      selectedBrands.forEach((brand) => {
        filters.push({ name: "brand", value: brand });
      });
    }

    if (sort) {
      if (sort.field === "price") {
        if (sort.order === "asc") {
          filters.push({ name: "sortBy", value: "price" });
        } else {
          filters.push({ name: "sortBy", value: "-price" });
        }
      }
    }

    if (currentPage) {
      filters.push({ name: "page", value: currentPage });
    }

    if (itemsPerPage) {
      filters.push({ name: "limit", value: itemsPerPage });
    }

    if (search) {
      filters.push({ name: "search", value: search.search });
    }

    return filters;
  }, [selectedCategories, currentPage, itemsPerPage, search, sort, selectedBrands]);

  const { data, isLoading, error } = useGetAllProductsQuery(query);

  const validItemsPerPage = itemsPerPage >= 4 ? itemsPerPage : 8;
  const numOfPages = Math.ceil(data?.data?.totalData / validItemsPerPage);

  useMemo(() => {
    if (data?.data?.result) {
      const uniqueBrands = Array.from(
        new Set(data.data.result.map((product: ItemType) => product.brand))
      ) as string[];
      setBrands(uniqueBrands);
    }
  }, [data]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
      const search = data.search;
      setSearch(search);
    };

  const handleSort = (field: "price") => {
    setSort((prevSort) => {
      if (prevSort?.field === field) {
        return { field, order: prevSort.order === "asc" ? "desc" : "asc" };
      }
      return { field, order: "asc" };
    });
  };

  return (
    <div className="mb-5 min-h-[70vh] text-sm md:text-base">
      <div className="flex items-center justify-end gap-5 my-5">
        <h1 className="hidden md:block text-xl font-semibold me-auto">Available Products</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-between bg-gray-100 rounded-full w-[150px] md:w-44">
          <input
            type="text"
            placeholder="Search here..."
            className="w-24 md:w-28 bg-transparent px-3 focus:outline-none"
            {...register("search", { required: false })}
          />
          <input className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full cursor-pointer" type="submit" value="Search" />
        </form>
        <div className="flex items-center">
          <span className="me-1">Price:</span>
          <div className="border border-red-500 flex p-[2px]">
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
        <div>
          <FilterDropdown
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            brands={brands}
          />
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        // Skeleton Loader
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="p-4 border rounded-lg shadow-md animate-pulse"
            >
              <div className="h-28 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 w-28 my-2 rounded"></div>
              <div className="h-4 bg-gray-300 w-full rounded"></div>
              <div className="h-4 bg-gray-300 w-full mt-1 rounded"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-center col-span-full">Failed to load products.</p>
      ) : Array.isArray(data?.data?.result) && data?.data?.result.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.data?.result.map((product: ItemType) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      ) : (
        // Full-width "No Products Available" section
        <div className="my-10 w-full flex flex-col justify-center items-center">
                  <img className="max-w-md" src={noProductImg} alt="" />
                  <p className="text-center col-span-full">No products available right now. <br /> Come back later...</p>
          </div>
      )}

      {/* Pagination */}
      <div className="flex justify-end items-center my-3 gap-3">
        <label className="capitalize">Items per page: </label>
        <input
          onBlur={(e) => setItemsPerPage(Number(e.target.value))}
          type="text"
          placeholder="8"
          className={`border focus:outline-none w-10 text-center rounded-md py-1`}
        />
        {numOfPages > 1 && (
          <div className="">
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
    </div>
  );
}