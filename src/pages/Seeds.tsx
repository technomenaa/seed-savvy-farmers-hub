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
import { Database, Plus, Search, Calendar, TrendingUp, Eye } from 'lucide-react';
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
  imageUrl: string;
}

const Seeds = () => {
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSeed, setSelectedSeed] = useState<Seed | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedCategorySeed, setSelectedCategorySeed] = useState<Seed | null>(null);
  const [isCategoryDetailsOpen, setIsCategoryDetailsOpen] = useState(false);
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
    availability: 'In Stock' as const,
    imageUrl: ''
  });
  const { toast } = useToast();

  const seedTypes = [
    { value: 'Cereals', label: 'الحبوب - Cereals', varieties: ['القمح - Wheat', 'الذرة - Corn', 'الأرز - Rice', 'الشعير - Barley', 'الشوفان - Oats'] },
    { value: 'Vegetables', label: 'الخضروات - Vegetables', varieties: ['الطماطم - Tomatoes', 'الخيار - Cucumber', 'الجزر - Carrots', 'البصل - Onions', 'الفلفل - Peppers'] },
    { value: 'Legumes', label: 'البقوليات - Legumes', varieties: ['الفول - Beans', 'العدس - Lentils', 'الحمص - Chickpeas', 'الفاصوليا - Kidney Beans'] },
    { value: 'Fruits', label: 'الفواكه - Fruits', varieties: ['التفاح - Apples', 'البرتقال - Oranges', 'العنب - Grapes', 'الفراولة - Strawberries'] },
    { value: 'Herbs', label: 'الأعشاب - Herbs', varieties: ['النعناع - Mint', 'البقدونس - Parsley', 'الريحان - Basil', 'الزعتر - Thyme'] },
    { value: 'Cash Crops', label: 'المحاصيل النقدية - Cash Crops', varieties: ['القطن - Cotton', 'قصب السكر - Sugar Cane', 'عباد الشمس - Sunflower'] }
  ];

  const seasons = ['الربيع - Spring', 'الصيف - Summer', 'الخريف - Fall', 'الشتاء - Winter', 'طوال السنة - Year-round'];
  const soilTypes = ['طينية - Clay', 'رملية - Sandy', 'طميية - Loamy', 'طينية رملية - Silty', 'مختلطة - Mixed'];
  const waterLevels = ['قليل - Low', 'متوسط - Medium', 'عالي - High'];

  const getImageForSeedType = (type: string) => {
    const imageMap: { [key: string]: string } = {
      'Cereals': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
      'Vegetables': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop',
      'Legumes': 'https://images.unsplash.com/photo-1583846499908-de6ccbd0b06a?w=300&h=200&fit=crop',
      'Fruits': 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&h=200&fit=crop',
      'Herbs': 'https://images.unsplash.com/photo-1515586838455-8c6be1dc5da9?w=300&h=200&fit=crop',
      'Cash Crops': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&h=200&fit=crop'
    };
    return imageMap[type] || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop';
  };

  useEffect(() => {
    const savedSeeds = localStorage.getItem('seeds');
    if (savedSeeds) {
      setSeeds(JSON.parse(savedSeeds));
    } else {
      const sampleSeeds: Seed[] = [
        {
          id: '1',
          name: 'القمح الممتاز - Premium Wheat',
          variety: 'قمح شتوي أحمر قاسي - Hard Red Winter',
          type: 'Cereals',
          description: 'صنف قمح عالي الإنتاجية مثالي لصنع الخبز مع مقاومة ممتازة للأمراض. يتميز بحبوب كبيرة وقوام ممتاز للطحن. مناسب للمناخ البارد والمعتدل.',
          plantingSeason: 'الخريف - Fall',
          harvestTime: '120 يوم - 120 days',
          yieldPotential: '45-55 بوشل/فدان - bushels/acre',
          waterRequirement: 'متوسط - Medium',
          soilType: 'طميية - Loamy',
          region: 'الغرب الأوسط - Midwest',
          supplier: 'شركة البذور الزراعية - AgriSeeds Co.',
          pricePerKg: '$12.50',
          availability: 'In Stock',
          addedDate: '2024-01-10',
          imageUrl: '/placeholder.svg?height=200&width=300&text=Premium+Wheat'
        },
        {
          id: '2',
          name: 'الذرة الذهبية - Golden Corn',
          variety: 'ذرة حلوة هجين - Sweet Corn Hybrid',
          type: 'Cereals',
          description: 'ذرة حلوة سريعة النمو بطعم ممتاز وتطور منتظم للكيزان. مقاومة للآفات والأمراض الشائعة. مثالية للاستهلاك الطازج والتجميد.',
          plantingSeason: 'الربيع - Spring',
          harvestTime: '85 يوم - 85 days',
          yieldPotential: '180-200 بوشل/فدان - bushels/acre',
          waterRequirement: 'متوسط - Medium',
          soilType: 'رملية - Sandy',
          region: 'السهول الكبرى - Great Plains',
          supplier: 'بذور الحصاد المحدودة - Harvest Seeds Ltd.',
          pricePerKg: '$8.75',
          availability: 'In Stock',
          addedDate: '2024-01-15',
          imageUrl: '/placeholder.svg?height=200&width=300&text=Golden+Corn'
        },
        {
          id: '3',
          name: 'طماطم روما - Roma Tomato',
          variety: 'محدد النمو - Determinate',
          type: 'Vegetables',
          description: 'طماطم روما مقاومة للأمراض مثالية لإنتاج الصلصة والمعجون. ثمار بيضاوية الشكل، لحم كثيف، وقليلة البذور. مناسبة للزراعة التجارية.',
          plantingSeason: 'الربيع - Spring',
          harvestTime: '75 يوم - 75 days',
          yieldPotential: '15-20 طن/فدان - tons/acre',
          waterRequirement: 'عالي - High',
          soilType: 'طميية - Loamy',
          region: 'كاليفورنيا - California',
          supplier: 'بذور الحديقة الطازجة - Fresh Garden Seeds',
          pricePerKg: '$25.00',
          availability: 'Limited',
          addedDate: '2024-02-01',
          imageUrl: '/placeholder.svg?height=200&width=300&text=Roma+Tomato'
        }
      ];
      setSeeds(sampleSeeds);
      localStorage.setItem('seeds', JSON.stringify(sampleSeeds));
    }
  }, []);

  useEffect(() => {
    if (seeds.length > 0) {
      localStorage.setItem('seeds', JSON.stringify(seeds));
    }
  }, [seeds]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newSeed.name || !newSeed.type || !newSeed.variety) {
      toast({
        title: "خطأ - Error",
        description: "يرجى ملء جميع الحقول المطلوبة - Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const seed: Seed = {
      id: Date.now().toString(),
      ...newSeed,
      imageUrl: newSeed.imageUrl || getImageForSeedType(newSeed.type),
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
      availability: 'In Stock',
      imageUrl: ''
    });
    setIsDialogOpen(false);
    
    toast({
      title: "نجح - Success",
      description: "تم إضافة البذرة بنجاح! - Seed added successfully!",
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

  const handleCategoryClick = (type: string) => {
    const categorySeed = seeds.find(seed => seed.type === type);
    if (categorySeed) {
      setSelectedCategorySeed(categorySeed);
      setIsCategoryDetailsOpen(true);
    } else {
      setSelectedType(selectedType === type ? 'all' : type);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">قاعدة بيانات البذور - Seed Database</h1>
          <p className="text-gray-600">إدارة مخزون البذور مع معلومات مفصلة وتوافر - Manage seed inventory with detailed information and availability</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="البحث في البذور بالاسم، الصنف، النوع، أو المورد... - Search seeds by name, variety, type, or supplier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full lg:w-64">
              <SelectValue placeholder="تصفية حسب النوع - Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأنواع - All Types</SelectItem>
              {seedTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                إضافة بذرة - Add Seed
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>إضافة بذرة جديدة - Add New Seed</DialogTitle>
                <DialogDescription>
                  أدخل معلومات مفصلة عن صنف البذرة - Enter detailed information about the seed variety.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">اسم البذرة - Seed Name *</Label>
                    <Input
                      id="name"
                      value={newSeed.name}
                      onChange={(e) => setNewSeed({...newSeed, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="variety">الصنف - Variety *</Label>
                    <Input
                      id="variety"
                      value={newSeed.variety}
                      onChange={(e) => setNewSeed({...newSeed, variety: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">النوع - Type *</Label>
                    <Select value={newSeed.type} onValueChange={(value) => setNewSeed({...newSeed, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع البذرة - Select seed type" />
                      </SelectTrigger>
                      <SelectContent>
                        {seedTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="imageUrl">رابط الصورة - Image URL</Label>
                    <Input
                      id="imageUrl"
                      value={newSeed.imageUrl}
                      onChange={(e) => setNewSeed({...newSeed, imageUrl: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="supplier">المورد - Supplier</Label>
                    <Input
                      id="supplier"
                      value={newSeed.supplier}
                      onChange={(e) => setNewSeed({...newSeed, supplier: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="plantingSeason">موسم الزراعة - Planting Season</Label>
                    <Select value={newSeed.plantingSeason} onValueChange={(value) => setNewSeed({...newSeed, plantingSeason: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الموسم - Select season" />
                      </SelectTrigger>
                      <SelectContent>
                        {seasons.map(season => (
                          <SelectItem key={season} value={season}>{season}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="harvestTime">وقت الحصاد - Harvest Time</Label>
                    <Input
                      id="harvestTime"
                      placeholder="مثل، 90 يوم - e.g., 90 days"
                      value={newSeed.harvestTime}
                      onChange={(e) => setNewSeed({...newSeed, harvestTime: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="yieldPotential">إمكانية الإنتاج - Yield Potential</Label>
                    <Input
                      id="yieldPotential"
                      placeholder="مثل، 150 بوشل/فدان - e.g., 150 bushels/acre"
                      value={newSeed.yieldPotential}
                      onChange={(e) => setNewSeed({...newSeed, yieldPotential: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="waterRequirement">متطلبات المياه - Water Requirement</Label>
                    <Select value={newSeed.waterRequirement} onValueChange={(value) => setNewSeed({...newSeed, waterRequirement: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الحاجة للماء - Select water need" />
                      </SelectTrigger>
                      <SelectContent>
                        {waterLevels.map(level => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="soilType">نوع التربة - Soil Type</Label>
                    <Select value={newSeed.soilType} onValueChange={(value) => setNewSeed({...newSeed, soilType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع التربة - Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        {soilTypes.map(soil => (
                          <SelectItem key={soil} value={soil}>{soil}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="region">المنطقة - Region</Label>
                    <Input
                      id="region"
                      value={newSeed.region}
                      onChange={(e) => setNewSeed({...newSeed, region: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pricePerKg">السعر لكل كيلو - Price per Kg</Label>
                    <Input
                      id="pricePerKg"
                      placeholder="مثل، $15.00 - e.g., $15.00"
                      value={newSeed.pricePerKg}
                      onChange={(e) => setNewSeed({...newSeed, pricePerKg: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="availability">التوافر - Availability</Label>
                    <Select value={newSeed.availability} onValueChange={(value: any) => setNewSeed({...newSeed, availability: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In Stock">متوفر - In Stock</SelectItem>
                        <SelectItem value="Limited">محدود - Limited</SelectItem>
                        <SelectItem value="Out of Stock">غير متوفر - Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">الوصف - Description</Label>
                  <Textarea
                    id="description"
                    placeholder="وصف مفصل لصنف البذرة... - Detailed description of the seed variety..."
                    value={newSeed.description}
                    onChange={(e) => setNewSeed({...newSeed, description: e.target.value})}
                    rows={4}
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">إضافة البذرة - Add Seed</Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    إلغاء - Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Database className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">إجمالي البذور - Total Seeds</p>
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
                  <p className="text-sm font-medium text-gray-600">متوفر - In Stock</p>
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
                  <p className="text-sm font-medium text-gray-600">محدود - Limited</p>
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
                  <p className="text-sm font-medium text-gray-600">نتائج البحث - Search Results</p>
                  <p className="text-2xl font-bold">{filteredSeeds.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">التصنيفات المتاحة - Available Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {seedTypes.map((type) => {
              const count = seeds.filter(s => s.type === type.value).length;
              return (
                <Card 
                  key={type.value} 
                  className={`cursor-pointer hover:shadow-lg transition-all ${
                    selectedType === type.value ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => handleCategoryClick(type.value)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      <img 
                        src={getImageForSeedType(type.value)} 
                        alt={type.label}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/64x64/22c55e/ffffff?text=' + encodeURIComponent(type.value.charAt(0));
                        }}
                      />
                    </div>
                    <h3 className="font-medium text-sm mb-1">{type.label}</h3>
                    <p className="text-xs text-gray-500">{count} عنصر - items</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSeeds.map((seed) => (
            <Card key={seed.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                <img 
                  src={seed.imageUrl} 
                  alt={seed.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = getImageForSeedType(seed.type);
                  }}
                />
              </div>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{seed.name}</CardTitle>
                    <p className="text-sm text-gray-500">{seed.variety}</p>
                  </div>
                  <Badge className={getAvailabilityColor(seed.availability)}>
                    {seed.availability === 'In Stock' ? 'متوفر' : 
                     seed.availability === 'Limited' ? 'محدود' : 'غير متوفر'}
                  </Badge>
                </div>
                <Badge variant="secondary" className="w-fit">
                  {seedTypes.find(t => t.value === seed.type)?.label || seed.type}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {seed.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">{seed.description.substring(0, 100)}...</p>
                )}
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {seed.plantingSeason && (
                    <div>
                      <span className="font-medium">الموسم:</span> {seed.plantingSeason.split(' - ')[0]}
                    </div>
                  )}
                  {seed.harvestTime && (
                    <div>
                      <span className="font-medium">الحصاد:</span> {seed.harvestTime.split(' - ')[0]}
                    </div>
                  )}
                </div>
                
                {seed.pricePerKg && (
                  <p className="text-sm font-semibold text-primary">السعر: {seed.pricePerKg}</p>
                )}
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSelectedSeed(seed);
                    setIsDetailsOpen(true);
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التفاصيل - View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedSeed && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedSeed.name}</DialogTitle>
                  <DialogDescription>
                    {selectedSeed.variety} - تفاصيل شاملة عن البذرة
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="h-64 w-full overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                      <img 
                        src={selectedSeed.imageUrl} 
                        alt={selectedSeed.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={getAvailabilityColor(selectedSeed.availability)} className="text-sm">
                        {selectedSeed.availability === 'In Stock' ? 'متوفر' : 
                         selectedSeed.availability === 'Limited' ? 'محدود' : 'غير متوفر'}
                      </Badge>
                      <Badge variant="secondary">
                        {seedTypes.find(t => t.value === selectedSeed.type)?.label || selectedSeed.type}
                      </Badge>
                    </div>
                    
                    {selectedSeed.pricePerKg && (
                      <div className="text-2xl font-bold text-primary">
                        السعر: {selectedSeed.pricePerKg}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">الوصف - Description</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedSeed.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {selectedSeed.plantingSeason && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-500 mb-1">موسم الزراعة</h4>
                          <p className="text-sm">{selectedSeed.plantingSeason}</p>
                        </div>
                      )}
                      {selectedSeed.harvestTime && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-500 mb-1">وقت الحصاد</h4>
                          <p className="text-sm">{selectedSeed.harvestTime}</p>
                        </div>
                      )}
                      {selectedSeed.waterRequirement && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-500 mb-1">متطلبات المياه</h4>
                          <p className="text-sm">{selectedSeed.waterRequirement}</p>
                        </div>
                      )}
                      {selectedSeed.soilType && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-500 mb-1">نوع التربة</h4>
                          <p className="text-sm">{selectedSeed.soilType}</p>
                        </div>
                      )}
                      {selectedSeed.yieldPotential && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-500 mb-1">إمكانية الإنتاج</h4>
                          <p className="text-sm">{selectedSeed.yieldPotential}</p>
                        </div>
                      )}
                      {selectedSeed.region && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-500 mb-1">المنطقة</h4>
                          <p className="text-sm">{selectedSeed.region}</p>
                        </div>
                      )}
                    </div>
                    
                    {selectedSeed.supplier && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">المورد</h4>
                        <p className="text-sm">{selectedSeed.supplier}</p>
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-400">
                      تاريخ الإضافة: {new Date(selectedSeed.addedDate).toLocaleDateString('ar')}
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
              <Database className="h-16 w-16 mx-auto mb-4" />
              <p className="text-xl">لم يتم العثور على بذور - No seeds found</p>
              <p className="text-sm">جرب تعديل معايير البحث أو أضف بذرة جديدة - Try adjusting your search criteria or add a new seed.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Seeds;
