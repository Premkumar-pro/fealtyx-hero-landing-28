import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialAuthButtons, SocialEmailDivider } from "@/components/auth/SocialAuthButtons";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignInPage = () => {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Validation logic
  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  // Simulate login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors and try again.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);

    // Simulate network/auth delay
    setTimeout(() => {
      setLoading(false);
      // Let's consider "demo@lovable.dev / password123" as successful credentials
      if (email === "demo@lovable.dev" && password === "password123") {
        toast({
          title: "Login successful!",
          description: `Welcome back, ${email}.`,
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background px-4">
      <div className="w-full max-w-md bg-card rounded-xl shadow-lg border border-border p-6 sm:p-8 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-center mb-1 text-foreground dark:text-white">
            Sign in to your account
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Enter your credentials to access the dashboard.
          </p>
        </div>
        {/* Social Auth Buttons */}
        <div>
          <SocialAuthButtons />
          <SocialEmailDivider />
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="mb-1 block">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              className={errors.email && touched.email ? "border-destructive focus:ring-destructive" : ""}
              disabled={loading}
            />
            {touched.email && errors.email && (
              <span className="text-sm text-destructive">{errors.email}</span>
            )}
          </div>
          {/* Password Field */}
          <div>
            <Label htmlFor="password" className="mb-1 block">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
                className={errors.password && touched.password ? "border-destructive focus:ring-destructive pr-10" : "pr-10"}
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword((show) => !show)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {touched.password && errors.password && (
              <span className="text-sm text-destructive">{errors.password}</span>
            )}
          </div>
          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between gap-2 mt-2">
            <label className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
                disabled={loading}
              />
              <span className="text-sm text-foreground">Remember me</span>
            </label>
            <button
              type="button"
              disabled={loading}
              className="text-sm text-primary hover:underline focus:outline-none"
              onClick={() => {
                toast({
                  title: "Feature coming soon",
                  description: "Password reset is under construction.",
                });
              }}
            >
              Forgot password?
            </button>
          </div>
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-2"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <svg className="animate-spin h-5 w-5 text-primary-foreground" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        <div className="text-center text-sm mt-2 text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a href="/sign-up" className="text-primary hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
