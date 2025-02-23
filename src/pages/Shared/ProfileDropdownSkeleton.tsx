import { CgProfile } from "react-icons/cg";

export function ProfileDropdownSkeleton() {
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} className="hover:text-purple-500">
        <CgProfile />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu mt-3 z-[1] flex items-center w-44 whitespace-nowrap leading-loose text-center font-semibold uppercase text-white text-xs border-2 shadow-xl bg-base-100"
      >
        {/* Skeleton for Avatar */}
        <div className="avatar placeholder my-2 animate-pulse">
          <div className="ring-primary ring-offset-base-200 w-10 rounded-full ring ring-offset-2 bg-gray-300"></div>
        </div>

        {/* Skeleton for Name */}
        <div className="h-4 bg-gray-300 w-3/4 rounded mb-2"></div>

        {/* Skeleton for Links */}
        <div className="w-full py-1 mt-2 bg-gray-300 animate-pulse"></div>
        <div className="w-full py-1 mt-2 bg-gray-300 animate-pulse"></div>
        <div className="w-full py-1 mt-2 bg-gray-300 animate-pulse"></div>
      </ul>
    </div>
  );
}