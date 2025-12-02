import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
})

export const PRICE_IDS = {
  starter: process.env.STRIPE_STARTER_PRICE_ID || "price_starter",
  pro: process.env.STRIPE_PRO_PRICE_ID || "price_pro",
  enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID || "price_enterprise",
}

export const PLAN_PRICES = {
  starter: 4900, // $49 in cents
  pro: 9900, // $99 in cents
  enterprise: 24900, // $249 in cents
}
