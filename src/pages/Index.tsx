
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
    { label: 'Registered Farmers', value: '1,500+' },
    { label: 'Seed Varieties', value: '800+' },
    { label: 'Agricultural Experts', value: '75+' },
    { label: 'Successful Matches', value: '4,200+' }
  ];

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=600&fit=crop',
      title: 'بنك البذور الرقمي',
      subtitle: 'Bank Bthorna - Digital Seeds Bank',
      description: 'منصة شاملة لإدارة البذور والمزارعين والخبراء الزراعيين'
    },
    {
      image: 'https://images.unsplash.com/photo-1472196199053-3bf3d32c4cf0?w=1200&h=600&fit=crop',
      title: 'ربط المزارعين بالخبراء',
      subtitle: 'Connecting Farmers with Experts',
      description: 'شبكة متكاملة للاستشارات الزراعية والدعم التقني'
    },
    {
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=600&fit=crop',
      title: 'تكنولوجيا الزراعة الحديثة',
      subtitle: 'Modern Agricultural Technology',
      description: 'أدوات ذكية لتحسين الإنتاجية والاستدامة الزراعية'
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
                          <Link to="/farmers">تسجيل كمزارع - Register as Farmer</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-green-600" asChild>
                          <Link to="/experts">العثور على خبراء - Find Experts</Link>
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
            كل ما تحتاجه للنجاح الزراعي - Everything You Need for Agricultural Success
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            منصتنا توفر أدوات شاملة للمزارعين وموردي البذور والخبراء الزراعيين والمهنيين
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
            مستعد للبدء؟ - Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            انضم إلى آلاف المزارعين الذين يستخدمون منصتنا لإدارة بذورهم والتواصل مع الخبراء وتنمية أعمالهم
            Join thousands of farmers who are already using our platform to manage their seeds, connect with experts, and grow their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
              <Link to="/farmers">انضم كمزارع - Join as Farmer</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-green-600" asChild>
              <Link to="/experts">حجز استشارة - Book Consultation</Link>
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
              <span className="text-xl font-bold">Bank Bthorna</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2">تمكين المزارعين بالتكنولوجيا والخبرة - Empowering farmers with technology and expertise</p>
              <p className="text-sm text-gray-500">© 2024 Bank Bthorna. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
