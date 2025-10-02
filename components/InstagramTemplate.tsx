'use client';

import type React from 'react';

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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import type { AccountDetails, ProfileInformation } from '@/Types/types';
import * as htmlToImage from 'html-to-image';
import {
  ImageIcon,
  LinkIcon,
  Moon,
  MoreHorizontal,
  Sun,
  UserPlus,
} from 'lucide-react';
import { useRef, useState } from 'react';

export default function InstagramTemplate() {
  const [profile, setProfile] = useState<ProfileInformation>({
    displayName: 'John Doe',
    username: 'johndoe',
    avatar: '/placeholder.svg?height=150&width=150',
    bio: 'Digital Creator 📸\nLiving life one photo at a time ✨\n📍 San Francisco, CA',
    location: 'San Francisco, CA',
    website: 'johndoe.com',
    joinDate: 'March 2019',
  });

  const [loading, setLoading] = useState(false);
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
    const templateId = 'template2';

    if (checkGenerateCookie(templateId)) {
      alert(
        'You have reached the 1 free generation limit for this template. Try again after 24h.',
      );
      return;
    }

    const prompt = `Rewrite and improve the following Instagram bio using exactly 30 words. Keep it creative and engaging with emojis. Return ONLY valid JSON with keys: displayName, username, bio.
    
    Current bio: "${profile.bio}"`;

    setLoading(true);
    try {
      const aiText = await generateProfile(prompt);
      setLoading(false);

      if (!aiText) {
        return;
      }

      // Clean AI response
      const cleanedText = aiText
        .trim()
        .replace(/^```json/, '')
        .replace(/^```/, '')
        .replace(/```$/, '')
        .trim();

      // Try to extract JSON using regex if it's not clean
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

      // Enforce exactly 30 words
      let bio = parsed.bio ?? profile.bio;
      const words = bio.trim().split(/\s+/);
      if (words.length > 30) {
        bio = words.slice(0, 30).join(' ') + '.';
      }

      // Update state
      setProfile((prev) => ({
        ...prev,
        displayName: parsed.displayName ?? prev.displayName,
        username: parsed.username ?? prev.username,
        bio,
      }));

      // Increase click count
      setClickCount((prev) => prev + 1);
      setGenerateCookie(templateId)
    } catch (err) {
      setLoading(false);
      console.error('❌ Error in generateProfile:', err);
    }
  };

  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    following: '1,234',
    followers: '5.6K',
    posts: '342',
    isVerified: false,
    headerColor: 'pink',
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
      link.download = `${profile.username}-instagram-profile.png`;
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
        <div className="p-6 overflow-y-auto ">
          <div className="max-w-md mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  Instagram Profile Builder
                </h1>
                <p className="mt-1 text-gray-600">
                  Create your Instagram profile
                </p>
              </div>
              {/* Theme Toggle */}
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
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border-2 border-gray-200">
                      {profile.avatar && (
                        <AvatarImage
                          src={profile.avatar || '/placeholder.svg'}
                          alt="avatar"
                          className="object-cover"
                        />
                      )}
                      <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-xl font-bold">
                        {profile.displayName
                          .split(' ')
                          .map((w) => w[0])
                          .join('')
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={HandleImageChange}
                    />
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
                    placeholder="Tell your story with emojis..."
                    rows={3}
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

            {/* Account Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Stats</CardTitle>
                <CardDescription>
                  Posts, followers, and following counts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="posts">Posts</Label>
                    <Input
                      id="posts"
                      value={accountDetails.posts}
                      onChange={(e) =>
                        updateAccountDetails('posts', e.target.value)
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

            <div className="flex items-center justify-center">
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
        </div>

        {/* Right Side - Live Preview */}
        <div className="p-6 overflow-y-auto ">
          <div className="max-w-sm mx-auto">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Live Preview</h2>
              <p className="text-sm text-gray-600">
                See your profile in real-time
              </p>
            </div>

            <div
              ref={previewRef}
              className={`rounded-2xl overflow-hidden border transition-colors duration-300 ${
                accountDetails.profileTheme === 'dark'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-black'
              }`}
            >
              {/* Profile Header */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20 border-2 border-gray-200">
                      <AvatarImage
                        src={profile.avatar || '/placeholder.svg'}
                        alt={profile.displayName}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-lg font-bold">
                        {profile.displayName
                          .split(' ')
                          .map((w) => w[0])
                          .join('')
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="font-semibold text-lg">
                          @{profile.username}
                        </span>
                        <Button
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md text-sm"
                        >
                          Follow
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex gap-6 text-sm">
                        <div className="text-center">
                          <div className="font-semibold">
                            {accountDetails.posts}
                          </div>
                          <div className="text-gray-600">posts</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">
                            {accountDetails.followers}
                          </div>
                          <div className="text-gray-600">followers</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">
                            {accountDetails.following}
                          </div>
                          <div className="text-gray-600">following</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-1 mb-1">
                    <h1 className="font-semibold">{profile.displayName}</h1>
                    {accountDetails.isVerified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>

                  {profile.bio && (
                    <div className="text-sm whitespace-pre-line mb-2">
                      {profile.bio}
                    </div>
                  )}

                  {profile.website && (
                    <div className="flex items-center gap-1 text-sm text-blue-600">
                      <LinkIcon className="w-3 h-3" />
                      <span className="hover:underline cursor-pointer">
                        {profile.website}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-sm bg-transparent"
                  >
                    Message
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-sm bg-transparent"
                  >
                    Email
                  </Button>
                  <Button variant="outline" size="sm">
                    <UserPlus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button onClick={handleDownload} className="px-6 py-2 " size="lg">
                📸 Export Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
