import { PageHero } from "@/components/ui/PageHero";
import { FileText, GraduationCap, Building, Users } from "lucide-react";

export default function MandatoryDisclosurePage() {
    return (
        <div className="bg-white min-h-screen">
            <PageHero
                title="Mandatory Disclosure 2024-2025"
                subtitle="Complete information as per CBSE guidelines"
                image="/assets/home/infrastructure.png"
            />

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-6xl mx-auto space-y-12">

                    {/* General Information */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <FileText className="text-royal" size={32} />
                            <h2 className="text-3xl font-bold text-royal">General Information</h2>
                        </div>
                        <div className="overflow-x-auto shadow-lg rounded-lg">
                            <table className="w-full border-collapse bg-white">
                                <thead>
                                    <tr className="bg-royal text-white">
                                        <th className="px-6 py-4 text-left font-semibold border-r border-white/20">SL NO.</th>
                                        <th className="px-6 py-4 text-left font-semibold border-r border-white/20">INFORMATION</th>
                                        <th className="px-6 py-4 text-left font-semibold">DETAILS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { sl: "1.", info: "NAME OF THE SCHOOL", detail: "INDUS PUBLIC SCHOOL" },
                                        { sl: "2.", info: "AFFILIATION NO.", detail: "530439" },
                                        { sl: "3.", info: "SCHOOL CODE", detail: "40425" },
                                        { sl: "4.", info: "COMPLETE ADDRESS WITH PIN CODE", detail: "DELHI ROAD, ROHTAK" },
                                        { sl: "5.", info: "PRINCIPAL NAME & QUALIFICATION", detail: "Mr. DEEPAK KUMAR\nPh.D" },
                                        { sl: "6.", info: "SCHOOL EMAIL ID", detail: "ipsrtk@gmail.com" },
                                        { sl: "7.", info: "CONTACT DETAILS (LANDLINE/MOBILE)", detail: "9992900573, 9992900574" }
                                    ].map((row, index) => (
                                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                            <td className="px-6 py-4 border-b border-gray-200 text-gray-700 font-medium">{row.sl}</td>
                                            <td className="px-6 py-4 border-b border-gray-200 text-gray-700 font-medium">{row.info}</td>
                                            <td className="px-6 py-4 border-b border-gray-200 text-gray-700 whitespace-pre-line">{row.detail}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Documents & Information */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <FileText className="text-royal" size={32} />
                            <h2 className="text-3xl font-bold text-royal">Documents & Information</h2>
                        </div>
                        <div className="overflow-x-auto shadow-lg rounded-lg">
                            <table className="w-full border-collapse bg-white">
                                <thead>
                                    <tr className="bg-royal text-white">
                                        <th className="px-6 py-4 text-left font-semibold border-r border-white/20">SL NO.</th>
                                        <th className="px-6 py-4 text-left font-semibold border-r border-white/20">NAME</th>
                                        <th className="px-6 py-4 text-left font-semibold">VIEW</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        "COPIES OF AFFILIATION/ UPGRATION LETTER AND RECENT EXTENSION OF AFFILIATION, IF ANY",
                                        "COPIES OF SOCIETIES /TRUST/COMPANY REGISTRATION/ RENEWAL CERTIFICATE AS APPLICABLE",
                                        "COPY OF NO OBJECTION CERTIFICATE(NOC) ISSUED, IF APPLICABLE BY THE STATE GOVT/ UT",
                                        "COPIES OF RECOGNITION CERTIFICATE UNDER RTE ACT,2009",
                                        "COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER THE NATIONAL BUILDING CODE",
                                        "COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY THE COMPETENT AUTORITY",
                                        "COPY OF THE DEO CERTIFICATE SUBMITTED BY THE SCHOOL FOR AFFILIATION/UPGRADATION/EXTENSION OF AFFILIATION OR SELF CERTIFICATION BY SCHOOL",
                                        "COPIES OF VALID WATER, HEALTH AND SANITATION CERTIFICATE",
                                        "PUBLIC MANDATORY DISCLOSURE"
                                    ].map((name, index) => (
                                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                            <td className="px-6 py-4 border-b border-gray-200 text-gray-700 font-medium">{index + 1}</td>
                                            <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{name}</td>
                                            <td className="px-6 py-4 border-b border-gray-200">
                                                <button className="text-royal hover:text-gold font-semibold underline">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Result and Academics */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <GraduationCap className="text-royal" size={32} />
                            <h2 className="text-3xl font-bold text-royal">Result and Academics</h2>
                        </div>
                        <div className="overflow-x-auto shadow-lg rounded-lg mb-8">
                            <table className="w-full border-collapse bg-white">
                                <thead>
                                    <tr className="bg-royal text-white">
                                        <th className="px-6 py-4 text-left font-semibold border-r border-white/20">SL NO.</th>
                                        <th className="px-6 py-4 text-left font-semibold border-r border-white/20">NAME</th>
                                        <th className="px-6 py-4 text-left font-semibold">VIEW</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        "FEE STRUCTURE OF THE SCHOOL",
                                        "ANNUAL ACADEMIC CALANDER",
                                        "LIST OF SCHOOL MANAGEMENT COMMITTEE (SMC)",
                                        "LIST OF PARENTS TEACHERS ASSOCIATION (PTA) MEMBERS",
                                        "LAST THREE-YEAR RESULT OF THE BOARD EXAMINATION AS PER APPLICABILITY"
                                    ].map((name, index) => (
                                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                            <td className="px-6 py-4 border-b border-gray-200 text-gray-700 font-medium">{index + 1}</td>
                                            <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{name}</td>
                                            <td className="px-6 py-4 border-b border-gray-200">
                                                <button className="text-royal hover:text-gold font-semibold underline">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Result Class X */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-royal mb-4">RESULT CLASS: X</h3>
                            <div className="overflow-x-auto shadow-lg rounded-lg">
                                <table className="w-full border-collapse bg-white">
                                    <thead>
                                        <tr className="bg-royal text-white">
                                            <th className="px-6 py-4 text-left font-semibold">SL NO.</th>
                                            <th className="px-6 py-4 text-left font-semibold">YEAR</th>
                                            <th className="px-6 py-4 text-left font-semibold">NO. OF REGISTERED STUDENTS</th>
                                            <th className="px-6 py-4 text-left font-semibold">NO. OF STUDENTS PASSED</th>
                                            <th className="px-6 py-4 text-left font-semibold">PASS PERCENTAGE</th>
                                            <th className="px-6 py-4 text-left font-semibold">REMARKS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { sl: "1", year: "2023-24", registered: "57", passed: "54", percentage: "94.74%", remarks: "" },
                                            { sl: "2", year: "2022-23", registered: "53", passed: "52", percentage: "98.11%", remarks: "" },
                                            { sl: "3", year: "2021-22", registered: "83", passed: "83", percentage: "100%", remarks: "" }
                                        ].map((row, index) => (
                                            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{row.sl}</td>
                                                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{row.year}</td>
                                                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{row.registered}</td>
                                                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{row.passed}</td>
                                                <td className="px-6 py-4 border-b border-gray-200 text-gray-700 font-semibold text-green-600">{row.percentage}</td>
                                                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{row.remarks}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Result Class XII */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-royal mb-4">RESULT CLASS: XII</h3>
                            <div className="overflow-x-auto shadow-lg rounded-lg">
                                <table className="w-full border-collapse bg-white">
                                    <thead>
                                        <tr className="bg-royal text-white">
                                            <th className="px-6 py-4 text-left font-semibold">SL NO.</th>
                                            <th className="px-6 py-4 text-left font-semibold">YEAR</th>
                                            <th className="px-6 py-4 text-left font-semibold">NO. OF REGISTERED STUDENTS</th>
                                            <th className="px-6 py-4 text-left font-semibold">NO. OF STUDENTS PASSED</th>
                                            <th className="px-6 py-4 text-left font-semibold">PASS PERCENTAGE</th>
                                            <th className="px-6 py-4 text-left font-semibold">REMARKS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { sl: "1", year: "2023-24", registered: "63", passed: "62", percentage: "98.41%", remarks: "" },
                                            { sl: "2", year: "2022-23", registered: "62", passed: "56", percentage: "90.32%", remarks: "" },
                                            { sl: "3", year: "2021-22", registered: "79", passed: "76", percentage: "96.2%", remarks: "" }
                                        ].map((row, index) => (
                                            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{row.sl}</td>
                                                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{row.year}</td>
                                                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{row.registered}</td>
                                                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{row.passed}</td>
                                                <td className="px-6 py-4 border-b border-gray-200 text-gray-700 font-semibold text-green-600">{row.percentage}</td>
                                                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{row.remarks}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    {/* Teaching Staff */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Users className="text-royal" size={32} />
                            <h2 className="text-3xl font-bold text-royal">Teaching Staff</h2>
                        </div>
                        <div className="overflow-x-auto shadow-lg rounded-lg">
                            <table className="w-full border-collapse bg-white">
                                <thead>
                                    <tr className="bg-royal text-white">
                                        <th className="px-6 py-4 text-left font-semibold border-r border-white/20">SL NO.</th>
                                        <th className="px-6 py-4 text-left font-semibold border-r border-white/20">INFORMATION</th>
                                        <th className="px-6 py-4 text-left font-semibold">DETAILS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-gray-50">
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700 font-medium">1</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">PRINCIPAL</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">01</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700 font-medium" rowSpan={4}>2</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700 font-semibold">TOTAL NO. OF TEACHERS</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700 font-semibold">44</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700 pl-12">PGT</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">16</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700 pl-12">TGT</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">12</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700 pl-12">PRT</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">10</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700 font-medium">3</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">TEACHERS SECTION RATIO</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">1:1.5</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700 font-medium">4</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">DETAILS OF SPECIAL EDUCATOR</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">YES 1</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700 font-medium">5</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">DETAILS OF COUNSELLOR AND WELLNESS TEACHER</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">YES 1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* School Infrastructure */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Building className="text-royal" size={32} />
                            <h2 className="text-3xl font-bold text-royal">School Infrastructure</h2>
                        </div>
                        <div className="overflow-x-auto shadow-lg rounded-lg">
                            <table className="w-full border-collapse bg-white">
                                <thead>
                                    <tr className="bg-royal text-white">
                                        <th className="px-6 py-4 text-left font-semibold border-r border-white/20">SL NO.</th>
                                        <th className="px-6 py-4 text-left font-semibold border-r border-white/20">INFORMATION</th>
                                        <th className="px-6 py-4 text-left font-semibold">DETAILS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-gray-50">
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700 font-medium">1</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">TOTAL CAMPUS AREA OF THE SCHOOL (IN SQUARE MTR)</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">13597.43 SQUARE MTR</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700 font-medium">2</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">NO. AND SIZE OF THE CLASS ROOMS (IN SQ MTR)</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">60@ 27 LENGTH 18.9 BREADTH</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700 font-medium">3</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">NO. AND SIZE OF LABORATORIES INCLUDING COMPUTER LABS (IN SQ MTR)</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700 whitespace-pre-line">
                                            COMPOSITE SCIENCE LAB 48/20.5 FT.{'\n'}
                                            PHYSICS LAB - 48/41 FT.{'\n'}
                                            CHEMISTRY LAB - 60/32.9 FT.{'\n'}
                                            BIOLOGY LAB 47/32.9 FT{'\n'}
                                            MATH LAB - 27/19 FT{'\n'}
                                            COMPUTER LAB – 26/20 FT{'\n'}
                                            LIBRARY - 46.9/35.4 FT{'\n'}
                                            DANCE ROOM 48/21 FT{'\n'}
                                            MUSIC ROOM - 48/20 FT{'\n'}
                                            ART LAB – 39.3/18.5 FT{'\n'}
                                            LANGUAGE LAB - 48/20.5 FT.{'\n'}
                                            MULTI PURPOSE CONFERENCE HALL - 37.9/20{'\n'}
                                            SPORTS ROOM - 27/19 FT{'\n'}
                                            AUDITORIUM - 55/41 FT{'\n'}
                                            ADMINISTRATION/OFFICE/STAFF - 57.9/39 FT{'\n'}
                                            ATL LAB - 60/32.9 FT
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700 font-medium">4</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">INTERNET FACILITY</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">YES</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700 font-medium">5</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">NO. OF GIRLS TOILETS</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">28</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700 font-medium">6</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">NO. OF BOYS TOILETS</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">28</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700 font-medium">7</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-gray-700">LINK OF YOUTUBE VIDEO OF THE INSPECTION OF SCHOOL COVERING THE INFRASTRUCTURE OF THE SCHOOL</td>
                                        <td className="px-6 py-4 border-b border-gray-200">
                                            <a href="#" className="text-royal hover:text-gold font-semibold underline">Click here</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
