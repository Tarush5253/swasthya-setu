"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastProps {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: "default" | "destructive"
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Toast = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & ToastProps>(
  ({ className, variant = "default", title, description, open = true, onOpenChange, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(open)

    React.useEffect(() => {
      setIsVisible(open)
    }, [open])

    const handleClose = () => {
      setIsVisible(false)
      onOpenChange?.(false)
    }

    if (!isVisible) return null

    return (
      <div
        ref={ref}
        className={cn(
          "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
          "animate-in slide-in-from-top-full duration-300",
          variant === "default" && "border bg-background text-foreground",
          variant === "destructive" && "border-destructive bg-destructive text-destructive-foreground",
          className,
        )}
        {...props}
      >
        <div className="grid gap-1">
          {title && <div className="text-sm font-semibold">{title}</div>}
          {description && <div className="text-sm opacity-90">{description}</div>}
        </div>
        <button
          onClick={handleClose}
          className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  },
)
Toast.displayName = "Toast"

export { Toast, type ToastProps }
