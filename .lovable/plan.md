
# Enhanced Order Confirmation Page

## Overview
Upgrade the order confirmation page from a minimal summary to a detailed receipt with itemized line items, shipping details, order date, and estimated delivery timeline.

## What Changes

### Visual Layout
- Wider layout (max-w-2xl instead of max-w-md) to accommodate the receipt
- Keep the success header (green checkmark, "Order Confirmed!" title)
- Add a structured receipt card below with multiple sections

### Receipt Sections
1. **Order Header** -- Order ID, date placed, order status badge
2. **Itemized Receipt** -- Table listing each item with title, quantity, unit price, and line total
3. **Price Breakdown** -- Subtotal, shipping (free), and grand total
4. **Shipping Details** -- Customer name, email, shipping address, and estimated delivery (order date + 7-10 business days)
5. **Call to Action** -- "Continue Shopping" button (existing)

### Data Fetching
- Currently only fetches from `orders` table. Will also fetch from `order_items` (joined via order_id) and include `shipping_address` and `customer_name` in the orders query.
- Since RLS restricts order viewing to the order's owner or admins, guest users (user_id = NULL) won't be able to re-fetch their order. To handle this, the confirmation page will also accept order data passed via React Router navigation state as a fallback (the checkout page already navigates here after order creation).

### Estimated Delivery
- Calculated client-side: order `created_at` + 7 business days for the start, + 10 business days for the end
- Displayed as a date range (e.g., "Feb 27 -- Mar 4, 2026")

---

## Technical Details

### File: `src/pages/CheckoutPage.tsx`
- Pass order details (items, total, customer info) via `navigate` state so the confirmation page has data even if the DB query fails (guest checkout RLS issue).

### File: `src/pages/OrderConfirmationPage.tsx`
- Expand `OrderData` interface to include `shipping_address`, `customer_name`, `customer_phone`, `notes`
- Add `OrderItem` interface (`painting_title`, `quantity`, `price`)
- Fetch order items: `supabase.from("order_items").select("painting_title, quantity, price").eq("order_id", orderId)`
- Accept `useLocation().state` as fallback data source
- Add `addBusinessDays` helper to calculate estimated delivery range
- Render itemized table using existing Table UI components
- Use Separator between sections
- Add a "Print Receipt" button using `window.print()`
