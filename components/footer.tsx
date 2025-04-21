import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export default function FooterSection({ className }: FooterProps) {
  return (
    <footer className={cn("bg-background w-full py-6 px-4", className)}>
      <div className="mx-auto max-w-3xl flex flex-col items-center gap-4 text-sm text-muted-foreground">
     <div className="flex items-center justify-between w-full max-w-3xl px-4 py-2">
      <div className="text-center">
          © 2025 Platz. All rights reserved
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4">
            
          <Link href="/sign-in" className="hover:text-foreground transition-colors">
            Sign in
          </Link>
          <span className="text-muted-foreground/40">|</span>
          <Link href="/sign-up" className="hover:text-foreground transition-colors">
            Sign up
          </Link>
          <span className="text-muted-foreground/40">|</span>
          <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <span className="text-muted-foreground/40">|</span>
          <Link href="/terms-of-service" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
        </div>
        </div>
   
      </div>
    </footer>
  );
}