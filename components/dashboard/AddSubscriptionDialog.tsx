"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { addSubscriptionSchema, AddSubscriptionSchema } from "@/lib/validation/addSubscriptionSchema"
import { createSubscription } from "@/lib/action/createSubscription"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { toast } from "sonner"

export default function AddSubscriptionDialog({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const form = useForm<AddSubscriptionSchema>({
    resolver: zodResolver(addSubscriptionSchema),
    defaultValues: {
      name: "",
      price: 0,
      startDate: undefined,
      frequency: undefined,
      isTrial: false,
      trialDays: undefined
    }
  })

  const { register, setValue, handleSubmit, watch, formState: { errors, isSubmitting } } = form

  const isTrial = watch("isTrial")
  const date = watch("startDate")

  async function onSubmit(values: AddSubscriptionSchema) {
    const res = await createSubscription(values, userId)
    if (!res.error) {
      setOpen(false)
      toast.success("Subscription added successfully")
    } else {
      toast.error(res.error)
    }
  } 

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer">Add Subscription</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Subscription</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div className="space-y-2">
            <Label>Name</Label>
            <Input {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Price</Label>
            <Input type="number" {...register("price", { valueAsNumber: true })} />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Start Date</Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  {date ? date.toLocaleDateString() : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={
                    (d) => {
                      d && setValue("startDate", d)
                      setIsCalendarOpen(false)
                    }
                  }
                />
              </PopoverContent>
            </Popover>

            {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Billing Cycle</Label>
            <Select onValueChange={(v) => setValue("frequency", v as any)}>
              <SelectTrigger><SelectValue placeholder="Select cycle" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="MONTHLY">Monthly</SelectItem>
                <SelectItem value="YEARLY">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={isTrial}
              onCheckedChange={(val) => setValue("isTrial", Boolean(val))}
            />
            <Label>This is a trial</Label>
          </div>

          {isTrial && (
            <div className="space-y-2">
              <Label>Trial Duration</Label>
              <Select onValueChange={(v) => setValue("trialDays", Number(v))}>
                <SelectTrigger><SelectValue placeholder="Select duration" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  )
}