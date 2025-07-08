
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExpertRegistrationProps {
  onExpertAdded: (expert: any) => void;
}

const ExpertRegistration = ({ onExpertAdded }: ExpertRegistrationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newExpert, setNewExpert] = useState({
    name: '',
    expertise: '',
    specialization: '',
    experience: '',
    education: '',
    location: '',
    phone: '',
    email: '',
    bio: '',
    languages: '',
    consultationFee: '',
    availability: 'Available'
  });
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

  const experienceLevels = [
    '1-3 years',
    '3-5 years', 
    '5-10 years',
    '10-15 years',
    '15+ years'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newExpert.name || !newExpert.specialization || !newExpert.experience) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const expert = {
      id: Date.now().toString(),
      ...newExpert,
      avatar: `https://images.unsplash.com/photo-${1500648767791 + Math.floor(Math.random() * 1000)}-c0d285e7c1dd?w=150&h=150&fit=crop&crop=face`,
      rating: (4.0 + Math.random() * 1.0).toFixed(1),
      totalConsultations: Math.floor(Math.random() * 200) + 50,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    console.log('Adding new expert:', expert);
    onExpertAdded(expert);
    
    setNewExpert({
      name: '',
      expertise: '',
      specialization: '',
      experience: '',
      education: '',
      location: '',
      phone: '',
      email: '',
      bio: '',
      languages: '',
      consultationFee: '',
      availability: 'Available'
    });
    setIsOpen(false);
    
    toast({
      title: "Success",
      description: "Expert registered successfully!",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Register as Expert
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register New Agricultural Expert</DialogTitle>
          <DialogDescription>
            Enter detailed information about your expertise and specialization.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={newExpert.name}
                onChange={(e) => setNewExpert({...newExpert, name: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="expertise">Job Title *</Label>
              <Input
                id="expertise"
                placeholder="e.g., Senior Agricultural Engineer"
                value={newExpert.expertise}
                onChange={(e) => setNewExpert({...newExpert, expertise: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="specialization">Specialization *</Label>
              <Select value={newExpert.specialization} onValueChange={(value) => setNewExpert({...newExpert, specialization: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  {specializations.map(spec => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience *</Label>
              <Select value={newExpert.experience} onValueChange={(value) => setNewExpert({...newExpert, experience: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map(exp => (
                    <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                placeholder="e.g., B.Sc Agricultural Engineering"
                value={newExpert.education}
                onChange={(e) => setNewExpert({...newExpert, education: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City, Country"
                value={newExpert.location}
                onChange={(e) => setNewExpert({...newExpert, location: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={newExpert.phone}
                onChange={(e) => setNewExpert({...newExpert, phone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newExpert.email}
                onChange={(e) => setNewExpert({...newExpert, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="languages">Languages</Label>
              <Input
                id="languages"
                placeholder="Arabic, English"
                value={newExpert.languages}
                onChange={(e) => setNewExpert({...newExpert, languages: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="consultationFee">Consultation Fee</Label>
              <Input
                id="consultationFee"
                placeholder="e.g., $50/hour"
                value={newExpert.consultationFee}
                onChange={(e) => setNewExpert({...newExpert, consultationFee: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Write about your experience and specialization..."
              value={newExpert.bio}
              onChange={(e) => setNewExpert({...newExpert, bio: e.target.value})}
              rows={4}
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">Register Expert</Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpertRegistration;
