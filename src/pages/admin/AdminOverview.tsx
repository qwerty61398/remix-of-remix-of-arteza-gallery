import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, ShoppingBag, FileText, Users, IndianRupee } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  totalPaintings: number;
  totalOrders: number;
  totalRevenue: number;
  totalBlogPosts: number;
  pendingOrders: number;
  availablePaintings: number;
}

export function AdminOverview() {
  const [stats, setStats] = useState<Stats>({
    totalPaintings: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalBlogPosts: 0,
    pendingOrders: 0,
    availablePaintings: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);

      const [paintingsRes, ordersRes, blogRes] = await Promise.all([
        supabase.from("paintings").select("id, is_available", { count: "exact" }),
        supabase.from("orders").select("id, total_amount, status", { count: "exact" }),
        supabase.from("blog_posts").select("id", { count: "exact" }),
      ]);

      const paintings = paintingsRes.data || [];
      const orders = ordersRes.data || [];

      setStats({
        totalPaintings: paintingsRes.count || 0,
        availablePaintings: paintings.filter(p => p.is_available).length,
        totalOrders: ordersRes.count || 0,
        pendingOrders: orders.filter(o => o.status === "pending").length,
        totalRevenue: orders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0),
        totalBlogPosts: blogRes.count || 0,
      });

      setIsLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Paintings",
      value: stats.totalPaintings,
      subtitle: `${stats.availablePaintings} available`,
      icon: Image,
      color: "text-primary",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      subtitle: `${stats.pendingOrders} pending`,
      icon: ShoppingBag,
      color: "text-chart-1",
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`,
      subtitle: "All time",
      icon: IndianRupee,
      color: "text-chart-2",
    },
    {
      title: "Blog Posts",
      value: stats.totalBlogPosts,
      subtitle: "Published & drafts",
      icon: FileText,
      color: "text-chart-3",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-8 w-8 bg-muted rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted rounded mb-1" />
              <div className="h-3 w-20 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p>Use the tabs above to manage your paintings, orders, blog posts, and classes.</p>
        </CardContent>
      </Card>
    </div>
  );
}
