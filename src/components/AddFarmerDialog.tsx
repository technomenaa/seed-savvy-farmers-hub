
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

interface Farmer {
  id: string;
  name: string;
  location: string;
  specialties: string[];
  experience: string;
  farmSize: string;
  contact: {
    phone: string;
    email: string;
  };
  crops: string[];
  image: string;
  verified: boolean;
}

interface AddFarmerDialogProps {
  onFarmerAdded: (farmer: Farmer) => void;
}

const AddFarmerDialog = ({ onFarmerAdded }: AddFarmerDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    specialties: '',
    experience: '',
    farmSize: '',
    phone: '',
    email: '',
    crops: '',
    verified: false
  });

  const locations = [
    'Amman', 'Irbid', 'Zarqa', 'Ajloun', 'Jerash', 'Mafraq',
    'Balqa', 'Madaba', 'Karak', 'Tafilah', 'Maan', 'Aqaba'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newFarmer: Farmer = {
      id: Date.now().toString(),
      name: formData.name,
      location: formData.location,
      specialties: formData.specialties.split(',').map(s => s.trim()),
      experience: formData.experience,
      farmSize: formData.farmSize,
      contact: {
        phone: formData.phone,
        email: formData.email
      },
      crops: formData.crops.split(',').map(c => c.trim()),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      verified: formData.verified
    };

    onFarmerAdded(newFarmer);
    setOpen(false);
    setFormData({
      name: '',
      location: '',
      specialties: '',
      experience: '',
      farmSize: '',
      phone: '',
      email: '',
      crops: '',
      verified: false
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">
          <Plus className="h-4 w-4 mr-2" />
          Add Farmer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Farmer</DialogTitle>
          <DialogDescription>
            Add new farmer information to the database
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                placeholder="e.g. 15 years"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="farmSize">Farm Size</Label>
              <Input
                id="farmSize"
                value={formData.farmSize}
                onChange={(e) => setFormData({...formData, farmSize: e.target.value})}
                placeholder="e.g. 25 hectares"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+962 xx xxx xxxx"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="specialties">Specialties (comma separated)</Label>
            <Input
              id="specialties"
              value={formData.specialties}
              onChange={(e) => setFormData({...formData, specialties: e.target.value})}
              placeholder="e.g. Organic Farming, Seed Production"
              required
            />
          </div>

          <div>
            <Label htmlFor="crops">Crops (comma separated)</Label>
            <Input
              id="crops"
              value={formData.crops}
              onChange={(e) => setFormData({...formData, crops: e.target.value})}
              placeholder="e.g. Wheat, Barley, Vegetables"
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Farmer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFarmerDialog;
