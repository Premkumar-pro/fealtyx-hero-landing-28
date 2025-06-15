import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Removed: import { SocialAuthButtons, SocialEmailDivider } from "@/components/auth/SocialAuthButtons";

// --- Clerk code commented for future reference ---
// import { SignUp } from "@clerk/clerk-react";
// const appearance = { /* ...existing Clerk appearance config... */ };

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const roleOptions = [
  { value: "developer", label: "Developer" },
  { value: "manager", label: "Manager" },
];

const SignUpPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("developer");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!fullName) {
      newErrors.fullName = "Full name is required.";
    }
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

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
    setTimeout(() => {
      setLoading(false);
      // Simulate storing user in localStorage (or you can adjust to your needs)
      const newUser = { fullName, email, role };
      localStorage.setItem("mockUser", JSON.stringify(newUser));
      toast({
        title: "Sign up successful!",
        description: `Welcome, ${fullName}! Redirecting...`,
      });
      if (role === "manager") {
        navigate("/manager");
      } else {
        navigate("/dashboard");
      }
    }, 1300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-card rounded-xl shadow-lg border border-border p-6 sm:p-8 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-center mb-1 text-foreground dark:text-white">
            Create your account
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Sign up to manage bugs and releases.
          </p>
        </div>
        {/* Social Auth Buttons removed */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div>
            <Label htmlFor="fullName" className="mb-1 block">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Jane Doe"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => handleBlur("fullName")}
              className={errors.fullName && touched.fullName ? "border-destructive focus:ring-destructive" : ""}
              disabled={loading}
            />
            {touched.fullName && errors.fullName && (
              <span className="text-sm text-destructive">{errors.fullName}</span>
            )}
          </div>
          {/* Email */}
          <div>
            <Label htmlFor="email" className="mb-1 block">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
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
          {/* Role selection */}
          <div>
            <Label htmlFor="role" className="mb-1 block">Role</Label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block w-full rounded-md border border-input bg-background dark:bg-card px-3 py-2 text-foreground focus:ring-primary focus:border-primary disabled:opacity-50"
              disabled={loading}
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          {/* Password */}
          <div>
            <Label htmlFor="password" className="mb-1 block">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
                className={errors.password && touched.password ? "border-destructive focus:ring-destructive pr-10" : "pr-10"}
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword((val) => !val)}
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
          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword" className="mb-1 block">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => handleBlur("confirmPassword")}
              className={errors.confirmPassword && touched.confirmPassword ? "border-destructive focus:ring-destructive" : ""}
              disabled={loading}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <span className="text-sm text-destructive">{errors.confirmPassword}</span>
            )}
          </div>
          {/* Sign Up Button */}
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
                Signing up...
              </span>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
        <div className="text-center text-sm mt-2 text-muted-foreground">
          Already have an account?{" "}
          <a href="/sign-in" className="text-primary hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
