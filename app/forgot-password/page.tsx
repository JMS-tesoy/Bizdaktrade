import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ForgotPasswordForm } from "@/components/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
            <p className="text-muted-foreground">Enter your email to receive a password reset link</p>
          </div>

          <ForgotPasswordForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
