-- Fix 1: Paintings - restrict public SELECT to available paintings only
DROP POLICY "Anyone can view available paintings" ON public.paintings;
CREATE POLICY "Anyone can view available paintings"
  ON public.paintings
  FOR SELECT
  TO public
  USING (is_available = true);

-- Fix 2: Class bookings - require authentication for booking creation
DROP POLICY "Users can create bookings" ON public.class_bookings;
CREATE POLICY "Authenticated users can create bookings"
  ON public.class_bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Fix 3: User roles - add explicit restrictive INSERT policy for non-admins
CREATE POLICY "Only admins can insert roles"
  ON public.user_roles
  FOR INSERT
  TO public
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));