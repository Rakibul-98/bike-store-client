import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import { useAppDispatch } from "../../redux/features/hooks";
import { useRegistrationMutation } from "../../redux/features/auth/authApi";

export default function Register() {

  // const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      user_name: "User 1",
      email: "user1@example.com",
      password: "12345"
    }
  });

  const [registration] = useRegistrationMutation();

  const onSubmit = async (data: FieldValues) => {
    await registration(data);
    console.log(data)
    // dispatch(registerUser(data));
  }
  
  return (
    <div>
      <h1>Register</h1>
      <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
        <input className="border-2" {...register("user_name", { required: true })} />
      {errors.user_name && <span>This field is required</span>}
      <input className=" border-2" {...register("email", { required: true })} />
      {errors.email && <span>This field is required</span>}
      <input className=" border-2" {...register("password", { required: true })} />
      {errors.password && <span>This field is required</span>}
      
      <input className="btn" type="submit" />
    </form>
      <Link to="/login">Login</Link>
    </div>
  )
}
