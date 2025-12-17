

export default function PrivacyPolicyPage() {


    return (
        <div className="min-h-screen bg-white pt-32 pb-16">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-black mb-2">
                    Privacy Policy
                </h1>
                <p className="text-lg text-black mb-8">Indus Public School</p>

                <div className="space-y-6 text-black">
                    <p className="leading-relaxed">
                        At Indus Public School, we are committed to protecting the privacy and personal information of our students, parents, guardians, staff, and website visitors. This Privacy Policy explains how we collect, use, and safeguard information when you interact with our website and services.
                    </p>

                    <div className="space-y-6">
                        {/* Section 1 */}
                        <div>
                            <h2 className="text-2xl font-bold text-black mb-3">
                                1. Information We Collect
                            </h2>
                            <p className="mb-3">
                                We may collect the following information through our website, admission forms, or communication channels:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Student name, age, class, and academic details</li>
                                <li>Parent/guardian name, phone number, and email address</li>
                                <li>Admission and enquiry details</li>
                                <li>Communication records</li>
                                <li>Website usage data (such as pages visited and form submissions)</li>
                            </ul>
                        </div>

                        {/* Section 2 */}
                        <div>
                            <h2 className="text-2xl font-bold text-black mb-3">
                                2. How We Use Your Information
                            </h2>
                            <p className="mb-3">
                                The information collected is used for the following purposes:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Processing admissions and enquiries</li>
                                <li>Communicating with parents/guardians regarding academics, events, or notices</li>
                                <li>Managing school records and administration</li>
                                <li>Improving our website, services, and user experience</li>
                                <li>Ensuring safety, security, and compliance with school policies</li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div>
                            <h2 className="text-2xl font-bold text-black mb-3">
                                3. Data Protection
                            </h2>
                            <p>
                                Indus Public School takes appropriate technical and organizational measures to protect personal information from unauthorized access, loss, misuse, or disclosure.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div>
                            <h2 className="text-2xl font-bold text-black mb-3">
                                4. Payment & Fee Security
                            </h2>
                            <p>
                                If applicable, all school fees or payments are processed through secure third-party payment gateways. We do not store credit/debit card or banking details on our servers.
                            </p>
                        </div>

                        {/* Section 5 */}
                        <div>
                            <h2 className="text-2xl font-bold text-black mb-3">
                                5. Third-Party Services
                            </h2>
                            <p>
                                We may use trusted third-party services such as website hosting, analytics tools, communication platforms, or payment gateways to support our operations. These services are required to maintain confidentiality and data security.
                            </p>
                        </div>

                        {/* Section 6 */}
                        <div>
                            <h2 className="text-2xl font-bold text-black mb-3">
                                6. Children's Privacy
                            </h2>
                            <p>
                                Protecting children's privacy is especially important to us. Student information is collected only for educational and administrative purposes and is handled with strict confidentiality.
                            </p>
                        </div>

                        {/* Section 7 */}
                        <div>
                            <h2 className="text-2xl font-bold text-black mb-3">
                                7. Policy Updates
                            </h2>
                            <p>
                                Indus Public School may update this Privacy Policy from time to time. Any changes will be effective immediately upon posting on our website.
                            </p>
                        </div>

                        {/* Section 8 */}
                        <div>
                            <h2 className="text-2xl font-bold text-black mb-3">
                                8. Contact Information
                            </h2>
                            <p className="mb-3">
                                For any questions or concerns regarding this Privacy Policy, please contact us:
                            </p>
                            <div className="space-y-1 ml-4">
                                <p>
                                    <strong>Email:</strong>{" "}
                                    <a href="mailto:info@ipsrohtak.edu.in" className="underline">
                                        info@ipsrohtak.edu.in
                                    </a>
                                </p>
                                <p>
                                    <strong>Phone:</strong>{" "}
                                    <a href="tel:+919992900574" className="underline">
                                        +91-9992900574
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Last Updated */}
                    <div className="mt-12 pt-6 border-t border-gray-300">
                        <p className="text-sm text-gray-600">
                            Last Updated: December 2025
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
