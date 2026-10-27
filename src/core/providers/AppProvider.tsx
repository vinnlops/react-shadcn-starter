import { Suspense, type PropsWithChildren } from "react";

import { QueryProvider } from "./QueryProvider";
// import { Toaster } from '@/shared/shadcn/components/ui/toast';

export function AppProviders({ children }: PropsWithChildren) {
  // useTimezoneStore((state) => state.timezone);

  return (
    <QueryProvider>
      <Suspense>{children}</Suspense>
      {/* <Toaster /> */}
    </QueryProvider>
  );
}
