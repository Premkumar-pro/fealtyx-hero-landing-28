
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

const PUBLISHABLE_KEY = "pk_test_Y3Jpc3AtY2FsZi0zNi5jbGVyay5hY2NvdW50cy5kZXYk";

if (!PUBLISHABLE_KEY) throw new Error("Missing Clerk Publishable Key");

import { createRoot } from "react-dom/client";
createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);
