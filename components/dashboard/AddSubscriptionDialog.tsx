'use client'

import { useState } from 'react'
import { Calendar as CalendarIcon, ChevronDownIcon } from 'lucide-react' // Pastikan import icon

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

export default function AddSubscriptionDialog() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Tambah Baru</Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>✨ Tambah Langganan Baru</DialogTitle>
        </DialogHeader>
        
        <form className="grid gap-4">

          <div className="grid gap-3">
            <Label htmlFor="name">Nama Layanan</Label>
            <Input id="name" name="name" placeholder="Netflix, Spotify, dll" />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="cost">Biaya (Bulanan/Tahunan)</Label>
            <Input id="cost" name="cost" type="number" placeholder="Misal: 50000" />
          </div>

          <div className="grid gap-3">
            <Label>Tanggal Tagihan Pertama / Mulai</Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-between font-normal text-left",
                    !date && "text-muted-foreground"
                  )}
                >
                  {/* Format tanggal ke Bahasa Indonesia (id-ID) */}
                  {date ? date.toLocaleDateString('id-ID', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  }) : "Pilih tanggal"}
                  <ChevronDownIcon className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate)
                    setIsCalendarOpen(false) 
                  }}
                  showOutsideDays={false} // Sesuai request (disable outside days)
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <input type="hidden" name="startDate" value={date?.toISOString() || ''} />
          </div>

          <div className="grid gap-3">
            <Label>Siklus Tagihan</Label>
            <Select name="cycle">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Siklus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bulanan">Bulanan</SelectItem>
                <SelectItem value="Tahunan">Tahunan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950 cursor-pointer">
              <Checkbox
                id="isFreeTrial"
                name="isFreeTrial"
                className="mt-1 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
              />
              <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">
                  Apakah ini Free Trial?
                </p>
                <p className="text-muted-foreground text-sm">
                  Aktifkan ini agar kami ingatkan H-1 sebelum kartu Anda didebit!
                </p>
              </div>
            </Label>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit">Tambah</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}