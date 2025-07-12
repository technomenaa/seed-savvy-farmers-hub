
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface AdminLoginDialogProps {
  onAdminLogin: () => void;
}

const AdminLoginDialog = ({ onAdminLogin }: AdminLoginDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const { toast } = useToast();

  // Admin credentials: username: admin, password: admin123
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      // Save admin login state to localStorage
      localStorage.setItem('isAdminLoggedIn', 'true');
      
      toast({
        title: "Success",
        description: "Welcome to Admin Panel!",
      });
      onAdminLogin();
      setIsOpen(false);
      setCredentials({ username: '', password: '' });
      
      // Force page refresh to update all components
      window.location.reload();
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials. Use username: admin, password: admin123",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Admin Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Admin Login</DialogTitle>
          <DialogDescription>
            Enter admin credentials to access the admin panel.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              placeholder="Enter admin username"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              placeholder="Enter admin password"
              required
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">Login</Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
        
        <div className="text-xs text-gray-500 mt-4 p-2 bg-gray-50 rounded">
          <strong>Test Credentials:</strong><br />
          Username: admin<br />
          Password: admin123
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLoginDialog;
