

## Plan: QR Code Payment Flow

### Overview
Replace the current checkout with a two-step flow: **Cart → Shipping Form → QR Code Payment Page**. After filling in shipping details, customers see a dynamically generated UPI QR code with the exact order amount pre-filled. They scan to pay, then send a screenshot via WhatsApp to confirm.

### Flow
```text
Cart → Checkout (shipping form) → Payment Page (QR code + WhatsApp link)
                                      ↓
                              Order created (status: pending_payment)
                              Customer scans QR, pays via UPI
                              Sends screenshot to WhatsApp
                              Admin manually confirms payment
```

### Changes

**1. Store UPI ID as a backend secret**
- Use the secrets tool to ask you for your UPI ID (e.g. `name@upi`). It will be stored securely and used by a backend function to generate the UPI payment string.

**2. Create a `generate-upi-qr` backend function**
- Accepts: order total, order ID
- Reads the UPI ID from secrets
- Returns a UPI deep link string: `upi://pay?pa=UPI_ID&pn=ARTEZA&am=AMOUNT&tn=Order-ORDERID&cu=INR`
- This string is used client-side to render a QR code

**3. Modify `CheckoutPage.tsx`**
- Keep the shipping form (name, email, phone, address, notes)
- On submit: create the order via the existing `create-order` edge function, then navigate to a new `/payment/:orderId` page instead of the confirmation page

**4. Create new `PaymentPage.tsx`**
- Calls the `generate-upi-qr` function to get the UPI link
- Renders a QR code using a lightweight library (e.g. `qrcode.react`)
- Shows order summary and total amount
- Displays a "Send Payment Screenshot" button that opens WhatsApp (`wa.me/919711804497`) with a pre-filled message like "Payment for Order #XYZ, Amount: ₹11,000"
- After sending screenshot, a "I've sent the screenshot" button navigates to the order confirmation page

**5. Update `OrderConfirmationPage.tsx`**
- Adjust messaging to indicate the order is placed and payment is being verified (instead of assuming payment is complete)

**6. Add route `/payment/:orderId`** in `App.tsx`

**7. Install `qrcode.react`** package for QR code rendering

### Security
- UPI ID is never exposed in client-side code — it's only accessed by the backend function
- The existing order creation flow via edge function with service_role is preserved
- No personal UPI IDs displayed in the UI (only encoded in the QR code)

