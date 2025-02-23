import notFoundImg from "../../assets/images/notFound.svg";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4 gap-5">
      <img
        src={notFoundImg}
        alt="Page Not Found"
        className="w-64 md:w-80 lg:w-96 mx-auto mb-10"
      />
      <Link
        to="/"
        className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
      >
        Back to Homepage
      </Link>
    </div>
  );
}
