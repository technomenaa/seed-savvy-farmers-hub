
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Plus, Star, MapPin, Phone, Mail, Calendar, Clock, User, Award, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Expert {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experience: string;
  rating: number;
  location: string;
  phone: string;
  email: string;
  description: string;
  languages: string[];
  certifications: string[];
  availableHours: string;
  consultationFee: string;
  avatarUrl: string;
  totalConsultations: number;
  addedDate: string;
}

interface Consultation {
  id: string;
  expertId: string;
  farmerName: string;
  farmerPhone: string;
  farmerEmail: string;
  preferredDate: string;
  preferredTime: string;
  topic: string;
  message: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

const Experts = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');
  const [isAddExpertOpen, setIsAddExpertOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [newExpert, setNewExpert] = useState({
    name: '',
    title: '',
    specialization: '',
    experience: '',
    location: '',
    phone: '',
    email: '',
    description: '',
    languages: '',
    certifications: '',
    availableHours: '',
    consultationFee: '',
    avatarUrl: ''
  });
  const [newConsultation, setNewConsultation] = useState({
    farmerName: '',
    farmerPhone: '',
    farmerEmail: '',
    preferredDate: '',
    preferredTime: '',
    topic: '',
    message: ''
  });
  const { toast } = useToast();

  const specializations = [
    'زراعة الحبوب - Grain Farming',
    'زراعة الخضروات - Vegetable Farming',
    'زراعة الفواكه - Fruit Farming',
    'الزراعة العضوية - Organic Farming',
    'إدارة المياه - Water Management',
    'مكافحة الآفات - Pest Control',
    'تربة وتغذية النبات - Soil & Plant Nutrition',
    'الزراعة المحمية - Protected Agriculture',
    'الثروة الحيوانية - Livestock',
    'الإرشاد الزراعي - Agricultural Extension'
  ];

  const getAvatarForSpecialization = (specialization: string) => {
    const avatarMap: { [key: string]: string } = {
      'زراعة الحبوب - Grain Farming': '/placeholder.svg?height=100&width=100&text=GF',
      'زراعة الخضروات - Vegetable Farming': '/placeholder.svg?height=100&width=100&text=VF',
      'زراعة الفواكه - Fruit Farming': '/placeholder.svg?height=100&width=100&text=FF',
      'الزراعة العضوية - Organic Farming': '/placeholder.svg?height=100&width=100&text=OF',
      'إدارة المياه - Water Management': '/placeholder.svg?height=100&width=100&text=WM',
      'مكافحة الآفات - Pest Control': '/placeholder.svg?height=100&width=100&text=PC',
      'تربة وتغذية النبات - Soil & Plant Nutrition': '/placeholder.svg?height=100&width=100&text=SN',
      'الزراعة المحمية - Protected Agriculture': '/placeholder.svg?height=100&width=100&text=PA',
      'الثروة الحيوانية - Livestock': '/placeholder.svg?height=100&width=100&text=LS',
      'الإرشاد الزراعي - Agricultural Extension': '/placeholder.svg?height=100&width=100&text=AE'
    };
    return avatarMap[specialization] || '/placeholder.svg?height=100&width=100&text=EX';
  };

  useEffect(() => {
    const savedExperts = localStorage.getItem('experts');
    if (savedExperts) {
      setExperts(JSON.parse(savedExperts));
    } else {
      const sampleExperts: Expert[] = [
        {
          id: '1',
          name: 'د. أحمد محمد الزراعي - Dr. Ahmed Mohamed',
          title: 'خبير زراعة الحبوب - Grain Farming Expert',
          specialization: 'زراعة الحبوب - Grain Farming',
          experience: '15 سنة - 15 years',
          rating: 4.8,
          location: 'القاهرة، مصر - Cairo, Egypt',
          phone: '+20 123 456 7890',
          email: 'ahmed.agricultural@example.com',
          description: 'خبير في زراعة القمح والذرة والأرز مع تخصص في تحسين الإنتاجية وإدارة المحاصيل. حاصل على دكتوراه في العلوم الزراعية من جامعة القاهرة.',
          languages: ['العربية', 'الإنجليزية'],
          certifications: ['دكتوراه في العلوم الزراعية', 'خبير معتمد في إدارة المحاصيل'],
          availableHours: 'الأحد - الخميس: 9:00 ص - 5:00 م',
          consultationFee: '$50/ساعة',
          avatarUrl: '/placeholder.svg?height=100&width=100&text=AM',
          totalConsultations: 156,
          addedDate: '2024-01-15'
        },
        {
          id: '2',
          name: 'د. فاطمة علي الخضراوي - Dr. Fatima Ali',
          title: 'خبيرة الزراعة العضوية - Organic Farming Expert',
          specialization: 'الزراعة العضوية - Organic Farming',
          experience: '12 سنة - 12 years',
          rating: 4.9,
          location: 'الرباط، المغرب - Rabat, Morocco',
          phone: '+212 123 456 789',
          email: 'fatima.organic@example.com',
          description: 'متخصصة في الزراعة العضوية والمستدامة، مع خبرة واسعة في إنتاج الخضروات العضوية وإدارة التربة الطبيعية. حاصلة على شهادات دولية في الزراعة العضوية.',
          languages: ['العربية', 'الفرنسية', 'الإنجليزية'],
          certifications: ['شهادة خبير زراعة عضوية دولية', 'مستشار إدارة التربة المعتمد'],
          availableHours: 'السبت - الأربعاء: 8:00 ص - 4:00 م',
          consultationFee: '$45/ساعة',
          avatarUrl: '/placeholder.svg?height=100&width=100&text=FA',
          totalConsultations: 203,
          addedDate: '2024-01-20'
        },
        {
          id: '3',
          name: 'م. خالد حسن المائي - Eng. Khalid Hassan',
          title: 'خبير إدارة المياه - Water Management Expert',
          specialization: 'إدارة المياه - Water Management',
          experience: '10 سنوات - 10 years',
          rating: 4.7,
          location: 'الرياض، السعودية - Riyadh, Saudi Arabia',
          phone: '+966 123 456 789',
          email: 'khalid.water@example.com',
          description: 'مهندس زراعي متخصص في أنظمة الري الحديثة وإدارة المياه الزراعية. خبرة في تصميم وتنفيذ أنظمة الري بالتنقيط والرش.',
          languages: ['العربية', 'الإنجليزية'],
          certifications: ['مهندس زراعي معتمد', 'خبير أنظمة الري الحديثة'],
          availableHours: 'الأحد - الخميس: 10:00 ص - 6:00 م',
          consultationFee: '$40/ساعة',
          avatarUrl: '/placeholder.svg?height=100&width=100&text=KH',
          totalConsultations: 128,
          addedDate: '2024-02-01'
        }
      ];
      setExperts(sampleExperts);
      localStorage.setItem('experts', JSON.stringify(sampleExperts));
    }

    const savedConsultations = localStorage.getItem('consultations');
    if (savedConsultations) {
      setConsultations(JSON.parse(savedConsultations));
    }
  }, []);

  useEffect(() => {
    if (experts.length > 0) {
      localStorage.setItem('experts', JSON.stringify(experts));
    }
  }, [experts]);

  useEffect(() => {
    if (consultations.length > 0) {
      localStorage.setItem('consultations', JSON.stringify(consultations));
    }
  }, [consultations]);

  const handleAddExpert = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newExpert.name || !newExpert.specialization || !newExpert.experience) {
      toast({
        title: "خطأ - Error",
        description: "يرجى ملء جميع الحقول المطلوبة - Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const expert: Expert = {
      id: Date.now().toString(),
      ...newExpert,
      rating: 5.0,
      languages: newExpert.languages.split(',').map(lang => lang.trim()),
      certifications: newExpert.certifications.split(',').map(cert => cert.trim()),
      avatarUrl: newExpert.avatarUrl || getAvatarForSpecialization(newExpert.specialization),
      totalConsultations: 0,
      addedDate: new Date().toISOString().split('T')[0]
    };

    setExperts(prev => [...prev, expert]);
    setNewExpert({
      name: '',
      title: '',
      specialization: '',
      experience: '',
      location: '',
      phone: '',
      email: '',
      description: '',
      languages: '',
      certifications: '',
      availableHours: '',
      consultationFee: '',
      avatarUrl: ''
    });
    setIsAddExpertOpen(false);
    
    toast({
      title: "نجح - Success",
      description: "تم إضافة الخبير بنجاح! - Expert added successfully!",
    });
  };

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newConsultation.farmerName || !newConsultation.farmerPhone || !newConsultation.preferredDate) {
      toast({
        title: "خطأ - Error",
        description: "يرجى ملء جميع الحقول المطلوبة - Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const consultation: Consultation = {
      id: Date.now().toString(),
      expertId: selectedExpert!.id,
      ...newConsultation,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setConsultations(prev => [...prev, consultation]);
    setNewConsultation({
      farmerName: '',
      farmerPhone: '',
      farmerEmail: '',
      preferredDate: '',
      preferredTime: '',
      topic: '',
      message: ''
    });
    setIsBookingOpen(false);
    setSelectedExpert(null);
    
    toast({
      title: "تم الحجز - Booking Confirmed",
      description: "تم حجز الاستشارة بنجاح! سيتم التواصل معك قريباً - Consultation booked successfully! We will contact you soon.",
    });
  };

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialization = selectedSpecialization === 'all' || expert.specialization === selectedSpecialization;
    
    return matchesSearch && matchesSpecialization;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">الخبراء الزراعيون - Agricultural Experts</h1>
          <p className="text-gray-600">تواصل مع خبراء الزراعة واحجز استشاراتك المتخصصة - Connect with agricultural experts and book specialized consultations</p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="البحث عن خبراء بالاسم، التخصص، أو الموقع... - Search experts by name, specialization, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
            <SelectTrigger className="w-full lg:w-80">
              <SelectValue placeholder="تصفية حسب التخصص - Filter by specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع التخصصات - All Specializations</SelectItem>
              {specializations.map(spec => (
                <SelectItem key={spec} value={spec}>{spec}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Dialog open={isAddExpertOpen} onOpenChange={setIsAddExpertOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                إضافة خبير - Add Expert
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>إضافة خبير جديد - Add New Expert</DialogTitle>
                <DialogDescription>
                  أدخل معلومات الخبير الزراعي - Enter agricultural expert information.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleAddExpert} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expertName">الاسم - Name *</Label>
                    <Input
                      id="expertName"
                      value={newExpert.name}
                      onChange={(e) => setNewExpert({...newExpert, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="expertTitle">المسمى الوظيفي - Title</Label>
                    <Input
                      id="expertTitle"
                      value={newExpert.title}
                      onChange={(e) => setNewExpert({...newExpert, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expertSpecialization">التخصص - Specialization *</Label>
                    <Select value={newExpert.specialization} onValueChange={(value) => setNewExpert({...newExpert, specialization: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر التخصص - Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        {specializations.map(spec => (
                          <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="expertExperience">سنوات الخبرة - Years of Experience *</Label>
                    <Input
                      id="expertExperience"
                      placeholder="مثل، 10 سنوات - e.g., 10 years"
                      value={newExpert.experience}
                      onChange={(e) => setNewExpert({...newExpert, experience: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="expertLocation">الموقع - Location</Label>
                    <Input
                      id="expertLocation"
                      value={newExpert.location}
                      onChange={(e) => setNewExpert({...newExpert, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expertPhone">الهاتف - Phone</Label>
                    <Input
                      id="expertPhone"
                      value={newExpert.phone}
                      onChange={(e) => setNewExpert({...newExpert, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expertEmail">البريد الإلكتروني - Email</Label>
                    <Input
                      id="expertEmail"
                      type="email"
                      value={newExpert.email}
                      onChange={(e) => setNewExpert({...newExpert, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expertFee">رسوم الاستشارة - Consultation Fee</Label>
                    <Input
                      id="expertFee"
                      placeholder="مثل، $50/ساعة - e.g., $50/hour"
                      value={newExpert.consultationFee}
                      onChange={(e) => setNewExpert({...newExpert, consultationFee: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expertLanguages">اللغات - Languages</Label>
                    <Input
                      id="expertLanguages"
                      placeholder="العربية، الإنجليزية - Arabic, English"
                      value={newExpert.languages}
                      onChange={(e) => setNewExpert({...newExpert, languages: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expertCertifications">الشهادات - Certifications</Label>
                    <Input
                      id="expertCertifications"
                      placeholder="افصل بفاصلة - Separate with comma"
                      value={newExpert.certifications}
                      onChange={(e) => setNewExpert({...newExpert, certifications: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expertHours">ساعات العمل - Available Hours</Label>
                    <Input
                      id="expertHours"
                      placeholder="الأحد - الخميس: 9:00 ص - 5:00 م"
                      value={newExpert.availableHours}
                      onChange={(e) => setNewExpert({...newExpert, availableHours: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expertAvatar">رابط الصورة الشخصية - Avatar URL</Label>
                    <Input
                      id="expertAvatar"
                      value={newExpert.avatarUrl}
                      onChange={(e) => setNewExpert({...newExpert, avatarUrl: e.target.value})}
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="expertDescription">الوصف - Description</Label>
                  <Textarea
                    id="expertDescription"
                    placeholder="وصف مفصل عن الخبير وخبراته... - Detailed description of the expert and their expertise..."
                    value={newExpert.description}
                    onChange={(e) => setNewExpert({...newExpert, description: e.target.value})}
                    rows={4}
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">إضافة الخبير - Add Expert</Button>
                  <Button type="button" variant="outline" onClick={() => setIsAddExpertOpen(false)}>
                    إلغاء - Cancel
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
                <User className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">إجمالي الخبراء - Total Experts</p>
                  <p className="text-2xl font-bold">{experts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">الاستشارات المحجوزة - Booked Consultations</p>
                  <p className="text-2xl font-bold text-green-600">{consultations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">التخصصات المتاحة - Available Specializations</p>
                  <p className="text-2xl font-bold text-yellow-600">{specializations.length}</p>
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
                  <p className="text-2xl font-bold">{filteredExperts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map((expert) => (
            <Card key={expert.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={expert.avatarUrl} alt={expert.name} />
                    <AvatarFallback>{expert.name.split(' ')[0]?.charAt(0) || 'E'}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{expert.name}</CardTitle>
                    <p className="text-sm text-gray-500">{expert.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(expert.rating)}
                      <span className="text-sm text-gray-600 ml-1">({expert.rating})</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  {expert.specialization}
                </Badge>
                
                <p className="text-sm text-gray-600 line-clamp-3">{expert.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-gray-400" />
                    <span>خبرة: {expert.experience}</span>
                  </div>
                  {expert.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{expert.location}</span>
                    </div>
                  )}
                  {expert.consultationFee && (
                    <div className="text-primary font-semibold">
                      رسوم الاستشارة: {expert.consultationFee}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{expert.totalConsultations} استشارة</span>
                  <span>انضم في {new Date(expert.addedDate).toLocaleDateString('ar')}</span>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={() => {
                    setSelectedExpert(expert);
                    setIsBookingOpen(true);
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  حجز استشارة - Book Consultation
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Booking Dialog */}
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogContent className="max-w-2xl">
            {selectedExpert && (
              <>
                <DialogHeader>
                  <DialogTitle>حجز استشارة مع {selectedExpert.name}</DialogTitle>
                  <DialogDescription>
                    املأ النموذج لحجز استشارة مع الخبير - Fill the form to book a consultation with the expert
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleBookConsultation} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="farmerName">اسم المزارع - Farmer Name *</Label>
                      <Input
                        id="farmerName"
                        value={newConsultation.farmerName}
                        onChange={(e) => setNewConsultation({...newConsultation, farmerName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="farmerPhone">رقم الهاتف - Phone Number *</Label>
                      <Input
                        id="farmerPhone"
                        value={newConsultation.farmerPhone}
                        onChange={(e) => setNewConsultation({...newConsultation, farmerPhone: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="farmerEmail">البريد الإلكتروني - Email</Label>
                      <Input
                        id="farmerEmail"
                        type="email"
                        value={newConsultation.farmerEmail}
                        onChange={(e) => setNewConsultation({...newConsultation, farmerEmail: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="preferredDate">التاريخ المفضل - Preferred Date *</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={newConsultation.preferredDate}
                        onChange={(e) => setNewConsultation({...newConsultation, preferredDate: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="preferredTime">الوقت المفضل - Preferred Time</Label>
                      <Input
                        id="preferredTime"
                        type="time"
                        value={newConsultation.preferredTime}
                        onChange={(e) => setNewConsultation({...newConsultation, preferredTime: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="topic">موضوع الاستشارة - Consultation Topic</Label>
                      <Input
                        id="topic"
                        value={newConsultation.topic}
                        onChange={(e) => setNewConsultation({...newConsultation, topic: e.target.value})}
                        placeholder="مثل، مشاكل في المحصول - e.g., crop problems"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">رسالة إضافية - Additional Message</Label>
                    <Textarea
                      id="message"
                      placeholder="اكتب تفاصيل إضافية عن استشارتك... - Write additional details about your consultation..."
                      value={newConsultation.message}
                      onChange={(e) => setNewConsultation({...newConsultation, message: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">تفاصيل الخبير:</h4>
                    <p className="text-sm text-gray-600 mb-1">التخصص: {selectedExpert.specialization}</p>
                    {selectedExpert.consultationFee && (
                      <p className="text-sm text-gray-600 mb-1">الرسوم: {selectedExpert.consultationFee}</p>
                    )}
                    {selectedExpert.availableHours && (
                      <p className="text-sm text-gray-600">ساعات العمل: {selectedExpert.availableHours}</p>
                    )}
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1">
                      تأكيد الحجز - Confirm Booking
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsBookingOpen(false)}>
                      إلغاء - Cancel
                    </Button>
                  </div>
                </form>
              </>
            )}
          </DialogContent>
        </Dialog>

        {filteredExperts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <User className="h-16 w-16 mx-auto mb-4" />
              <p className="text-xl">لم يتم العثور على خبراء - No experts found</p>
              <p className="text-sm">جرب تعديل معايير البحث أو أضف خبير جديد - Try adjusting your search criteria or add a new expert.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experts;
