import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-rose-50">
      <main className="">
        {/* hero section */}
        <section className="min-h-screen flex gap-4 px-12">

          <div className="w-1/2 flex justify-center items-center">
            <div className="p-6">
              <h1 className="text-5xl font-extrabold text-amber-900 leading-tight text-balance">
                Sub-Tracker
              </h1>
              <p className="text-md text-gray-600 mt-4">
                Sub-Tracker is a subscription management platform that helps you keep track of your subscriptions and manage your payments.
              </p>
              <Link href="/sign-in">
                <Button size="lg" className="mt-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold cursor-pointer">Get Started</Button>
              </Link>
            </div>
          </div>

          <div className="p-6 w-1/2 flex justify-center items-center">
            <div className="w-full shadow-2xl p-6 bg-white rounded-2xl space-y-6">
              <h3>Dashboard Preview</h3>
              <div className="px-6 py-4 flex justify-between rounded-lg bg-linear-to-br from-orange-50 via-amber-50 to-rose-50">
                <p>Netflix</p>
                <p>Rp.90.000 / mo</p>
              </div>
              <div className="px-6 py-4 flex justify-between rounded-lg bg-linear-to-br from-orange-50 via-amber-50 to-rose-50">
                <p>Spotify</p>
                <p>Rp.90.000 / mo</p>
              </div>
              <div className="px-6 py-4 flex justify-between rounded-lg bg-linear-to-br from-orange-50 via-amber-50 to-rose-50">
                <p>Figma</p>
                <p className="text-rose-600">Tomorrow</p>
              </div>
            </div>
          </div>
        </section>

        {/* features section */}
        <section className="gap-4 flex flex-col justify-center items-center py-20 px-12">
          <h2 className="font-bold text-4xl text-center mb-20">Features</h2>
          <div className="flex gap-4">
            <div className="rounded-lg p-6 shadow-2xl space-y-4 bg-white">
              <div className="text-4xl">📦</div>
              <h3 className="font-bold text-xl">Subscription Management</h3>
              <p>Add & organize subscriptions. Track statuses, trial periods, renewal dates, and more. </p>
            </div>
            <div className="rounded-lg p-6 shadow-2xl space-y-4 bg-white">
              <div className="text-4xl">📊</div>
              <h3 className="font-bold text-xl">Dashboard Overview</h3>
              <p>View monthly expenses, next billing date, and all active subscription counts instantly. </p>
            </div>
            <div className="rounded-lg p-6 shadow-2xl space-y-4 bg-white">
              <div className="text-4xl">🔔</div>
              <h3 className="font-bold text-xl">Notifications</h3>
              <p>Daily reminders at 6 a.m. WIB for trials ending soon and upcoming payments.  </p>
            </div>
          </div>
        </section>

        {/* Why Use Sub-Tracker? */}
        <section className="gap-4 flex flex-col justify-center items-center py-20 bg-white px-12">
          <h2 className="font-bold text-4xl text-center mb-20">Why Use Sub-Tracker?</h2>
          <div className="flex gap-4">
            <div className="rounded-lg p-6 shadow-2xl space-y-3 bg-white">
              <h3 className="font-bold text-lg">Prevent Trial Charges</h3>
              <p>Never get billed for forgotten trials. </p>
            </div>
            <div className="rounded-lg p-6 shadow-2xl space-y-3 bg-white">
              <h3 className="font-bold text-lg">Monitor Expenses</h3>
              <p>Track spending habits across all subscriptions. </p>
            </div>
            <div className="rounded-lg p-6 shadow-2xl space-y-3 bg-white">
              <h3 className="font-bold text-lg">All in One Place</h3>
              <p>Keep every subscription organized and easy to view. </p>
            </div>
            <div className="rounded-lg p-6 shadow-2xl space-y-3 bg-white">
              <h3 className="font-bold text-lg">Smart Reminders</h3>
              <p>Get notified automatically every morning. </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="gap-4 flex flex-col justify-center items-center py-20 px-12">
          <h2 className="font-bold text-4xl text-center mb-20">How It Works</h2>
          <div className="flex gap-4">
            <div className="rounded-lg p-6 shadow-2xl space-y-4 bg-white text-center">
              <div className="text-4xl">➕</div>
              <h3 className="font-bold text-xl">1. Add Subscriptions</h3>
              <p>Enter name, price, cycle, and trial details. </p>
            </div>
            <div className="rounded-lg p-6 shadow-2xl space-y-4 bg-white text-center">
              <div className="text-4xl">🔔</div>
              <h3 className="font-bold text-xl">2. Set Notifications</h3>
              <p>Daily auto-email reminders at 6 a.m. </p>
            </div>
            <div className="rounded-lg p-6 shadow-2xl space-y-4 bg-white text-center">
              <div className="text-4xl">📉</div>
              <h3 className="font-bold text-xl">3. Track Everything</h3>
              <p>Get full visibility from one clean dashboard. </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Start Tracking Your Subscriptions Today</h2>
          <p className="text-gray-600 mb-8">Simple tool to keep your expenses under control.</p>
          <Link href="/sign-in">
            <Button size="lg" className="mt-4 h-12 bg-amber-600 hover:bg-amber-700 text-white font-semibold cursor-pointer">Get Started</Button>
          </Link>
        </div>
        </section>

        <footer className="py-10 text-center text-gray-500 text-sm">
          © 2025 SubKeep — Portfolio Project  
        </footer>

      </main>
    </div>
  );
}
