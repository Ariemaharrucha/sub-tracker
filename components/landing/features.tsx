import { Dot, Package, LayoutDashboard, Bell } from "lucide-react";

export default function Features() {
  return (
    <section className="flex flex-col justify-center items-center py-20 px-6 md:px-12 bg-white" id="features">
      <div className="border border-orange-100 bg-orange-50 flex items-center gap-1 rounded-full pl-1 pr-4 py-1 mb-10 shadow-sm">
        <div className="bg-white p-1 rounded-full">
          <Dot className="text-orange-600 w-4 h-4" />
        </div>
        <span className="text-sm font-semibold text-orange-600 uppercase tracking-wide">
          Features
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
        <div className="group rounded-3xl p-8 space-y-4 bg-white border border-gray-100 shadow-xl shadow-teal-900/5 hover:shadow-teal-900/10 hover:-translate-y-1 transition-all duration-300">
          <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Package className="w-7 h-7 text-teal-600" />
          </div>
          <h3 className="font-bold text-xl text-gray-900">
            Subscription Management
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Add & organize subscriptions easily. Track active statuses, trial
            periods, renewal dates, and payment cycles in one place.
          </p>
        </div>

        <div className="group rounded-3xl p-8 space-y-4 bg-white border border-gray-100 shadow-xl shadow-orange-900/5 hover:shadow-orange-900/10 hover:-translate-y-1 transition-all duration-300">
          <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <LayoutDashboard className="w-7 h-7 text-orange-600" />
          </div>
          <h3 className="font-bold text-xl text-gray-900">
            Dashboard Overview
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Get a clear view of your finances. See monthly expenses, upcoming
            billing dates, and total active subscriptions instantly.
          </p>
        </div>

        <div className="group rounded-3xl p-8 space-y-4 bg-white border border-gray-100 shadow-xl shadow-rose-900/5 hover:shadow-rose-900/10 hover:-translate-y-1 transition-all duration-300">
          <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Bell className="w-7 h-7 text-rose-600" />
          </div>
          <h3 className="font-bold text-xl text-gray-900">
            Smart Notifications
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Never miss a payment. Receive daily reminders at 6 a.m. WIB for
            trials ending soon and bills that are due today.
          </p>
        </div>
      </div>
    </section>
  );
}