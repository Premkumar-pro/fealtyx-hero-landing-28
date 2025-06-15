
import { SignUp } from "@clerk/clerk-react";
const SignUpPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <SignUp routing="path" path="/sign-up" />
  </div>
);
export default SignUpPage;
