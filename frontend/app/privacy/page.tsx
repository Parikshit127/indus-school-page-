"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/ui/section";

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            <Section className="pt-24 pb-16 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl font-serif font-bold text-royal mb-8 text-center">Privacy Policy</h1>
                    <div className="text-sm text-slate-500 mb-8 text-center">Last updated: December 10, 2025</div>

                    <div className="prose prose-slate max-w-none text-royal/80 leading-relaxed">
                        <p className="mb-6">
                            This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. Our Privacy Policy for School App is managed with the help of Privacy Policies.
                        </p>
                        <p className="mb-6">
                            We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.
                        </p>

                        <h2 className="text-2xl font-bold text-royal mt-8 mb-4">Types of Data Collected</h2>

                        <h3 className="text-xl font-bold text-royal mt-6 mb-3">Personal Data</h3>
                        <p className="mb-4">
                            While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to: Cookies and Usage Data.
                        </p>

                        <h3 className="text-xl font-bold text-royal mt-6 mb-3">Usage Device Id for Mobile App</h3>
                        <p className="mb-4">Our app collects device IDs for the following purposes:</p>
                        <ul className="list-disc list-inside mb-4 pl-4 space-y-2">
                            <li><strong>Analytics:</strong> To understand app usage and improve performance.</li>
                            <li><strong>App Functionality:</strong> To ensure core app functionalities.</li>
                            <li><strong>Security:</strong> For Security and Stopping Illegal Activities.</li>
                        </ul>
                        <p className="mb-4">
                            We may share this data with third-party partners for the purposes mentioned above. All data is encrypted in transit to ensure user privacy and security. Users can request the deletion of their data by contacting us at info@induspublicschool.com.
                        </p>

                        <h3 className="text-xl font-bold text-royal mt-6 mb-3">Usage of Location</h3>
                        <p className="mb-4">
                            We offer ERP solutions for schools that include real-time location tracking. By using background location services, we provide accurate updates on school bus locations, ensuring reliable tracking and enhancing the safety of students.
                        </p>

                        <h3 className="text-xl font-bold text-royal mt-6 mb-3">Usage Data</h3>
                        <p className="mb-4">
                            We may also collect information that your browser sends whenever you visit our Service or when you access the Service by or through a mobile device ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                        </p>

                        <h3 className="text-xl font-bold text-royal mt-6 mb-3">Tracking & Cookies Data</h3>
                        <p className="mb-4">
                            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
                        </p>
                        <ul className="list-disc list-inside mb-4 pl-4 space-y-2">
                            <li><strong>Session Cookies:</strong> We use Session Cookies to operate our Service.</li>
                            <li><strong>Preference Cookies:</strong> We use Preference Cookies to remember your preferences and various settings.</li>
                            <li><strong>Security Cookies:</strong> We use Security Cookies for security purposes.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-royal mt-8 mb-4">Use of Data</h2>
                        <ul className="list-disc list-inside mb-4 pl-4 space-y-2">
                            <li>To provide and maintain the Service.</li>
                            <li>To notify you about changes to our Service.</li>
                            <li>To allow you to participate in interactive features of our Service when you choose to do so.</li>
                            <li>To provide customer care and support.</li>
                            <li>To provide analysis or valuable information so that we can improve the Service.</li>
                            <li>To monitor the usage of the Service.</li>
                            <li>To detect, prevent and address technical issues.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-royal mt-8 mb-4">Transfer of Data</h2>
                        <p className="mb-4">
                            Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
                        </p>
                        <p className="mb-4">
                            If you are located outside India and choose to provide information to us, please note that we transfer the data, including Personal Data, to India and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
                        </p>

                        <h2 className="text-2xl font-bold text-royal mt-8 mb-4">Disclosure of Data</h2>
                        <h3 className="text-xl font-bold text-royal mt-6 mb-3">Legal Requirements</h3>
                        <p className="mb-4">Indus Public School may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
                        <ul className="list-disc list-inside mb-4 pl-4 space-y-2">
                            <li>To comply with a legal obligation</li>
                            <li>To protect and defend the rights or property of Indus Public School</li>
                            <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
                            <li>To protect the personal safety of users of the Service or the public</li>
                            <li>To protect against legal liability</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-royal mt-8 mb-4">Security of Data</h2>
                        <p className="mb-4">
                            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                        </p>

                        <h2 className="text-2xl font-bold text-royal mt-8 mb-4">Service Providers</h2>
                        <p className="mb-4">
                            We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analysing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                        </p>

                        <h2 className="text-2xl font-bold text-royal mt-8 mb-4">Links to Other Sites</h2>
                        <p className="mb-4">
                            Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
                        </p>

                        <h2 className="text-2xl font-bold text-royal mt-8 mb-4">Changes to This Privacy Policy</h2>
                        <p className="mb-4">
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.
                        </p>
                    </div>
                </div>
            </Section>

            <Footer />
        </main>
    );
}
