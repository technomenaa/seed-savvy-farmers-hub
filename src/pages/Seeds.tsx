
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Database, Plus, Search, Calendar, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Seed {
  id: string;
  name: string;
  variety: string;
  type: string;
  description: string;
  plantingSeason: string;
  harvestTime: string;
  yieldPotential: string;
  waterRequirement: string;
  soilType: string;
  region: string;
  supplier: string;
  pricePerKg: string;
  availability: 'In Stock' | 'Limited' | 'Out of Stock';
  addedDate: string;
}

const Seeds = () => {
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSeed, setNewSeed] = useState({
    name: '',
    variety: '',
    type: '',
    description: '',
    plantingSeason: '',
    harvestTime: '',
    yieldPotential: '',
    waterRequirement: '',
    soilType: '',
    region: '',
    supplier: '',
    pricePerKg: '',
    availability: 'In Stock' as const
  });
  const { toast } = useToast();

  const seedTypes = ['Cereals', 'Vegetables', 'Legumes', 'Fruits', 'Herbs', 'Cash Crops'];
  const seasons = ['Spring', 'Summer', 'Fall', 'Winter', 'Year-round'];
  const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Silty', 'Mixed'];
  const waterLevels = ['Low', 'Medium', 'High'];

  // Load seeds from localStorage
  useEffect(() => {
    const savedSeeds = localStorage.getItem('seeds');
    if (savedSeeds) {
      setSeeds(JSON.parse(savedSeeds));
    } else {
      // Add sample data
      const sampleSeeds: Seed[] = [
        {
          id: '1',
          name: 'Premium Wheat',
          variety: 'Hard Red Winter',
          type: 'Cereals',
          description: 'High-yield wheat variety perfect for bread making with excellent disease resistance.',
          plantingSeason: 'Fall',
          harvestTime: '120 days',
          yieldPotential: '45-55 bushels/acre',
          waterRequirement: 'Medium',
          soilType: 'Loamy',
          region: 'Midwest',
          supplier: 'AgriSeeds Co.',
          pricePerKg: '$12.50',
          availability: 'In Stock',
          addedDate: '2024-01-10'
        },
        {
          id: '2',
          name: 'Golden Corn',
          variety: 'Sweet Corn Hybrid',
          type: 'Cereals',
          description: 'Fast-growing sweet corn with excellent taste and uniform ear development.',
          plantingSeason: 'Spring',
          harvestTime: '85 days',
          yieldPotential: '180-200 bushels/acre',
          waterRequirement: 'Medium',
          soilType: 'Sandy',
          region: 'Great Plains',
          supplier: 'Harvest Seeds Ltd.',
          pricePerKg: '$8.75',
          availability: 'In Stock',
          addedDate: '2024-01-15'
        },
        {
          id: '3',
          name: 'Roma Tomato',
          variety: 'Determinate',
          type: 'Vegetables',
          description: 'Disease-resistant Roma tomatoes perfect for sauce and paste production.',
          plantingSeason: 'Spring',
          harvestTime: '75 days',
          yieldPotential: '15-20 tons/acre',
          waterRequirement: 'High',
          soilType: 'Loamy',
          region: 'California',
          supplier: 'Fresh Garden Seeds',
          pricePerKg: '$25.00',
          availability: 'Limited',
          addedDate: '2024-02-01'
        }
      ];
      setSeeds(sampleSeeds);
      localStorage.setItem('seeds', JSON.stringify(sampleSeeds));
    }
  }, []);

  // Save seeds to localStorage
  useEffect(() => {
    if (seeds.length > 0) {
      localStorage.setItem('seeds', JSON.stringify(seeds));
    }
  }, [seeds]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newSeed.name || !newSeed.type || !newSeed.variety) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const seed: Seed = {
      id: Date.now().toString(),
      ...newSeed,
      addedDate: new Date().toISOString().split('T')[0]
    };

    setSeeds(prev => [...prev, seed]);
    setNewSeed({
      name: '',
      variety: '',
      type: '',
      description: '',
      plantingSeason: '',
      harvestTime: '',
      yieldPotential: '',
      waterRequirement: '',
      soilType: '',
      region: '',
      supplier: '',
      pricePerKg: '',
      availability: 'In Stock'
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Seed added successfully!",
    });
  };

  const filteredSeeds = seeds.filter(seed => {
    const matchesSearch = seed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seed.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seed.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seed.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || seed.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Limited': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Seed Database</h1>
          <p className="text-gray-600">Manage seed inventory with detailed information and availability</p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search seeds by name, variety, type, or supplier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {seedTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Seed
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Seed</DialogTitle>
                <DialogDescription>
                  Enter detailed information about the seed variety.
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
                    <Label htmlFor="variety">Variety *</Label>
                    <Input
                      id="variety"
                      value={newSeed.variety}
                      onChange={(e) => setNewSeed({...newSeed, variety: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type *</Label>
                    <Select value={newSeed.type} onValueChange={(value) => setNewSeed({...newSeed, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select seed type" />
                      </SelectTrigger>
                      <SelectContent>
                        {seedTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="supplier">Supplier</Label>
                    <Input
                      id="supplier"
                      value={newSeed.supplier}
                      onChange={(e) => setNewSeed({...newSeed, supplier: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="plantingSeason">Planting Season</Label>
                    <Select value={newSeed.plantingSeason} onValueChange={(value) => setNewSeed({...newSeed, plantingSeason: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent>
                        {seasons.map(season => (
                          <SelectItem key={season} value={season}>{season}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="harvestTime">Harvest Time</Label>
                    <Input
                      id="harvestTime"
                      placeholder="e.g., 90 days"
                      value={newSeed.harvestTime}
                      onChange={(e) => setNewSeed({...newSeed, harvestTime: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="yieldPotential">Yield Potential</Label>
                    <Input
                      id="yieldPotential"
                      placeholder="e.g., 150 bushels/acre"
                      value={newSeed.yieldPotential}
                      onChange={(e) => setNewSeed({...newSeed, yieldPotential: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="waterRequirement">Water Requirement</Label>
                    <Select value={newSeed.waterRequirement} onValueChange={(value) => setNewSeed({...newSeed, waterRequirement: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select water need" />
                      </SelectTrigger>
                      <SelectContent>
                        {waterLevels.map(level => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="soilType">Soil Type</Label>
                    <Select value={newSeed.soilType} onValueChange={(value) => setNewSeed({...newSeed, soilType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        {soilTypes.map(soil => (
                          <SelectItem key={soil} value={soil}>{soil}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="region">Region</Label>
                    <Input
                      id="region"
                      value={newSeed.region}
                      onChange={(e) => setNewSeed({...newSeed, region: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pricePerKg">Price per Kg</Label>
                    <Input
                      id="pricePerKg"
                      placeholder="e.g., $15.00"
                      value={newSeed.pricePerKg}
                      onChange={(e) => setNewSeed({...newSeed, pricePerKg: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Select value={newSeed.availability} onValueChange={(value: any) => setNewSeed({...newSeed, availability: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In Stock">In Stock</SelectItem>
                        <SelectItem value="Limited">Limited</SelectItem>
                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed description of the seed variety..."
                    value={newSeed.description}
                    onChange={(e) => setNewSeed({...newSeed, description: e.target.value})}
                    rows={4}
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">Add Seed</Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Database className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Seeds</p>
                  <p className="text-2xl font-bold">{seeds.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Stock</p>
                  <p className="text-2xl font-bold text-green-600">
                    {seeds.filter(s => s.availability === 'In Stock').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Limited</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {seeds.filter(s => s.availability === 'Limited').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Search className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Search Results</p>
                  <p className="text-2xl font-bold">{filteredSeeds.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seeds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSeeds.map((seed) => (
            <Card key={seed.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{seed.name}</CardTitle>
                    <p className="text-sm text-gray-500">{seed.variety}</p>
                  </div>
                  <Badge className={getAvailabilityColor(seed.availability)}>
                    {seed.availability}
                  </Badge>
                </div>
                <Badge variant="secondary" className="w-fit">
                  {seed.type}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {seed.description && (
                  <p className="text-sm text-gray-600 line-clamp-3">{seed.description}</p>
                )}
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {seed.plantingSeason && (
                    <div>
                      <span className="font-medium">Season:</span> {seed.plantingSeason}
                    </div>
                  )}
                  {seed.harvestTime && (
                    <div>
                      <span className="font-medium">Harvest:</span> {seed.harvestTime}
                    </div>
                  )}
                  {seed.waterRequirement && (
                    <div>
                      <span className="font-medium">Water:</span> {seed.waterRequirement}
                    </div>
                  )}
                  {seed.soilType && (
                    <div>
                      <span className="font-medium">Soil:</span> {seed.soilType}
                    </div>
                  )}
                </div>
                
                {seed.yieldPotential && (
                  <p className="text-sm"><span className="font-medium">Yield:</span> {seed.yieldPotential}</p>
                )}
                
                {seed.supplier && (
                  <p className="text-sm"><span className="font-medium">Supplier:</span> {seed.supplier}</p>
                )}
                
                {seed.pricePerKg && (
                  <p className="text-sm font-semibold text-primary">Price: {seed.pricePerKg}</p>
                )}
                
                <p className="text-xs text-gray-400">
                  Added: {new Date(seed.addedDate).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSeeds.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Database className="h-16 w-16 mx-auto mb-4" />
              <p className="text-xl">No seeds found</p>
              <p className="text-sm">Try adjusting your search criteria or add a new seed.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Seeds;
