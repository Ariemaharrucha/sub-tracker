"use client";

import AddSubscriptionDialog from "@/components/dashboard/AddSubscriptionDialog";
import Navbar from "@/components/dashboard/Navbar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  Check,
  MoreHorizontal,
  PencilIcon,
  SearchIcon,
  Trash,
  X,
} from "lucide-react";

export default function DashboardPage() {
  // const { data: session, isPending, error } = authClient.useSession();

  // if (isPending) {
  //   return <div>Loading session...</div>;
  // }

  // if (error || !session) {
  //   return <div>Not authenticated</div>;
  // }

  // console.log("Dashboard session:", session);

  const invoices = [
    {
      id: "1",
      subscription: "Netflix",
      cost: "Rp 186.000",
      due_date: "05 Des 2025",
      status: "Active",
      isTrial: false, // Ini langganan biasa
    },
    {
      id: "2",
      subscription: "Adobe CC",
      cost: "Rp 300.000",
      due_date: "07 Des 2025",
      status: "Trial",
      isTrial: true, // Ini Free Trial (Tombol harus Cancel)
    },
    {
      id: "3",
      subscription: "Adobe CC",
      cost: "Rp 300.000",
      due_date: "07 Des 2025",
      status: "Trial",
      isTrial: true, // Ini Free Trial (Tombol harus Cancel)
    },
    {
      id: "4",
      subscription: "Adobe CC",
      cost: "Rp 300.000",
      due_date: "07 Des 2025",
      status: "Trial",
      isTrial: true, // Ini Free Trial (Tombol harus Cancel)
    },
    {
      id: "5",
      subscription: "Adobe CC",
      cost: "Rp 300.000",
      due_date: "07 Des 2025",
      status: "Trial",
      isTrial: true, // Ini Free Trial (Tombol harus Cancel)
    },
    {
      id: "6",
      subscription: "Adobe CC",
      cost: "Rp 300.000",
      due_date: "07 Des 2025",
      status: "Trial",
      isTrial: true, // Ini Free Trial (Tombol harus Cancel)
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 font-sans dark:bg-black">
      <main className="h-screen min-w-4xl px-6 pb-6 bg-white dark:bg-black">
        <Navbar />

        <div className="mt-8">
          <h2>Halo, User! 👋</h2>
          <p>Hemat pangkal kaya, jangan lupa cancel trial!</p>
          <div className="grid grid-cols-5 mt-10 gap-3">
            <div className="col-span-2 p-4 rounded-md border">
              <h3>TOTAL PENGELUARAN</h3>
              <p className="mt-5">
                Rp 450.000 <span>/ Bulan</span>
              </p>
            </div>
            <div className="col-span-2 p-4 rounded-md border">
              <h3>TAGIHAN TERDEKAT</h3>
              <p className="mt-5">
                <span>🗓️</span> 05 Des (Besok) <span>Netflix</span>
              </p>
            </div>
            <div className="col-span-1 p-4 rounded-md border">
              <h3>AKTIF</h3>
              <p className="mt-5">
                {" "}
                4 <span>Apps</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border border-black mt-8"></div>

        <div className="mt-6 flex justify-between items-center">
          <div className="w-full max-w-xs space-y-2">
            <div className="relative">
              <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                <SearchIcon className="size-4" />
                <span className="sr-only">Search</span>
              </div>
              <Input
                type="search"
                placeholder="Cari langanan"
                className="peer px-9 "
              />
            </div>
          </div>
          <div>
            <AddSubscriptionDialog />
          </div>
        </div>

        <div className="w-full mt-6">
          <h3 className="mb-4 font-semibold text-lg">Daftar Langganan</h3>
          <div className="[&>div]:max-h-60 [&>div]:overflow-y-auto [&>div]:rounded-sm [&>div]:border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted sticky top-0 z-10">
                  <TableHead className="w-[200px]">Layanan</TableHead>
                  <TableHead>Biaya</TableHead>
                  <TableHead>Jatuh Tempo</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right pr-6">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      {invoice.subscription}
                    </TableCell>
                    <TableCell>{invoice.cost}</TableCell>
                    <TableCell>{invoice.due_date}</TableCell>

                    <TableCell className="text-center">
                      {invoice.status}
                    </TableCell>

                    {/* --- KOLOM AKSI (LOGIKA UTAMA) --- */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {invoice.isTrial ? (
                          <Button
                            variant="destructive"
                            size="sm"
                            className="h-8"
                          >
                            <X className="mr-1 h-3.5 w-3.5" />
                            Cancel
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700"
                          >
                            <Check className="mr-1 h-3.5 w-3.5" />
                            Bayar
                          </Button>
                        )}

                        {/* Dropdown Menu untuk Edit/Delete */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <PencilIcon className="mr-2 h-4 w-4" />
                              <span>Edit Detail</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Hapus</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </div>
        </div>
      </main>
    </div>
  );
}
