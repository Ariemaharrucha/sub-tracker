import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="md:min-h-screen flex flex-col md:flex-row gap-4 px-6 md:px-12 py-18 md:py-0">
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="p-6">
          <h1 className="text-5xl font-extrabold text-amber-900 leading-tight text-balance">
            Sub-Tracker
          </h1>
          <p className="text-md text-gray-600 mt-4">
            Sub-Tracker is a subscription management platform that helps you
            keep track of your subscriptions and manage your payments.
          </p>
          <Link href="/sign-in">
            <Button
              size="lg"
              className="mt-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold cursor-pointer"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      <div className="p-6 w-full md:w-1/2 flex justify-center items-center">
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
  );
}
