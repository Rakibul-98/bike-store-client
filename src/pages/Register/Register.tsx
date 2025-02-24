import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "../../redux/features/auth/authApi";
import registerImage from "../../assets/images/register.svg";
import toast from "react-hot-toast";
import { APIErrorType } from "../../interfaces/interfaces";

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [registration] = useRegistrationMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await registration(data).unwrap();

      if (res?.success || res?.user) { 
        toast.success("Registration successful!");
        navigate("/login");
        reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error: unknown) {
      const errorMessage =
      (error as APIErrorType)?.data?.message || "Something went wrong!!Try again later";
    toast.error(errorMessage);
  }
  };

  return (
    <div className="my-10 min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row max-w-4xl w-full border">
        
        <div className="md:w-1/2 w-full p-8">
          <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
            Create an Account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
            <label >User Name</label>
            <input
              {...register("user_name", { required: "Username is required" })}
              className={`${errors.user_name && "border-red-500 focus:outline-red-500"} w-full px-4 py-2 border border-gray-300 rounded-lg`}
              placeholder="Username"
            />
            </div>

            <div>
            <label >Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              className={`${errors.email && "border-red-500 focus:outline-red-500"} w-full px-4 py-2 border border-gray-300 rounded-lg`}
              placeholder="Email"
            />
            </div>

            <div>
            <label >Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className={`${errors.password && "border-red-500 focus:outline-red-500"} w-full px-4 py-2 border border-gray-300 rounded-lg`}
              placeholder="Password"
            />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Register
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>

        <div className="md:w-1/2 hidden md:flex items-center justify-center bg-gray-50 p-8">
          <img src={registerImage} alt="Register" className="w-80" />
        </div>
      </div>
    </div>
  );
}
