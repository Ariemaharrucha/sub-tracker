"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { subscriptionSchema, SubscriptionSchema } from "@/lib/validation/SubscriptionSchema"
import { editSubscription } from "@/lib/action/editSubscription"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { PencilIcon } from "lucide-react"
import { SubscriptionType } from "@/lib/type/subscriptionType"

export default function EditSubscriptionDialog({ subscription }: { subscription: SubscriptionType }) {
  const [open, setOpen] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const form = useForm<SubscriptionSchema>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: subscription.name,
      price: subscription.price,
      startDate: new Date(subscription.startDate),
      frequency: subscription.frequency as "MONTHLY" | "YEARLY",
      isTrial: subscription.isTrial,
      trialDays: subscription.trialDays ?? undefined
    }
  })

  const { register, setValue, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = form

  // Reset form saat dialog dibuka/data berubah (penting agar data tidak stale)
  useEffect(() => {
    if (open) {
      reset({
        name: subscription.name,
        price: subscription.price,
        startDate: new Date(subscription.startDate),
        frequency: subscription.frequency as "MONTHLY" | "YEARLY",
        isTrial: subscription.isTrial,
        trialDays: subscription.trialDays ?? undefined
      })
    }
  }, [open, subscription, reset])

  const isTrial = watch("isTrial")
  const date = watch("startDate")

  async function onSubmit(values: SubscriptionSchema) {
    const res = await editSubscription(values, subscription.id)
    if (!res.error) {
      setOpen(false)
      toast.success("Subscription updated successfully")
    } else {
      toast.error(res.error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-slate-600 w-full justify-start cursor-pointer">
          <PencilIcon className="mr-2 h-4 w-4" />
          Edit Subscription
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-amber-950">Edit Subscription</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Name Field */}
          <div className="space-y-2">
            <Label className="text-amber-950 font-semibold">Name</Label>
            <Input {...register("name")} className="border-amber-600 bg-white" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Price Field */}
          <div className="space-y-2">
            <Label className="text-amber-950 font-semibold">Price</Label>
            <Input type="number" {...register("price", { valueAsNumber: true })} className="border-amber-600 bg-white" />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          {/* Start Date Field */}
          <div className="space-y-2">
            <Label className="text-amber-950 font-semibold">Start Date</Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start border-amber-600">
                  {date ? date.toLocaleDateString() : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => {
                    d && setValue("startDate", d)
                    setIsCalendarOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
            {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
          </div>

          {/* Frequency Field */}
          <div className="space-y-2">
            <Label className="text-amber-950 font-semibold">Billing Cycle</Label>
            <Select 
              onValueChange={(v) => setValue("frequency", v as "MONTHLY" | "YEARLY")} 
              defaultValue={subscription.frequency}
            >
              <SelectTrigger className="border-amber-600"><SelectValue placeholder="Select cycle" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="MONTHLY">Monthly</SelectItem>
                <SelectItem value="YEARLY">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Trial Checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isTrial}
              onCheckedChange={(val) => setValue("isTrial", Boolean(val))}
              className="border-amber-400 data-[state=checked]:bg-amber-500"
            />
            <Label className="text-amber-950 font-semibold">This is a trial</Label>
          </div>

          {/* Trial Duration (Conditional) */}
          {isTrial && (
            <div className="space-y-2">
              <Label className="text-amber-950 font-semibold">Trial Duration</Label>
              <Select 
                onValueChange={(v) => setValue("trialDays", Number(v))}
                defaultValue={subscription.trialDays?.toString()}
              >
                <SelectTrigger className="border-amber-600"><SelectValue placeholder="Select duration" /></SelectTrigger>
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
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting} className="bg-amber-500 hover:bg-amber-600 text-white">
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  )
}