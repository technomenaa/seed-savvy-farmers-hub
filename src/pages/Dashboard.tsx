import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { User, Database, TrendingUp, Calendar, MapPin, Activity, Users, Leaf, UserCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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
  verified: boolean;
}

interface Seed {
  id: string;
  name: string;
  category: string;
  availability: string;
  price: string;
  location: string;
  description: string;
}

interface Expert {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  contact: {
    phone: string;
    email: string;
  };
  location: string;
  verified: boolean;
}

const Dashboard = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [seeds, setSeeds] = useState<any[]>([]);
  const [experts, setExperts] = useState<any[]>([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Check admin login status
    const adminStatus = localStorage.getItem('isAdminLoggedIn') === 'true';
    setIsAdminLoggedIn(adminStatus);

    // If not admin, redirect to home immediately
    if (!adminStatus) {
      return;
    }

    // Load data from localStorage only if admin is logged in
    const savedFarmers = localStorage.getItem('farmers');
    const savedSeeds = localStorage.getItem('seeds'); 
    const savedExperts = localStorage.getItem('experts');
    
    if (savedFarmers) {
      setFarmers(JSON.parse(savedFarmers));
    }
    
    if (savedSeeds) {
      setSeeds(JSON.parse(savedSeeds));
    }
    
    if (savedExperts) {
      setExperts(JSON.parse(savedExperts));
    }
  }, []);

  // Analytics calculations
  const totalFarmers = farmers.length;
  const totalSeeds = seeds.length;
  const totalExperts = experts.length;
  const verifiedFarmers = farmers.filter(f => f.verified).length;
  const verifiedExperts = experts.filter(e => e.verified).length;
  const availableSeeds = seeds.filter(s => s.availability === 'Available' || s.availability === 'In Stock').length;
  
  const locationData = [...new Set([
    ...farmers.map(f => f.location), 
    ...seeds.map(s => s.location),
    ...experts.map(e => e.location)
  ].filter(Boolean))]
    .map(location => ({
      location,
      farmers: farmers.filter(f => f.location === location).length,
      seeds: seeds.filter(s => s.location === location).length,
      experts: experts.filter(e => e.location === location).length
    }));

  const seedCategoryData = [...new Set(seeds.map(s => s.category).filter(Boolean))]
    .map(category => ({
      category,
      count: seeds.filter(s => s.category === category).length
    }));

  const availabilityData = [
    { name: 'Available', value: availableSeeds, color: '#22c55e' },
    { name: 'Limited', value: seeds.filter(s => s.availability === 'Limited').length, color: '#f59e0b' },
    { name: 'Out of Stock', value: seeds.filter(s => s.availability === 'Out of Stock').length, color: '#ef4444' }
  ];

  const stockPercentage = totalSeeds > 0 ? (availableSeeds / totalSeeds) * 100 : 0;

  if (!isAdminLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Comprehensive overview of farmers, seeds, experts and statistics</p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Farmers</p>
                  <p className="text-2xl font-bold">{totalFarmers}</p>
                  <p className="text-xs text-gray-500">Verified: {verifiedFarmers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Leaf className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Seeds</p>
                  <p className="text-2xl font-bold">{totalSeeds}</p>
                  <p className="text-xs text-gray-500">Seed types</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <UserCheck className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Experts</p>
                  <p className="text-2xl font-bold">{totalExperts}</p>
                  <p className="text-xs text-gray-500">Verified: {verifiedExperts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Available Seeds</p>
                  <p className="text-2xl font-bold">{availableSeeds}</p>
                  <p className="text-xs text-gray-500">{stockPercentage.toFixed(1)}% available</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stock Status Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Stock Status
            </CardTitle>
            <CardDescription>Current seed availability across all types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Available Stock ({availableSeeds} types)</span>
                  <span>{stockPercentage.toFixed(1)}%</span>
                </div>
                <Progress value={stockPercentage} className="h-2" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{availableSeeds}</p>
                  <p className="text-sm text-green-700">Available</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">
                    {seeds.filter(s => s.availability === 'Limited').length}
                  </p>
                  <p className="text-sm text-yellow-700">Limited</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">
                    {seeds.filter(s => s.availability === 'Out of Stock').length}
                  </p>
                  <p className="text-sm text-red-700">Unavailable</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Farmers, seeds and experts by region</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={locationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="location" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="farmers" fill="#3b82f6" name="Farmers" />
                  <Bar dataKey="seeds" fill="#10b981" name="Seeds" />
                  <Bar dataKey="experts" fill="#8b5cf6" name="Experts" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seed Availability</CardTitle>
              <CardDescription>Current stock status breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={availabilityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {availabilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-4 mt-4">
                {availabilityData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        <Tabs defaultValue="farmers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="farmers">Farmers</TabsTrigger>
            <TabsTrigger value="seeds">Seeds</TabsTrigger>
            <TabsTrigger value="experts">Experts</TabsTrigger>
          </TabsList>

          <TabsContent value="farmers">
            <Card>
              <CardHeader>
                <CardTitle>Farmers List</CardTitle>
                <CardDescription>All registered farmers on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Specialization</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {farmers.map((farmer) => (
                      <TableRow key={farmer.id}>
                        <TableCell className="font-medium">{farmer.name}</TableCell>
                        <TableCell>{farmer.location}</TableCell>
                        <TableCell>{farmer.specialties[0] || 'Not specified'}</TableCell>
                        <TableCell>{farmer.experience}</TableCell>
                        <TableCell>
                          <Badge variant={farmer.verified ? "default" : "secondary"}>
                            {farmer.verified ? 'Verified' : 'Unverified'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {farmers.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No farmers registered</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seeds">
            <Card>
              <CardHeader>
                <CardTitle>Seeds List</CardTitle>
                <CardDescription>All available seed types</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Availability</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {seeds.map((seed) => (
                      <TableRow key={seed.id}>
                        <TableCell className="font-medium">{seed.name}</TableCell>
                        <TableCell>{seed.category}</TableCell>
                        <TableCell>{seed.price}</TableCell>
                        <TableCell>{seed.location}</TableCell>
                        <TableCell>
                           <Badge 
                             variant={
                               seed.availability === 'Available' || seed.availability === 'In Stock' ? 'default' :
                               seed.availability === 'Limited' ? 'secondary' : 'destructive'
                             }
                           >
                            {seed.availability}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {seeds.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No seeds added</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experts">
            <Card>
              <CardHeader>
                <CardTitle>Experts List</CardTitle>
                <CardDescription>All registered experts on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Specialization</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {experts.map((expert) => (
                      <TableRow key={expert.id}>
                        <TableCell className="font-medium">{expert.name}</TableCell>
                        <TableCell>{expert.specialization}</TableCell>
                        <TableCell>{expert.experience}</TableCell>
                        <TableCell>{expert.location}</TableCell>
                        <TableCell>
                          <Badge variant={expert.verified ? "default" : "secondary"}>
                            {expert.verified ? 'Verified' : 'Unverified'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {experts.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No experts registered</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
