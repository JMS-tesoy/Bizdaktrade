# Bizdaktrade Copilot Instructions

## Project Overview
Bizdaktrade is a professional **forex copy trading platform** built with **Next.js 16 + React 19**, enabling traders to copy signals from master traders to their MT5 trading accounts via REST API. The system handles real-time signal distribution, follower management, and trading performance tracking.

## Architecture & Data Flow

### Core System Components
- **Master Traders**: Originate trading signals from their MT5 accounts
- **Followers**: Subscribe to signals and receive them via API calls to their MT5 Copier bot
- **Signal Delivery Pipeline**: `master opens/closes trade` → stored in `signals-store` → followers fetch via `/api/v1/signals` with API key

### Key Entities (from `lib/types.ts`)
- **Trade**: Represents open/closed positions (EURUSD SELL at 1.2654, etc.)
  - Has `magicNumber` field for MT5 bot identification
  - Includes `lotSize`, `entryPrice`, `stopLoss`, `takeProfit`, `profit`
- **Signal**: Action to execute (OPEN/CLOSE/MODIFY trade)
  - Always includes originating `tradeId` and `magicNumber` for followers to correlate
  - Immutable once created
- **Follower**: Account linked to master, with subscription tier (starter/pro) controlling `maxAccounts`
  - **Critical**: Subscription status must be "active" for API access (`validateApiKey` in `lib/auth.ts`)
  - API key format: `fbc_<timestamp>_<random>` (generated on signup)
  - **Starter**: 1 MT5 account max | **Pro**: 3 MT5 accounts max
- **ApiResponse<T>**: Standardized envelope for all API responses (`{ success, data?, error?, timestamp }`)

### API Design Pattern
All endpoints follow this pattern:
1. **Authentication**: Validate `X-API-Key` header → look up follower → check subscription status
2. **Response Format**: Always return `ApiResponse<T>` with ISO timestamp
3. **Error Codes**: 400 (bad input), 401 (missing key), 403 (invalid key), 500 (server error)
4. **Example** (`app/api/v1/signals/route.ts`): GET with optional `since` (ISO timestamp) or `limit` query params

## UI & Component Patterns

### Forms & Client Components
- **Client-side state**: Use `useState` for form fields (email, password, etc.)
- **Form submission**: Prevent default, POST to API, handle response errors explicitly
- **Session storage**: Login success stores user object in `sessionStorage.setItem("user", ...)`
- **Navigation**: Use `useRouter()` from `next/navigation` (not `react-router`)
- **Example** (`components/login-form.tsx`): Card → form → inputs with labels → error display → submit button with loading spinner

### UI Components Library
Uses **Radix UI** (fully wrapped in `components/ui/`) + **Tailwind CSS** + **Lucide icons**:
- Import from `@/components/ui/` (aliased in tsconfig)
- Common: `Card`, `Button`, `Input`, `Label`, `Dialog`, `Toast` (via `sonner`)
- Charts: `recharts` with `ResponsiveContainer` (always specify numeric height to avoid measurement issues)

### Theming
- **Provider**: `ThemeProvider` wraps app in `layout.tsx` (uses `next-themes`)
- **Dark mode script**: Inline hydration script in `<head>` reads `localStorage` key "theme" before React hydrates
- **CSS classes**: Use `dark:` prefix in Tailwind for dark mode styles
- **Avoid**: HSL color variables documented in `globals.css` (already set up)

## Development Workflows

### Build & Run
```bash
npm run dev      # Start dev server on port 3000
npm run build    # Next.js build with TS errors ignored (ignoreBuildErrors: true)
npm start        # Production build
npm run lint     # ESLint check
```

### Key Configuration
- **TypeScript**: Strict mode enabled, `noEmit: true` (type-checking only, no codegen)
- **Path alias**: `@/*` → root directory (use for all imports, e.g., `@/lib/auth`)
- **Next.js**: Image optimization disabled (`unoptimized: true`), used for deploy flexibility
- **Environment Variables**: `ADMIN_SECRET` (for Master EA), `STRIPE_SECRET_KEY` (for payment processing)
  - Optional Stripe vars (defaults used if missing): `STRIPE_STARTER_PRICE_ID`, `STRIPE_PRO_PRICE_ID`
  - See `lib/stripe.ts` for fallback defaults (`price_starter`, `price_pro`)

