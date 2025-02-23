import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import FilterDropdown from "../Admin/components/AllProducts/FilterDropdown";
import { TProduct } from "../../Products/Products";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
}

interface TableProps {
  data: any;
  columns: Column[];
  sort: { field: string; order: "asc" | "desc" } | null;
  onSort: (field: string) => void;
  selectedCategories: string[];
  onFilterChange: (categories: string[]) => void;
  onDelete: (productId: string) => void;
  onUpdate: (productId: string) => void;
}

export default function Table({
  data,
  columns,
  sort,
  onSort,
  selectedCategories,
  onFilterChange,
  onDelete,
  onUpdate,
}: TableProps) {
  return (
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
                      onClick={() => onSort(column.key)}
                      className={`${
                        sort?.field === column.key && sort.order === "asc"
                          ? "text-red-500"
                          : ""
                      } cursor-pointer`}
                    >
                      <BiArrowToBottom />
                    </span>
                    <span
                      onClick={() => onSort(column.key)}
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
                    setSelectedCategories={onFilterChange}
                  />
                )}
              </div>
            </th>
          ))}
          <th className="flex justify-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((product) => (
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
                  product[column.key as keyof TProduct]
                )}
              </td>
            ))}
            <td>
              <button
                onClick={() => onUpdate(product._id)}
                className="btn text-white hover:text-black btn-ghost btn-xs bg-purple-500"
              >
                Update
              </button>
            </td>
            <td className="text-end">
              <button
                onClick={() => onDelete(product._id)}
                className="text-xl text-red-500 hover:text-red-700"
              >
                <BsTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
