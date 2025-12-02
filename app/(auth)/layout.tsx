export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
        <div className="w-1/2 bg-violet-500">
            
        </div>
        <div className="w-1/2">
            {children}
        </div>
    </div>
  );
}