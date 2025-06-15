
import { SignUp } from "@clerk/clerk-react";
const appearance = {
  variables: {
    colorPrimary: "hsl(222.2,47.4%,11.2%)",
    colorBackground: "hsl(var(--background))",
    colorText: "hsl(var(--foreground))",
    colorInputBackground: "hsl(var(--card))",
    colorInputText: "hsl(var(--foreground))",
    colorInputBorder: "hsl(var(--border))",
    fontFamily: "inherit",
  },
  elements: {
    card: "shadow-xl border border-border rounded-lg bg-background dark:bg-background transition-colors",
    formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-primary scale-105 transition-transform",
    headerTitle: "text-2xl font-bold text-foreground dark:text-white",
    headerSubtitle: "text-base text-muted-foreground dark:text-muted-foreground",
    socialButtonsBlockButton: "bg-accent text-accent-foreground border border-border",
    dividerRow: "text-muted-foreground dark:text-muted-foreground",
    formFieldLabel: "text-sm text-foreground dark:text-foreground",
    formFieldInput: "bg-card text-foreground border border-border transition",
    footerAction: "text-muted-foreground dark:text-muted-foreground",
  },
};
const SignUpPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background transition-colors duration-300">
    <SignUp routing="path" path="/sign-up" appearance={appearance} />
  </div>
);
export default SignUpPage;
