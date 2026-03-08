import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { adminMutation } from "@/lib/admin-api";
import { useToast } from "@/hooks/use-toast";

interface Painting {
  id: string;
  title: string;
  description: string | null;
  story: string | null;
  price: number;
  dimensions: string | null;
  collection: string;
  image_url: string;
  is_available: boolean | null;
  is_featured: boolean | null;
  created_at: string;
}

const COLLECTIONS = [
  "abstract",
  "cultural",
  "dreamscapes",
  "nature",
  "portraits",
];

export function AdminPaintings() {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPainting, setEditingPainting] = useState<Painting | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    story: "",
    price: "",
    dimensions: "",
    collection: "abstract",
    image_url: "",
    is_available: true,
    is_featured: false,
  });

  const fetchPaintings = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("paintings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error fetching paintings",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setPaintings(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPaintings();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      story: "",
      price: "",
      dimensions: "",
      collection: "abstract",
      image_url: "",
      is_available: true,
      is_featured: false,
    });
    setEditingPainting(null);
  };

  const openEditDialog = (painting: Painting) => {
    setEditingPainting(painting);
    setFormData({
      title: painting.title,
      description: painting.description || "",
      story: painting.story || "",
      price: painting.price.toString(),
      dimensions: painting.dimensions || "",
      collection: painting.collection,
      image_url: painting.image_url,
      is_available: painting.is_available ?? true,
      is_featured: painting.is_featured ?? false,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const paintingData = {
      title: formData.title,
      description: formData.description || null,
      story: formData.story || null,
      price: parseFloat(formData.price),
      dimensions: formData.dimensions || null,
      collection: formData.collection,
      image_url: formData.image_url,
      is_available: formData.is_available,
      is_featured: formData.is_featured,
    };

    if (editingPainting) {
      try {
        await adminMutation({ action: "update", table: "paintings", data: paintingData, id: editingPainting.id });
        toast({ title: "Painting updated successfully" });
        setIsDialogOpen(false);
        resetForm();
        fetchPaintings();
      } catch (error: any) {
        toast({ title: "Error updating painting", description: error.message, variant: "destructive" });
      }
    } else {
      try {
        await adminMutation({ action: "insert", table: "paintings", data: paintingData });
        toast({ title: "Painting created successfully" });
        setIsDialogOpen(false);
        resetForm();
        fetchPaintings();
      } catch (error: any) {
        toast({ title: "Error creating painting", description: error.message, variant: "destructive" });
      }
    }

    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this painting?")) return;

    try {
      await adminMutation({ action: "delete", table: "paintings", id });
      toast({ title: "Painting deleted successfully" });
      fetchPaintings();
    } catch (error: any) {
      toast({ title: "Error deleting painting", description: error.message, variant: "destructive" });
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Paintings ({paintings.length})</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Painting
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPainting ? "Edit Painting" : "Add New Painting"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="collection">Collection *</Label>
                  <Select
                    value={formData.collection}
                    onValueChange={(value) => setFormData({ ...formData, collection: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COLLECTIONS.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c.charAt(0).toUpperCase() + c.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    placeholder="e.g., 24x36 inches"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Painting Image *</Label>
                <div className="flex items-start gap-4">
                  <ImageUpload
                    value={formData.image_url}
                    onChange={(url) => setFormData({ ...formData, image_url: url })}
                  />
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="image_url" className="text-xs text-muted-foreground">
                      Or enter URL directly
                    </Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="story">Story</Label>
                <Textarea
                  id="story"
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_available"
                    checked={formData.is_available}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_available: checked })}
                  />
                  <Label htmlFor="is_available">Available for Sale</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <Label htmlFor="is_featured">Featured</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingPainting ? "Update" : "Create"}
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
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Collection</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paintings.map((painting) => (
                <TableRow key={painting.id}>
                  <TableCell>
                    <img
                      src={painting.image_url}
                      alt={painting.title}
                      className="h-12 w-12 rounded object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{painting.title}</TableCell>
                  <TableCell className="capitalize">{painting.collection}</TableCell>
                  <TableCell>₹{painting.price.toLocaleString("en-IN")}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Badge variant={painting.is_available ? "default" : "secondary"}>
                        {painting.is_available ? "Available" : "Sold"}
                      </Badge>
                      {painting.is_featured && <Badge variant="outline">Featured</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(painting)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(painting.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {paintings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No paintings found. Click "Add Painting" to create one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
