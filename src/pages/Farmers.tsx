import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Leaf, Phone, Mail, Edit } from 'lucide-react';

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

const Farmers = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const locations = [
    'Amman',
    'Irbid',
    'Zarqa',
    'Ajloun',
    'Jerash',
    'Mafraq',
    'Balqa',
    'Madaba',
    'Karak',
    'Tafilah',
    'Ma\'an',
    'Aqaba'
  ];

  useEffect(() => {
    // Check admin login status from localStorage
    const adminStatus = localStorage.getItem('isAdminLoggedIn') === 'true';
    setIsAdminLoggedIn(adminStatus);

    const sampleFarmers: Farmer[] = [
      {
        id: '1',
        name: 'Ahmad Al-Rashid',
        location: 'Amman',
        specialties: ['Organic Farming', 'Seed Production'],
        experience: '15 years',
        farmSize: '25 hectares',
        contact: {
          phone: '+962 79 123 4567',
          email: 'ahmad.rashid@email.com'
        },
        crops: ['Wheat', 'Barley', 'Vegetables'],
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
        verified: true
      },
      {
        id: '2',
        name: 'Fatima Al-Zoubi',
        location: 'Irbid',
        specialties: ['Dairy Farming', 'Livestock Management'],
        experience: '20 years',
        farmSize: '40 hectares',
        contact: {
          phone: '+962 78 876 5432',
          email: 'fatima.zoubi@email.com'
        },
        crops: ['Corn', 'Alfalfa'],
        image: 'https://images.unsplash.com/photo-1552058544-f62903996921?w=300&h=300&fit=crop',
        verified: true
      },
      {
        id: '3',
        name: 'Yousef Al-Nasser',
        location: 'Zarqa',
        specialties: ['Poultry Farming', 'Egg Production'],
        experience: '10 years',
        farmSize: '15 hectares',
        contact: {
          phone: '+962 77 234 5678',
          email: 'yousef.nasser@email.com'
        },
        crops: ['Soybeans', 'Sorghum'],
        image: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=300&h=300&fit=crop',
        verified: false
      },
      {
        id: '4',
        name: 'Layla Haddad',
        location: 'Ajloun',
        specialties: ['Fruit Orchards', 'Olive Cultivation'],
        experience: '25 years',
        farmSize: '30 hectares',
        contact: {
          phone: '+962 79 987 6543',
          email: 'layla.haddad@email.com'
        },
        crops: ['Olives', 'Apples', 'Pears'],
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b88331?w=300&h=300&fit=crop',
        verified: true
      }
    ];
    setFarmers(sampleFarmers);
  }, []);

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || farmer.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Farmers</h1>
          <p className="text-gray-600">Connect with experienced farmers from around Jordan</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search farmers by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarmers.map((farmer) => (
            <Card key={farmer.id} className="hover:shadow-lg transition-shadow relative">
              {isAdminLoggedIn && (
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 z-10"
                  onClick={() => {
                    // Handle edit functionality
                  }}
                >
                  <Edit className="h-3 w-3" />
                </Button>
              )}

              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{farmer.name}</CardTitle>
                <CardDescription className="text-gray-600">
                  <MapPin className="h-4 w-4 inline-block mr-1" />
                  {farmer.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-3 w-3" />
                    <span>Specialties: {farmer.specialties.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Experience:</span>
                    <span>{farmer.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Farm Size:</span>
                    <span>{farmer.farmSize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    <span>{farmer.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    <span>{farmer.contact.email}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Badge variant="outline">Crops: {farmer.crops.join(', ')}</Badge>
                </div>
                {farmer.verified ? (
                  <Badge className="mt-2">Verified</Badge>
                ) : (
                  <Badge variant="secondary" className="mt-2">Unverified</Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFarmers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Leaf className="h-16 w-16 mx-auto mb-4" />
              <p className="text-xl">No farmers found</p>
              <p className="text-sm">Try adjusting your search criteria or explore other categories.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Farmers;
