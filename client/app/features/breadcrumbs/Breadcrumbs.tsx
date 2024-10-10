import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BreadcrumbData {
  title: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbData[];
  className?: string;
}

export default function Breadcrumbs({items, className}: BreadcrumbsProps) {
  return (
    <Breadcrumb aria-label="breadcrumb" className={cn("mb-2", className)}>
      {items.map((item, index) => (
        <BreadcrumbItem key={index}>
          {item.href ? (
              <BreadcrumbLink asChild className="text-sm font-medium text-foreground hover:underline">
                <Link href={item.href}>
                  {item.title}
                </Link>
              </BreadcrumbLink>
          ) : (
            <BreadcrumbPage className="text-sm font-medium text-muted-foreground">
              {item.title}
            </BreadcrumbPage>
          )}
          {index < items.length - 1 && <BreadcrumbSeparator className={"list-none"} />}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
