import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function SubscriptionListSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Search + Button */}
      <div className="mt-6 flex justify-between items-center">
        <div className="w-full max-w-xs">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
              <SearchIcon className="size-4" />
            </div>
            <Input type="search" disabled placeholder="Cari langganan..." />
          </div>
        </div>

        <Button disabled className="opacity-50">Add Subscription</Button>
      </div>

      {/* Tabel */}
      <div className="[&>div]:max-h-80 [&>div]:overflow-y-auto [&>div]:rounded-sm [&>div]:border shadow-sm mt-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted sticky top-0 z-10">
              <TableHead className="w-[180px]">Layanan</TableHead>
              <TableHead>Biaya</TableHead>
              <TableHead>Jatuh Tempo</TableHead>
              <TableHead className="text-start" colSpan={2}>Status</TableHead>
              <TableHead className="text-center">Menu</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 6 }).map((_, i) => (
              <TableRow key={i}>
                {/* Nama */}
                <TableCell>
                  <div className="h-4 w-24 bg-muted rounded" />
                </TableCell>

                {/* Harga */}
                <TableCell>
                  <div className="h-4 w-16 bg-muted rounded" />
                </TableCell>

                {/* Tanggal */}
                <TableCell>
                  <div className="h-4 w-20 bg-muted rounded" />
                </TableCell>

                {/* Status */}
                <TableCell className="text-start" colSpan={2}>
                  <div className="h-6 w-20 bg-muted rounded-full" />
                </TableCell>

                {/* Menu */}
                <TableCell className="text-center">
                  <div className="h-8 w-8 bg-muted rounded" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}