import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PencilIcon, Trash, X } from "lucide-react";
import { listSubscription } from "@/lib/action/listSubscription";
import { markAsPaid } from "@/lib/action/markAsPaid";
import { cancelTrial } from "@/lib/action/cancelTrial";

export type SubscriptionType = {
  id: string;
  userId: string;
  name: string;
  price: number;
  startDate: Date;
  frequency: string;
  isTrial: boolean;
  trialDays: number | null;
  trialEndDate: Date | null;
  status: string;
  nextPaymentDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

function resolveStatus(s: SubscriptionType): "TRIAL" | "ACTIVE" | "PENDING" | "OVERDUE" | "CANCELLED" {
  const now = new Date();
  const next = new Date(s.nextPaymentDate);
  const trialEnd = s.trialEndDate ? new Date(s.trialEndDate) : null;
  
  if (s.status === "CANCELLED") return "CANCELLED";
  if (s.isTrial && trialEnd && now <= trialEnd) return "TRIAL";
  if (next.toDateString() === now.toDateString()) return "PENDING";
  if (next < now) return "OVERDUE";
  return "ACTIVE";
}

const formatIDR = (price: number) => price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

export default async function ListSubscription({ userId }: { userId: string }) {
  const subscriptions: SubscriptionType[] = await listSubscription(userId);

  const badgeColor = (s: string) => {
    switch (s) {
      case "TRIAL":
        return "bg-yellow-500 text-white";
      case "ACTIVE":
        return "bg-green-600 text-white";
      case "PENDING":
        return "bg-blue-600 text-white";
      case "OVERDUE":
        return "bg-red-600 text-white";
      case "CANCELLED":
        return "bg-gray-700 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="w-full mt-6">
      <h3 className="mb-4 font-semibold text-lg">Daftar Langganan</h3>

      <div className="[&>div]:max-h-60 [&>div]:overflow-y-auto [&>div]:rounded-sm [&>div]:border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted sticky top-0 z-10">
              <TableHead className="w-[180px]">Layanan</TableHead>
              <TableHead>Biaya</TableHead>
              <TableHead>Jatuh Tempo</TableHead>
              <TableHead className="text-center" colSpan={2}>Status</TableHead>
              <TableHead className="text-center">Menu</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {subscriptions.map((s) => {
              const status = resolveStatus(s);

              return (
                <TableRow key={s.id}>
                  {/* Nama */}
                  <TableCell className="font-medium">{s.name}</TableCell>

                  {/* Harga */}
                  <TableCell>{formatIDR(s.price)}</TableCell>

                  {/* Tanggal */}
                  <TableCell>
                    {new Date(s.nextPaymentDate).toLocaleDateString("id-ID")}
                  </TableCell>

                  {/* STATUS BADGE */}
                  <TableCell className="text-center">
                    <Badge className={badgeColor(status)}>{status}</Badge>
                  </TableCell>

                  {/* TINDAKAN */}
                  <TableCell className="text-center">
                    {status === "TRIAL" && (
                      <form action={cancelTrial}>
                        <input type="hidden" name="id" value={s.id} />
                        <Button variant="destructive" size="sm" className="h-8 cursor-pointer">
                          <X className="mr-1 h-3.5 w-3.5" />
                          Cancel
                        </Button>
                      </form>
                    )}

                    {status === "OVERDUE" && (
                      <form action={markAsPaid}>
                        <input type="hidden" name="id" value={s.id} />
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-red-600 text-red-600 cursor-pointer"
                        >
                          Bayar Sekarang
                        </Button>
                      </form>
                    )}

                    {status === "PENDING" && (
                      <form action={markAsPaid}>
                        <input type="hidden" name="id" value={s.id} />
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-blue-600 text-blue-600 cursor-pointer"
                        >
                          Menunggu
                        </Button>
                      </form>
                    )}

                    {status === "ACTIVE" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-green-600 text-green-600 hover:text-green-600 hover:bg-background"
                      >
                        Aktif
                      </Button>
                    )}

                    {status === "CANCELLED" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-gray-600 text-gray-600"
                      >
                        Cancelled
                      </Button>
                    )}
                  </TableCell>

                  {/* MENU */}
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <PencilIcon className="mr-2 h-4 w-4" />
                          Edit Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
