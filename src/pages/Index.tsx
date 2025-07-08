
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { User, Database, Search, Calendar, Users } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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
      icon: Users,
      title: 'Agricultural Experts',
      description: 'Connect with agricultural experts and book specialized consultations for your farming needs.',
      link: '/experts'
    },
    {
      icon: Calendar,
      title: 'Management Dashboard',
      description: 'Administrative interface for managing all platform data and user information.',
      link: '/dashboard'
    }
  ];

  const stats = [
    { label: 'Registered Farmers', value: '850+' },
    { label: 'Seed Varieties', value: '600+' },
    { label: 'Agricultural Experts', value: '45+' }
  ];

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=600&fit=crop',
      title: 'Digital Seed Bank Platform',
      subtitle: 'Bank Bthorna - Preserving Agricultural Heritage',
      description: 'A digital seed bank platform, offering detailed profiles for every seed empowering researchers and agri-innovators with easy access to accurate, up-to-date data essential for advancing agricultural research, protecting biodiversity, and building a food-secure future.'
    },
    {
      image: 'https://images.unsplash.com/photo-1472196199053-3bf3d32c4cf0?w=1200&h=600&fit=crop',
      title: 'From Seeds to Solutions',
      subtitle: 'Empowering Agriculture Through Data',
      description: 'Connect researchers, farmers, and agricultural experts through our comprehensive platform designed to advance agricultural innovation and sustainability.'
    },
    {
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=600&fit=crop',
      title: 'Building Food Security',
      subtitle: 'Modern Agricultural Technology',
      description: 'Smart tools for improving productivity and agricultural sustainability while preserving genetic diversity for future generations.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      
      {/* Hero Carousel Section */}
      <section className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[600px] w-full overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    <div className="absolute inset-0 bg-black/40" />
                  </div>
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center text-white max-w-4xl mx-auto px-4">
                      <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        {slide.title}
                      </h1>
                      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-green-200">
                        {slide.subtitle}
                      </h2>
                      <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                        {slide.description}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="text-lg px-8 py-3 bg-green-600 hover:bg-green-700" asChild>
                          <Link to="/farmers">Register as Farmer</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-green-600" asChild>
                          <Link to="/experts">Find Experts</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            Everything You Need for Agricultural Success
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform provides comprehensive tools for farmers, seed suppliers, agricultural experts, and professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
            Join thousands of farmers, researchers, and agricultural professionals who are already using our platform to advance agricultural research and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
              <Link to="/farmers">Join as Farmer</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-green-600" asChild>
              <Link to="/experts">Book Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full flex items-center justify-center">
                <img 
                  src="/lovable-uploads/ff41cd41-c103-4fdd-b5f3-6c59c42f131f.png" 
                  alt="Bank Bthorna"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <span className="text-xl font-bold">Bank Bthorna</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2">Empowering agriculture through data and innovation</p>
              <p className="text-sm text-gray-500">© 2024 Bank Bthorna. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
