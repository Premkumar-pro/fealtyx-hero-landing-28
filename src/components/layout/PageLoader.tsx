
import { Loader2 } from "lucide-react";

const PageLoader = ({ text = "Loading..." }: { text?: string }) => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4">
    <Loader2 className="w-10 h-10 animate-spin text-primary" />
    <span className="text-lg text-muted-foreground">{text}</span>
  </div>
);

export default PageLoader;
