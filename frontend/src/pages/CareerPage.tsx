import { PageHero } from "@/components/ui/PageHero";
import { Briefcase, TrendingUp, Users, Award } from "lucide-react";

export default function CareerPage() {
    return (
        <div className="bg-white min-h-screen">
            <PageHero
                title="Career Opportunities"
                subtitle="Join the Indus Public School family and shape the future of education"
                image="/assets/home/infrastructure.png"
            />

            <div className="container mx-auto px-4 py-16">
                {/* Introduction */}
                <div className="max-w-4xl mx-auto mb-16">
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="text-xl leading-relaxed mb-6">
                            Let your career expand its wings beyond boundaries. Discover a lively, interesting, ever growing Career for Life with Indus Public School. Working with a global school is something, but, working with a school that's forming a whole new education era is pure glee.
                        </p>
                        <p className="text-lg leading-relaxed mb-6">
                            We will help you explore your capability, potential, incessant growth, and the ecstasy of working with the finest minds to shape the young talent of India. What makes Indus Group of Institutions an exhilarating work place is the inspiring blend of growth prospects, unremitting innovation, evenhanded play and a distinguished work culture.
                        </p>
                        <p className="text-lg leading-relaxed mb-6">
                            If you are a free spirit with striking energy and possess a sense of social responsibility and commitment to human values you are most welcome to work with us.
                        </p>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-royal mb-12 text-center">Why Work With Us</h2>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {/* Benefits Card */}
                        <div className="bg-gradient-to-br from-royal/5 to-gold/5 p-8 rounded-xl border-l-4 border-royal hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-royal rounded-lg flex items-center justify-center">
                                    <Award className="text-white" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-royal">Benefits</h3>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                We believe in rewarding our employees beyond salaries for their overall development. We make sure that no extraneous factors effect or affect your position and you always get what you deserve the best.
                            </p>
                        </div>

                        {/* Employee Training Card */}
                        <div className="bg-gradient-to-br from-royal/5 to-gold/5 p-8 rounded-xl border-l-4 border-gold hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
                                    <TrendingUp className="text-royal" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-royal">Employee Training Programme</h3>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                We ensure that our teachers undergo the most updated and progressive training curriculum to match the global standards of education.
                            </p>
                        </div>

                        {/* Employee Engagement Card */}
                        <div className="bg-gradient-to-br from-royal/5 to-gold/5 p-8 rounded-xl border-l-4 border-royal hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-royal rounded-lg flex items-center justify-center">
                                    <Users className="text-white" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-royal">Employee Engagement</h3>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                As an expanding unit, we never ignore the importance of keeping our employees encouraged, expectant and engaged with us. We recognize and value the inherent talent of our employees. So, we timely conduct competitive but fun annual events to provide them a platform to showcase their skills.
                            </p>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-royal text-white p-12 rounded-xl text-center">
                        <Briefcase className="mx-auto mb-4" size={48} />
                        <h3 className="text-2xl font-bold mb-4">Ready to Join Our Team?</h3>
                        <p className="text-lg mb-6 max-w-2xl mx-auto">
                            Send your resume and cover letter to our HR department
                        </p>
                        <a
                            href="mailto:ipsrtk@gmail.com"
                            className="inline-block bg-gold text-royal px-8 py-3 rounded-lg font-bold hover:bg-gold/90 transition-colors"
                        >
                            Email: ipsrtk@gmail.com
                        </a>
                        <div className="mt-4 text-gold">
                            <p>Contact: 9992900573, 9992900574</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
