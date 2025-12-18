import { Link } from 'react-router-dom';

const newsItems = [
    { text: "MUN DAY2 02.11.2025", date: "02 Nov", isNew: true },
    { text: "MUN DAY 1 01.11.2025", date: "01 Nov", isNew: true },
    { text: "one-day capacity building program on stress management", date: "24 Oct", isNew: false },
    { text: "Inter-school Debate Competition Results", date: "15 Oct", isNew: false },
    { text: "Annual Sports Meet Registration Open", date: "10 Oct", isNew: false },
];

export function HomeInfoSection() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

                    {/* COLUMN 1: OUR INFRASTRUCTURE */}
                    <div className="bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-4 border-b-2 border-primary-600 pb-2">
                            <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide">
                                Our Infrastructure
                            </h2>
                            <div className="flex gap-1">
                                <span className="w-6 h-6 bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-primary-600 hover:text-white transition-colors">
                                    &lt;
                                </span>
                                <span className="w-6 h-6 bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-primary-600 hover:text-white transition-colors">
                                    &gt;
                                </span>
                            </div>
                        </div>

                        <div className="mb-4 overflow-hidden h-48">
                            <img
                                src="/assets/home/infrastructure.png"
                                alt="Computer Lab"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-primary-800 font-bold text-lg flex items-center gap-2">
                                CLASS ROOMS : <span className="text-gray-600 font-normal text-sm">Interactive Smart-Class</span>
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Interactive Smart-Class is a revolutionary, teaching-learning system that comes from India's largest and most respected education company, 'ExtraMarks Educational Private Ltd.'
                            </p>

                            <Link
                                to="/facilities"
                                className="inline-block bg-blue-900 text-white px-6 py-2 text-sm font-medium hover:bg-blue-800 transition-colors"
                            >
                                Read More
                            </Link>
                        </div>
                    </div>

                    {/* COLUMN 2: WELCOME */}
                    <div className="bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="mb-4 border-b-2 border-primary-600 pb-2">
                            <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide">
                                Welcome
                            </h2>
                        </div>

                        <div className="mb-4 overflow-hidden h-48">
                            <img
                                src="/assets/home/welcome.png"
                                alt="Students Welcome"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <div className="space-y-4">
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Indus Public School spreads over a vast lush green campus on National Highway-10, 30 minutes drive from Delhi Border. The school is affiliated to Central Board of Secondary Education, Delhi.
                            </p>

                            <Link
                                to="/about"
                                className="inline-block bg-blue-900 text-white px-6 py-2 text-sm font-medium hover:bg-blue-800 transition-colors mt-8"
                            >
                                Read More
                            </Link>
                        </div>
                    </div>

                    {/* COLUMN 3: NEWS & EVENTS */}
                    <div className="bg-white p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                        <div className="mb-4 border-b-2 border-primary-600 pb-2">
                            <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide">
                                News & Events
                            </h2>
                        </div>

                        <div className="flex-1 bg-gray-50/50 p-4 overflow-y-auto max-h-[300px] custom-scrollbar">
                            <ul className="space-y-3">
                                {newsItems.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 border-b border-gray-100 pb-2 last:border-0">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></span>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-700 font-medium">
                                                {item.text}
                                                {item.isNew && (
                                                    <span className="ml-2 text-[10px] bg-red-500 text-white px-1 py-0.5 rounded animate-pulse">
                                                        NEW
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
