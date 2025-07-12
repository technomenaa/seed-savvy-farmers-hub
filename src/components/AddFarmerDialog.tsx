
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

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

interface AddFarmerDialogProps {
  onFarmerAdded: (farmer: Farmer) => void;
}

const AddFarmerDialog = ({ onFarmerAdded }: AddFarmerDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    specialties: '',
    experience: '',
    farmSize: '',
    phone: '',
    email: '',
    crops: '',
    image: '',
    verified: true
  });
  const { toast } = useToast();

  const locations = [
    'Amman', 'Irbid', 'Zarqa', 'Ajloun', 'Jerash', 'Mafraq',
    'Balqa', 'Madaba', 'Karak', 'Tafilah', 'Ma\'an', 'Aqaba'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.phone) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const newFarmer: Farmer = {
      id: Date.now().toString(),
      name: formData.name,
      location: formData.location,
      specialties: formData.specialties.split(',').map(s => s.trim()).filter(s => s),
      experience: formData.experience || '0 years',
      farmSize: formData.farmSize || '0 hectares',
      contact: {
        phone: formData.phone,
        email: formData.email || ''
      },
      crops: formData.crops.split(',').map(c => c.trim()).filter(c => c),
      image: formData.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      verified: formData.verified
    };

    onFarmerAdded(newFarmer);
    
    toast({
      title: "تم بنجاح",
      description: "تم إضافة المزارع بنجاح",
    });
    
    setIsOpen(false);
    setFormData({
      name: '',
      location: '',
      specialties: '',
      experience: '',
      farmSize: '',
      phone: '',
      email: '',
      crops: '',
      image: '',
      verified: true
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          إضافة مزارع
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>إضافة مزارع جديد</DialogTitle>
          <DialogDescription>
            أدخل معلومات المزارع الجديد
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">الاسم *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="اسم المزارع"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="location">الموقع *</Label>
              <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المحافظة" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">رقم الهاتف *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+962 79 123 4567"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="experience">سنوات الخبرة</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                placeholder="15 years"
              />
            </div>
            
            <div>
              <Label htmlFor="farmSize">حجم المزرعة</Label>
              <Input
                id="farmSize"
                value={formData.farmSize}
                onChange={(e) => setFormData({...formData, farmSize: e.target.value})}
                placeholder="25 hectares"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="specialties">التخصصات (مفصولة بفاصلة)</Label>
            <Input
              id="specialties"
              value={formData.specialties}
              onChange={(e) => setFormData({...formData, specialties: e.target.value})}
              placeholder="Organic Farming, Seed Production"
            />
          </div>

          <div>
            <Label htmlFor="crops">المحاصيل (مفصولة بفاصلة)</Label>
            <Input
              id="crops"
              value={formData.crops}
              onChange={(e) => setFormData({...formData, crops: e.target.value})}
              placeholder="Wheat, Barley, Vegetables"
            />
          </div>

          <div>
            <Label htmlFor="image">رابط الصورة</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">إضافة المزارع</Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFarmerDialog;
