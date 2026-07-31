"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Sheet(props: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger(props: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose(props: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal(props: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-overlay bg-foreground/20 backdrop-blur-xs transition-opacity duration-fast data-ending-style:opacity-0 data-starting-style:opacity-0",
        className,
      )}
      data-slot="sheet-overlay"
      {...props}
    />
  );
}

function SheetContent({
  children,
  className,
  showCloseButton = true,
  side = "right",
  ...props
}: SheetPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  side?: "top" | "right" | "bottom" | "left";
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        className={cn(
          "fixed z-overlay flex flex-col gap-sm overflow-y-auto overscroll-contain bg-popover text-popover-foreground shadow-floating transition duration-normal ease-standard data-ending-style:opacity-0 data-starting-style:opacity-0",
          "data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:max-h-[85svh] data-[side=bottom]:rounded-t-xl data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-xl data-[side=bottom]:data-starting-style:translate-y-xl",
          "data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:w-[min(90vw,24rem)] data-[side=left]:border-r data-[side=left]:data-ending-style:-translate-x-xl data-[side=left]:data-starting-style:-translate-x-xl",
          "data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:w-[min(90vw,24rem)] data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-xl data-[side=right]:data-starting-style:translate-x-xl",
          "data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:max-h-[85svh] data-[side=top]:rounded-b-xl data-[side=top]:border-b data-[side=top]:data-ending-style:-translate-y-xl data-[side=top]:data-starting-style:-translate-y-xl",
          className,
        )}
        data-side={side}
        data-slot="sheet-content"
        {...props}
      >
        {children}
        {showCloseButton ? (
          <SheetPrimitive.Close
            render={
              <Button
                aria-label="Tutup panel"
                className="absolute top-sm right-sm"
                size="icon-sm"
                variant="ghost"
              />
            }
          >
            <X aria-hidden="true" />
          </SheetPrimitive.Close>
        ) : null}
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3xs border-b border-divider p-md",
        className,
      )}
      data-slot="sheet-header"
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mt-auto flex flex-col gap-xs border-t border-divider p-md",
        className,
      )}
      data-slot="sheet-footer"
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      className={cn(
        "font-heading text-h4 font-semibold text-text-primary",
        className,
      )}
      data-slot="sheet-title"
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      className={cn("text-body-sm text-text-secondary", className)}
      data-slot="sheet-description"
      {...props}
    />
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
