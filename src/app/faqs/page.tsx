import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FaqPage from "../components/faqs";
import SupportForm from "../support/page";

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
                            FAQs
                        </TabsTrigger>
                        <TabsTrigger value="support">Contact Support</TabsTrigger>
                    </TabsList>

                    <TabsContent value="faqs">
                        <FaqPage />
                    </TabsContent>

                    <TabsContent value="support">
                        <SupportForm />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
