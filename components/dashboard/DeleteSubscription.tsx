"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog,DialogHeader,DialogContent,DialogTitle,DialogFooter,DialogClose,DialogTrigger } from "@/components/ui/dialog";
import { deleteSubscription } from "@/lib/action/deleteSubscription";

export default function DeleteSubscriptionButton({ id }: { id: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-red-600 w-full justify-start cursor-pointer">
          <Trash className="mr-2 h-4 w-4" />
          Hapus
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-amber-950 font-semibold">Hapus langganan?</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Anda akan menghapus langganan ini. Langganan ini tidak akan lagi muncul di dashboard Anda.
        </p>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">Batal</Button>
          </DialogClose>

          <Button
            variant="destructive"
            onClick={async () => {
              await deleteSubscription(id);
            }}
            className="cursor-pointer"
          >
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
