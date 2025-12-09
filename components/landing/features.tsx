export default function Features() {
  return (
    <section className="gap-4 flex flex-col justify-center items-center py-20 px-6 md:px-12">
      <h2 className="font-bold text-4xl text-center mb-20">Features</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="rounded-lg p-6 shadow-2xl space-y-4 bg-white">
          <div className="text-4xl">📦</div>
          <h3 className="font-bold text-xl">Subscription Management</h3>
          <p>
            Add & organize subscriptions. Track statuses, trial periods, renewal
            dates, and more.{" "}
          </p>
        </div>
        <div className="rounded-lg p-6 shadow-2xl space-y-4 bg-white">
          <div className="text-4xl">📊</div>
          <h3 className="font-bold text-xl">Dashboard Overview</h3>
          <p>
            View monthly expenses, next billing date, and all active
            subscription counts instantly.{" "}
          </p>
        </div>
        <div className="rounded-lg p-6 shadow-2xl space-y-4 bg-white">
          <div className="text-4xl">🔔</div>
          <h3 className="font-bold text-xl">Notifications</h3>
          <p>
            Daily reminders at 6 a.m. WIB for trials ending soon and upcoming
            payments.{" "}
          </p>
        </div>
      </div>
    </section>
  );
}