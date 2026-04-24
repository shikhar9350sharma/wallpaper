export function Button({ variant = "primary", children }) {
  const variants = {
    primary: "bg-accent text-accent-foreground hover:opacity-90",
    secondary: "bg-surface border border-border text-primary hover:bg-muted/20",
    ghost: "text-primary hover:bg-muted/20",
    destructive: "bg-destructive text-white hover:opacity-90",
  };

  return (
    <button className={`rounded-lg px-4 py-2 font-medium transition-all ${variants[variant]}`}>
      {children}
    </button>
  );
}
