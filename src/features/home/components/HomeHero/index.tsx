import { PageHeader } from "@/shared/components/PageHeader";
import { Button } from "@/shared/shadcn/components/ui/button";

export function HomeHero() {
  return (
    <>
      <PageHeader
        title="TEMPLATE REACT"
        description="Template para projetos react"
        actions={
          <>
            <Button variant="outline">Example</Button>
            <Button>Start</Button>
          </>
        }
      ></PageHeader>
    </>
  );
}
