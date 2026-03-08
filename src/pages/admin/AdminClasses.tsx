import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { adminMutation } from "@/lib/admin-api";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface ArtClass {
  id: string;
  title: string;
  description: string | null;
  duration: string | null;
  price: number | null;
  max_students: number | null;
  schedule: string | null;
  location: string | null;
  is_active: boolean | null;
  created_at: string;
}

interface ClassBooking {
  id: string;
  class_id: string;
  student_name: string;
  student_email: string;
  student_phone: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  classes?: { title: string };
}

const BOOKING_STATUS_OPTIONS = ["pending", "confirmed", "cancelled", "completed"];

export function AdminClasses() {
  const [classes, setClasses] = useState<ArtClass[]>([]);
  const [bookings, setBookings] = useState<ClassBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingClass, setEditingClass] = useState<ArtClass | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    max_students: "",
    schedule: "",
    location: "",
    is_active: true,
  });

  const fetchData = async () => {
    setIsLoading(true);

    const [classesRes, bookingsRes] = await Promise.all([
      supabase.from("classes").select("*").order("created_at", { ascending: false }),
      supabase.from("class_bookings").select("*, classes(title)").order("created_at", { ascending: false }),
    ]);

    if (classesRes.error) {
      toast({ title: "Error fetching classes", description: classesRes.error.message, variant: "destructive" });
    } else {
      setClasses(classesRes.data || []);
    }

    if (bookingsRes.error) {
      toast({ title: "Error fetching bookings", description: bookingsRes.error.message, variant: "destructive" });
    } else {
      setBookings(bookingsRes.data || []);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      duration: "",
      price: "",
      max_students: "",
      schedule: "",
      location: "",
      is_active: true,
    });
    setEditingClass(null);
  };

  const openEditDialog = (artClass: ArtClass) => {
    setEditingClass(artClass);
    setFormData({
      title: artClass.title,
      description: artClass.description || "",
      duration: artClass.duration || "",
      price: artClass.price?.toString() || "",
      max_students: artClass.max_students?.toString() || "",
      schedule: artClass.schedule || "",
      location: artClass.location || "",
      is_active: artClass.is_active ?? true,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const classData = {
      title: formData.title,
      description: formData.description || null,
      duration: formData.duration || null,
      price: formData.price ? parseFloat(formData.price) : null,
      max_students: formData.max_students ? parseInt(formData.max_students) : null,
      schedule: formData.schedule || null,
      location: formData.location || null,
      is_active: formData.is_active,
    };

    if (editingClass) {
      try {
        await adminMutation({ action: "update", table: "classes", data: classData, id: editingClass.id });
        toast({ title: "Class updated successfully" });
        setIsDialogOpen(false);
        resetForm();
        fetchData();
      } catch (error: any) {
        toast({ title: "Error updating class", description: error.message, variant: "destructive" });
      }
    } else {
      try {
        await adminMutation({ action: "insert", table: "classes", data: classData });
        toast({ title: "Class created successfully" });
        setIsDialogOpen(false);
        resetForm();
        fetchData();
      } catch (error: any) {
        toast({ title: "Error creating class", description: error.message, variant: "destructive" });
      }
    }

    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this class?")) return;

    const { error } = await supabase.from("classes").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting class", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Class deleted successfully" });
      fetchData();
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    const { error } = await supabase.from("class_bookings").update({ status }).eq("id", bookingId);
    if (error) {
      toast({ title: "Error updating booking status", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Booking status updated" });
      fetchData();
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "confirmed":
      case "completed":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Tabs defaultValue="classes" className="space-y-4">
      <TabsList>
        <TabsTrigger value="classes">Classes</TabsTrigger>
        <TabsTrigger value="bookings">Bookings</TabsTrigger>
      </TabsList>

      <TabsContent value="classes">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Classes ({classes.length})</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Class
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingClass ? "Edit Class" : "Add New Class"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input id="price" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input id="duration" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="e.g., 2 hours" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="max_students">Max Students</Label>
                      <Input id="max_students" type="number" value={formData.max_students} onChange={(e) => setFormData({ ...formData, max_students: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schedule">Schedule</Label>
                    <Input id="schedule" value={formData.schedule} onChange={(e) => setFormData({ ...formData, schedule: e.target.value })} placeholder="e.g., Saturdays 10am-12pm" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} />
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch id="is_active" checked={formData.is_active} onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })} />
                    <Label htmlFor="is_active">Active</Label>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {editingClass ? "Update" : "Create"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classes.map((artClass) => (
                    <TableRow key={artClass.id}>
                      <TableCell className="font-medium">{artClass.title}</TableCell>
                      <TableCell>{artClass.schedule || "TBD"}</TableCell>
                      <TableCell>{artClass.price ? `₹${artClass.price.toLocaleString("en-IN")}` : "Free"}</TableCell>
                      <TableCell>
                        <Badge variant={artClass.is_active ? "default" : "secondary"}>
                          {artClass.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(artClass)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(artClass.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {classes.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No classes found. Click "Add Class" to create one.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="bookings">
        <Card>
          <CardHeader>
            <CardTitle>Class Bookings ({bookings.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{format(new Date(booking.created_at), "MMM d, yyyy")}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.student_name}</p>
                          <p className="text-sm text-muted-foreground">{booking.student_email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{booking.classes?.title || "Unknown"}</TableCell>
                      <TableCell>
                        <Select value={booking.status} onValueChange={(value) => updateBookingStatus(booking.id, value)}>
                          <SelectTrigger className="w-[130px]">
                            <Badge variant={getStatusBadgeVariant(booking.status)}>{booking.status}</Badge>
                          </SelectTrigger>
                          <SelectContent>
                            {BOOKING_STATUS_OPTIONS.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                  {bookings.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No bookings found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
