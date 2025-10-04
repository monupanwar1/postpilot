'use client';

import { generateProfile } from '@/actions/action';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { AccountDetails, ProfileInformation } from '@/Types/types';
import * as htmlToImage from 'html-to-image';
import {
  Bell,
  Calendar,
  ImageIcon,
  LinkIcon,
  Mail,
  MapPin,
  Moon,
  MoreHorizontal,
  Sun,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

import { useRef, useState } from 'react';

// Utility for header background color class
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

export default function XTemplate() {
  const [profile, setProfile] = useState<ProfileInformation>({
    displayName: 'John Doe',
    username: 'johndoe',
    avatar: '/placeholder.svg?height=128&width=128',
    bio: 'Software Engineer • Building the future • Coffee enthusiast ☕',
    location: 'San Francisco, CA',
    website: 'johndoe.dev',
    joinDate: 'March 2019',
  });

  const [loading, setLoading] = useState(false);
  const [limitPopup, setLimitPopup] = useState(false);

  const [clickCount, setClickCount] = useState(0);

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
    const templateId = 'template4';

    if (checkGenerateCookie(templateId)) {
      setLimitPopup(true);
      return;
    }

    const prompt = `Rewrite and improve the following Twitter bio using exactly 30 words. Keep it professional and engaging. Return ONLY valid JSON with keys: displayName, username, bio.
  
    Current bio: "${profile.bio}"`;

    setLoading(true);

    try {
      const aiText = await generateProfile(prompt);

      setLoading(false);

      if (!aiText) {
        return;
      }

      // 🧼 Clean AI response
      const cleanedText = aiText
        .trim()
        .replace(/^```json/, '')
        .replace(/^```/, '')
        .replace(/```$/, '')
        .trim();

      // 🔍 Try to extract JSON using regex if it’s not clean
      const jsonMatch = cleanedText.match(/{[\s\S]*?}/);
      if (!jsonMatch) {
        console.error('⚠️ No valid JSON found in AI response:', cleanedText);
        return;
      }

      let parsed;
      try {
        parsed = JSON.parse(jsonMatch[0]);
      } catch (error) {
        console.error('⚠️ Still failed to parse JSON:', jsonMatch[0], error);
        return;
      }

      // ⏱️ Enforce exactly 30 words
      let bio = parsed.bio ?? profile.bio;
      const words = bio.trim().split(/\s+/);
      if (words.length > 30) {
        bio = words.slice(0, 30).join(' ') + '.';
      }

      // ✅ Update state
      setProfile((prev) => ({
        ...prev,
        displayName: parsed.displayName ?? prev.displayName,
        username: parsed.username ?? prev.username,
        bio,
      }));

      // 🔁 Increase click count
      setClickCount((prev) => prev + 1);
      setGenerateCookie(templateId);
    } catch (err) {
      setLoading(false);
      console.error('❌ Error in generateProfile:', err);
    }
  };

  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    following: '1,234',
    followers: '5,678',
    isVerified: false,
    headerColor: 'blue',
    profileTheme: 'dark',
  });

  const updateProfile = (field: keyof ProfileInformation, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const updateAccountDetails = (
    field: keyof AccountDetails,
    value: string | boolean,
  ) => {
    setAccountDetails((prev) => ({ ...prev, [field]: value }));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

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
      console.error('❌ Failed to export PNG:', error);
    }
  };

  return (
    <section className="min-h-screen container">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Form */}
        <div className="p-6 overflow-y-auto">
          <div className="max-w-md mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  𝕏 Profile Builder
                </h1>
                <p className="mt-1">Create your Twitter/X profile</p>
              </div>

              {/* 🌗 Theme Toggle */}
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

            {/* Profile Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Information</CardTitle>
                <CardDescription>Your basic profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                          src={profile.avatar}
                          alt="avatar"
                          className="object-cover"
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

                <div>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={profile.displayName}
                    onChange={(e) =>
                      updateProfile('displayName', e.target.value)
                    }
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
                      className="pl-8"
                      value={profile.username}
                      onChange={(e) =>
                        updateProfile('username', e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => updateProfile('bio', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => updateProfile('location', e.target.value)}
                  />
                </div>

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

            {/* Account Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Details</CardTitle>
                <CardDescription>
                  Follower counts and header theme
                </CardDescription>
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
                    <Label htmlFor="following">Following</Label>
                    <Input
                      id="following"
                      value={accountDetails.following}
                      onChange={(e) =>
                        updateAccountDetails('following', e.target.value)
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

                <div className="flex items-center space-x-2">
                  <Switch
                    id="verified"
                    checked={accountDetails.isVerified}
                    onCheckedChange={(checked) =>
                      updateAccountDetails('isVerified', checked)
                    }
                  />
                  <Label htmlFor="verified">Verified Account</Label>
                </div>
              </CardContent>
            </Card>
          </div>
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

        {/* Right Side - Live Preview */}
        <div className="p-6 overflow-y-auto">
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Live Preview</h2>
              <p className="text-sm">See your profile in real-time</p>
            </div>

            <div
              ref={previewRef}
              className={`rounded-2xl overflow-hidden border transition-colors duration-300 ${
                accountDetails.profileTheme === 'dark'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-black'
              }`}
            >
              <div
                className={`h-32 ${getHeaderColor(accountDetails.headerColor)}`}
              />

              <div className="px-4 pb-4">
                <div className="flex justify-between items-start -mt-16 mb-4">
                  <Avatar className="w-32 h-32 border-4 border-white">
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

                  <div className="flex md:space-x-6 mt-20">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-gray-300 text-gray-800 dark:border-gray-600 dark:text-white"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-gray-300 text-gray-800 dark:border-gray-600 dark:text-white"
                    >
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-gray-300 text-gray-800 dark:border-gray-600 dark:text-white"
                    >
                      <Bell className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-full hover:bg-gray-300 bg-gray-100 text-black dark:bg-white/10 dark:text-white"
                    >
                      Follow
                    </Button>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center gap-1 mb-1">
                    <h1 className="font-semibold">{profile.displayName}</h1>
                    {accountDetails.isVerified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </div>

                {profile.bio && <p className="mb-3">{profile.bio}</p>}

                <div className="flex flex-wrap gap-4 mb-3 mt-2">
                  {profile.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{profile.location}</span>
                    </div>
                  )}
                  {profile.website && (
                    <div className="flex items-center gap-1">
                      <LinkIcon className="w-4 h-4" />
                      <span className="text-sm text-blue-500 hover:underline cursor-pointer">
                        {profile.website}
                      </span>
                    </div>
                  )}
                  {profile.joinDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Joined {profile.joinDate}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <span className="font-bold">
                      {accountDetails.following}
                    </span>
                    <span>Following</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold">
                      {accountDetails.followers}
                    </span>
                    <span>Followers</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleDownload}
                className="px-6 py-2 mt-10 hover:bg-gray-800"
                size="lg"
              >
                Export Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={limitPopup} onOpenChange={setLimitPopup}>
        <DialogContent className="sm:max-w-[400px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>⚠️ Limit Reached</DialogTitle>
            <DialogDescription>
              You have reached the <b>1 free generation limit</b> for this
              template.
              <br />
              Please try again after 24 hours.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setLimitPopup(false)}
              className="bg-[#0AFF9D] text-black hover:bg-[#08c97d]"
            >
              Okay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
