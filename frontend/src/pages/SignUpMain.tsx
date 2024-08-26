import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "../components/ui/button";
import CustomFormField from "../components/CustomFormField";
import { useNavigate } from "react-router-dom";

export const UserFormValidation = z.object({
  name: z.string().min(1, "Name is required"),
  number: z.string().min(1, "Number is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  pincode: z.string().min(1, "Pincode is required"),
  area: z.string().min(1, "Area is required"),
  street: z.string().min(1, "Street is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(2, "Password must be at least 2 characters")
    .max(50, "Password must be at most 50 characters"),
});

const SignUpMain = () => {
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      number: "",
      state: "",
      city: "",
      pincode: "",
      area: "",
      street: "",
      email: "",
      password: "",
    },
  });
  
  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof UserFormValidation>) => {
    try {
      const response = await axios.post('http://localhost:4000/api/users/register', data);
      console.log('User registered:', response.data);
      navigate('/login'); // Redirect after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Sign Up</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CustomFormField fieldType="text" control={form.control} name="name" label="Name" placeholder="John Doe" />
          <CustomFormField fieldType="text" control={form.control} name="number" label="Number" placeholder="1234567890" />
          <CustomFormField fieldType="text" control={form.control} name="state" label="State" placeholder="California" />
          <CustomFormField fieldType="text" control={form.control} name="city" label="City" placeholder="Los Angeles" />
          <CustomFormField fieldType="text" control={form.control} name="pincode" label="Pincode" placeholder="90001" />
          <CustomFormField fieldType="text" control={form.control} name="area" label="Area" placeholder="Downtown" />
          <CustomFormField fieldType="text" control={form.control} name="street" label="Street" placeholder="Main St" />
          <CustomFormField fieldType="text" control={form.control} name="email" label="Email" placeholder="john@example.com" />
          <CustomFormField fieldType="password" control={form.control} name="password" label="Password" placeholder="********" />
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpMain;
