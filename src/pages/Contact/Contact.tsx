import { useForm, SubmitHandler } from "react-hook-form";
import img from '../../assets/images/contact.svg';

type FormInputs = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log("Form Data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert("Message sent successfully!");
    reset(); // Reset the form after submission
  };

  return (
    <div className="min-h-[calc(100vh-90px)] flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-xl flex flex-col md:flex-row">
        {/* Left Side: Image */}
        <div className="md:w-1/2 hidden md:flex items-center justify-center bg-gradient-to-l from-blue-400 rounded-l-xl">
          <img
            src={img} // Replace with your image
            alt="Contact Us"
            className="w-full h-auto rounded-l-xl"
          />
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-gray-900 text-center">Contact Us</h2>
          <p className="text-gray-600 text-center mt-2">We’d love to hear from you!</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Enter your name"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
                })}
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                {...register("message", { required: "Message is required", minLength: { value: 10, message: "Message should be at least 10 characters" } })}
                rows={4}
                placeholder="Type your message here..."
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

