import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Form } from "../components/ui/form";
import CustomFormField from "../components/CustomFormField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserFormValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(2, "Password must be at least 2 characters")
    .max(50, "Password must be at most 50 characters"),
});

const Login = () => {
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof UserFormValidation>) => {
    try {
      const response = await axios.post('http://localhost:4000/api/users/login', data);
      console.log('User logged in:', response.data);
      navigate('/'); // Redirect to Main.tsx
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CustomFormField
              fieldType="text"
              control={form.control}
              name="email"
              label="Email"
              placeholder="john@gmail.com"
            />
            <CustomFormField
              fieldType="password"
              control={form.control}
              name="password"
              label="Password"
              placeholder="********"
            />
            <Button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
