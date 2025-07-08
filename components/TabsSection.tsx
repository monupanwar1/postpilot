import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import XTemplate from './XTemplate';

export default function TabsSection() {
  return (
    <section className="container pb-16 px-4 min-h-screen " id="platform-tabs">
      <div className=" mx-auto max-w-8xl">
        <Tabs defaultValue="linkedin" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-4xl grid-cols-5 h-12 p-1 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger
                value="linkedin"
                className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs"
              >
                <div className="h-3 w-3 bg-blue-600 rounded" />
                LinkedIn
              </TabsTrigger>
              <TabsTrigger
                value="x"
                className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs"
              >
                <div className="h-3 w-3 bg-neutral-900 rounded" />
                X
              </TabsTrigger>
              
              <TabsTrigger
                value="instagram"
                className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs"
              >
                <div className="h-3 w-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded" />
                Instagram
              </TabsTrigger>
              <TabsTrigger
                value="facebook"
                className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs"
              >
                <div className="h-3 w-3 bg-blue-600 rounded" />
                Facebook
              </TabsTrigger>
              <TabsTrigger
                value="tiktok"
                className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs"
              >
                <div className="h-3 w-3 bg-black rounded" />
                TikTok
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="linkedin">
            <h1>LinkedIn</h1>
          </TabsContent>
          <TabsContent value="x">
          <XTemplate/>
          </TabsContent>
          <TabsContent value="instagram">
            <h1>Instagram</h1>
          </TabsContent>
          <TabsContent value="facebook">
            <h1>Facebook</h1>
          </TabsContent>
          <TabsContent value="tiktok">
            <h1>TikTok</h1>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
