import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Fragment } from 'react';

interface BreadcrumbData {
  title: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbData[];
  className?: string;
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <Breadcrumb
      aria-label="breadcrumb"
      className={cn('flex items-center', className)}
    >
      {items.map((item, index) => (
        <Fragment key={index}>
          <BreadcrumbItem>
            {/*If item has href display the link, if not display the title for the current page*/}
            {item.href ? (
              <BreadcrumbLink
                asChild
                className="h-6 text-sm font-medium text-foreground hover:underline"
              >
                <Link href={item.href}>{item.title}</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className="h-6 text-sm font-medium text-muted-foreground">
                {item.title}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {/*Apply a separator after every page except the last one*/}
          {index < items.length - 1 && (
            <BreadcrumbSeparator className="flex list-none items-center justify-center" />
          )}
        </Fragment>
      ))}
    </Breadcrumb>
  );
}
