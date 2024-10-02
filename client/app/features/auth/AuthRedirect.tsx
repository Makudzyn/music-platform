import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AuthRedirectProps {
  href: string;
  text: string;
  linkText: string;
}

export default function AuthRedirect({href, text, linkText}: AuthRedirectProps) {
  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-muted-foreground">
        {text}
      </p>
      <Button variant="link" asChild className="p-0 mt-1">
        <Link href={href} className="text-accent hover:text-accent transition-colors">
          {linkText}
        </Link>
      </Button>
    </div>
  );
};