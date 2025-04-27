import NavBar from "@/app/components/NavBar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans relative">
      <NavBar />
      {children}
    </main>
  );
}
