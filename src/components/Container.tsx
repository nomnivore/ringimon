import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
  classOpts?: {
    padding?: boolean;
    margin?: boolean;
    maxWidth?: boolean;
  };
}

function trueOrUndef(x: boolean | undefined): boolean {
  return x === undefined ? true : x;
}

/**
 * A simple, flexibile container component that can be used to wrap most page elements
 * in a consistent way.
 *
 * Padding, margin, and max-width can be toggled off
 * to disable unwanted styles.
 */
export const Container = ({
  children,
  className,
  classOpts,
  ...props
}: Props) => {
  const classes = clsx(
    "container",
    trueOrUndef(classOpts?.padding) && "px-2 pt-12 pb-8",
    trueOrUndef(classOpts?.margin) && "mx-auto",
    trueOrUndef(classOpts?.maxWidth) && "max-w-7xl",
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
