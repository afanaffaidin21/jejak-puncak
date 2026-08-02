import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent bg-clip-padding text-label font-semibold whitespace-nowrap outline-none select-none transition-[background-color,border-color,box-shadow,color,transform] duration-fast ease-standard motion-safe:hover:-translate-y-2xs motion-safe:active:not-aria-[haspopup]:scale-95 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-sm",
  {
    variants: {
      variant: {
        default:
          "bg-button-primary text-button-primary-foreground shadow-surface hover:bg-button-primary-hover hover:shadow-hover disabled:bg-button-primary-disabled disabled:text-button-primary-foreground disabled:opacity-100",
        primary:
          "bg-button-primary text-button-primary-foreground shadow-surface hover:bg-button-primary-hover hover:shadow-hover disabled:bg-button-primary-disabled disabled:text-button-primary-foreground disabled:opacity-100",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/75 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        icon: "bg-muted text-text-primary hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-touch gap-2xs px-sm has-data-[icon=inline-end]:pr-xs has-data-[icon=inline-start]:pl-xs",
        xs: "h-lg gap-3xs px-xs text-caption [&_svg:not([class*='size-'])]:size-xs",
        sm: "h-9 gap-2xs px-xs text-body-sm",
        lg: "h-2xl gap-2xs px-md text-body",
        icon: "size-touch",
        "icon-xs": "size-lg [&_svg:not([class*='size-'])]:size-xs",
        "icon-sm": "size-9",
        "icon-lg": "size-2xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
    loadingLabel?: string;
  };

function Button({
  children,
  className,
  disabled,
  isLoading = false,
  loadingLabel = "Memuat…",
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) {
  const isIconOnly = size?.startsWith("icon");

  return (
    <ButtonPrimitive
      aria-busy={isLoading || undefined}
      data-slot="button"
      data-loading={isLoading ? "true" : undefined}
      disabled={disabled || isLoading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner aria-hidden="true" data-icon="inline-start" />
          <span className={cn(isIconOnly && "sr-only")}>{loadingLabel}</span>
        </>
      ) : (
        children
      )}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants, type ButtonProps };
