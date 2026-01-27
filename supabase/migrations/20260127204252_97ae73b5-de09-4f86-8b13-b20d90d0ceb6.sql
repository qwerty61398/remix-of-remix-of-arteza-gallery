-- Fix: Prevent public exposure of customer personal information in orders table
-- The issue: Guest orders (user_id IS NULL) could potentially be queried

-- Drop the existing permissive user SELECT policy
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

-- Create a new restrictive policy that:
-- 1. Only allows authenticated users to see their own orders (user_id = auth.uid())
-- 2. Does NOT allow viewing orders where user_id IS NULL (guest orders) except by admins
CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Also fix the order_items INSERT policy to prevent unrestricted inserts
DROP POLICY IF EXISTS "Users can create order items" ON public.order_items;

-- Create a restrictive policy that only allows inserting order items for orders the user owns
CREATE POLICY "Users can create order items" 
ON public.order_items 
FOR INSERT 
WITH CHECK (
  -- User must be authenticated and own the order, OR be an admin
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_id 
    AND (
      (auth.uid() IS NOT NULL AND orders.user_id = auth.uid())
      OR public.has_role(auth.uid(), 'admin')
    )
  )
  -- Also allow for guest checkout (new orders being created without user_id)
  OR EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_id 
    AND orders.user_id IS NULL
  )
);