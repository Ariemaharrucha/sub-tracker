

export default function SubscriptionOverviewSkeleton() {

  return (
    <div className="mt-8 animate-pulse">
      <h2>Hello, User! 👋</h2>
      <p className="mt-2">Saving is the basis of wealth, don&apos;t forget to cancel the trial!</p>
      <div className="grid md:grid-cols-5 grid-cols-1 mt-10 gap-3">
        <div className="md:col-span-2 p-4 rounded-md border">
          <h3>TOTAL EXPENDITURE</h3>
          <div className="mt-5">
            <div className="h-4 w-20 animate-pulse bg-gray-200 rounded-md" />
          </div>
        </div>
        <div className="md:col-span-2 p-4 rounded-md border">
          <h3>UPCOMING BILL</h3>
          <div className="mt-5">
            <div className="h-4 w-20 animate-pulse bg-gray-200 rounded-md" />
          </div>
        </div>
        <div className="md:col-span-1 col-span-1 p-4 rounded-md border">
          <h3>ACTIVE</h3>
          <div className="mt-5">
            <div className="h-4 w-20 animate-pulse bg-gray-200 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

