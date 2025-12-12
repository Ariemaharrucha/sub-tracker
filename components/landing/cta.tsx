import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-white px-6 md:px-12">
      
      <div className="relative max-w-5xl mx-auto text-center border border-orange-100 bg-white shadow-2xl shadow-orange-900/5 rounded-[2.5rem] px-12 py-6 md:p-20 overflow-hidden">
        
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-100/80 rounded-full blur-3xl opacity-100 pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-100/80 rounded-full blur-3xl opacity-100 pointer-events-none"></div>

        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight leading-tight">
            Ready to Take Control? <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-amber-600">
              Start Tracking Today.
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
            Join thousands of smart subscribers who save money every month. 
            No more surprise charges, just clarity.
          </p>
          
          <Link href="/sign-in" className="inline-block">
            <Button
              size="lg"
              className="h-12 px-10 text-lg rounded-full bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg shadow-orange-500/20 transition-all hover:scale-105 hover:-translate-y-1 cursor-pointer border-0"
            >
              Get Started Free <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
        
      </div>
    </section>
  );
}