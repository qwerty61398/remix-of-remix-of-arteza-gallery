

# Checkout Flow Implementation

## Overview
Build a complete checkout page accessible from the cart, with a form collecting customer details and shipping address. Supports both guest and authenticated users. Orders and line items are saved to the existing database tables.

## What You'll Get
- A new `/checkout` page with a clean, multi-section form
- Pre-filled fields for logged-in users (name, email from profile)
- Guest checkout without requiring an account
- Order summary sidebar showing cart items and totals
- Order confirmation page after successful submission
- Input validation with clear error messages
- Cart is cleared after successful order placement

## Technical Details

### 1. New File: `src/pages/CheckoutPage.tsx`
- Form with zod validation schema for: customer name, email, phone (optional), shipping address, and optional notes
- Uses react-hook-form with existing UI components (Input, Textarea, Form, Button)
- If user is authenticated, pre-fills name and email from auth context and sets `user_id` on the order
- If guest, `user_id` is set to `null`
- On submit:
  1. Insert into `orders` table (customer_name, customer_email, customer_phone, shipping_address, total_amount, user_id, notes)
  2. Insert into `order_items` table for each cart item (order_id, painting_id, painting_title, price, quantity)
  3. Clear the cart
  4. Navigate to `/order-confirmation/:orderId`

### 2. New File: `src/pages/OrderConfirmationPage.tsx`
- Displays a success message with the order ID
- Shows order summary (items, total)
- Link back to shop

### 3. Update: `src/pages/CartPage.tsx`
- Wire "Proceed to Checkout" button to navigate to `/checkout`

### 4. Update: `src/App.tsx`
- Add routes for `/checkout` and `/order-confirmation/:orderId`

### 5. Validation Schema
```
name: required, max 100 chars
email: required, valid email, max 255 chars
phone: optional, max 20 chars
shipping_address: required, max 500 chars
notes: optional, max 1000 chars
```

### 6. Database
No schema changes needed -- the existing `orders` and `order_items` tables and RLS policies already support this flow. The cart currently uses local static painting data (with string IDs like "1", "2"), so `painting_id` in `order_items` will be set to `null` (it's nullable) and the painting title/price will be stored directly.

### 7. Security Considerations
- All inputs validated client-side with zod before submission
- RLS policies already protect order data appropriately
- No sensitive data logged to console
- Guest orders (user_id = NULL) are only visible to admins per existing RLS
