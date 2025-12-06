"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { validateEmail, validatePassword } from "@/lib/validation"

export function RegistrationForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [plan, setPlan] = useState("starter")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    const validationError = validatePassword(value)
    setPasswordError(validationError || "")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validate email
    const emailError = validateEmail(email)
    if (emailError) {
      setError(emailError)
      setLoading(false)
      return
    }

    // Validate password
    const pwError = validatePassword(password)
    if (pwError) {
      setError(pwError)
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, plan }),
      })

      const data = await response.json()

      if (!data.success) {
        setError(data.error || "Registration failed")
        return
      }

      // Store credentials temporarily for checkout flow
      sessionStorage.setItem("pendingUser", JSON.stringify({ email, plan }))

      // Redirect to checkout
      router.push(`/checkout?plan=${plan}`)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6 space-y-4">
          {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">{error}</div>}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Min 8 chars, uppercase, number, special char (@$!%*?&)"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              required
              className={passwordError ? "border-destructive" : ""}
            />
            {passwordError && <p className="text-destructive text-xs mt-1">{passwordError}</p>}
            {password && !passwordError && (
              <p className="text-chart-2 text-xs mt-1">✓ Password meets requirements</p>
            )}
          </div>

          <div className="space-y-3 p-4 rounded-lg border border-primary bg-primary/5">
            <div className="space-y-1">
              <p className="font-semibold text-lg">Trial Plan</p>
              <p className="text-sm text-muted-foreground">Get started free for 7 days</p>
            </div>
            <div className="flex items-center justify-between">
              <ul className="space-y-1 text-sm">
                <li>✓ 1 MT5 account</li>
                <li>✓ Copy all signals</li>
                <li>✓ Email support</li>
              </ul>
              <span className="text-2xl font-bold">Free</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue to Payment
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

