
-- Fix: Ensure guest orders (user_id IS NULL) are only accessible by admins
-- Drop and recreate the SELECT policy for regular users on orders table
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
CREATE POLICY "Users can view their own orders"
  ON public.orders
  FOR SELECT
  USING ((auth.uid() IS NOT NULL) AND (auth.uid() = user_id) AND (user_id IS NOT NULL));

-- Fix: Ensure guest order items are also protected
DROP POLICY IF EXISTS "Users can view their order items" ON public.order_items;
CREATE POLICY "Users can view their order items"
  ON public.order_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
        AND orders.user_id IS NOT NULL
        AND orders.user_id = auth.uid()
    )
  );

-- Also tighten the INSERT policy for order_items to prevent creating items on others' orders
DROP POLICY IF EXISTS "Users can create order items" ON public.order_items;
CREATE POLICY "Users can create order items"
  ON public.order_items
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
        AND (
          (auth.uid() IS NOT NULL AND orders.user_id = auth.uid())
          OR (orders.user_id IS NULL)
          OR has_role(auth.uid(), 'admin'::app_role)
        )
    )
  );
