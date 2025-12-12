import { Activity, ArrowRightIcon, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center gap-6 px-6 py-20 md:px-12 md:py-0 bg-linear-to-b from-orange-50 to-white overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-2xl mx-auto text-center space-y-6 relative z-10">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">
          Sub<span className="text-orange-600">Tracker</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-lg mx-auto">
          Sub-Tracker is a subscription management platform that helps you keep
          track of your subscriptions and manage your payments easily.
        </p>
        <Link href="/dashboard">
          <Button 
            className="rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 transition-all hover:scale-105" 
            size={"lg"}
          >
            Get Started <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* --- Floating Cards (Responsive Logic) --- */}
      {/* Logic:
          - Default (Mobile): Flex item biasa, width dibatasi, margin top untuk jarak.
          - md (Desktop): Absolute positioning, rotasi, dan posisi spesifik aktif.
      */}

      {/* Card 1: ACTIVE (Teal) */}
      <div className="
        flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl py-3 px-5 shadow-xl shadow-teal-900/5 cursor-default transition-all
        w-full max-w-xs mx-auto mt-8 
        md:w-auto md:max-w-none md:mt-0 md:absolute md:top-28 md:right-[10%] md:rotate-6 md:hover:rotate-3 md:hover:scale-110 
      ">
        <div className="p-2.5 bg-teal-50 rounded-xl">
          <Activity className="h-6 w-6 text-teal-600" />
        </div>
        <div className="flex flex-col text-left">
          <h3 className="text-xs font-bold text-teal-600 uppercase tracking-wider">ACTIVE</h3>
          <span className="text-sm font-semibold text-gray-700">3 Apps</span>
        </div>
      </div>

      <div className="
        flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl py-3 px-5 shadow-xl shadow-rose-900/5 cursor-default transition-all
        w-full max-w-xs mx-auto
        md:w-auto md:max-w-none md:absolute md:top-32 md:left-[10%] md:-rotate-6 md:hover:-rotate-3 md:hover:scale-110
      ">
        <div className="p-2.5 bg-rose-50 rounded-xl">
          <Calendar className="h-6 w-6 text-rose-600" />
        </div>
        <div className="flex flex-col text-left">
          <h3 className="text-xs font-bold text-rose-600 uppercase tracking-wider">UPCOMING</h3>
          <span className="text-sm font-semibold text-gray-700">Netflix</span>
        </div>
      </div>

      <div className="
        flex items-center gap-3 bg-white backdrop-blur-sm border border-white/20 rounded-2xl py-3 px-5 shadow-2xl shadow-orange-900/5 cursor-default transition-all
        w-full max-w-xs mx-auto
        md:w-auto md:max-w-none md:absolute md:bottom-20 md:left-[20%] md:rotate-3 md:hover:rotate-0 md:hover:scale-110
      ">
        <div className="p-2.5 bg-orange-50 rounded-xl">
          <DollarSign className="h-6 w-6 text-orange-600" />
        </div>
        <div className="flex flex-col text-left">
          <h3 className="text-xs font-bold text-orange-600 uppercase tracking-wider">TOTAL SPENT</h3>
          <span className="text-sm font-semibold text-gray-700">Rp 150.000</span>
        </div>
      </div>
      
    </section>
  );
}