
import { SignUp } from "@clerk/clerk-react";
const SignUpPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background transition-colors duration-300">
    <SignUp routing="path" path="/sign-up" />
  </div>
);
export default SignUpPage;
