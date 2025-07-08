
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddSeedDialogProps {
  onSeedAdded: (seed: any) => void;
}

const AddSeedDialog = ({ onSeedAdded }: AddSeedDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newSeed, setNewSeed] = useState({
    name: '',
    scientificName: '',
    category: '',
    origin: '',
    plantingMonth: '',
    harvestPeriod: '',
    soilType: '',
    waterRequirement: '',
    sunlight: '',
    temperature: '',
    description: ''
  });
  const { toast } = useToast();

  const categories = [
    'Vegetables',
    'Fruits', 
    'Grains',
    'Herbs',
    'Legumes',
    'Flowers'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newSeed.name || !newSeed.scientificName || !newSeed.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const seed = {
      id: Date.now().toString(),
      ...newSeed,
      image: `https://images.unsplash.com/photo-${1574323347407 + Math.floor(Math.random() * 1000)}-f5e1ad6d020b?w=300&h=200&fit=crop`,
      inStock: true
    };

    console.log('Adding new seed:', seed);
    onSeedAdded(seed);
    
    setNewSeed({
      name: '',
      scientificName: '',
      category: '',
      origin: '',
      plantingMonth: '',
      harvestPeriod: '',
      soilType: '',
      waterRequirement: '',
      sunlight: '',
      temperature: '',
      description: ''
    });
    setIsOpen(false);
    
    toast({
      title: "Success",
      description: "Seed added successfully!",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Seed
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Seed</DialogTitle>
          <DialogDescription>
            Enter detailed information about the new seed variety.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Seed Name *</Label>
              <Input
                id="name"
                value={newSeed.name}
                onChange={(e) => setNewSeed({...newSeed, name: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="scientificName">Scientific Name *</Label>
              <Input
                id="scientificName"
                value={newSeed.scientificName}
                onChange={(e) => setNewSeed({...newSeed, scientificName: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={newSeed.category} onValueChange={(value) => setNewSeed({...newSeed, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="origin">Origin</Label>
              <Input
                id="origin"
                value={newSeed.origin}
                onChange={(e) => setNewSeed({...newSeed, origin: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="plantingMonth">Planting Season</Label>
              <Input
                id="plantingMonth"
                placeholder="e.g., March-May"
                value={newSeed.plantingMonth}
                onChange={(e) => setNewSeed({...newSeed, plantingMonth: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="harvestPeriod">Harvest Period</Label>
              <Input
                id="harvestPeriod"
                placeholder="e.g., 75-85 days"
                value={newSeed.harvestPeriod}
                onChange={(e) => setNewSeed({...newSeed, harvestPeriod: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="soilType">Soil Type</Label>
              <Input
                id="soilType"
                value={newSeed.soilType}
                onChange={(e) => setNewSeed({...newSeed, soilType: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="waterRequirement">Water Requirement</Label>
              <Input
                id="waterRequirement"
                value={newSeed.waterRequirement}
                onChange={(e) => setNewSeed({...newSeed, waterRequirement: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="sunlight">Sunlight</Label>
              <Input
                id="sunlight"
                value={newSeed.sunlight}
                onChange={(e) => setNewSeed({...newSeed, sunlight: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="temperature">Temperature</Label>
              <Input
                id="temperature"
                value={newSeed.temperature}
                onChange={(e) => setNewSeed({...newSeed, temperature: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the seed characteristics and growing tips..."
              value={newSeed.description}
              onChange={(e) => setNewSeed({...newSeed, description: e.target.value})}
              rows={4}
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">Add Seed</Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSeedDialog;
