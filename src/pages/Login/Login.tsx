import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/features/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../util/veriftToken";

export default function Login() {

  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "sadiya@example.com",
      password: "12345"
    }
  });
  const [login] = useLoginMutation();
  
  // console.log("data", data);
  // console.log("isError", isError);

  const onSubmit = async (data: FieldValues) => {
    const res = await login(data).unwrap();	
    const user = verifyToken(res.data.token);
    // console.log(user)
    dispatch(setUser({
      user: user,
      token: res.data.token
    }));
  }

  return (
    <div>
        <h1>Login Page</h1>
        <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
      <input className=" border-2" {...register("email", { required: true })} />
      {errors.email && <span>This field is required</span>}
      <input className=" border-2" {...register("password", { required: true })} />
      {errors.password && <span>This field is required</span>}
      
      <input className="btn" type="submit" />
    </form>
      <Link to="/register">Register</Link>
    </div>
  )
}
