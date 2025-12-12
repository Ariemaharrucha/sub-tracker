import { Dot, Plus, Bell, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HowItWorksSection() {
  return (
    <section className="flex flex-col justify-center items-center py-20 px-6 md:px-12 bg-white">
      <div className="self-start border border-orange-100 bg-orange-50 flex items-center gap-1 rounded-full pl-1 pr-4 py-1 mb-10 shadow-sm w-fit">
        <div className="bg-white p-1 rounded-full">
            <Dot className="text-orange-600 w-4 h-4" />
        </div>
        <span className="text-sm font-semibold text-orange-600 uppercase tracking-wide">How It Works</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full ">
        
        <div className="md:w-1/3 flex flex-col justify-center p-2 space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">
                Simple steps to <span className="text-orange-600">financial clarity.</span>
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
                Stop losing money to forgotten trials and unused subscriptions. 
                SubTracker gives you control back in just a few minutes.
            </p>
            <Link href="/dashboard">
            <div className="flex items-center gap-2 text-orange-600 font-semibold cursor-pointer group hover:text-orange-700 transition-colors">
                Start Tracking Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            </Link>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4">

          <div className="col-span-2 rounded-3xl p-8 shadow-xl shadow-orange-900/5 bg-white border border-orange-100 flex flex-col md:flex-row items-center gap-6 group hover:-translate-y-1 transition-all duration-300">
             <div className="w-16 h-16 shrink-0 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-center md:text-left space-y-2">
                <h3 className="font-bold text-xl text-gray-900">1. Add Subscriptions</h3>
                <p className="text-gray-600">Enter name, price, cycle, and trial details manually or import them instantly.</p>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 rounded-3xl p-8 shadow-xl shadow-rose-900/5 bg-white border border-rose-100 flex flex-col items-center text-center gap-4 group hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bell className="w-7 h-7 text-rose-600" />
            </div>
            <div className="space-y-2">
                <h3 className="font-bold text-lg text-gray-900">2. Get Notified</h3>
                <p className="text-sm text-gray-600 leading-snug">Daily auto-email reminders at 6 a.m so you never miss a beat.</p>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 rounded-3xl p-8 shadow-xl shadow-teal-900/5 bg-white border border-teal-100 flex flex-col items-center text-center gap-4 group hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Activity className="w-7 h-7 text-teal-600" />
            </div>
            <div className="space-y-2">
                <h3 className="font-bold text-lg text-gray-900">3. Stay in Control</h3>
                <p className="text-sm text-gray-600 leading-snug">Get full visibility and analytics from one clean dashboard.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}