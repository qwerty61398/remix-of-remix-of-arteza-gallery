import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, ShoppingBag, FileText, GraduationCap, LayoutDashboard } from "lucide-react";
import { AdminPaintings } from "./AdminPaintings";
import { AdminOrders } from "./AdminOrders";
import { AdminBlogPosts } from "./AdminBlogPosts";
import { AdminClasses } from "./AdminClasses";
import { AdminOverview } from "./AdminOverview";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your paintings, orders, blog posts, and class bookings
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-flex">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="paintings" className="gap-2">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Paintings</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Blog</span>
            </TabsTrigger>
            <TabsTrigger value="classes" className="gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Classes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminOverview />
          </TabsContent>

          <TabsContent value="paintings">
            <AdminPaintings />
          </TabsContent>

          <TabsContent value="orders">
            <AdminOrders />
          </TabsContent>

          <TabsContent value="blog">
            <AdminBlogPosts />
          </TabsContent>

          <TabsContent value="classes">
            <AdminClasses />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
