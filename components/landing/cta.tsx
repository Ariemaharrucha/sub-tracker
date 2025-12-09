import Link from "next/link";
import { Button } from "../ui/button";

export default function CTA() {
  return (
    <section className="py-24 bg-white px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">
          Start Tracking Your Subscriptions Today
        </h2>
        <p className="text-gray-600 mb-8">
          Simple tool to keep your expenses under control.
        </p>
        <Link href="/sign-in">
          <Button
            size="lg"
            className="mt-4 h-12 bg-amber-600 hover:bg-amber-700 text-white font-semibold cursor-pointer"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  );
}
