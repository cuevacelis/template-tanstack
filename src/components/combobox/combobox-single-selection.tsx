import { Check, ChevronsUpDown } from 'lucide-react'
import { useCallback, useState } from 'react'
import useMedia from 'react-use/lib/useMedia'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils/class-utils'

export interface OptionComboboxSingleSelection {
  value: string
  label: string
}

const EMPTY_OPTIONS: Array<OptionComboboxSingleSelection> = []

export interface ComboboxSingleSelectionProps {
  options?: Array<OptionComboboxSingleSelection>
  onSelect: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  disabled?: boolean
  value: string
  className?: string
  messageEmpty?: React.ReactNode
}

export function ComboboxSingleSelection({
  options = EMPTY_OPTIONS,
  value,
  disabled = false,
  placeholder = 'Selecciona una opción...',
  messageEmpty = 'No se encontró ninguna opción.',
  onSelect,
  onBlur,
  className,
}: ComboboxSingleSelectionProps) {
  const [open, setOpen] = useState<boolean>(false)
  const isDesktop = useMedia('(min-width: 768px)')

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? placeholder

  const handleSelect = useCallback(
    (selectedValue: string) => {
      onSelect(value === selectedValue ? '' : selectedValue)
      setOpen(false)
    },
    [onSelect, value],
  )

  const TriggerButton = (
    <Button
      variant="outline"
      aria-expanded={open}
      aria-label={selectedLabel}
      tabIndex={0}
      className="w-full justify-between flex items-center gap-2 overflow-hidden"
      disabled={disabled}
      onBlur={onBlur}
    >
      <span
        className={cn('max-w-full truncate text-muted-foreground', {
          'text-accent-foreground': value,
        })}
      >
        {selectedLabel}
      </span>
      <ChevronsUpDown className="size-4 shrink-0 opacity-60" />
    </Button>
  )

  const ContentList = (
    <Command loop>
      <CommandInput placeholder="Buscar opción..." />
      <CommandList>
        <CommandEmpty>{messageEmpty}</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              value={option.value}
              keywords={[option.label, option.value]}
              onSelect={handleSelect}
              className="w-full"
              aria-selected={value === option.value}
            >
              <Check
                className={cn('size-4', {
                  'opacity-100': value === option.value,
                  'opacity-0': value !== option.value,
                })}
              />
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className={className}>
          {TriggerButton}
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          style={{ width: 'var(--radix-popover-trigger-width)' }}
        >
          {ContentList}
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className={className}>
        {TriggerButton}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{placeholder}</DrawerTitle>
          <DrawerDescription className="sr-only">
            {placeholder}
          </DrawerDescription>
        </DrawerHeader>
        <div className="border-t">{ContentList}</div>
      </DrawerContent>
    </Drawer>
  )
}
