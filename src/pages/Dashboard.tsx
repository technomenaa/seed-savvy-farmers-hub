
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
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [experts, setExperts] = useState<Expert[]>([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Check admin login status
    const adminStatus = localStorage.getItem('isAdminLoggedIn') === 'true';
    setIsAdminLoggedIn(adminStatus);

    // If not admin, redirect to home
    if (!adminStatus) {
      window.location.href = '/';
      return;
    }

    // Load data from localStorage
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
  const availableSeeds = seeds.filter(s => s.availability === 'متوفر').length;
  
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
    { name: 'متوفر', value: availableSeeds, color: '#22c55e' },
    { name: 'محدود', value: seeds.filter(s => s.availability === 'محدود').length, color: '#f59e0b' },
    { name: 'غير متوفر', value: seeds.filter(s => s.availability === 'غير متوفر').length, color: '#ef4444' }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة تحكم الأدمن</h1>
          <p className="text-gray-600">نظرة شاملة على المزارعين والبذور والخبراء والإحصائيات</p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">إجمالي المزارعين</p>
                  <p className="text-2xl font-bold">{totalFarmers}</p>
                  <p className="text-xs text-gray-500">موثق: {verifiedFarmers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Leaf className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">إجمالي البذور</p>
                  <p className="text-2xl font-bold">{totalSeeds}</p>
                  <p className="text-xs text-gray-500">أنواع البذور</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <UserCheck className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">إجمالي الخبراء</p>
                  <p className="text-2xl font-bold">{totalExperts}</p>
                  <p className="text-xs text-gray-500">موثق: {verifiedExperts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">البذور المتوفرة</p>
                  <p className="text-2xl font-bold">{availableSeeds}</p>
                  <p className="text-xs text-gray-500">{stockPercentage.toFixed(1)}% متوفر</p>
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
              حالة المخزون
            </CardTitle>
            <CardDescription>توفر البذور الحالي عبر جميع الأنواع</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>المخزون المتوفر ({availableSeeds} نوع)</span>
                  <span>{stockPercentage.toFixed(1)}%</span>
                </div>
                <Progress value={stockPercentage} className="h-2" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{availableSeeds}</p>
                  <p className="text-sm text-green-700">متوفر</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">
                    {seeds.filter(s => s.availability === 'محدود').length}
                  </p>
                  <p className="text-sm text-yellow-700">محدود</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">
                    {seeds.filter(s => s.availability === 'غير متوفر').length}
                  </p>
                  <p className="text-sm text-red-700">غير متوفر</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>التوزيع الجغرافي</CardTitle>
              <CardDescription>المزارعين والبذور والخبراء حسب المحافظة</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={locationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="location" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="farmers" fill="#3b82f6" name="مزارعون" />
                  <Bar dataKey="seeds" fill="#10b981" name="بذور" />
                  <Bar dataKey="experts" fill="#8b5cf6" name="خبراء" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>توفر البذور</CardTitle>
              <CardDescription>تفصيل حالة المخزون الحالية</CardDescription>
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
            <TabsTrigger value="farmers">المزارعون</TabsTrigger>
            <TabsTrigger value="seeds">البذور</TabsTrigger>
            <TabsTrigger value="experts">الخبراء</TabsTrigger>
          </TabsList>

          <TabsContent value="farmers">
            <Card>
              <CardHeader>
                <CardTitle>قائمة المزارعين</CardTitle>
                <CardDescription>جميع المزارعين المسجلين في المنصة</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الاسم</TableHead>
                      <TableHead>الموقع</TableHead>
                      <TableHead>التخصص</TableHead>
                      <TableHead>الخبرة</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {farmers.map((farmer) => (
                      <TableRow key={farmer.id}>
                        <TableCell className="font-medium">{farmer.name}</TableCell>
                        <TableCell>{farmer.location}</TableCell>
                        <TableCell>{farmer.specialties[0] || 'غير محدد'}</TableCell>
                        <TableCell>{farmer.experience}</TableCell>
                        <TableCell>
                          <Badge variant={farmer.verified ? "default" : "secondary"}>
                            {farmer.verified ? 'موثق' : 'غير موثق'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {farmers.length === 0 && (
                  <p className="text-center text-gray-500 py-8">لا يوجد مزارعون مسجلون</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seeds">
            <Card>
              <CardHeader>
                <CardTitle>قائمة البذور</CardTitle>
                <CardDescription>جميع أنواع البذور المتاحة</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>النوع</TableHead>
                      <TableHead>الفئة</TableHead>
                      <TableHead>السعر</TableHead>
                      <TableHead>الموقع</TableHead>
                      <TableHead>التوفر</TableHead>
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
                              seed.availability === 'متوفر' ? 'default' :
                              seed.availability === 'محدود' ? 'secondary' : 'destructive'
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
                  <p className="text-center text-gray-500 py-8">لا توجد بذور مضافة</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experts">
            <Card>
              <CardHeader>
                <CardTitle>قائمة الخبراء</CardTitle>
                <CardDescription>جميع الخبراء المسجلين في المنصة</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الاسم</TableHead>
                      <TableHead>التخصص</TableHead>
                      <TableHead>الخبرة</TableHead>
                      <TableHead>الموقع</TableHead>
                      <TableHead>الحالة</TableHead>
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
                            {expert.verified ? 'موثق' : 'غير موثق'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {experts.length === 0 && (
                  <p className="text-center text-gray-500 py-8">لا يوجد خبراء مسجلون</p>
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
