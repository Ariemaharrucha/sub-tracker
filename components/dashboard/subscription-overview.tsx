import { getDashboardStats } from "@/lib/action/getDashboardStats";
import { Calendar, DollarSign, Activity } from "lucide-react";

export default async function SubscriptionOverview({ userId, userName }: { userId: string, userName: string }) {
  const { totalMonthlyPrice, closestSubscription, activeCount } = await getDashboardStats(userId);

  return (
    <div className="mt-4 bg-linear-to-br from-orange-50 via-amber-50 to-rose-50 md:p-6 p-4 rounded-xl shadow-md">
      <h2 className="text-4xl text-amber-950 font-semibold">Hello, {userName}! 👋</h2>
      <p className="mt-2 text-lg text-amber-800">Saving is the basis of wealth, don&apos;t forget to cancel the trial!</p>
      <div className="grid md:grid-cols-5 grid-cols-1 mt-10 gap-3">
        
        <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-100/50 space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-3 bg-linear-to-br from-amber-100 to-orange-100 rounded-xl">
              <DollarSign className="h-6 w-6 text-amber-700" />
            </div>
            <h3 className="text-sm font-semibold text-amber-700 uppercase tracking-wide">TOTAL EXPENDITURE</h3>
          </div>
          <p className="text-2xl font-bold text-amber-950">
            {totalMonthlyPrice} <span>/ Month</span>
          </p>
        </div>
        
        <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-100/50 space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-3 bg-linear-to-br from-rose-100 to-rose-100 rounded-xl">
            <Calendar className="h-6 w-6 text-rose-700" />
          </div>
          <h3 className="text-sm font-semibold text-rose-700 uppercase tracking-wide">UPCOMING BILL</h3>
        </div>
          <p className="">
            {closestSubscription ? (
              <>
                <span className="font-semibold text-rose-950 text-2xl">{closestSubscription.name.charAt(0).toUpperCase() + closestSubscription.name.slice(1)} </span>
                <span className="text-rose-950 font-semibold">
                  {closestSubscription.nextPaymentDate.toLocaleDateString("id-ID")}
                  {" ("}
                  {closestSubscription.diff === 0
                    ? "Today"
                    : closestSubscription.diff === 1
                    ? "Tomorrow"
                    : `In ${closestSubscription.diff} days`}
                  {") "}  
                </span>
              </>
            ) : (
              "No upcoming bill"
            )}
          </p>
        </div>
        
        <div className="md:col-span-1 col-span-1 bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-100/50 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-linear-to-br from-teal-100 to-emerald-100 rounded-2xl">
              <Activity className="h-6 w-6 text-teal-700" />
            </div>
            <h3 className="text-sm font-semibold text-teal-700 uppercase tracking-wide">ACTIVE</h3>
          </div>
          <p className="">
            {" "}
            {activeCount} <span className="text-teal-950 font-semibold">Apps</span>
          </p>
        </div>
      </div>
    </div>
  );
}
