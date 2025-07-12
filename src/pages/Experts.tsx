import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Star, MapPin, Phone, Mail, Users, Clock, Award, Search, CalendarDays } from 'lucide-react';
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
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const { toast } = useToast();

  const specializations = [
    'Grain Crops',
    'Vegetables', 
    'Fruits',
    'Legumes',
    'Cash Crops',
    'Organic Farming',
    'Pest Management',
    'Soil & Fertilizers',
    'Irrigation & Water',
    'Agricultural Marketing'
  ];

  useEffect(() => {
    // Check admin login status from localStorage
    const adminStatus = localStorage.getItem('isAdminLoggedIn') === 'true';
    setIsAdminLoggedIn(adminStatus);

    const savedExperts = localStorage.getItem('experts');
    if (savedExperts) {
      setExperts(JSON.parse(savedExperts));
    } else {
      const sampleExperts: Expert[] = [
        {
          id: '1',
          name: 'Dr. Ahmed Mohamed Ali',
          expertise: 'Senior Agricultural Engineer',
          specialization: 'Grain Crops',
          experience: '10-15 years',
          rating: '4.8',
          totalConsultations: 250,
          location: 'Cairo, Egypt',
          phone: '+20 123 456 7890',
          email: 'ahmed.ali@email.com',
          bio: 'Expert in grain crop cultivation with extensive experience in improving productivity and managing plant diseases. PhD in Agricultural Engineering from Cairo University.',
          languages: 'Arabic, English',
          consultationFee: '$60/hour',
          availability: 'Available',
          avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
          joinedDate: '2023-01-15',
          education: 'PhD Agricultural Engineering'
        },
        {
          id: '2',
          name: 'Dr. Fatima Hassan',
          expertise: 'Organic Farming Specialist',
          specialization: 'Organic Farming',
          experience: '5-10 years',
          rating: '4.9',
          totalConsultations: 180,
          location: 'Alexandria, Egypt',
          phone: '+20 987 654 3210',
          email: 'fatima.hassan@email.com',
          bio: 'Specialist in organic farming and environmental sustainability. Helps farmers transition to eco-friendly farming practices and improve crop quality.',
          languages: 'Arabic, English, French',
          consultationFee: '$45/hour',
          availability: 'Available',
          avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
          joinedDate: '2023-03-20',
          education: 'MSc Organic Agriculture'
        },
        {
          id: '3',
          name: 'Eng. Khaled Al-Ahmad',
          expertise: 'Irrigation Systems Expert',
          specialization: 'Irrigation & Water',
          experience: '15+ years',
          rating: '4.7',
          totalConsultations: 320,
          location: 'Damascus, Syria',
          phone: '+963 123 456 789',
          email: 'khaled.ahmad@email.com',
          bio: 'Expert in designing and implementing modern irrigation systems and drip irrigation. Helps farmers improve water use efficiency and increase productivity.',
          languages: 'Arabic, English',
          consultationFee: '$55/hour',
          availability: 'Busy',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          joinedDate: '2022-11-10',
          education: 'BSc Civil Engineering'
        },
        {
          id: '4',
          name: 'Dr. Sarah Johnson',
          expertise: 'Plant Pathologist',
          specialization: 'Pest Management',
          experience: '8-12 years',
          rating: '4.6',
          totalConsultations: 195,
          location: 'London, UK',
          phone: '+44 20 7946 0958',
          email: 'sarah.johnson@email.com',
          bio: 'Plant pathologist specializing in integrated pest management and disease control. Expert in sustainable approaches to crop protection and biological control methods.',
          languages: 'English, Arabic',
          consultationFee: '$70/hour',
          availability: 'Available',
          avatar: 'https://images.unsplash.com/photo-1594824694271-15920b65c60e?w=150&h=150&fit=crop&crop=face',
          joinedDate: '2023-06-12',
          education: 'PhD Plant Pathology'
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
      title: "Success",
      description: "Expert registered successfully!",
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

  const handleConfirmBooking = () => {
    if (!bookingDate || !bookingTime) {
      toast({
        title: "Error",
        description: "Please select both date and time for your consultation.",
        variant: "destructive"
      });
      return;
    }

    setIsBookingOpen(false);
    setBookingDate('');
    setBookingTime('');
    toast({
      title: "Booking Confirmed",
      description: `Consultation booked with ${selectedExpert?.name} on ${bookingDate} at ${bookingTime}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Agricultural Experts</h1>
          <p className="text-gray-600">Connect with certified agricultural experts and book specialized consultations</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search experts by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
            <SelectTrigger className="w-full lg:w-64">
              <SelectValue placeholder="Filter by specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specializations</SelectItem>
              {specializations.map(spec => (
                <SelectItem key={spec} value={spec}>{spec}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {isAdminLoggedIn && <ExpertRegistration onExpertAdded={handleExpertAdded} />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Experts</p>
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
                  <p className="text-sm font-medium text-gray-600">Available</p>
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
                  <p className="text-sm font-medium text-gray-600">High Rating</p>
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
                  <p className="text-sm font-medium text-gray-600">Search Results</p>
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
                        {expert.availability}
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
                    <span>{expert.totalConsultations} consultations</span>
                  </div>
                </div>
                
                {expert.consultationFee && (
                  <p className="text-sm font-semibold text-primary">Fee: {expert.consultationFee}</p>
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
                    Details
                  </Button>
                  <Button 
                    size="sm"
                    className="flex-1"
                    disabled={expert.availability !== 'Available'}
                    onClick={() => handleBookConsultation(expert)}
                  >
                    Book
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
                    {selectedExpert.expertise} - Detailed expert information
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
                            {selectedExpert.availability}
                          </Badge>
                        </div>
                        <p className="text-lg font-semibold">{selectedExpert.consultationFee}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Bio</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedExpert.bio}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Specialization</h4>
                        <p className="text-sm">{selectedExpert.specialization}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Experience</h4>
                        <p className="text-sm">{selectedExpert.experience}</p>
                      </div>
                      {selectedExpert.education && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-500 mb-1">Education</h4>
                          <p className="text-sm">{selectedExpert.education}</p>
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Languages</h4>
                        <p className="text-sm">{selectedExpert.languages}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Location</h4>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedExpert.location}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Contact Information</h4>
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
                      Joined: {new Date(selectedExpert.joinedDate).toLocaleDateString()}
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
                    Book Consultation
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
              <DialogTitle>Book Consultation</DialogTitle>
              <DialogDescription>
                Book a consultation with {selectedExpert?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Select Date</label>
                <Input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Select Time</label>
                <Select value={bookingTime} onValueChange={setBookingTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="14:00">02:00 PM</SelectItem>
                    <SelectItem value="15:00">03:00 PM</SelectItem>
                    <SelectItem value="16:00">04:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                className="w-full" 
                onClick={handleConfirmBooking}
              >
                Confirm Booking
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {filteredExperts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="h-16 w-16 mx-auto mb-4" />
              <p className="text-xl">No experts found</p>
              <p className="text-sm">Try adjusting your search criteria or register as a new expert.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experts;
