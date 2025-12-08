export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex justify-center items-center">
        <div className="w-1/2">
            {children}
        </div>
    </div>
  );
}