import { Section } from "@/components/ui/section";
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Section className="py-20">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-royal/10 rounded-full mb-4">
                            <Shield className="w-8 h-8 text-royal" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-royal mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-lg text-slate-600">Indus Public School</p>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12 space-y-8">
                        <div className="prose prose-slate max-w-none">
                            <p className="text-lg text-slate-700 leading-relaxed">
                                At Indus Public School, we are committed to protecting the privacy and personal information of our students, parents, guardians, staff, and website visitors. This Privacy Policy explains how we collect, use, and safeguard information when you interact with our website and services.
                            </p>

                            <div className="space-y-8 mt-8">
                                {/* Section 1 */}
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-royal mb-4 flex items-center gap-2">
                                        <span className="text-gold">1.</span> Information We Collect
                                    </h2>
                                    <p className="text-slate-700 mb-3">
                                        We may collect the following information through our website, admission forms, or communication channels:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                                        <li>Student name, age, class, and academic details</li>
                                        <li>Parent/guardian name, phone number, and email address</li>
                                        <li>Admission and enquiry details</li>
                                        <li>Communication records</li>
                                        <li>Website usage data (such as pages visited and form submissions)</li>
                                    </ul>
                                </div>

                                {/* Section 2 */}
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-royal mb-4 flex items-center gap-2">
                                        <span className="text-gold">2.</span> How We Use Your Information
                                    </h2>
                                    <p className="text-slate-700 mb-3">
                                        The information collected is used for the following purposes:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                                        <li>Processing admissions and enquiries</li>
                                        <li>Communicating with parents/guardians regarding academics, events, or notices</li>
                                        <li>Managing school records and administration</li>
                                        <li>Improving our website, services, and user experience</li>
                                        <li>Ensuring safety, security, and compliance with school policies</li>
                                    </ul>
                                </div>

                                {/* Section 3 */}
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-royal mb-4 flex items-center gap-2">
                                        <span className="text-gold">3.</span> Data Protection
                                    </h2>
                                    <p className="text-slate-700">
                                        Indus Public School takes appropriate technical and organizational measures to protect personal information from unauthorized access, loss, misuse, or disclosure.
                                    </p>
                                </div>

                                {/* Section 4 */}
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-royal mb-4 flex items-center gap-2">
                                        <span className="text-gold">4.</span> Payment & Fee Security
                                    </h2>
                                    <p className="text-slate-700">
                                        If applicable, all school fees or payments are processed through secure third-party payment gateways. We do not store credit/debit card or banking details on our servers.
                                    </p>
                                </div>

                                {/* Section 5 */}
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-royal mb-4 flex items-center gap-2">
                                        <span className="text-gold">5.</span> Third-Party Services
                                    </h2>
                                    <p className="text-slate-700">
                                        We may use trusted third-party services such as website hosting, analytics tools, communication platforms, or payment gateways to support our operations. These services are required to maintain confidentiality and data security.
                                    </p>
                                </div>

                                {/* Section 6 */}
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-royal mb-4 flex items-center gap-2">
                                        <span className="text-gold">6.</span> Children's Privacy
                                    </h2>
                                    <p className="text-slate-700">
                                        Protecting children's privacy is especially important to us. Student information is collected only for educational and administrative purposes and is handled with strict confidentiality.
                                    </p>
                                </div>

                                {/* Section 7 */}
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-royal mb-4 flex items-center gap-2">
                                        <span className="text-gold">7.</span> Policy Updates
                                    </h2>
                                    <p className="text-slate-700">
                                        Indus Public School may update this Privacy Policy from time to time. Any changes will be effective immediately upon posting on our website.
                                    </p>
                                </div>

                                {/* Section 8 */}
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-royal mb-4 flex items-center gap-2">
                                        <span className="text-gold">8.</span> Contact Information
                                    </h2>
                                    <p className="text-slate-700 mb-3">
                                        For any questions or concerns regarding this Privacy Policy, please contact us:
                                    </p>
                                    <div className="bg-royal/5 border border-royal/10 rounded-lg p-4 space-y-2">
                                        <p className="text-slate-700">
                                            <strong className="text-royal">Email:</strong>{" "}
                                            <a href="mailto:info@ipsrohtak.edu.in" className="text-gold hover:underline">
                                                info@ipsrohtak.edu.in
                                            </a>
                                        </p>
                                        <p className="text-slate-700">
                                            <strong className="text-royal">Phone:</strong>{" "}
                                            <a href="tel:+919992900574" className="text-gold hover:underline">
                                                +91-9992900574
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Last Updated */}
                            <div className="mt-12 pt-8 border-t border-slate-200">
                                <p className="text-sm text-slate-500 text-center">
                                    Last Updated: December 2025
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
