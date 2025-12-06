import { getTotalSubscriptionsPrice, getActiveSubscriptionsCount, getClosestSubscription } from "@/lib/action/subscriptionOverview";

export default async function SubscriptionOverview({userId}: {userId: string}) {

  const totalSubscriptionsPrice = await getTotalSubscriptionsPrice(userId)
  const closestSubscription = await getClosestSubscription(userId)
  const activeSubscriptionsCount = await getActiveSubscriptionsCount(userId)

  return (
    <div className="mt-8">
      <h2>Hello, User! 👋</h2>
      <p className="mt-2">Saving is the basis of wealth, don't forget to cancel the trial!</p>
      <div className="grid grid-cols-5 mt-10 gap-3">
        <div className="col-span-2 p-4 rounded-md border">
          <h3>TOTAL EXPENDITURE</h3>
          <p className="mt-5">
            {totalSubscriptionsPrice} <span>/ Month</span>
          </p>
        </div>
        <div className="col-span-2 p-4 rounded-md border">
          <h3>UPCOMING BILL</h3>
          <p className="mt-5">
            {closestSubscription ? (
              <>
                🗓️ {closestSubscription.nextPaymentDate.toLocaleDateString("id-ID")}
                {" ("}
                {closestSubscription.diff === 0
                  ? "Today"
                  : closestSubscription.diff === 1
                  ? "Tomorrow"
                  : `In ${closestSubscription.diff} days`}
                {") "}  
                <strong>{closestSubscription.name}</strong>
              </>
            ) : (
              "No upcoming bill"
            )}
          </p>
        </div>
        <div className="col-span-1 p-4 rounded-md border">
          <h3>ACTIVE</h3>
          <p className="mt-5">
            {" "}
            {activeSubscriptionsCount} <span>Apps</span>
          </p>
        </div>
      </div>
    </div>
  );
}
