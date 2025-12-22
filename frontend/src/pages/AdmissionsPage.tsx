import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PageHero } from "@/components/ui/PageHero";
import { FileText, BookOpen, UserX, FileCheck, FileSpreadsheet, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LeadForm } from "@/components/LeadForm";

// Admissions sections data
const admissionSections = [
    {
        id: "admission-procedure",
        title: "Admission Procedure",
        icon: FileText,
        content: (
            <div className="space-y-6">
                <div className="prose prose-lg max-w-none text-gray-600">
                    <p className="mb-4 leading-relaxed">
                        Forms for registration and admission to the respective classes are available from school office on all working days from 8:00 am to 3:00 pm.
                    </p>
                    <p className="mb-4 leading-relaxed">
                        For admission to Nursery the child should be 3+ years of the Academic session.
                    </p>
                    <p className="mb-4 leading-relaxed">
                        Application forms should be accompanied by a birth certificate issued by appropriate Municipal authority.
                    </p>
                    <p className="mb-4 leading-relaxed">
                        For admission to a class higher than Nursery a T.C. from last school attended would be required on qualifying the entrance test and on basis of child's as well as parents interaction, report card of the previous class.
                    </p>
                    <p className="mb-4 leading-relaxed">
                        The decision of the school authorities will be final and binding.
                    </p>
                </div>

                <div className="bg-royal/5 p-6 rounded-lg border-l-4 border-royal">
                    <h3 className="text-xl font-bold text-royal mb-4">Age Criteria</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-gold font-bold">(a)</span>
                            <span>2+ in Pre-Nursery</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-gold font-bold">(b)</span>
                            <span>3+ in Nursery</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-gold font-bold">(c)</span>
                            <span>4+ in Preparatory</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-gold font-bold">(d)</span>
                            <span>5+ in class I and so on</span>
                        </li>
                    </ul>
                </div>

                <div className="prose prose-lg max-w-none text-gray-600">
                    <p className="mb-4 leading-relaxed">
                        Names of those seeking admission to the school are only registered on the completion/submission of the registration form.
                    </p>
                    <p className="mb-4 leading-relaxed">
                        Pupils, who have attended any school earlier, cannot be admitted until a Transfer Certificate is produced.
                    </p>
                    <p className="mb-4 leading-relaxed">
                        Based on the admission tests and other criteria, the school reserves the right to admit students who are found to be fit for admission. In all matters related to admission, the management's decision is final.
                    </p>
                </div>
            </div>
        ),
    },
    {
        id: "rules-regulations",
        title: "Rules & Regulations",
        icon: BookOpen,
        content: (
            <div className="space-y-6">
                <div className="bg-royal/5 p-6 rounded-lg border-l-4 border-royal">
                    <h3 className="text-xl font-bold text-royal mb-4">Absence</h3>
                    <div className="prose prose-lg max-w-none text-gray-600">
                        <p className="mb-4 leading-relaxed">
                            80% attendance is compulsory for all students to appear in the final examination held at the end of the academic year.
                        </p>
                        <p className="mb-4 leading-relaxed">
                            No leave is granted except on an application from parents or guardians, for plausible reasons only.
                        </p>
                        <p className="mb-4 leading-relaxed">
                            Repeated absence without leave or unexplained absence for more than six consecutive days renders the student liable to have his/her name struck off the rolls. Re-admission may be granted only on payment of fresh admission fee, at the discretion of the principal.
                        </p>
                        <p className="mb-4 leading-relaxed">
                            A student returning to school after suffering from an infectious or contagious disease should produce a doctor's certificate, permitting him/her to attend the school.
                        </p>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "withdrawals",
        title: "Withdrawals",
        icon: UserX,
        content: (
            <div className="space-y-6">
                <div className="prose prose-lg max-w-none text-gray-600">
                    <p className="mb-4 leading-relaxed">
                        One clear calendar month's fees in lieu of such notice must be given before a pupil can be withdrawn.
                    </p>
                    <p className="mb-4 leading-relaxed">
                        Transfer certificates are not issued until all dues of the school are settled.
                    </p>
                    <p className="mb-4 leading-relaxed">
                        The caution money, if not claimed in the same academic calendar, shall be treated as donation to the school for its development & any right to the refund of this amount stands relinquished.
                    </p>
                </div>

                <div className="bg-royal/5 p-6 rounded-lg border-l-4 border-royal">
                    <h3 className="text-xl font-bold text-royal mb-4">Students can be asked to leave the school on the following grounds:</h3>
                    <ul className="space-y-2 text-gray-700 list-disc list-inside">
                        <li>Disciplinary</li>
                        <li>Unsatisfactory progress in work</li>
                        <li>Detention or repeated detentions in a class</li>
                        <li>A student who fails twice in the same class will not be permitted to continue his/her studies in the school</li>
                    </ul>
                </div>

                <div className="prose prose-lg max-w-none text-gray-600">
                    <p className="mb-4 leading-relaxed">
                        When a withdrawal takes place due to the above reasons the question of charging a month's fee in lieu of notice does not arise.
                    </p>
                </div>
            </div>
        ),
    },
    {
        id: "online-registration",
        title: "Online Registration Form",
        icon: FileCheck,
        content: (
            <div className="max-w-2xl mx-auto">
                <LeadForm />
            </div>
        ),
    },
    {
        id: "tc",
        title: "TC",
        icon: FileSpreadsheet,
        content: (
            <div className="space-y-6">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-royal text-white">
                                <th className="px-6 py-4 text-left font-semibold">S.No.</th>
                                <th className="px-6 py-4 text-left font-semibold">TC</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                "Avi mis tc",
                                "Ajay mis tc",
                                "Anamika mis tc",
                                "Ananya mis tc",
                                "Armaan mis tc",
                                "Prashant mis tc",
                                "Rajat mis tc",
                                "Seerat mis tc",
                                "Suhani mis tc",
                                "Swati mis tc",
                                "Tanisha mis tc",
                                "Vedika mis tc",
                                "Vivek mis tc",
                                "Yuvraj mis tc"
                            ].map((tc, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{index + 1}.</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{tc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        ),
    }
];

export default function AdmissionsPage() {
    const [selectedId, setSelectedId] = useState(admissionSections[0].id);
    const location = useLocation();

    const selectedSection = admissionSections.find(s => s.id === selectedId) || admissionSections[0];

    // Allow deep-linking via hash e.g. /admissions#rules-regulations
    useEffect(() => {
        if (location.hash) {
            const hashId = location.hash.replace('#', '');
            const exists = admissionSections.some(s => s.id === hashId);
            if (exists) {
                setSelectedId(hashId);
            }
        }
    }, [location.hash]);

    return (
        <div className="bg-white min-h-screen">
            <PageHero
                title="Admissions"
                subtitle="Join the Indus Public School family. Empowering young minds for a brighter tomorrow."
                image="/assets/home/infrastructure.png"
            />

            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* SIDEBAR NAVIGATION */}
                    <div className="w-full md:w-1/4 shrink-0">
                        <div className="bg-gray-100 rounded-lg overflow-hidden sticky top-24">
                            {admissionSections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setSelectedId(section.id)}
                                    className={`w-full text-left px-6 py-4 border-b border-gray-200 last:border-0 transition-all flex items-center justify-between group
                                        ${selectedId === section.id
                                            ? 'bg-gray-200 text-royal font-bold border-l-4 border-l-royal'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-royal'
                                        }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <ChevronRight size={16} className={`transition-opacity ${selectedId === section.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
                                        {section.title}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* MAIN CONTENT AREA */}
                    <div className="flex-1 min-h-[500px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedId}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white"
                            >
                                <h2 className="text-3xl font-bold text-royal mb-6 border-b pb-4">
                                    {selectedSection.title}
                                </h2>

                                {selectedSection.content}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </div>
    );
}
