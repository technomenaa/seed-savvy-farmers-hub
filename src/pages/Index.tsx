
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { User, Database, Search, Calendar } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: User,
      title: 'Farmer Registration',
      description: 'Create and manage farmer profiles with comprehensive information and contact details.',
      link: '/farmers'
    },
    {
      icon: Database,
      title: 'Seed Database',
      description: 'Comprehensive seed catalog with detailed information, availability, and management tools.',
      link: '/seeds'
    },
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find seeds and farmers quickly with advanced filtering and search capabilities.',
      link: '/search'
    },
    {
      icon: Calendar,
      title: 'Management Dashboard',
      description: 'Administrative interface for managing all platform data and user information.',
      link: '/dashboard'
    }
  ];

  const stats = [
    { label: 'Registered Farmers', value: '1,200+' },
    { label: 'Seed Varieties', value: '500+' },
    { label: 'Active Regions', value: '25' },
    { label: 'Successful Matches', value: '3,400+' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-shadow">
            Connecting Farmers with
            <span className="text-primary block">Quality Seeds</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            A comprehensive platform for seed management, farmer registration, and agricultural networking. 
            Empowering farmers with the tools they need to grow successfully.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3" asChild>
              <Link to="/farmers">Register as Farmer</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3" asChild>
              <Link to="/seeds">Browse Seeds</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Seed Management
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform provides comprehensive tools for farmers, seed suppliers, and agricultural professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4 leading-relaxed">
                  {feature.description}
                </CardDescription>
                <Button variant="outline" asChild className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link to={feature.link}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of farmers who are already using our platform to manage their seeds and grow their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
              <Link to="/farmers">Join as Farmer</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-green-600" asChild>
              <Link to="/search">Explore Platform</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full gradient-green flex items-center justify-center">
                <Database className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Seed Savvy</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2">Empowering farmers with technology</p>
              <p className="text-sm text-gray-500">© 2024 Seed Savvy. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
