
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search as SearchIcon, Filter, User, Database, MapPin, Phone, Mail } from 'lucide-react';

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

const Search = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('farmers');

  // Load data from localStorage
  useEffect(() => {
    const savedFarmers = localStorage.getItem('farmers');
    const savedSeeds = localStorage.getItem('seeds');
    
    if (savedFarmers) {
      setFarmers(JSON.parse(savedFarmers));
    }
    
    if (savedSeeds) {
      setSeeds(JSON.parse(savedSeeds));
    }
  }, []);

  const regions = [...new Set([...farmers.map(f => f.region), ...seeds.map(s => s.region)].filter(Boolean))];
  const seedTypes = [...new Set(seeds.map(s => s.type).filter(Boolean))];

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion === 'all' || farmer.region === selectedRegion;
    
    return matchesSearch && matchesRegion;
  });

  const filteredSeeds = seeds.filter(seed => {
    const matchesSearch = seed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seed.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seed.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seed.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seed.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion === 'all' || seed.region === selectedRegion;
    const matchesType = selectedType === 'all' || seed.type === selectedType;
    const matchesAvailability = selectedAvailability === 'all' || seed.availability === selectedAvailability;
    
    return matchesSearch && matchesRegion && matchesType && matchesAvailability;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRegion('all');
    setSelectedType('all');
    setSelectedAvailability('all');
  };

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Search</h1>
          <p className="text-gray-600">Find farmers and seeds using our comprehensive search and filtering system</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SearchIcon className="h-5 w-5" />
              Search & Filters
            </CardTitle>
            <CardDescription>
              Use the search bar and filters below to find exactly what you're looking for
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Main Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search farmers, seeds, varieties, suppliers, regions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-base h-12"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="region">Region</Label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Regions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {regions.map(region => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Seed Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {seedTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="availability">Availability</Label>
                <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Availability</SelectItem>
                    <SelectItem value="In Stock">In Stock</SelectItem>
                    <SelectItem value="Limited">Limited</SelectItem>
                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" onClick={clearFilters} className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="farmers" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Farmers ({filteredFarmers.length})
            </TabsTrigger>
            <TabsTrigger value="seeds" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Seeds ({filteredSeeds.length})
            </TabsTrigger>
          </TabsList>

          {/* Farmers Results */}
          <TabsContent value="farmers">
            {filteredFarmers.length === 0 ? (
              <div className="text-center py-12">
                <User className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-xl text-gray-600 mb-2">No farmers found</p>
                <p className="text-gray-500">Try adjusting your search criteria or clear filters to see all farmers.</p>
              </div>
            ) : (
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Seeds Results */}
          <TabsContent value="seeds">
            {filteredSeeds.length === 0 ? (
              <div className="text-center py-12">
                <Database className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-xl text-gray-600 mb-2">No seeds found</p>
                <p className="text-gray-500">Try adjusting your search criteria or clear filters to see all seeds.</p>
              </div>
            ) : (
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
                      
                      {seed.region && (
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          {seed.region}
                        </div>
                      )}
                      
                      {seed.yieldPotential && (
                        <p className="text-sm"><span className="font-medium">Yield:</span> {seed.yieldPotential}</p>
                      )}
                      
                      {seed.supplier && (
                        <p className="text-sm"><span className="font-medium">Supplier:</span> {seed.supplier}</p>
                      )}
                      
                      {seed.pricePerKg && (
                        <p className="text-sm font-semibold text-primary">Price: {seed.pricePerKg}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Search;
