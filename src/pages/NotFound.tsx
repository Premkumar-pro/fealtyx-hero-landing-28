
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-background transition-colors duration-300">
      <h1 className="text-5xl font-bold text-primary dark:text-white mb-4">404</h1>
      <div className="text-lg text-muted-foreground mb-4">
        Page Not Found or Unauthorized
      </div>
      <a
        href="/"
        className="text-primary underline underline-offset-2 hover:text-primary/80 dark:text-white"
      >
        Go Home
      </a>
    </div>
  );
}
