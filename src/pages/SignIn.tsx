
import { SignIn } from "@clerk/clerk-react";
const SignInPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <SignIn routing="path" path="/sign-in" />
  </div>
);
export default SignInPage;
