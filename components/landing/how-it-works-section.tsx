export default function HowItWorksSection() {
  return (
    <section className="gap-4 flex flex-col justify-center items-center py-20 px-6 md:px-12">
      <h2 className="font-bold text-4xl text-center mb-20">How It Works</h2>
      <div className="flex flex-col md:flex-row gap-4">
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
  );
}
