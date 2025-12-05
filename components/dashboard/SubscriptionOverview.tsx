import { getTotalSubscriptionsPrice, getActiveSubscriptionsCount, getClosestSubscription } from "@/lib/action/subscriptionOverview";

export default async function SubscriptionOverview({userId}: {userId: string}) {

  const totalSubscriptionsPrice = await getTotalSubscriptionsPrice(userId)
  const closestSubscription = await getClosestSubscription(userId)
  const activeSubscriptionsCount = await getActiveSubscriptionsCount(userId)

  return (
    <div className="mt-8">
      <h2>Halo, User! 👋</h2>
      <p className="mt-2">Hemat pangkal kaya, jangan lupa cancel trial!</p>
      <div className="grid grid-cols-5 mt-10 gap-3">
        <div className="col-span-2 p-4 rounded-md border">
          <h3>TOTAL PENGELUARAN</h3>
          <p className="mt-5">
            {totalSubscriptionsPrice} <span>/ Bulan</span>
          </p>
        </div>
        <div className="col-span-2 p-4 rounded-md border">
          <h3>TAGIHAN TERDEKAT</h3>
          <p className="mt-5">
            {closestSubscription ? (
              <>
                🗓️ {closestSubscription.nextPaymentDate.toLocaleDateString("id-ID")}
                {" ("}
                {closestSubscription.diff === 0
                  ? "Hari ini"
                  : closestSubscription.diff === 1
                  ? "Besok"
                  : `Dalam ${closestSubscription.diff} hari`}
                {") "}  
                <strong>{closestSubscription.name}</strong>
              </>
            ) : (
              "Tidak ada tagihan"
            )}
          </p>
        </div>
        <div className="col-span-1 p-4 rounded-md border">
          <h3>AKTIF</h3>
          <p className="mt-5">
            {" "}
            {activeSubscriptionsCount} <span>Apps</span>
          </p>
        </div>
      </div>
    </div>
  );
}
