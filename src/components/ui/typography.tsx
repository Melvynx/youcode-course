import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
} from "react";

type PolymorphicAsProp<E extends ElementType> = {
  as?:
    | E
    | React.ComponentType<Omit<ComponentPropsWithoutRef<E>, "as">>
    | React.FunctionComponent<Omit<ComponentPropsWithoutRef<E>, "as">>;
};

type PolymorphicProps<E extends ElementType> = PropsWithChildren<
  Omit<ComponentPropsWithoutRef<E>, "as"> & PolymorphicAsProp<E>
>;

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "font-caption scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "font-caption scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
      h3: "font-caption scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      base: "",
      quote: "mt-6 border-l-2 pl-6 italic",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      link: "font-medium text-indigo-500 hover:underline",
    },
  },
  defaultVariants: {
    variant: "base",
  },
});
type TypographyCvaProps = VariantProps<typeof typographyVariants>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultElement = "p";

const defaultElementMapping: Record<
  NonNullable<TypographyCvaProps["variant"]>,
  ElementType
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  p: "p",
  quote: "blockquote" as "p",
  code: "code",
  lead: "p",
  large: "p",
  small: "p",
  muted: "p",
  link: "a",
  base: "p",
} as const;

export function Typography<E extends ElementType = typeof defaultElement>({
  as,
  children,
  className,
  variant,
  ...restProps
}: PolymorphicProps<E> & TypographyCvaProps) {
  const Component: ElementType = as ?? defaultElementMapping[variant ?? "base"];

  return (
    <Component
      {...(restProps as ComponentPropsWithoutRef<E>)}
      className={cn(typographyVariants({ variant }), className)}
    >
      {children}
    </Component>
  );
}
