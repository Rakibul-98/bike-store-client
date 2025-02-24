import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/features/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../util/verifyToken";
import loginImg from "../../assets/images/login.svg";
import toast from "react-hot-toast";
import { APIErrorType } from "../../interfaces/interfaces";

type formDataType = {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { register, handleSubmit, formState: { errors } } = useForm<formDataType>({
    defaultValues: {
      email: "user@example.com",
      password: "12345"
    }
  });
  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<formDataType> = async (data) => {
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.data.token);
      dispatch(setUser({ user, token: res.data.token }));
  
      toast.success("Login successful!");
  
      const dashboardPath = `/${user?.role?.toLowerCase()}Dashboard`;
  
      const from = location.state?.from?.pathname;
      if (from && from.includes("Dashboard")) {
        navigate(dashboardPath, { replace: true });
      } else {
        navigate(from || dashboardPath, { replace: true });
      }
    }catch (error: unknown) {
        const errorMessage =
        (error as APIErrorType)?.data?.message || "Login failed! Invalid credentials!!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="my-10 min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row max-w-4xl w-full border">
        
        <div className="md:w-1/2 hidden md:flex items-center justify-center bg-gray-50 p-8">
          <img src={loginImg} alt="Login" className="w-80" />
        </div>

        <div className="md:w-1/2 w-full p-8">
          <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
            Welcome Back! 👋
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
            <label>User email</label>
            <input
              {...register("email", { required: "Email is required" })}
              className={`${errors.email && "border-red-500 focus:outline-red-500"} w-full px-4 py-2 border border-gray-300 rounded-lg`}
              placeholder="Email"
            />
            </div>

            <div>
            <label>Password</label>
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
              Login
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
