

## Plan: Auto-redirect to WhatsApp after checkout

### Current behavior
After checkout, the user lands on `/order-confirmation/{orderId}` which shows a receipt and a manual "Share on WhatsApp" button. The WhatsApp link currently uses `https://wa.me/?text=...` without a phone number (should be `https://wa.me/919711804497?text=...`).

### Network issue
The latest checkout attempt failed with "Failed to fetch" on the `create-order` function. This is likely a transient network/deployment issue — the function config and code look correct.

### Changes

**1. `src/pages/CheckoutPage.tsx`** — Auto-redirect to WhatsApp after successful order
- After clearing the cart and receiving the order response, construct the WhatsApp URL with the order details (Order ID, items, total) and the studio phone number `919711804497`
- Use `window.location.href` to redirect to WhatsApp directly
- Still navigate to the confirmation page as a fallback (via `window.open` for WhatsApp + `navigate` for confirmation, so user has a record)

**2. `src/pages/OrderConfirmationPage.tsx`** — Fix WhatsApp link
- Change `https://wa.me/?text=...` to `https://wa.me/919711804497?text=...` so the button also works if users visit the confirmation page directly

### Flow after changes
1. User fills checkout form → clicks "Place Order"
2. Edge function creates order, returns order ID + total
3. Browser opens WhatsApp with pre-filled order message to the studio number
4. User also lands on the order confirmation page (as a backup/receipt)

