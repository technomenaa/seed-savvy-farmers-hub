
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Plus, Search, MapPin, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Farmer {
  id: string;
  name: string;
  email: string;
  phone: string;
  region: string;
  farmSize: string;
  specialization: string;
  experience: string;
  description: string;
  registrationDate: string;
}

const Farmers = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFarmer, setNewFarmer] = useState({
    name: '',
    email: '',
    phone: '',
    region: '',
    farmSize: '',
    specialization: '',
    experience: '',
    description: ''
  });
  const { toast } = useToast();

  // Load farmers from localStorage on component mount
  useEffect(() => {
    const savedFarmers = localStorage.getItem('farmers');
    if (savedFarmers) {
      setFarmers(JSON.parse(savedFarmers));
    } else {
      // Add some sample data
      const sampleFarmers: Farmer[] = [
        {
          id: '1',
          name: 'Ahmed Hassan',
          email: 'ahmed.hassan@email.com',
          phone: '+1-555-0101',
          region: 'Nile Delta',
          farmSize: '50 acres',
          specialization: 'Wheat, Rice',
          experience: '15 years',
          description: 'Experienced farmer specializing in cereal crops with sustainable farming practices.',
          registrationDate: '2024-01-15'
        },
        {
          id: '2',
          name: 'Sarah Ahmed',
          email: 'sarah.ahmed@email.com',
          phone: '+1-555-0102',
          region: 'Upper Egypt',
          farmSize: '30 acres',
          specialization: 'Vegetables, Legumes',
          experience: '8 years',
          description: 'Organic vegetable farmer focused on local market supply and sustainable agriculture.',
          registrationDate: '2024-02-20'
        }
      ];
      setFarmers(sampleFarmers);
      localStorage.setItem('farmers', JSON.stringify(sampleFarmers));
    }
  }, []);

  // Save farmers to localStorage whenever farmers state changes
  useEffect(() => {
    if (farmers.length > 0) {
      localStorage.setItem('farmers', JSON.stringify(farmers));
    }
  }, [farmers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newFarmer.name || !newFarmer.email || !newFarmer.phone || !newFarmer.region) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const farmer: Farmer = {
      id: Date.now().toString(),
      ...newFarmer,
      registrationDate: new Date().toISOString().split('T')[0]
    };

    setFarmers(prev => [...prev, farmer]);
    setNewFarmer({
      name: '',
      email: '',
      phone: '',
      region: '',
      farmSize: '',
      specialization: '',
      experience: '',
      description: ''
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Farmer registered successfully!",
    });
  };

  const filteredFarmers = farmers.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Farmer Management</h1>
          <p className="text-gray-600">Register new farmers and manage existing profiles</p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search farmers by name, region, or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Register Farmer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Register New Farmer</DialogTitle>
                <DialogDescription>
                  Fill in the farmer's information to create a new profile.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newFarmer.name}
                      onChange={(e) => setNewFarmer({...newFarmer, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newFarmer.email}
                      onChange={(e) => setNewFarmer({...newFarmer, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={newFarmer.phone}
                      onChange={(e) => setNewFarmer({...newFarmer, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="region">Region *</Label>
                    <Input
                      id="region"
                      value={newFarmer.region}
                      onChange={(e) => setNewFarmer({...newFarmer, region: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="farmSize">Farm Size</Label>
                    <Input
                      id="farmSize"
                      placeholder="e.g., 25 acres"
                      value={newFarmer.farmSize}
                      onChange={(e) => setNewFarmer({...newFarmer, farmSize: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      placeholder="e.g., 10 years"
                      value={newFarmer.experience}
                      onChange={(e) => setNewFarmer({...newFarmer, experience: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    placeholder="e.g., Wheat, Rice, Vegetables"
                    value={newFarmer.specialization}
                    onChange={(e) => setNewFarmer({...newFarmer, specialization: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Additional information about the farmer..."
                    value={newFarmer.description}
                    onChange={(e) => setNewFarmer({...newFarmer, description: e.target.value})}
                    rows={3}
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">Register Farmer</Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <User className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Farmers</p>
                  <p className="text-2xl font-bold">{farmers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Regions</p>
                  <p className="text-2xl font-bold">{new Set(farmers.map(f => f.region)).size}</p>
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
                  <p className="text-2xl font-bold">{filteredFarmers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Farmers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarmers.map((farmer) => (
            <Card key={farmer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {farmer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{farmer.name}</CardTitle>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {farmer.region}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {farmer.email}
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  {farmer.phone}
                </div>
                
                {farmer.specialization && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Specialization:</p>
                    <div className="flex flex-wrap gap-1">
                      {farmer.specialization.split(',').map((spec, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {spec.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {farmer.farmSize && (
                  <p className="text-sm"><span className="font-medium">Farm Size:</span> {farmer.farmSize}</p>
                )}
                
                {farmer.experience && (
                  <p className="text-sm"><span className="font-medium">Experience:</span> {farmer.experience}</p>
                )}
                
                {farmer.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">{farmer.description}</p>
                )}
                
                <p className="text-xs text-gray-400">
                  Registered: {new Date(farmer.registrationDate).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFarmers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <User className="h-16 w-16 mx-auto mb-4" />
              <p className="text-xl">No farmers found</p>
              <p className="text-sm">Try adjusting your search criteria or register a new farmer.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Farmers;
