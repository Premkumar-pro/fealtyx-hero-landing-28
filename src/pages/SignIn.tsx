
import { SignIn } from "@clerk/clerk-react";
const SignInPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background transition-colors duration-300">
    <SignIn routing="path" path="/sign-in" />
  </div>
);
export default SignInPage;
