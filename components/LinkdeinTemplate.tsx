'use client';
import { generateProfile } from '@/actions/action';
import { AccountDetails, ProfileInformation } from '@/Types/types';
import * as htmlToImage from 'html-to-image';
import {
  Calendar,
  ImageIcon,
  LinkIcon,
  MapPin,
  Moon,
  Plus,
  Sun,
} from 'lucide-react';
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
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
  };
  return map[color] || 'bg-gray-300';
};

export default function LinkdeinTemplate() {
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [profile, setProfile] = useState<ProfileInformation>({
    displayName: 'John Doe',
    username: 'johndoe',
    headline: 'Software Engineer • Building the future • Coffee enthusiast ☕',
    industry: 'microsoft',
    avatar: '/placeholder.svg?height=128&width=128',
    bio: 'Software Engineer • Building the future • Coffee enthusiast ☕',
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
    profileTheme: 'dark',
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
      link.download = `${profile.username}-profile.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.log('failed to export png', error);
    }
  };

  const checkGenerateCookie = (templateId: string) => {
    return document.cookie
      .split(';')
      .some((c) => c.trim().startsWith(`${templateId}=true`));
  };
  const setGenerateCookie = (templateId: string) => {
    const expireDate = new Date();
    expireDate.setHours(expireDate.getHours() + 24); // 24 hours
    document.cookie = `${templateId}=true; expires=${expireDate.toUTCString()}; path=/`;
  };

  const handleGenerateProfile = async () => {
    const templateId = 'template1';

    if (checkGenerateCookie(templateId)) {
      alert(
        'You have reached the 1 free generation limit for this template. Try again after 24h.',
      );
      return;
    }

    const prompt = `Rewrite and improve the following LinkedIn headline using exactly 10 words. Keep it professional and engaging. Return ONLY valid JSON with keys: displayName, username, headline.
    
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
      setGenerateCookie(templateId);
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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  LinkedIn Profile Builder
                </h1>
                <p className="mt-1">
                  Create your professional LinkedIn profile
                </p>
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
                  Details shown on your LinkedIn card
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
                        <AvatarImage src={profile.avatar} alt="avatar" />
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

                {/* Headline */}
                <div>
                  <Label htmlFor="headline">Headline</Label>
                  <Input
                    id="headline"
                    value={profile.headline}
                    onChange={(e) => updateProfile('headline', e.target.value)}
                  />
                </div>

                {/* Industry */}
                <div>
                  <Label htmlFor="industry">Industry</Label>
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
                  <Label htmlFor="website">Website / Portfolio</Label>
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
                <CardTitle className="text-lg">Professional Info</CardTitle>
                <CardDescription>Connections and Theme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="joinDate">Join Date</Label>
                  <Input
                    id="joinDate"
                    value={profile.joinDate}
                    onChange={(e) => updateProfile('joinDate', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="connections">Connections</Label>
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
                  <Label htmlFor="headerColor">Header Color</Label>
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
              className="px-6 py-2"
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
              <p className="text-sm">Preview your LinkedIn card</p>
            </div>

            <div
              ref={previewRef}
              className={`rounded-lg overflow-hidden border shadow-sm transition-colors duration-300 ${
                accountDetails.profileTheme === 'dark'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-black'
              }`}
            >
              {/* Header Background */}
              <div
                className={`h-28 ${getHeaderColor(
                  accountDetails.headerColor,
                )} relative`}
              >
                {/* Avatar */}
                <div className="absolute left-4 -bottom-10">
                  <Avatar className="w-24 h-24 border-4 border-white rounded-full">
                    <AvatarImage
                      src={profile.avatar}
                      alt={profile.displayName}
                    />
                    <AvatarFallback className="text-2xl font-bold bg-gray-300">
                      {profile.displayName
                        .split(' ')
                        .map((w) => w[0])
                        .join('')
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Body Content */}
              <div className="pt-14 px-4 pb-6">
                {/* Name and Title */}
                <div className="mb-2">
                  <h1 className="text-xl font-bold leading-tight">
                    {profile.displayName}
                  </h1>
                  <p className="text-sm ">{profile.headline}</p>
                  <p className="text-bold ">
                    {' '}
                    {profile.industry
                      ? profile.industry.charAt(0).toUpperCase() +
                        profile.industry.slice(1).toLowerCase()
                      : ''}
                  </p>
                </div>

                {/* Location, Website, Join Date */}
                <div className="flex flex-wrap gap-4 text-sm mb-3">
                  {profile.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile.website && (
                    <div className="flex items-center gap-1">
                      <LinkIcon className="w-4 h-4" />
                      <span className="text-blue-500 hover:underline cursor-pointer">
                        {profile.website}
                      </span>
                    </div>
                  )}
                  {profile.joinDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {profile.joinDate}</span>
                    </div>
                  )}
                </div>

                {/* Connections / Followers */}
                <div className="flex gap-6 text-sm font-medium mb-4">
                  <div className="flex items-center gap-1">
                    <span className="font-bold">
                      {accountDetails.connections}
                    </span>
                    <Plus size={16} className="text-blue-600" />
                    <span>Connections</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold">
                      {accountDetails.followers}
                    </span>
                    <span>Followers</span>
                  </div>
                </div>

                {/* LinkedIn Buttons */}
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                  <Button
                    variant="default"
                    className="w-full sm:w-auto bg-blue-700 text-white hover:bg-blue-800"
                  >
                    Connect
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-gray-300 text-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    Message
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-gray-300 text-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    ....
                  </Button>
                </div>
              </div>
            </div>

            {/* Export Button */}
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleDownload}
                className="px-6 py-2 hover:bg-gray-800"
                size="lg"
              >
                Export LinkedIn Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
