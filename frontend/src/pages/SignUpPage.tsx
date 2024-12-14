import { useState } from "react";
import { useSelectAuthActions } from "../store/selector";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link, Navigate, Route } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import { authApi } from "../services";

const defaultFormValue = {
  fullName: "",
  email: "",
  password: "",
};

const SignUpPage = () => {
  const { signup } = useSelectAuthActions();
  const [formData, setFormData] = useState(defaultFormValue);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required!");
    if (!formData.email.trim()) return toast.error("Email is required!");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid mail format!");
    if (!formData.password.trim()) return toast.error("Password is required!");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters!");
    return true;
  };
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const success = validateForm();
      if (success) signup(formData);
    } catch (error) {}
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-x-8">
          <div className="text-center mb-8">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="size-6 text-primary"></MessageSquare>
            </div>
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content">
              Get started with your free account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label
                htmlFor="fullName"
                className="label-text label font-medium"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content"></User>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                ></input>
              </div>
            </div>
            <div className="form-control">
              <label className="label label-text font-medium" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                ></input>
              </div>
            </div>
            <div className="form-control">
              <label className="label label-text font-medium" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                ></input>
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40"></EyeOff>
                  ) : (
                    <Eye className="size-5 text-base-content/40"></Eye>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <div>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center mt-2">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Join out community"
        subtitle="Connect with friends, share moments"
      ></AuthImagePattern>
    </div>
  );
};

export default SignUpPage;
