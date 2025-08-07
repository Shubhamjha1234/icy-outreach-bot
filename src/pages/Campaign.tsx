import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CampaignData {
  brandName: string;
  productDescription: string;
  targetAudience: string;
  campaignGoal: string;
  brandTone: string;
  platforms: string[];
  budgetLevel: string;
}

const Campaign = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CampaignData>({
    brandName: '',
    productDescription: '',
    targetAudience: '',
    campaignGoal: '',
    brandTone: '',
    platforms: [],
    budgetLevel: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleInputChange = (field: keyof CampaignData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      platforms: checked 
        ? [...prev.platforms, platform]
        : prev.platforms.filter(p => p !== platform)
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Store form data and navigate to results
      localStorage.setItem('campaignData', JSON.stringify(formData));
      navigate('/results');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate('/');
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.brandName && formData.productDescription;
      case 2:
        return formData.targetAudience && formData.campaignGoal && formData.brandTone;
      case 3:
        return formData.platforms.length > 0 && formData.budgetLevel;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              Campaign Setup
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Create Your <span className="text-gradient">AI-Powered</span> Campaign
            </h1>
            <p className="text-xl text-muted-foreground">
              Tell us about your brand and goals, and we'll find the perfect influencers
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <Card className="card-glass p-8 animate-slide-up">
            {/* Step 1: Brand Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Brand Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="brandName" className="text-foreground">Brand Name *</Label>
                    <Input
                      id="brandName"
                      value={formData.brandName}
                      onChange={(e) => handleInputChange('brandName', e.target.value)}
                      placeholder="Enter your brand name"
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="productDescription" className="text-foreground">Product Description *</Label>
                    <Textarea
                      id="productDescription"
                      value={formData.productDescription}
                      onChange={(e) => handleInputChange('productDescription', e.target.value)}
                      placeholder="Describe your product or service in detail..."
                      className="mt-2 h-32"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Campaign Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Campaign Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="targetAudience" className="text-foreground">Target Audience *</Label>
                    <Input
                      id="targetAudience"
                      value={formData.targetAudience}
                      onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                      placeholder="e.g., Gen Z fashion enthusiasts, Tech professionals..."
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="campaignGoal" className="text-foreground">Campaign Goal *</Label>
                    <Textarea
                      id="campaignGoal"
                      value={formData.campaignGoal}
                      onChange={(e) => handleInputChange('campaignGoal', e.target.value)}
                      placeholder="What do you want to achieve with this campaign?"
                      className="mt-2 h-24"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-foreground">Brand Tone *</Label>
                    <Select value={formData.brandTone} onValueChange={(value) => handleInputChange('brandTone', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your brand tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly">Friendly & Casual</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="luxury">Luxury & Premium</SelectItem>
                        <SelectItem value="playful">Playful & Fun</SelectItem>
                        <SelectItem value="authentic">Authentic & Raw</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Platform & Budget */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Platform & Budget</h2>
                
                <div className="space-y-6">
                  <div>
                    <Label className="text-foreground">Platform Focus * (Select all that apply)</Label>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {['Instagram', 'YouTube', 'TikTok', 'Twitter'].map((platform) => (
                        <div key={platform} className="flex items-center space-x-2">
                          <Checkbox
                            id={platform}
                            checked={formData.platforms.includes(platform)}
                            onCheckedChange={(checked) => handlePlatformChange(platform, checked as boolean)}
                          />
                          <Label htmlFor={platform} className="text-foreground">{platform}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-foreground">Budget Level *</Label>
                    <RadioGroup 
                      value={formData.budgetLevel} 
                      onValueChange={(value) => handleInputChange('budgetLevel', value)}
                      className="mt-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="startup" id="startup" />
                        <Label htmlFor="startup" className="text-foreground">Startup ($500 - $2,000)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="growth" id="growth" />
                        <Label htmlFor="growth" className="text-foreground">Growth ($2,000 - $10,000)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="enterprise" id="enterprise" />
                        <Label htmlFor="enterprise" className="text-foreground">Enterprise ($10,000+)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button 
                onClick={handleBack}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {currentStep === 1 ? 'Back to Home' : 'Previous'}
              </Button>
              
              <Button 
                onClick={handleNext}
                disabled={!isStepValid()}
                className="btn-hero flex items-center gap-2"
              >
                {currentStep === totalSteps ? 'Generate Campaign' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Campaign;