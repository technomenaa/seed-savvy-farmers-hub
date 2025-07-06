
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { User, Database, TrendingUp, Calendar, MapPin, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Farmer {
  id: string;
  name: string;
  region: string;
  specialization: string;
  registrationDate: string;
}

interface Seed {
  id: string;
  name: string;
  type: string;
  availability: string;
  addedDate: string;
  region: string;
}

const Dashboard = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [seeds, setSeeds] = useState<Seed[]>([]);

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

  // Analytics calculations
  const totalFarmers = farmers.length;
  const totalSeeds = seeds.length;
  const availableSeeds = seeds.filter(s => s.availability === 'In Stock').length;
  const limitedSeeds = seeds.filter(s => s.availability === 'Limited').length;
  
  const regionData = [...new Set([...farmers.map(f => f.region), ...seeds.map(s => s.region)].filter(Boolean))]
    .map(region => ({
      region,
      farmers: farmers.filter(f => f.region === region).length,
      seeds: seeds.filter(s => s.region === region).length
    }));

  const seedTypeData = [...new Set(seeds.map(s => s.type).filter(Boolean))]
    .map(type => ({
      type,
      count: seeds.filter(s => s.type === type).length
    }));

  const availabilityData = [
    { name: 'In Stock', value: availableSeeds, color: '#22c55e' },
    { name: 'Limited', value: limitedSeeds, color: '#f59e0b' },
    { name: 'Out of Stock', value: seeds.filter(s => s.availability === 'Out of Stock').length, color: '#ef4444' }
  ];

  const recentFarmers = farmers
    .sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime())
    .slice(0, 5);

  const recentSeeds = seeds
    .sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())
    .slice(0, 5);

  const stockPercentage = totalSeeds > 0 ? (availableSeeds / totalSeeds) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Management Dashboard</h1>
          <p className="text-gray-600">Comprehensive overview of farmers, seeds, and platform analytics</p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <User className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Farmers</p>
                  <p className="text-2xl font-bold">{totalFarmers}</p>
                  <p className="text-xs text-gray-500">Registered users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Database className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Seeds</p>
                  <p className="text-2xl font-bold">{totalSeeds}</p>
                  <p className="text-xs text-gray-500">Seed varieties</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Available Stock</p>
                  <p className="text-2xl font-bold">{availableSeeds}</p>
                  <p className="text-xs text-gray-500">{stockPercentage.toFixed(1)}% in stock</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Regions</p>
                  <p className="text-2xl font-bold">{regionData.length}</p>
                  <p className="text-xs text-gray-500">Geographic coverage</p>
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
              Stock Status Overview
            </CardTitle>
            <CardDescription>Current seed availability across all varieties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Available Stock ({availableSeeds} seeds)</span>
                  <span>{stockPercentage.toFixed(1)}%</span>
                </div>
                <Progress value={stockPercentage} className="h-2" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{availableSeeds}</p>
                  <p className="text-sm text-green-700">In Stock</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{limitedSeeds}</p>
                  <p className="text-sm text-yellow-700">Limited</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">
                    {seeds.filter(s => s.availability === 'Out of Stock').length}
                  </p>
                  <p className="text-sm text-red-700">Out of Stock</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Regional Distribution</CardTitle>
              <CardDescription>Farmers and seeds by region</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="farmers" fill="#3b82f6" name="Farmers" />
                  <Bar dataKey="seeds" fill="#10b981" name="Seeds" />
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

        {/* Recent Activity Tabs */}
        <Tabs defaultValue="farmers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="farmers">Recent Farmers</TabsTrigger>
            <TabsTrigger value="seeds">Recent Seeds</TabsTrigger>
            <TabsTrigger value="types">Seed Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="farmers">
            <Card>
              <CardHeader>
                <CardTitle>Recently Registered Farmers</CardTitle>
                <CardDescription>Latest farmers who joined the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFarmers.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No farmers registered yet</p>
                  ) : (
                    recentFarmers.map((farmer) => (
                      <div key={farmer.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                            {farmer.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium">{farmer.name}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              {farmer.region}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">{farmer.specialization.split(',')[0]?.trim()}</Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(farmer.registrationDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seeds">
            <Card>
              <CardHeader>
                <CardTitle>Recently Added Seeds</CardTitle>
                <CardDescription>Latest seed varieties added to the database</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSeeds.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No seeds added yet</p>
                  ) : (
                    recentSeeds.map((seed) => (
                      <div key={seed.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Database className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">{seed.name}</p>
                            <p className="text-sm text-gray-500">{seed.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              seed.availability === 'In Stock'
                                ? 'bg-green-100 text-green-800'
                                : seed.availability === 'Limited'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }
                          >
                            {seed.availability}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(seed.addedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="types">
            <Card>
              <CardHeader>
                <CardTitle>Seed Categories</CardTitle>
                <CardDescription>Distribution of seeds by type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {seedTypeData.map((type) => (
                    <div key={type.type} className="p-4 border rounded-lg text-center">
                      <p className="text-2xl font-bold text-primary">{type.count}</p>
                      <p className="text-sm font-medium">{type.type}</p>
                    </div>
                  ))}
                  {seedTypeData.length === 0 && (
                    <div className="col-span-full text-center py-8 text-gray-500">
                      No seed categories available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
