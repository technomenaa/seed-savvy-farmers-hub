
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Star, MapPin, Phone, Mail, Users, Clock, Award, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ExpertRegistration from '@/components/ExpertRegistration';

interface Expert {
  id: string;
  name: string;
  expertise: string;
  specialization: string;
  experience: string;
  rating: string;
  totalConsultations: number;
  location: string;
  phone: string;
  email: string;
  bio: string;
  languages: string;
  consultationFee: string;
  availability: 'Available' | 'Busy' | 'Offline';
  avatar: string;
  joinedDate: string;
  education?: string;
}

const Experts = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { toast } = useToast();

  const specializations = [
    'محاصيل الحبوب - Grain Crops',
    'الخضروات - Vegetables', 
    'الفواكه - Fruits',
    'البقوليات - Legumes',
    'المحاصيل النقدية - Cash Crops',
    'الزراعة العضوية - Organic Farming',
    'إدارة الآفات - Pest Management',
    'تربة وأسمدة - Soil & Fertilizers',
    'الري والمياه - Irrigation & Water',
    'التسويق الزراعي - Agricultural Marketing'
  ];

  useEffect(() => {
    const savedExperts = localStorage.getItem('experts');
    if (savedExperts) {
      setExperts(JSON.parse(savedExperts));
    } else {
      const sampleExperts: Expert[] = [
        {
          id: '1',
          name: 'د. أحمد محمد علي - Dr. Ahmed Mohamed Ali',
          expertise: 'مهندس زراعي أول - Senior Agricultural Engineer',
          specialization: 'محاصيل الحبوب - Grain Crops',
          experience: '10-15 سنة - 10-15 years',
          rating: '4.8',
          totalConsultations: 250,
          location: 'القاهرة، مصر - Cairo, Egypt',
          phone: '+20 123 456 7890',
          email: 'ahmed.ali@email.com',
          bio: 'خبير في زراعة محاصيل الحبوب مع خبرة واسعة في تحسين الإنتاجية وإدارة الأمراض النباتية. حاصل على دكتوراه في الهندسة الزراعية من جامعة القاهرة.',
          languages: 'العربية، الإنجليزية - Arabic, English',
          consultationFee: '$60/hour',
          availability: 'Available',
          avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
          joinedDate: '2023-01-15',
          education: 'دكتوراه هندسة زراعية - PhD Agricultural Engineering'
        },
        {
          id: '2',
          name: 'د. فاطمة حسن - Dr. Fatima Hassan',
          expertise: 'خبيرة زراعة عضوية - Organic Farming Specialist',
          specialization: 'الزراعة العضوية - Organic Farming',
          experience: '5-10 سنوات - 5-10 years',
          rating: '4.9',
          totalConsultations: 180,
          location: 'الإسكندرية، مصر - Alexandria, Egypt',
          phone: '+20 987 654 3210',
          email: 'fatima.hassan@email.com',
          bio: 'متخصصة في الزراعة العضوية والاستدامة البيئية. تساعد المزارعين في التحول إلى الزراعة الصديقة للبيئة وتحسين جودة المحاصيل.',
          languages: 'العربية، الإنجليزية، الفرنسية - Arabic, English, French',
          consultationFee: '$45/hour',
          availability: 'Available',
          avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
          joinedDate: '2023-03-20',
          education: 'ماجستير زراعة عضوية - MSc Organic Agriculture'
        },
        {
          id: '3',
          name: 'م. خالد الأحمد - Eng. Khaled Al-Ahmad',
          expertise: 'خبير أنظمة الري - Irrigation Systems Expert',
          specialization: 'الري والمياه - Irrigation & Water',
          experience: '15+ سنة - 15+ years',
          rating: '4.7',
          totalConsultations: 320,
          location: 'دمشق، سوريا - Damascus, Syria',
          phone: '+963 123 456 789',
          email: 'khaled.ahmad@email.com',
          bio: 'خبير في تصميم وتنفيذ أنظمة الري الحديثة والري بالتنقيط. يساعد المزارعين في تحسين كفاءة استخدام المياه وزيادة الإنتاجية.',
          languages: 'العربية، الإنجليزية - Arabic, English',
          consultationFee: '$55/hour',
          availability: 'Busy',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          joinedDate: '2022-11-10',
          education: 'بكالوريوس هندسة مدنية - BSc Civil Engineering'
        }
      ];
      setExperts(sampleExperts);
      localStorage.setItem('experts', JSON.stringify(sampleExperts));
    }
  }, []);

  useEffect(() => {
    if (experts.length > 0) {
      localStorage.setItem('experts', JSON.stringify(experts));
    }
  }, [experts]);

  const handleExpertAdded = (newExpert: Expert) => {
    console.log('Expert added callback called with:', newExpert);
    setExperts(prev => {
      const updated = [...prev, newExpert];
      console.log('Updated experts list:', updated);
      return updated;
    });
    toast({
      title: "نجح - Success",
      description: "تم إضافة الخبير بنجاح! - Expert added successfully!",
    });
  };

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.expertise.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialization = selectedSpecialization === 'all' || expert.specialization === selectedSpecialization;
    
    return matchesSearch && matchesSpecialization;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Busy': return 'bg-yellow-100 text-yellow-800';
      case 'Offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleBookConsultation = (expert: Expert) => {
    setSelectedExpert(expert);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">الخبراء الزراعيون - Agricultural Experts</h1>
          <p className="text-gray-600">تواصل مع خبراء زراعيين معتمدين واحجز استشارات متخصصة - Connect with certified agricultural experts and book specialized consultations</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="البحث في الخبراء بالاسم أو التخصص... - Search experts by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
            <SelectTrigger className="w-full lg:w-64">
              <SelectValue placeholder="تصفية حسب التخصص - Filter by specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع التخصصات - All Specializations</SelectItem>
              {specializations.map(spec => (
                <SelectItem key={spec} value={spec}>{spec}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <ExpertRegistration onExpertAdded={handleExpertAdded} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-primary" />
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
                <Clock className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">متاح - Available</p>
                  <p className="text-2xl font-bold text-green-600">
                    {experts.filter(e => e.availability === 'Available').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">تقييم عالي - High Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {experts.filter(e => parseFloat(e.rating) >= 4.5).length}
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
                  <p className="text-2xl font-bold">{filteredExperts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map((expert) => (
            <Card key={expert.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={expert.avatar} alt={expert.name} />
                    <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{expert.name}</CardTitle>
                    <p className="text-sm text-gray-600">{expert.expertise}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium ml-1">{expert.rating}</span>
                      </div>
                      <Badge className={getAvailabilityColor(expert.availability)}>
                        {expert.availability === 'Available' ? 'متاح' : 
                         expert.availability === 'Busy' ? 'مشغول' : 'غير متاح'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge variant="secondary" className="w-fit">
                  {expert.specialization}
                </Badge>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{expert.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{expert.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{expert.totalConsultations} استشارة - consultations</span>
                  </div>
                </div>
                
                {expert.consultationFee && (
                  <p className="text-sm font-semibold text-primary">الرسوم: {expert.consultationFee}</p>
                )}
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setSelectedExpert(expert);
                      setIsDetailsOpen(true);
                    }}
                  >
                    التفاصيل - Details
                  </Button>
                  <Button 
                    size="sm"
                    className="flex-1"
                    disabled={expert.availability !== 'Available'}
                    onClick={() => handleBookConsultation(expert)}
                  >
                    حجز استشارة - Book
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Expert Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedExpert && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedExpert.name}</DialogTitle>
                  <DialogDescription>
                    {selectedExpert.expertise} - معلومات مفصلة عن الخبير
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={selectedExpert.avatar} alt={selectedExpert.name} />
                        <AvatarFallback className="text-2xl">{selectedExpert.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-500 fill-current" />
                            <span className="font-bold ml-1">{selectedExpert.rating}</span>
                          </div>
                          <Badge className={getAvailabilityColor(selectedExpert.availability)}>
                            {selectedExpert.availability === 'Available' ? 'متاح' : 
                             selectedExpert.availability === 'Busy' ? 'مشغول' : 'غير متاح'}
                          </Badge>
                        </div>
                        <p className="text-lg font-semibold">{selectedExpert.consultationFee}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">النبذة الشخصية - Bio</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedExpert.bio}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">التخصص</h4>
                        <p className="text-sm">{selectedExpert.specialization}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">سنوات الخبرة</h4>
                        <p className="text-sm">{selectedExpert.experience}</p>
                      </div>
                      {selectedExpert.education && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-500 mb-1">المؤهل العلمي</h4>
                          <p className="text-sm">{selectedExpert.education}</p>
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">اللغات</h4>
                        <p className="text-sm">{selectedExpert.languages}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">الموقع</h4>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedExpert.location}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">معلومات التواصل</h4>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{selectedExpert.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{selectedExpert.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-400">
                      انضم في: {new Date(selectedExpert.joinedDate).toLocaleDateString('ar')}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button 
                    className="flex-1"
                    disabled={selectedExpert.availability !== 'Available'}
                    onClick={() => {
                      setIsDetailsOpen(false);
                      handleBookConsultation(selectedExpert);
                    }}
                  >
                    حجز استشارة - Book Consultation
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Booking Dialog */}
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>حجز استشارة - Book Consultation</DialogTitle>
              <DialogDescription>
                احجز استشارة مع {selectedExpert?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-center text-green-600 font-medium">
                سيتم التواصل معك قريباً لتأكيد موعد الاستشارة
              </p>
              <p className="text-center text-sm text-gray-500">
                You will be contacted soon to confirm the consultation appointment
              </p>
              <Button 
                className="w-full" 
                onClick={() => {
                  setIsBookingOpen(false);
                  toast({
                    title: "تم الحجز - Booking Confirmed",
                    description: "تم تسجيل طلب الاستشارة بنجاح - Consultation request submitted successfully",
                  });
                }}
              >
                تأكيد الحجز - Confirm Booking
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {filteredExperts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="h-16 w-16 mx-auto mb-4" />
              <p className="text-xl">لم يتم العثور على خبراء - No experts found</p>
              <p className="text-sm">جرب تعديل معايير البحث أو سجل كخبير جديد - Try adjusting your search criteria or register as a new expert.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experts;
