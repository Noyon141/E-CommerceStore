import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth Layout",
  description: "Auth Layout",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col h-full justify-center gap-y-4 items-center">
      <div className="space-y-2 text-center">
        <h2 className="text-4xl tracking-tighter font-bold uppercase">E-store</h2>
        <p className="text-muted-foreground">
          Find your stylish outfits here...
        </p>
      </div>
      {children}
    </section>
  );
}
