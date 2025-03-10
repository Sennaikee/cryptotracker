import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FaqPage from "../components/faqs";

export default function FAQs() {
  return (
    <div className="container mx-auto px-4">
        <h1 className="flex justify-center text-4xl p-8 font-bold mb-6">
          FAQs & Support
        </h1>
        
        <div className="max-w-5xl mx-auto mt-6 px-4">
        <Tabs defaultValue="faqs" className="max-w-5xl mx-auto mt-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-2 w-full gap-2">
            <TabsTrigger value="faqs">
              Requently Asked Questions
            </TabsTrigger>
            <TabsTrigger value="support">Contact Our Support Team</TabsTrigger>
          </TabsList>

          <TabsContent value="faqs">
            <FaqPage />
          </TabsContent>
          
          <TabsContent value="support">
            {/* <NFTCoins /> */}
          </TabsContent>
        </Tabs>
        </div>
      </div>
  );
}
