
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Calendar, Leaf, Edit } from 'lucide-react';
import AddSeedDialog from '@/components/AddSeedDialog';
import SeedRequestDialog from '@/components/SeedRequestDialog';

interface Seed {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  origin: string;
  plantingMonth: string;
  harvestPeriod: string;
  soilType: string;
  waterRequirement: string;
  sunlight: string;
  temperature: string;
  description: string;
  image: string;
  inStock: boolean;
}

const Seeds = () => {
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeed, setSelectedSeed] = useState<Seed | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const categories = [
    { 
      name: 'Vegetables', 
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&h=150&fit=crop',
      count: 0
    },
    { 
      name: 'Fruits', 
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=200&h=150&fit=crop',
      count: 0
    },
    { 
      name: 'Grains', 
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&h=150&fit=crop',
      count: 0
    },
    { 
      name: 'Herbs', 
      image: 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91b?w=200&h=150&fit=crop',
      count: 0
    },
    { 
      name: 'Legumes', 
      image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=200&h=150&fit=crop',
      count: 0
    },
    { 
      name: 'Flowers', 
      image: 'https://images.unsplash.com/photo-1597848212624-e6e5d24ec4c2?w=200&h=150&fit=crop',
      count: 0
    }
  ];

  useEffect(() => {
    // Check if admin is logged in from localStorage or context
    const adminStatus = localStorage.getItem('isAdminLoggedIn') === 'true';
    setIsAdminLoggedIn(adminStatus);

    const sampleSeeds: Seed[] = [
      {
        id: '1',
        name: 'Tomato - Roma',
        scientificName: 'Solanum lycopersicum',
        category: 'Vegetables',
        origin: 'Amman, Jordan',
        plantingMonth: 'March-May',
        harvestPeriod: '75-85 days',
        soilType: 'Well-drained, fertile soil',
        waterRequirement: 'Regular watering',
        sunlight: 'Full sun (6-8 hours)',
        temperature: '18-25°C',
        description: 'Roma tomatoes are determinate paste tomatoes, perfect for sauces and preserving. They have thick walls, few seeds, and excellent flavor.',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=200&fit=crop',
        inStock: true
      },
      {
        id: '2',
        name: 'Wheat - Hard Red',
        scientificName: 'Triticum aestivum',
        category: 'Grains',
        origin: 'Irbid, Jordan',
        plantingMonth: 'October-December',
        harvestPeriod: '120-150 days',
        soilType: 'Clay loam, well-drained',
        waterRequirement: 'Moderate',
        sunlight: 'Full sun',
        temperature: '15-22°C',
        description: 'Hard red wheat is high in protein and gluten, making it ideal for bread making. It\'s drought-tolerant and adapts well to various climates.',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
        inStock: true
      },
      {
        id: '3',
        name: 'Thyme - Wild',
        scientificName: 'Thymus serpyllum',
        category: 'Herbs',
        origin: 'Ajloun, Jordan',
        plantingMonth: 'April-June',
        harvestPeriod: '60-90 days',
        soilType: 'Rocky, well-drained soil',
        waterRequirement: 'Low water needs',
        sunlight: 'Full sun to partial shade',
        temperature: '20-30°C',
        description: 'Wild thyme is a hardy aromatic herb native to Jordan, perfect for culinary use and traditional medicine. It\'s drought-tolerant and easy to grow.',
        image: 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91b?w=300&h=200&fit=crop',
        inStock: false
      },
      {
        id: '4',
        name: 'Sunflower',
        scientificName: 'Helianthus annuus',
        category: 'Flowers',
        origin: 'Zarqa, Jordan',
        plantingMonth: 'April-July',
        harvestPeriod: '80-120 days',
        soilType: 'Well-drained, fertile',
        waterRequirement: 'Deep, infrequent watering',
        sunlight: 'Full sun',
        temperature: '18-25°C',
        description: 'Sunflowers are excellent for oil production and as ornamental plants. They attract beneficial insects and are relatively easy to grow.',
        image: 'https://images.unsplash.com/photo-1597848212624-e6e5d24ec4c2?w=300&h=200&fit=crop',
        inStock: true
      }
    ];
    setSeeds(sampleSeeds);
  }, []);

  // Update category counts
  const categoriesWithCounts = categories.map(category => ({
    ...category,
    count: seeds.filter(seed => seed.category === category.name).length
  }));

  const filteredSeeds = seeds.filter(seed => {
    const matchesSearch = seed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seed.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || seed.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSeedClick = (seed: Seed) => {
    setSelectedSeed(seed);
    setIsDetailsOpen(true);
  };

  const handleSeedAdded = (newSeed: Seed) => {
    setSeeds(prevSeeds => [...prevSeeds, newSeed]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Seed Database</h1>
          <p className="text-gray-600">Explore our comprehensive collection of seeds with detailed information</p>
        </div>

        {/* Categories Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Browse by Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div 
              className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                selectedCategory === 'all' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedCategory('all')}
            >
              <div className="text-center">
                <div className="w-full h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-lg mb-2 flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-medium text-sm">All Seeds</h3>
                <p className="text-xs text-gray-500">{seeds.length} items</p>
              </div>
            </div>
            
            {categoriesWithCounts.map((category) => (
              <div 
                key={category.name}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  selectedCategory === category.name ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className="text-center">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-20 object-cover rounded-lg mb-2"
                  />
                  <h3 className="font-medium text-sm">{category.name}</h3>
                  <p className="text-xs text-gray-500">{category.count} items</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search seeds by name or scientific name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {isAdminLoggedIn && <AddSeedDialog onSeedAdded={handleSeedAdded} />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredSeeds.map((seed) => (
            <Card 
              key={seed.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden relative"
              onClick={() => handleSeedClick(seed)}
            >
              {isAdminLoggedIn && (
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 left-2 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle edit functionality
                  }}
                >
                  <Edit className="h-3 w-3" />
                </Button>
              )}
              
              <div className="relative">
                <img 
                  src={seed.image} 
                  alt={seed.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop';
                  }}
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={seed.inStock ? "default" : "secondary"}>
                    {seed.inStock ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{seed.name}</CardTitle>
                <CardDescription className="italic">{seed.scientificName}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="mb-2">{seed.category}</Badge>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span>{seed.origin}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>Plant: {seed.plantingMonth}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Seed Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedSeed && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedSeed.name}</DialogTitle>
                  <DialogDescription className="italic text-lg">
                    {selectedSeed.scientificName}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img 
                      src={selectedSeed.image} 
                      alt={selectedSeed.name}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop';
                      }}
                    />
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant={selectedSeed.inStock ? "default" : "secondary"}>
                        {selectedSeed.inStock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                      <Badge variant="outline">{selectedSeed.category}</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Description</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedSeed.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Origin</h4>
                        <p className="text-sm">{selectedSeed.origin}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Planting Season</h4>
                        <p className="text-sm">{selectedSeed.plantingMonth}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Harvest Period</h4>
                        <p className="text-sm">{selectedSeed.harvestPeriod}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Soil Type</h4>
                        <p className="text-sm">{selectedSeed.soilType}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Water Requirement</h4>
                        <p className="text-sm">{selectedSeed.waterRequirement}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Sunlight</h4>
                        <p className="text-sm">{selectedSeed.sunlight}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Temperature</h4>
                        <p className="text-sm">{selectedSeed.temperature}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <SeedRequestDialog seedName={selectedSeed.name} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {filteredSeeds.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Leaf className="h-16 w-16 mx-auto mb-4" />
              <p className="text-xl">No seeds found</p>
              <p className="text-sm">Try adjusting your search criteria or add new seeds to the database.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Seeds;
