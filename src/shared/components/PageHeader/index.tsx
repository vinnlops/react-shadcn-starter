import type { ReactElement, ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  topElement?: ReactElement;
};

export function PageHeader({
  title,
  description,
  actions,
  topElement,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col items-center gap-6 px-4 py-12 text-center md:py-20">
      <div className="flex w-full flex-col items-center gap-5">
        {topElement}

        <h1
          className="
            max-w-3xl text-4xl font-semibold leading-[1.1]
            tracking-tight text-foreground md:text-5xl
          "
        >
          {title}
        </h1>

        {description && (
          <p
            className="
              w-full max-w-lg text-pretty text-base
              leading-relaxed text-muted-foreground
            "
          >
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {actions}
        </div>
      )}
    </header>
  );
}
