
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface SeedRequestDialogProps {
  seedName: string;
}

const SeedRequestDialog = ({ seedName }: SeedRequestDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [requestData, setRequestData] = useState({
    name: '',
    phone: '',
    quantity: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!requestData.name || !requestData.phone || !requestData.quantity) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    console.log('Seed request submitted:', {
      seedName,
      ...requestData
    });

    toast({
      title: "Request Submitted",
      description: `Your request for ${seedName} has been submitted successfully. We will contact you soon.`,
    });

    setRequestData({ name: '', phone: '', quantity: '' });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          Request Seeds
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Request Seeds - {seedName}</DialogTitle>
          <DialogDescription>
            Fill in your details to request this seed variety.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={requestData.name}
              onChange={(e) => setRequestData({...requestData, name: e.target.value})}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={requestData.phone}
              onChange={(e) => setRequestData({...requestData, phone: e.target.value})}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="quantity">Quantity Needed *</Label>
            <Input
              id="quantity"
              placeholder="e.g., 5kg, 100 seeds"
              value={requestData.quantity}
              onChange={(e) => setRequestData({...requestData, quantity: e.target.value})}
              required
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">Submit Request</Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SeedRequestDialog;
