import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Target, MessageCircle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';

const Landing = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleStartOutreach = () => {
    navigate('/campaign');
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm text-primary">
                <Sparkles className="w-4 h-4" />
                AI-Powered Outreach
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-gradient">ICY</span>
                <br />
                <span className="text-foreground">The AI Agent that</span>
                <br />
                <span className="text-accent">Turns Outreach into</span>
                <br />
                <span className="text-primary">Opportunity</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Stop wasting time on manual influencer outreach. Let our AI find perfect matches, 
                analyze their content, and craft personalized messages that actually get responses.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleStartOutreach}
                  className="btn-hero group"
                >
                  Start Outreach Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button variant="outline" className="btn-secondary">
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10x</div>
                  <div className="text-sm text-muted-foreground">Response Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">95%</div>
                  <div className="text-sm text-muted-foreground">Time Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Brands Trust Us</div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-up">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20 animate-glow"></div>
              <img 
                src={heroImage} 
                alt="ICY AI Platform"
                className="relative rounded-3xl shadow-card w-full"
                onLoad={() => setIsLoaded(true)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              How ICY <span className="text-gradient">Transforms</span> Your Outreach
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From campaign brief to successful collaborations in minutes, not weeks
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-glass card-hover group">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Smart Influencer Matching</h3>
              <p className="text-muted-foreground">
                Our AI analyzes millions of profiles to find influencers that perfectly align with your brand, 
                audience, and campaign goals.
              </p>
            </div>
            
            <div className="card-glass card-hover group">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Personalized Messages</h3>
              <p className="text-muted-foreground">
                Generate authentic, personalized outreach messages that reference their recent content 
                and match your brand voice perfectly.
              </p>
            </div>
            
            <div className="card-glass card-hover group">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Campaign Tracking</h3>
              <p className="text-muted-foreground">
                Track responses, manage collaborations, and measure ROI with our comprehensive 
                campaign management dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="card-glass max-w-4xl mx-auto p-12">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              Ready to <span className="text-gradient">Transform</span> Your Influencer Outreach?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of brands already using ICY to build authentic influencer relationships 
              and drive real business results.
            </p>
            <Button 
              onClick={handleStartOutreach}
              className="btn-hero group"
              size="lg"
            >
              Start Your First Campaign
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;