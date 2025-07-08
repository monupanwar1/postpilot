'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Globe, Mail, MapPin, Phone, Star } from 'lucide-react';
import { useState } from 'react';

interface FormData {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  bio: string;
  theme: string;
  showContact: boolean;
  skills: string;
}

export default function XTemplate() {
  const [formData, setFormData] = useState<FormData>({
    name: 'John Doe',
    title: 'Senior Software Engineer',
    company: 'Tech Corp',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'johndoe.dev',
    bio: 'Passionate software engineer with 5+ years of experience building scalable web applications. Love working with modern technologies and solving complex problems.',
    theme: 'blue',
    showContact: true,
    skills: 'React, TypeScript, Node.js, Python',
  });

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

 ;

  return (
    <div className="min-h-screen">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Form */}
        <div className="p-6 overflow-y-auto">
          <div className="max-w-md mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold">
                Profile Builder
              </h1>
              <p className=" mt-1">
                Create your professional profile
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
                <CardDescription>Enter your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => updateFormData('title', e.target.value)}
                    placeholder="Enter your job title"
                  />
                </div>

                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => updateFormData('company', e.target.value)}
                    placeholder="Enter your company"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => updateFormData('bio', e.target.value)}
                    placeholder="Tell us about yourself"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
                <CardDescription>How people can reach you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    placeholder="Enter your location"
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => updateFormData('website', e.target.value)}
                    placeholder="Enter your website"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills & Preferences</CardTitle>
                <CardDescription>Customize your profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="skills">Skills (comma separated)</Label>
                  <Input
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => updateFormData('skills', e.target.value)}
                    placeholder="React, TypeScript, Node.js"
                  />
                </div>

                <div>
                  <Label htmlFor="theme">Theme Color</Label>
                  <Select
                    value={formData.theme}
                    onValueChange={(value) => updateFormData('theme', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-contact"
                    checked={formData.showContact}
                    onCheckedChange={(checked) =>
                      updateFormData('showContact', checked)
                    }
                  />
                  <Label htmlFor="show-contact">Show contact information</Label>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg">
              Export Profile
            </Button>
          </div>
        </div>

        {/* Right Side - Live Preview */}
        <div className="p-6 overflow-y-auto">
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Live Preview
              </h2>
              <p className="text-gray-600 text-sm">
                See your profile in real-time
              </p>
            </div>

            <Card className="overflow-hidden mt-10">
             

              <CardContent className="relative pt-0 pb-6 mt-10">
                {/* Avatar */}
                <div className="flex justify-center -mt-12 mb-4">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                    <AvatarImage
                      src="/placeholder.svg?height=96&width=96"
                      alt={formData.name}
                    />
                    <AvatarFallback className="text-xl font-semibold">
                      {formData.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Name and Title */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {formData.name || 'Your Name'}
                  </h3>
                  <p className="text-gray-600">
                    {formData.title || 'Your Title'}
                  </p>
                  {formData.company && (
                    <p className="text-sm text-gray-500">
                      at {formData.company}
                    </p>
                  )}
                </div>

                {/* Bio */}
                {formData.bio && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-700 text-center leading-relaxed">
                      {formData.bio}
                    </p>
                  </div>
                )}

                {/* Skills */}
                {formData.skills && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 text-center">
                      Skills
                    </h4>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {formData.skills.split(',').map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                {formData.showContact && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900 text-center mb-3">
                      Contact
                    </h4>

                    {formData.email && (
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{formData.email}</span>
                      </div>
                    )}

                    {formData.phone && (
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{formData.phone}</span>
                      </div>
                    )}

                    {formData.location && (
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{formData.location}</span>
                      </div>
                    )}

                    {formData.website && (
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <Globe className="w-4 h-4" />
                        <span>{formData.website}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Rating/Stars for visual appeal */}
                <div className="flex justify-center mt-4 pt-4 border-t">
                  <div className="flex gap-1">
                    {Array(5).fill(null).map((_,star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
