'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PencilIcon, X } from "lucide-react";
import { markAsPaid } from "@/lib/action/markAsPaid";
import { cancelTrial } from "@/lib/action/cancelTrial";
import DeleteSubscriptionButton from "./delete-subscription";
import { SubscriptionType } from "@/lib/type/subscriptionType";
import EditSubscriptionDialog from "./edit-subscription-dialog";

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

export default function ListSubscriptionClient({ subscriptions }: { subscriptions: SubscriptionType[] }) {

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
    <div className="w-full mt-6 overflow-hidden">
      <div className="[&>div]:max-h-80 [&>div]:overflow-y-auto [&>div]:rounded-lg [&>div]:border-2 shadow-xl">
        <Table>
          <TableHeader>
            <TableRow className="bg-white sticky top-0 z-10 hover:bg-white border">
              <TableHead className="w-[180px] font-semibold text-medium">Service</TableHead>
              <TableHead className="font-semibold text-medium">Price</TableHead>
              <TableHead className="font-semibold text-medium">Due Date</TableHead>
              <TableHead className="text-start font-semibold text-medium" colSpan={2}>Status</TableHead>
              <TableHead className="text-center font-semibold text-medium">Menu</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {subscriptions.length < 1 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <span className="text-muted-foreground">No subscriptions found</span>
                </TableCell>
              </TableRow>
            ) : subscriptions.map((s) => {
              const status = resolveStatus(s);

              return (
                <TableRow key={s.id}>
                  {/* Nama */}
                  <TableCell className="font-medium">{s.name.charAt(0).toUpperCase() + s.name.slice(1)}</TableCell>

                  {/* Harga */}
                  <TableCell>{formatIDR(s.price)}</TableCell>

                  {/* Tanggal */}
                  <TableCell>
                    {new Date(s.nextPaymentDate).toLocaleDateString("id-ID")}
                  </TableCell>

                  {/* STATUS BADGE */}
                  <TableCell className="text-start">
                    <Badge className={badgeColor(status)}>{status}</Badge>
                  </TableCell>

                  {/* TINDAKAN */}
                  <TableCell className="text-end">
                    {status === "TRIAL" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-8 cursor-pointer"
                        onClick={() => cancelTrial.bind(null, s.id)()}
                      >
                        <X className="mr-1 h-3.5 w-3.5" />
                        Cancel
                      </Button>
                    )}

                    {status === "OVERDUE" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-blue-600 text-blue-600 cursor-pointer"
                        onClick={() => markAsPaid.bind(null, s.id)()}
                      >
                        Pay Now
                      </Button>
                    )}

                    {status === "PENDING" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-blue-600 text-blue-600 cursor-pointer"
                        onClick={() => markAsPaid.bind(null, s.id)()}
                      >
                        Wait
                      </Button>
                    )}

                    {status === "ACTIVE" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-green-600 text-green-600 hover:text-green-600 hover:bg-background"
                      >
                        Active
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
                        <DropdownMenuItem asChild>
                          <EditSubscriptionDialog subscription={s} />
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <DeleteSubscriptionButton id={s.id} />
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