### Adding Features
1. **New API route**: Create `app/api/path/route.ts`, export `async function GET|POST|PUT|DELETE`
2. **Validate API key** early: `const follower = validateApiKey(apiKey); if (!follower) return NextResponse.json({...}, {status: 403})`
3. **Always respond** with `ApiResponse<T>` envelope using `NextResponse.json()`, include `timestamp: new Date().toISOString()`
4. **Use existing stores** (`lib/signals-store.ts`, `lib/auth.ts`) — currently in-memory, documented for DB migration
5. **Master EA authentication**: Uses `X-Admin-Secret` header instead of API key (environment variable)

### API Response Pattern
All endpoints return `ApiResponse<T>` wrapper with consistent structure:
```typescript
// Success response
const response: ApiResponse<{ data: T }> = {
  success: true,
  data: { ... },
  timestamp: new Date().toISOString(),
}
return NextResponse.json(response)

// Error response  
const response: ApiResponse<null> = {
  success: false,
  error: "Descriptive error message",
  timestamp: new Date().toISOString(),
}
return NextResponse.json(response, { status: 400 })  // Include HTTP status code
```

## Known Issues & Tech Debt

### Type Mismatch in Registration
- **Location**: `app/api/auth/register/route.ts` line 29
- **Issue**: Casts plan to `"starter" | "pro" | "enterprise"` but `createFollower()` only accepts `"starter" | "pro"`
- **Impact**: Sending "enterprise" plan will cause runtime error
- **Fix**: Either remove enterprise tier UI from pricing, or implement enterprise support in `lib/auth.ts`

### Demo Data & In-Memory Storage
- `lib/auth.ts` has demo follower: `demo@example.com` / `demo_api_key_12345` (pro tier)
- `lib/signals-store.ts` has 2 demo open trades (EURUSD BUY, GBPUSD SELL)
- Data lost on server restart—production requires PostgreSQL + Prisma migration

## Project-Specific Conventions

### State Management
- **No Redux/Zustand**: Client components use `useState` for local forms
- **Session-based**: User stored in `sessionStorage` after login (client-side; production should use secure cookies)
- **Transient data**: Trading signals and open trades stored in-memory (`signals-store.ts`) — marked "TODO: replace with database"

### Import Strategy
- Absolute imports only: `@/lib/...`, `@/components/...` (no relative paths)
- Utility exports: `cn()` function for Tailwind class merging (`clsx` + `tailwind-merge`)

### Error Handling
- **API routes**: Return structured errors in `ApiResponse` with descriptive message
- **Client components**: Display errors in red box above form (`bg-destructive/10 text-destructive`)
- **No console logs**: Use explicit error state and UI feedback

### Demo/Production Notes
- **Current state**: Demo data in stores, fake password validation (no hashing)
- **Marked for migration**: Search for `TODO: replace with database` comments
- **MT5 integration**: Magic numbers used to identify trades; EA scripts in `public/ea/` folder

## Critical Files for Common Tasks

| Task | File(s) |
|------|---------|
| Add user auth endpoint | `app/api/auth/{login,register}/route.ts`, `lib/auth.ts` |
| Add signal/trade API | `app/api/v1/signals/route.ts`, `lib/signals-store.ts` |
| New dashboard view | `app/dashboard/page.tsx`, `components/*.tsx` |
| Update types | `lib/types.ts` |
| Styling utilities | `lib/utils.ts`, `components/ui/*` |
| Theme/dark mode | `components/theme-provider.tsx`, `app/layout.tsx` head script |

## MT5 Integration & Magic Numbers

### Magic Number System
Magic numbers uniquely identify trades in MT5 and enable signal correlation:
- Each trade gets a `magicNumber` assigned in the Master EA
- Followers receive this number in signals and use it to match copied trades to originals
- Format: 6-digit integer (`magicNumber: 123456`)
- **Critical**: Magic number must never change during trade lifecycle—it's the immutable identifier

### Master EA (`public/ea/Bizdak_Master.mq5`)
- Monitors open positions on master trader's MT5 account
- Detects new trades, modifications (SL/TP changes), and closes
- Broadcasts three signal types to backend:
  - `OPEN`: New position detected → creates Trade and Signal records
  - `MODIFY`: SL/TP adjusted → updates Trade, generates MODIFY Signal
  - `CLOSE`: Position closed → marks Trade as CLOSED, calculates profit
