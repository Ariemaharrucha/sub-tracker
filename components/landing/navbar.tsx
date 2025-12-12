import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-orange-100/50 bg-white/80 backdrop-blur-md transition-all">
            <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-12">
                
                <div className="flex items-center">
                    <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900">
                        Sub<span className="text-orange-600">Tracker</span>
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">
                        About
                    </Link>
                    <a href="#features" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">
                        Features
                    </a>
                    <Link href="/" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">
                        Contact
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/sign-in">
                        <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 px-6 h-9">
                            Sign-in
                        </Button>
                    </Link>
                </div>
                
            </div>
        </nav>
    );
}