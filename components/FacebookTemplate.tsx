'use client';
import { generateProfile } from '@/actions/action';
import type React from 'react';

import type { AccountDetails, ProfileInformation } from '@/Types/types';
import * as htmlToImage from 'html-to-image';
import { Calendar, ImageIcon, LinkIcon, MapPin, Moon, Sun } from 'lucide-react';
import { useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const getHeaderColor = (color: string) => {
  const map: Record<string, string> = {
    blue: 'bg-blue-600',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
  };
  return map[color] || 'bg-blue-600';
};

export default function FacebookTemplate() {
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [profile, setProfile] = useState<ProfileInformation>({
    displayName: 'John Doe',
    username: 'johndoe',
    headline:
      'Lives in San Francisco • Works at Tech Company • Coffee lover ☕',
    industry: 'Technology',
    avatar: '/placeholder.svg?height=128&width=128',
    bio: 'Lives in San Francisco • Works at Tech Company • Coffee lover ☕',
    location: 'San Francisco, CA',
    website: 'johndoe.dev',
    joinDate: 'March 2019',
  });

  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    following: '1,234',
    followers: '5,678',
    connections: '1000',
    isVerified: false,
    headerColor: 'blue',
    profileTheme: 'light',
  });

  const updateProfile = (field: keyof ProfileInformation, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };
  const updateAccountDetails = (field: keyof AccountDetails, value: string) => {
    setAccountDetails((prev) => ({ ...prev, [field]: value }));
  };

  const HandleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(previewRef.current, {
        quality: 1,
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `${profile.username}-facebook-profile.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.log('failed to export png', error);
    }
  };

  const handleGenerateProfile = async () => {
    if (clickCount >= 2) return;

    const prompt = `Rewrite and improve the following Facebook bio using exactly 10 words. Keep it casual and personal. Return ONLY valid JSON with keys: displayName, username, headline.
    
    Current bio: "${profile.headline}"`;

    setLoading(true);
    try {
      const aiText = await generateProfile(prompt);
      if (!aiText) return;

      const cleanedText = aiText
        .trim()
        .replace(/^```json/, '')
        .replace(/^```/, '')
        .replace(/```$/, '')
        .trim();

      const jsonMatch = cleanedText.match(/{[\s\S]*?}/);
      if (!jsonMatch) throw new Error('No valid JSON found in AI response');

      const parsed = JSON.parse(jsonMatch[0]);

      let headline = parsed.headline ?? profile.headline;
      const words = headline.trim().split(/\s+/);
      if (words.length > 10) {
        headline = words.slice(0, 10).join(' ') + '.';
      }

      setProfile((prev) => ({
        ...prev,
        displayName: parsed.displayName ?? prev.displayName,
        username: parsed.username ?? prev.username,
        headline,
      }));

      setClickCount((prev) => prev + 1);
    } catch (error) {
      console.error('❌ Error in generateProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen container">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Form */}
        <div className="p-6 overflow-y-auto">
          <div className="max-w-md mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent">
                  Facebook Profile Builder
                </h1>
                <p className="mt-1">Create your Facebook profile card</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  updateAccountDetails(
                    'profileTheme',
                    accountDetails.profileTheme === 'dark' ? 'light' : 'dark',
                  )
                }
              >
                {accountDetails.profileTheme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
            </div>

            {/* Profile Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Information</CardTitle>
                <CardDescription>
                  Details shown on your Facebook profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Avatar Upload */}
                <div className="space-y-2">
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={HandleImageChange}
                    />
                    <Avatar className="h-20 w-20 border-2 border-border">
                      {profile.avatar && (
                        <AvatarImage
                          src={profile.avatar || '/placeholder.svg'}
                          alt="avatar"
                        />
                      )}
                      <AvatarFallback className="bg-gray-300 text-xl font-bold">
                        {profile.displayName
                          .split(' ')
                          .map((w) => w[0])
                          .join('')
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                {/* Display Name */}
                <div>
                  <Label htmlFor="displayName">Full Name</Label>
                  <Input
                    id="displayName"
                    value={profile.displayName}
                    onChange={(e) =>
                      updateProfile('displayName', e.target.value)
                    }
                  />
                </div>

                {/* Bio */}
                <div>
                  <Label htmlFor="headline">Bio</Label>
                  <Input
                    id="headline"
                    value={profile.headline}
                    onChange={(e) => updateProfile('headline', e.target.value)}
                  />
                </div>

                {/* Work/Education */}
                <div>
                  <Label htmlFor="industry">Work/Education</Label>
                  <Input
                    id="industry"
                    value={profile.industry}
                    onChange={(e) => updateProfile('industry', e.target.value)}
                  />
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => updateProfile('location', e.target.value)}
                  />
                </div>

                {/* Website */}
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profile.website}
                    onChange={(e) => updateProfile('website', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Social Info</CardTitle>
                <CardDescription>Friends and Theme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="joinDate">Joined Facebook</Label>
                  <Input
                    id="joinDate"
                    value={profile.joinDate}
                    onChange={(e) => updateProfile('joinDate', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="connections">Friends</Label>
                    <Input
                      id="connections"
                      value={accountDetails.connections}
                      onChange={(e) =>
                        updateAccountDetails('connections', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="followers">Followers</Label>
                    <Input
                      id="followers"
                      value={accountDetails.followers}
                      onChange={(e) =>
                        updateAccountDetails('followers', e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="headerColor">Cover Photo Color</Label>
                  <Select
                    value={accountDetails.headerColor}
                    onValueChange={(value) =>
                      updateAccountDetails('headerColor', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="pink">Pink</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Generate Button */}
          <div className="flex items-center justify-center mt-10">
            <Button
              onClick={handleGenerateProfile}
              disabled={loading || clickCount >= 2}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700"
            >
              {loading
                ? 'Generating...'
                : clickCount >= 2
                ? 'Limit Reached'
                : '✨ Generate AI Bio'}
            </Button>
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="p-6 overflow-y-auto">
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Live Preview</h2>
              <p className="text-sm">Preview your Facebook profile</p>
            </div>

            {/* Cover Photo */}
            <div
              ref={previewRef}
              className={`rounded-lg overflow-hidden shadow-xl transition-colors duration-300 ${
                accountDetails.profileTheme === 'dark'
                  ? 'bg-[#18191a] text-white'
                  : 'bg-white text-black'
              }`}
            >
              {/* Cover Photo - Facebook dimensions */}
              <div
                className={`h-48 ${getHeaderColor(
                  accountDetails.headerColor,
                )} relative`}
              >
                {/* Profile Picture - Exact Facebook positioning */}
                <div className="absolute left-6 bottom-0 transform translate-y-1/2">
                  <div className="relative">
                    <Avatar className="w-40 h-40 border-4 border-white rounded-full shadow-lg">
                      <AvatarImage
                        src={profile.avatar || '/placeholder.svg'}
                        alt={profile.displayName}
                      />
                      <AvatarFallback className="text-4xl font-bold bg-gray-300 text-gray-700">
                        {profile.displayName
                          .split(' ')
                          .map((w) => w[0])
                          .join('')
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {/* Online status indicator */}
                    <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Profile Content Area */}
              <div className="pt-20 px-6">
                {/* Name and Basic Info */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-bold leading-tight">
                      {profile.displayName}
                    </h1>
                    {accountDetails.isVerified && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>

                  {/* Friends count - Facebook style */}
                  <p className=" font-semibold mb-1">
                    {accountDetails.connections} friends
                  </p>

                  {/* Mutual friends preview */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex -space-x-1">
                      <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"></div>
                      <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white"></div>
                      <div className="w-6 h-6 bg-gray-500 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                      12 mutual friends
                    </span>
                  </div>
                </div>

                {/* Action Buttons - Facebook style */}
                <div className="flex gap-2 mb-4">
                  <Button className="flex-1 bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold rounded-md px-4 py-2">
                    Add friend
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-black border-0 font-semibold rounded-md px-4 py-2"
                  >
                    Message
                  </Button>
                  <Button
                    variant="outline"
                    className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-black border-0 rounded-md"
                  >
                    <span className="text-lg">⋯</span>
                  </Button>
                </div>

                {/* Navigation Tabs - Facebook style */}
                <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                  <div className="flex space-x-8">
                    <button className="pb-3 px-1 border-b-2 border-[#1877f2] text-[#1877f2] font-semibold text-sm">
                      Timeline
                    </button>
                    <button className="pb-3 px-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold text-sm">
                      About
                    </button>
                    <button className="pb-3 px-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold text-sm">
                      Friends
                    </button>
                    <button className="pb-3 px-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold text-sm">
                      Photos
                    </button>
                  </div>
                </div>

                {/* Bio and Details */}
                <div className="space-y-3 mb-6">
                  {profile.headline && <p>{profile.headline}</p>}

                  {/* Info items - Facebook style */}
                  <div className="space-y-2 text-sm">
                    {profile.industry && (
                      <div className="flex items-center gap-2 ">
                        <span className="w-4 h-4">💼</span>
                        <span>
                          Works at{' '}
                          <span className="font-semibold">
                            {profile.industry}
                          </span>
                        </span>
                      </div>
                    )}

                    {profile.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>
                          Lives in{' '}
                          <span className="font-semibold">
                            {profile.location}
                          </span>
                        </span>
                      </div>
                    )}

                    {profile.website && (
                      <div className="flex items-center gap-2">
                        <LinkIcon className="w-4 h-4" />
                        <span className="text-[#1877f2] hover:underline cursor-pointer font-semibold">
                          {profile.website}
                        </span>
                      </div>
                    )}

                    {profile.joinDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>Joined {profile.joinDate}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 text-gray-500">👥</span>
                      <span>Followed by {accountDetails.followers} people</span>
                    </div>
                  </div>
                </div>

                {/* Edit Profile Button (for profile owner) */}
                <div className="pb-6">
                  <Button
                    variant="outline"
                    className="w-full hover:text-neutral-900 text-black  shadow-2xl  font-semibold rounded-md py-2"
                  >
                    Edit profile
                  </Button>
                </div>
              </div>
            </div>

            {/* Export Button */}
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleDownload}
                className="px-6 py-2 bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold"
                size="lg"
              >
                Export Facebook Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
