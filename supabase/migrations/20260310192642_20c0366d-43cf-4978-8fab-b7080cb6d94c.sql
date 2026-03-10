
-- Revoke direct INSERT on orders and order_items from anon and authenticated
-- All order creation must go through the create-order edge function (which uses service_role)
REVOKE INSERT ON public.orders FROM anon, authenticated;
REVOKE INSERT ON public.order_items FROM anon, authenticated;

-- Drop the now-unnecessary INSERT policies
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create order items" ON public.order_items;
