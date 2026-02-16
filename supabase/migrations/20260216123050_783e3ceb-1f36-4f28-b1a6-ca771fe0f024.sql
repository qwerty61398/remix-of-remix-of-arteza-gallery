
-- Fix: Make INSERT policies permissive so guest and authenticated users can create orders
-- Drop restrictive policies and recreate as permissive

DROP POLICY IF EXISTS "Users can create orders" ON public.orders;
CREATE POLICY "Users can create orders"
ON public.orders
FOR INSERT
WITH CHECK ((auth.uid() = user_id) OR (user_id IS NULL));

DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
CREATE POLICY "Users can view their own orders"
ON public.orders
FOR SELECT
USING ((auth.uid() IS NOT NULL) AND (auth.uid() = user_id) AND (user_id IS NOT NULL));

DROP POLICY IF EXISTS "Users can create order items" ON public.order_items;
CREATE POLICY "Users can create order items"
ON public.order_items
FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM orders
  WHERE orders.id = order_items.order_id
  AND (
    (auth.uid() IS NOT NULL AND orders.user_id = auth.uid())
    OR orders.user_id IS NULL
    OR has_role(auth.uid(), 'admin'::app_role)
  )
));

DROP POLICY IF EXISTS "Users can view their order items" ON public.order_items;
CREATE POLICY "Users can view their order items"
ON public.order_items
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM orders
  WHERE orders.id = order_items.order_id
  AND orders.user_id IS NOT NULL
  AND orders.user_id = auth.uid()
));

-- Also fix the admin ALL policies to be permissive
DROP POLICY IF EXISTS "Admins can manage orders" ON public.orders;
CREATE POLICY "Admins can manage orders"
ON public.orders
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
CREATE POLICY "Admins can view all orders"
ON public.orders
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can manage order items" ON public.order_items;
CREATE POLICY "Admins can manage order items"
ON public.order_items
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can view all order items" ON public.order_items;
CREATE POLICY "Admins can view all order items"
ON public.order_items
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));
