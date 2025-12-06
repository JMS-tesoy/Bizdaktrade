"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Modern accessible dark mode toggle.
 * - Uses `next-themes` for persistence.
 * - Renders a single button that toggles between light/dark.
 */
export default function DarkModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    // Avoid hydration mismatch — render an inert placeholder until mounted
    return (
      <button
        aria-hidden
        className={cn(
          "inline-flex items-center justify-center rounded-md p-2 hover:bg-muted/60 transition-colors",
          className,
        )}
        tabIndex={-1}
      >
        <Sun className="h-4 w-4 opacity-0" />
      </button>
    )
  }

  const isDark = theme === "dark"

  function toggle() {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={isDark}
      title={isDark ? "Switch to light" : "Switch to dark"}
      className={cn(
        "inline-flex items-center justify-center rounded-md p-2 hover:bg-muted/60 transition-colors focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <span className="sr-only">Toggle color scheme</span>
      <Sun className={cn("h-4 w-4 transition-opacity", !isDark && "opacity-100", isDark && "opacity-0")} />
      <Moon className={cn("h-4 w-4 absolute transition-opacity", isDark ? "opacity-100" : "opacity-0")} />
      <style jsx>{`
        button { position: relative }
      `}</style>
    </button>
  )
}
