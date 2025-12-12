import Link from "next/link";
import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-orange-100 bg-orange-50/30 py-10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-12">
        <div className="text-center md:text-left">
            <span className="text-lg font-bold text-gray-900">
                Sub<span className="text-orange-600">Tracker</span>
            </span>
            <p className="text-sm text-gray-500 mt-1">
                © 2025 SubTracker. All rights reserved.
            </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Built by</span>
          <Link 
            href="https://github.com/Ariemaharrucha/SUB-TRACKER" 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full bg-white border border-orange-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-orange-200 hover:text-orange-600 hover:shadow-md hover:shadow-orange-500/10"
          >
            <Github className="h-4 w-4 text-gray-500 group-hover:text-orange-600 transition-colors" />
            <span>Arie Maharrucha</span>
          </Link>
        </div>

      </div>
    </footer>
  );
}