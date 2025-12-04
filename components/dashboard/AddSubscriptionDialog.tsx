'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { createSubscription } from '@/lib/action/createSubscription'

export default function AddSubscriptionDialog({ userId }: { userId: string }) {
  const [date, setDate] = useState<Date | undefined>()
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isTrial, setIsTrial] = useState(false)
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    
    // Panggil server action
    const result = await createSubscription(formData, userId)

    if (result?.error) {
      // Handle Error disini, contoh: alert(result.error) atau toast.error(result.error)
      console.error(result.error)
    } else {
      // Handle Sukses
      setOpen(false) // Tutup dialog
      console.log('add subscription success')
      // Reset form jika perlu atau biarkan revalidatePath bekerja
    }
    
    setIsLoading(false)
  }
    

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add New</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Subscription</DialogTitle>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="grid gap-3">
            <Label htmlFor="name">Service Name</Label>
            <Input id="name" name="name" placeholder="Netflix, Spotify, etc." />
          </div>

          {/* Price */}
          <div className="grid gap-3">
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" type="number" placeholder="50000" />
          </div>

          {/* Date */}
          <div className="grid gap-3">
            <Label>Start / First Billing Date</Label>

            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-between font-normal text-left",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? date.toLocaleDateString() : "Select date"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => {
                    setDate(d)
                    setIsCalendarOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>

            <input type="hidden" name="startDate" value={date?.toISOString() || ""} />
          </div>

          {/* Frequency */}
          <div className="grid gap-3">
            <Label>Billing Cycle</Label>
            <Select name="frequency">
              <SelectTrigger>
                <SelectValue placeholder="Select cycle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MONTHLY">Monthly</SelectItem>
                <SelectItem value="YEARLY">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Trial Toggle */}
          <div className="grid gap-3">
            <Label className="flex items-start gap-3 border rounded-md p-3 cursor-pointer">
              <input type="hidden" name="isTrial" value={isTrial ? "on" : "off"} />
              <Checkbox
                id="isTrial"
                checked={isTrial}
                onCheckedChange={(v) => setIsTrial(Boolean(v))}
              />
              <div>
                <p className="font-medium">Is this a free trial?</p>
                <p className="text-sm text-muted-foreground">We&apos;ll remind you before the trial ends.</p>
              </div>
            </Label>
          </div>

          {/* Trial Duration */}
          {isTrial && (
            <div className="grid gap-3">
              <Label>Trial Duration</Label>
              <Select name="trialDays">
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}