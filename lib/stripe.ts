import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
})

export const PRICE_IDS = {
  starter: process.env.STRIPE_STARTER_PRICE_ID || "price_starter",
  pro: process.env.STRIPE_PRO_PRICE_ID || "price_pro",
}

export const PLAN_PRICES = {
  starter: 0, // Free
  pro: 1000, // $10 in cents
}
