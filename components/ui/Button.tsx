import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const BASE =
  "inline-flex items-center justify-center gap-1.5 rounded-full font-semibold transition-all duration-200 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.97]";

function variantStyle(variant: ButtonVariant): { className: string; style?: React.CSSProperties } {
  switch (variant) {
    case "primary":
      return {
        className: "text-white shadow-sm hover:shadow-md hover:brightness-110",
        style: { background: "linear-gradient(135deg, var(--primary), var(--primary-strong))" },
      };
    case "danger":
      return {
        className: "text-white shadow-sm hover:shadow-md hover:brightness-110",
        style: { background: "linear-gradient(135deg, var(--danger), #FB7185)" },
      };
    case "secondary":
      return { className: "border border-border bg-surface text-text hover:border-primary hover:text-primary" };
    case "ghost":
      return { className: "text-muted hover:bg-text/5 hover:text-text" };
  }
}

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

// Design-system Button: one component for every button/CTA on the site.
// Pass `href` to render a Next Link styled identically to a real <button>.
export function Button({ variant = "primary", size = "md", className = "", children, ...props }: ButtonAsButton | ButtonAsLink) {
  const { className: variantClass, style } = variantStyle(variant);
  const classes = `${BASE} ${SIZE_CLASSES[size]} ${variantClass} ${className}`;

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    return (
      <Link href={href} target={target} rel={rel} className={classes} style={style}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" {...buttonProps} className={classes} style={style}>
      {children}
    </button>
  );
}
