"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import DarkModeToggle from "@/components/dark-mode-toggle";

export function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;
  const userInitial = user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">
              BD
            </span>
          </div>
          <span className="font-semibold text-lg">Bizdaktrade</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#performance"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Performance
          </Link>
          <Link
            href="#how-it-works"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <DarkModeToggle />
          {!user ? (
            <>
              <Button asChild>
                <Link href="/register">Start Copying</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Avatar
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => signOut()}
              >
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" onClick={() => signOut()}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
