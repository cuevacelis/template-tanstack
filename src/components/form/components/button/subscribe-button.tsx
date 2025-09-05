import { DynamicIcon } from 'lucide-react/dynamic'
import { useFormContext } from '../../hooks/use-form-context'
import type { IconName } from 'lucide-react/dynamic'
import type { VariantProps } from 'class-variance-authority'
import type { buttonVariants } from '@/components/ui/button'
import { Button } from '@/components/ui/button'

interface SubscribeButtonProps<TMeta = unknown>
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  label: string
  icon?: IconName
  asChild?: boolean
  meta?: TMeta
}

export function SubscribeButton<TMeta = unknown>({
  label,
  icon = 'save',
  variant = 'default',
  size,
  className,
  asChild,
  meta,
  ...props
}: SubscribeButtonProps<TMeta>) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
      {([isSubmitting, canSubmit]) => {
        const isDisabled = isSubmitting || !canSubmit
        return (
          <Button
            type="submit"
            disabled={isDisabled}
            variant={variant}
            size={size}
            className={className}
            asChild={asChild}
            onClick={() => {
              void form.handleSubmit(meta)
            }}
            {...props}
          >
            <DynamicIcon name={icon} />
            {label}
          </Button>
        )
      }}
    </form.Subscribe>
  )
}
