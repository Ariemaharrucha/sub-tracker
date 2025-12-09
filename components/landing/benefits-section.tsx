export default function BenefitsSection() {
  return (
    <section className="gap-4 flex flex-col justify-center items-center py-20 bg-white px-6 md:px-12">
      <h2 className="font-bold text-4xl text-center mb-20">
        Why Use Sub-Tracker?
      </h2>
      <div className="flex flex-col md:flex-row gap-4">
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
  );
}
