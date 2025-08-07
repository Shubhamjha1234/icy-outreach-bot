import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Copy, Mail, MessageCircle, CheckCircle, Clock, X, Instagram, Youtube } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface InfluencerData {
  id: string;
  name: string;
  handle: string;
  platform: string;
  followers: string;
  engagement: string;
  niche: string;
  recentPost: string;
  fitScore: number;
  status: 'pending' | 'replied' | 'declined';
}

interface CampaignData {
  brandName: string;
  productDescription: string;
  targetAudience: string;
  campaignGoal: string;
  brandTone: string;
  platforms: string[];
  budgetLevel: string;
}

const mockInfluencers: InfluencerData[] = [
  {
    id: '1',
    name: 'Emma Rodriguez',
    handle: '@emmalifestyle',
    platform: 'Instagram',
    followers: '125K',
    engagement: '4.2%',
    niche: 'Lifestyle & Fashion',
    recentPost: 'Summer essentials haul - loving these sustainable brands!',
    fitScore: 92,
    status: 'pending'
  },
  {
    id: '2',
    name: 'Alex Chen',
    handle: '@techwithalex',
    platform: 'YouTube',
    followers: '89K',
    engagement: '6.1%',
    niche: 'Tech Reviews',
    recentPost: 'The future of AI in everyday apps - game changing!',
    fitScore: 88,
    status: 'pending'
  },
  {
    id: '3',
    name: 'Sofia Martinez',
    handle: '@sofiawellness',
    platform: 'Instagram',
    followers: '67K',
    engagement: '5.8%',
    niche: 'Health & Wellness',
    recentPost: 'Morning routine that changed my productivity completely',
    fitScore: 85,
    status: 'pending'
  }
];

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);
  const [influencers, setInfluencers] = useState<InfluencerData[]>(mockInfluencers);
  const [selectedInfluencer, setSelectedInfluencer] = useState<InfluencerData | null>(null);
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('campaignData');
    if (savedData) {
      setCampaignData(JSON.parse(savedData));
    } else {
      navigate('/campaign');
    }
  }, [navigate]);

  const generateMessage = async (influencer: InfluencerData) => {
    setIsGenerating(true);
    setSelectedInfluencer(influencer);
    
    // Simulate API call
    setTimeout(() => {
      const message = `Hi ${influencer.name.split(' ')[0]}! 👋

I just saw your post about "${influencer.recentPost}" and absolutely loved your authentic approach to ${influencer.niche.toLowerCase()}. Your content perfectly aligns with what we're looking for at ${campaignData?.brandName}.

We're launching an exciting campaign around ${campaignData?.productDescription.substring(0, 100)}... and would love to explore a collaboration that feels natural to your audience.

Your engagement with the ${campaignData?.targetAudience} community is exactly what we're seeking. Would you be open to a quick chat about how we could work together?

Looking forward to hearing from you! ✨

Message powered by ICY – The AI Agent that Turns Outreach into Opportunity.`;
      
      setGeneratedMessage(message);
      setIsGenerating(false);
    }, 2000);
  };

  const copyMessage = () => {
    navigator.clipboard.writeText(generatedMessage);
    toast({
      title: "Message copied!",
      description: "The outreach message has been copied to your clipboard.",
    });
  };

  const updateInfluencerStatus = (id: string, status: 'replied' | 'declined') => {
    setInfluencers(prev => 
      prev.map(inf => inf.id === id ? { ...inf, status } : inf)
    );
    toast({
      title: "Status updated!",
      description: `Influencer status updated to ${status}.`,
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return <Instagram className="w-4 h-4" />;
      case 'YouTube':
        return <Youtube className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'replied':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'declined':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  if (!campaignData) return null;

  return (
    <div className="min-h-screen bg-gradient-dark py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button 
              onClick={() => navigate('/campaign')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Campaign
            </Button>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground">
                Campaign Results for <span className="text-gradient">{campaignData.brandName}</span>
              </h1>
              <p className="text-muted-foreground mt-2">Found {influencers.length} perfect matches</p>
            </div>
            
            <Button 
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              New Campaign
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Influencer Matches */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Influencer Matches</h2>
              
              {influencers.map((influencer) => (
                <Card key={influencer.id} className="card-glass p-6 card-hover">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                        {influencer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{influencer.name}</h3>
                        <p className="text-muted-foreground flex items-center gap-1">
                          {getPlatformIcon(influencer.platform)}
                          {influencer.handle}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                      {influencer.fitScore}% Match
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Followers</p>
                      <p className="font-semibold text-foreground">{influencer.followers}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Engagement</p>
                      <p className="font-semibold text-foreground">{influencer.engagement}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Niche</p>
                      <p className="font-semibold text-foreground">{influencer.niche}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Recent Post:</p>
                    <p className="text-sm text-foreground italic">"{influencer.recentPost}"</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(influencer.status)}`}>
                        {influencer.status.charAt(0).toUpperCase() + influencer.status.slice(1)}
                      </span>
                      {influencer.status === 'pending' && (
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateInfluencerStatus(influencer.id, 'replied')}
                            className="text-green-400 border-green-400 hover:bg-green-400/10"
                          >
                            <CheckCircle className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateInfluencerStatus(influencer.id, 'declined')}
                            className="text-red-400 border-red-400 hover:bg-red-400/10"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      onClick={() => generateMessage(influencer)}
                      className="btn-hero"
                      size="sm"
                    >
                      Generate Message
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Generated Message */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">AI-Generated Outreach</h2>
              
              {selectedInfluencer ? (
                <Card className="card-glass p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedInfluencer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{selectedInfluencer.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedInfluencer.handle}</p>
                    </div>
                  </div>
                  
                  {isGenerating ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
                      <span className="ml-3 text-muted-foreground">Generating personalized message...</span>
                    </div>
                  ) : generatedMessage ? (
                    <div>
                      <div className="bg-muted/20 rounded-lg p-4 mb-4">
                        <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">
                          {generatedMessage}
                        </pre>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button onClick={copyMessage} className="btn-secondary flex-1">
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Message
                        </Button>
                        <Button className="btn-hero flex-1">
                          <Mail className="w-4 h-4 mr-2" />
                          Send via Email
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </Card>
              ) : (
                <Card className="card-glass p-12 text-center">
                  <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Select an Influencer</h3>
                  <p className="text-muted-foreground">
                    Click "Generate Message" on any influencer to create a personalized outreach message
                  </p>
                </Card>
              )}

              {/* Campaign Summary */}
              <Card className="card-glass p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Campaign Summary</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Target Audience:</span>
                    <span className="text-foreground ml-2">{campaignData.targetAudience}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Platforms:</span>
                    <span className="text-foreground ml-2">{campaignData.platforms.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Brand Tone:</span>
                    <span className="text-foreground ml-2">{campaignData.brandTone}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Budget Level:</span>
                    <span className="text-foreground ml-2">{campaignData.budgetLevel}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;