- Polling interval: 1000ms (configurable via `PollInterval` input)
- Uses `AdminSecret` for backend authentication (not API key)
- Logs position tracking via `Log()` function for debugging

### Copier EA (`public/ea/Bizdak_Copier.mq5`)
- Follower's EA that syncs with Bizdaktrade backend
- Polls `/api/v1/signals` every 5 seconds (configurable `PollInterval`)
- For each signal received:
  1. Matches magic number to identify the source trade
  2. Applies `LotMultiplier` to adjust trade size (e.g., 0.5× smaller position)
  3. Executes trade: OPEN → `OrderSend()`, CLOSE → `PositionClose()`
  4. Stores magic number for local trade tracking
- Retries failed signals up to 3 times (`MAX_RETRIES`)
- Requires `X-API-Key` header in all API requests
- **Key inputs**: `ApiKey`, `LotMultiplier`, `MaxLotSize`, `Slippage`

### API Connection Requirements
- Master EA calls `/api/v1/admin/trade` (writes trades/signals)
- Copier EA calls `/api/v1/signals` (reads signals) and `/api/v1/heartbeat` (connectivity check)
- Both EAs must whitelist API domain in MT5: Tools → Options → Expert Advisors → "Allow WebRequest for listed URL"
- Slippage default: 30 points (prevents rejected orders in volatile markets)

## Signal Store & Trade Lifecycle

### Trade Lifecycle States
1. **OPEN**: Created when master opens position → broadcast as OPEN signal
2. **Modified**: SL/TP adjusted → generates MODIFY signal (trade remains OPEN)
3. **CLOSED**: Master closes position → marked CLOSED, profit calculated, CLOSE signal sent
4. **Immutable after close**: Closed trades cannot be reopened; always create new trade

### Signal Store Mutations (`lib/signals-store.ts`)

**addSignal()**: Creates new signal (auto-generates ID and timestamp)
```typescript
addSignal({
  action: "OPEN",           // "OPEN" | "CLOSE" | "MODIFY"
  symbol: "EURUSD",
  type: "BUY",              // Direction
  magicNumber: 123456,      // Critical: links to follower's copied trade
  tradeId: "trade_001",     // Reference to original trade
  // ... price/SL/TP
})
```

**openTrade()**: Creates OPEN trade + auto-generates OPEN signal
- Called when master trader opens new position
- Stores in `openTrades` array with status "OPEN"
- Automatically broadcasts OPEN signal

**closeTrade()**: Marks trade CLOSED + auto-generates CLOSE signal
- Calculates profit: `(exitPrice - entryPrice) × 10000 × lotSize × 10` (simplified)
- **Important**: Profit calculation is demo-only; production needs accounting for spreads/commissions
- Automatically broadcasts CLOSE signal

**modifyTrade()**: Updates SL/TP + auto-generates MODIFY signal
- Only modifies OPEN trades (fails if trade is CLOSED)
- Preserves entry price and magic number
- Useful for trailing stops or tightening risk

### Signal Integrity
- **Immutable once created**: Signals are never deleted or edited (audit trail)
- **Timestamp always ISO string**: `new Date().toISOString()`
- **Query patterns**: 
  - `getLatestSignals(limit)`: Last N signals (for initial sync)
  - `getSignalsSince(isoTimestamp)`: All signals after timestamp (for polling)

## Stripe Checkout Flow

### Payment Tiers
```typescript
// lib/stripe.ts
PLAN_PRICES = {
  starter: 0,    // Free → 1 MT5 account max
  pro: 1000,     // $10/month (100 cents) → 3 MT5 accounts max
}
```
**Subscription enforcement**: `lib/auth.ts` `createFollower()` only accepts tiers "starter" | "pro"

### Registration → Checkout → Activation Flow

1. **User clicks "Sign Up" on homepage**
   - Fills email/password in registration form (`components/registration-form.tsx`)
   - Selects plan (Starter/Pro) - Note: Starter is free, Pro is $10/month
   - Submits to `POST /api/auth/register` → creates Follower with `subscriptionStatus: "active"`

2. **Redirects to checkout page** (`app/checkout/page.tsx`)
   - Stores email in `sessionStorage.pendingUser`
   - Displays plan details and "Pay Now" button
   - Shows feature list for selected tier

3. **Handle checkout** (`app/api/checkout/route.ts`)
   - Receives email, plan, redirects from frontend
   - Creates Stripe subscription session with `mode: "subscription"` (recurring)
   - Returns session ID and Stripe-hosted checkout URL
   - Frontend redirects user to Stripe (`window.location.href = data.data.url`)

