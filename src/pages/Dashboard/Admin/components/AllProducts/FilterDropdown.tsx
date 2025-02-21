import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const categories = ["Mountain", "Road", "Hybrid", "Electric"];

type FilterDropdownProps = {
  selectedCategories: string[];
  brands: string[];
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
};


export default function FilterDropdown({ selectedCategories, setSelectedCategories, brands, selectedBrands, setSelectedBrands }: FilterDropdownProps) {
  const handleToggleOptions = (item: string, value: string) => {
    if (item === "category") {
      setSelectedCategories((prev) => 
        prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
      );
    }
    if (item === "brand") { 
      setSelectedBrands((prev) => 
        prev.includes(value) ? prev.filter((b) => b!== value) : [...prev, value]
      );
    }

  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<"category" | "brand">("category");

  return (
    <div className="relative">
      {/* Filter Icon Button */}
      <div
        tabIndex={0}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        role="button"
        className="hover:text-primary cursor-pointer"
      >
        <FaFilter />
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-md p-4 rounded-md z-10">
          {/* Close Button */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-semibold">Filters</span>
            <button
              onClick={() => setIsDropdownOpen(false)}
              className="text-red-500 border border-red-500 px-2 rounded-md hover:bg-red-500 hover:text-white"
            >
              Close
            </button>
          </div>

          <div>
            <button
              className={`w-full text-left py-2 px-3 font-semibold border-b flex items-center justify-between ${activeSection === "category" ? "bg-gray-200" : "bg-white"}`}
              onClick={() => setActiveSection("category")}
            >
              Filter by Category
              <span className={`${activeSection === 'category' && 'rotate-180'}`}><IoIosArrowDown /></span>
            </button>
            {activeSection === "category" && (
              <ul className="mt-2 space-y-2">
                {categories.map((category) => (
                  <li key={category} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleToggleOptions("category",category)}
                      className="checkbox checkbox-info"
                    />
                    <span>{category}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-3">
            <button
              className={`w-full text-left py-2 px-3 font-semibold flex items-center justify-between ${activeSection === "brand" ? "bg-gray-200" : "bg-white"}`}
              onClick={() => setActiveSection("brand")}
            >
              Filter by Brand
              <span className={`${activeSection === 'brand' && 'rotate-180'}`}><IoIosArrowDown /></span>
            </button>
            {activeSection === "brand" && (
              <ul className="mt-2 space-y-2">
                {brands.map((brand) => (
                  <li key={brand} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleToggleOptions("brand", brand)}
                      className="checkbox checkbox-info"
                    />
                    <span>{brand}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
