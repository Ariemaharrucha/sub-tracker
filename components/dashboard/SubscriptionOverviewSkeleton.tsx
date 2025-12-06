

export default function SubscriptionOverviewSkeleton() {

  return (
    <div className="mt-8 animate-pulse">
      <h2>Halo, User! 👋</h2>
      <p className="mt-2">Hemat pangkal kaya, jangan lupa cancel trial!</p>
      <div className="grid grid-cols-5 mt-10 gap-3">
        <div className="col-span-2 p-4 rounded-md border">
          <h3>TOTAL PENGELUARAN</h3>
          <div className="mt-5">
            <div className="h-4 w-20 animate-pulse" />
          </div>
        </div>
        <div className="col-span-2 p-4 rounded-md border">
          <h3>TAGIHAN TERDEKAT</h3>
          <div className="mt-5">
            <div className="h-4 w-20 animate-pulse" />
          </div>
        </div>
        <div className="col-span-1 p-4 rounded-md border">
          <h3>AKTIF</h3>
          <div className="mt-5">
            <div className="h-4 w-20 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

