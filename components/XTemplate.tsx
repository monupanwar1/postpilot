'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Bell,
  Calendar,
  CheckCircle,
  LinkIcon,
  Mail,
  MapPin,
  MoreHorizontal,
} from 'lucide-react';
import { useState } from 'react';

interface TwitterFormData {
  displayName: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  joinDate: string;
  following: string;
  followers: string;
  isVerified: boolean;
  headerColor: string;
  profileTheme: string;
}

export default function XTemplate() {
  const [formData, setFormData] = useState<TwitterFormData>({
    displayName: 'John Doe',
    username: 'johndoe',
    bio: 'Software Engineer • Building the future • Coffee enthusiast ☕',
    location: 'San Francisco, CA',
    website: 'johndoe.dev',
    joinDate: 'March 2019',
    following: '1,234',
    followers: '5,678',
    isVerified: false,
    headerColor: 'blue',
    profileTheme: 'dark',
  });

  const updateFormData = (
    field: keyof TwitterFormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getHeaderColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-500';
      case 'purple':
        return 'bg-purple-500';
      case 'pink':
        return 'bg-pink-500';
      case 'green':
        return 'bg-green-500';
      case 'orange':
        return 'bg-orange-500';
      default:
        return 'bg-blue-500';
    }
  };

  const isDark = formData.profileTheme === 'dark';

  return (
    <section className="min-h-screen container">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Form */}
        <div className="p-6 overflow-y-auto">
          <div className="max-w-md mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold">𝕏 Profile Builder</h1>
              <p className=" mt-1">Create your Twitter/X profile</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Information</CardTitle>
                <CardDescription>Your basic profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={formData.displayName}
                    onChange={(e) =>
                      updateFormData('displayName', e.target.value)
                    }
                    placeholder="Your display name"
                  />
                </div>

                <div>
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      @
                    </span>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) =>
                        updateFormData('username', e.target.value)
                      }
                      placeholder="username"
                      className="pl-8"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => updateFormData('bio', e.target.value)}
                    placeholder="Tell the world about yourself"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    placeholder="Where you're located"
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => updateFormData('website', e.target.value)}
                    placeholder="Your website URL"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Details</CardTitle>
                <CardDescription>Follower counts and join date</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="joinDate">Joined</Label>
                  <Input
                    id="joinDate"
                    value={formData.joinDate}
                    onChange={(e) => updateFormData('joinDate', e.target.value)}
                    placeholder="March 2019"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="following">Following</Label>
                    <Input
                      id="following"
                      value={formData.following}
                      onChange={(e) =>
                        updateFormData('following', e.target.value)
                      }
                      placeholder="1,234"
                    />
                  </div>

                  <div>
                    <Label htmlFor="followers">Followers</Label>
                    <Input
                      id="followers"
                      value={formData.followers}
                      onChange={(e) =>
                        updateFormData('followers', e.target.value)
                      }
                      placeholder="5,678"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="verified"
                      checked={formData.isVerified}
                      onCheckedChange={(checked) =>
                        updateFormData('isVerified', checked)
                      }
                    />
                    <Label htmlFor="verified">Verified account</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Side - Twitter Preview */}
        <div className={`p-6 overflow-y-auto `}>
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Live Preview</h2>
              <p className="text-sm ">See your X profile in real-time</p>
            </div>

            {/* Twitter Profile Card */}
            <div className="rounded-2xl overflow-hidden border ">
              {/* Header Image */}
              <div className={`h-32 ${getHeaderColor(formData.headerColor)}`} />

              {/* Profile Section */}
              <div className="px-4 pb-4">
                {/* Avatar and Action Buttons */}
                <div className="flex justify-between items-start -mt-16 mb-4">
                  <Avatar className="w-32 h-32 border-4 border-white">
                    <AvatarImage
                      src="/placeholder.svg?height=128&width=128"
                      alt={formData.displayName}
                    />
                    <AvatarFallback className="text-2xl font-bold bg-gray-300">
                      {formData.displayName.toUpperCase()
                        .split(' ').map(word=>word[0]).join('')
                      }
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex md:space-x-6 mt-20">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                    >
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="rouded-full">
                      <Bell className="w-4 h-4" />
                    </Button>
                    <Button
                      className="rounded-full hover:bg-gray-800"
                      size="sm"
                    >
                      Follow
                    </Button>
                  </div>
                </div>

                {/* Name and Username */}
                <div className="mb-3">
                  <div className="flex items-center gap-1">
                    <h1 className="text-xl font-bold">
                      {formData.displayName || 'Your Name'}
                    </h1>
                    {formData.isVerified && (
                      <CheckCircle className="w-5 h-5 text-blue-500 fill-current" />
                    )}
                  </div>
                  <p>@{formData.username || 'username'}</p>
                </div>

                {/* Bio */}
                {formData.bio && (
                  <div className="mb-3">
                    <p className="leading-relaxed">{formData.bio}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 mb-3 mt-2">
                  {formData.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{formData.location}</span>
                    </div>
                  )}
                  {formData.website && (
                    <div className="flex items-center gap-1">
                      <LinkIcon className="w-4 h-4" />
                      <span className="text-sm text-blue-500 hover:underline cursor-pointer">
                        {formData.website}
                      </span>
                    </div>
                  )}
                  {formData.joinDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        Joined {formData.joinDate}
                      </span>
                    </div>
                  )}
                </div>

                {/* Following and Followers */}
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <span className="font-bold">
                      {formData.following || '0'}
                    </span>
                    <span className=" hover:underline cursor-pointer">
                      Following
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold">
                      {formData.followers || '0'}
                    </span>
                    <span className="text-sm">Followers</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button className="px-6 py-2 mt-10 hover:bg-gray-800" size="lg">
                Export Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