4. **Stripe processes payment**
   - Stripe hosts checkout page (no sensitive card data touches your server)
   - Success redirects to `/dashboard?success=true`
   - Cancellation redirects to `/checkout?plan=pro&canceled=true`

5. **Webhook handling** (`app/api/webhooks/stripe/route.ts`)
   - Stripe sends `checkout.session.completed` event to backend
   - **TODO**: Add webhook handler to update `subscriptionStatus` in follower record
   - Currently a placeholder—production must implement

### Key Constraints
- **Subscription mode only**: Monthly recurring billing (not one-time)
- **Customer email**: Collected at signup; used to link Stripe customer
- **Metadata**: `plan` and `email` sent to Stripe for record-keeping
- **STRIPE_SECRET_KEY**: Must be set as env var (production use only)
- **Webhook signing**: Verify `stripe-signature` header before trusting events

## Database Migration Strategy

### Current State (In-Memory Stores)
- `lib/auth.ts`: Map of followers keyed by API key
- `lib/signals-store.ts`: Array of signals and trades
- Data lost on server restart (suitable for demo only)

### Migration Path

**Phase 1: Schema Design**
```typescript
// Tables needed:
Follower {
  id, email, apiKey, subscriptionTier, subscriptionStatus,
  maxAccounts, connectedAccounts, createdAt, lastActive
}

Trade {
  id, masterId, symbol, type, lotSize, entryPrice, stopLoss,
  takeProfit, openTime, closeTime, exitPrice, profit, status,
  magicNumber
}

Signal {
  id, tradeId, action, symbol, type, lotSize, entryPrice,
  stopLoss, takeProfit, magicNumber, timestamp
}
```

**Phase 2: Database Selection**
- **Recommended**: PostgreSQL (scalable, JSONB for metadata)
- **ORM**: Prisma (generates type-safe client from schema)
- **Connection**: Use environment variables for credentials

**Phase 3: Adapter Pattern Migration**
1. Create wrapper functions in new `lib/db.ts` (same interface as current stores)
2. Implement functions to call DB instead of in-memory collections
3. Gradually migrate endpoints to use `lib/db.ts` instead of `lib/signals-store.ts`
4. Keep in-memory stores as fallback during transition

**Phase 4: Data Persistence**
- Add unique constraint on `Follower.apiKey` (prevent duplicates)
- Add index on `Trade.magicNumber` (EA queries need fast lookup)
- Add index on `Signal.timestamp` (polling queries filter by time)
- Implement cascade delete: `Follower deleted → all associated Trades/Signals deleted`

**Phase 5: Webhook Integration**
- Implement Stripe webhook handler to update `Follower.subscriptionStatus`
- Listen for `payment_intent.succeeded` or `invoice.payment_succeeded` events
- Update status to "active" on payment; "expired" if subscription ends

### Search for "TODO: replace with database" in codebase to find all migration points:
```bash
grep -r "TODO: replace with database" --include="*.ts" --include="*.tsx"
```

## Testing & Debugging

### Local Testing
- **TypeScript strict mode enabled**: Resolve all type errors before commit
- **No test suite configured**: Manual testing recommended against demo data
- **Demo credentials**: Email `demo@example.com`, API key `demo_api_key_12345`

### Browser DevTools
- **Session state**: `sessionStorage.getItem("user")` shows logged-in user
- **Theme state**: `localStorage.getItem("theme")` checks dark/light mode

### API Testing (cURL / Postman)
```bash
# Fetch latest signals
curl -H "X-API-Key: demo_api_key_12345" \
  https://localhost:3000/api/v1/signals?limit=5

# Fetch open trades
curl -H "X-API-Key: demo_api_key_12345" \
  https://localhost:3000/api/v1/trades

# Test heartbeat (connection check)
curl -H "X-API-Key: demo_api_key_12345" \
  https://localhost:3000/api/v1/heartbeat
```

### Common Debugging Points
- **EA won't connect**: Check that API domain is whitelisted in MT5 options
- **Signals not received**: Verify `X-API-Key` header and `subscriptionStatus: "active"`
- **Trade magic number missing**: Ensure Master EA is running and `AdminSecret` is configured
- **Profit calculation off**: Remember in-memory calc is simplified; production needs spread/commission logic
