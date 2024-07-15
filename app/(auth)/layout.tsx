export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className=" min-h-dvh grid place-items-center ">
      <>{children}</>
    </main>
  );
}
