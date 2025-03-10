'use client';
import React, { useState } from "react";
import Image from "next/image";

const FaqPage = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const data = [
        {
            question: "What is Zoid?",
            answer: (
                <p>
                    Zoid is a digital platform designed to enhance lifestyle experiences
                    by providing secure visitor access control, seamless bill payments,
                    data top-ups, and more. It brings together a secure and hassle-free
                    way of living within the Zoidverse.
                </p>
            ),
        },
        {
            question: "How does Zoid's visitor access control work?",
            answer: (
                <p>
                    Zoid`&apos;`s visitor access control feature allows residents to manage and
                    monitor visitor entry, adding an extra layer of security to their
                    homes. You can grant or deny access, ensuring only authorized visitors
                    can enter.
                </p>
            ),
        },
        {
            question: "What features are included in the Zoidverse?",
            answer: (
                <p>
                    The Zoidverse includes bill payment options, data and airtime top-ups,
                    shopping through Zoidinc, home listings via Zest, and a range of
                    lifestyle management features, all accessible from a single platform.
                </p>
            ),
        },
        {
            question: " Can I pay my utility bills through Zoid?",
            answer: (
                <p>
                    Yes, Zoid offers a convenient bill payment feature that lets you pay
                    utilities, internet, and other services directly through the app.
                </p>
            ),
        },
        {
            question: "What is Zoidinc?",
            answer: (
                <p>
                    Zoidinc is the shopping feature within Zoid, where you can explore and
                    purchase various products, making it easy to manage your household
                    shopping needs from one place.
                </p>
            ),
        },
        {
            question: "What is Zest, and how does it work?",
            answer: (
                <p>
                    Zest is Zoid`&apos;`s real estate feature that allows users to find homes or
                    list properties for sale or lease. You can browse listings or put up
                    your property within the Zoidverse for others to view.
                </p>
            ),
        },
        {
            question: "Is there a referral program for Zoid?",
            answer: (
                <p>
                    Yes, Zoid offers a `&apos;`Refer and Earn`&apos;` program. When you refer friends to
                    sign up on Zoid, you earn rewards as they join and start using the
                    platform.
                </p>
            ),
        },
        {
            question: "How do I top up my mobile data or airtime on Zoid?",
            answer: (
                <p>
                    Simply go to the top-up section in the app, select your preferred
                    amount, and follow the prompts to instantly top up your data or
                    airtime.
                </p>
            ),
        },
        {
            question: "Is Zoid available for corporate use?",
            answer: (
                <p>
                    Yes, Zoid can be adapted for corporate environments, providing access
                    control, emergency support, and more to help manage large estates and
                    office complexes.
                </p>
            ),
        },
        {
            question: "How does Zoid enhance my security?",
            answer: (
                <p>
                    Zoid`&apos;`s security management system includes visitor control, real-time
                    emergency support, and features like 360 URID to offer comprehensive
                    protection for you and your family.
                </p>
            ),
        },
        {
            question: "What is the 360 URID feature?",
            answer: (
                <p>
                    The 360 URID is an advanced feature providing all-around surveillance
                    and response integration for enhanced safety and convenience within
                    Zoid-enabled communities.
                </p>
            ),
        },
        {
            question: "What kind of support does Zoid offer in emergencies?",
            answer: (
                <p>
                    Zoid offers real-time emergency support, connecting residents with
                    local emergency services and providing on-platform alerts for quick
                    response in urgent situations.
                </p>
            ),
        },
        {
            question: "How do I sign up for Zoid?",
            answer: (
                <p>
                    You can download the Zoid app from your app store, follow the
                    registration steps, and start using Zoid for enhanced lifestyle
                    management.
                </p>
            ),
        },
        {
            question: "Are there fees for using Zoid?",
            answer: (
                <p>
                    While some basic features may be free, premium services within the
                    Zoidverse, such as visitor access control or real estate listings on
                    Zest, may come with small service fees.
                </p>
            ),
        },
        {
            question: "How do I update my account details on Zoid?",
            answer: (
                <p>
                    Go to the settings section in the app, where you can easily update
                    your personal information, contact details, and preferences.
                </p>
            ),
        },
        {
            question: "What payment methods are accepted in Zoid?",
            answer: (
                <p>
                    Zoid accepts multiple payment methods, including credit/debit cards,
                    bank transfers, and mobile money, for your convenience.
                </p>
            ),
        },
        {
            question: "Can I cancel or change a bill payment after it's been made?",
            answer: (
                <p>
                    Unfortunately, once a bill payment is processed, it cannot be
                    canceled. Please review all information before confirming payments.
                </p>
            ),
        },
        {
            question: "Is Zoid secure?",
            answer: (
                <p>
                    Absolutely. Zoid utilizes advanced encryption and multi-factor
                    authentication to protect user data and ensure a secure experience.
                </p>
            ),
        },
        {
            question: "How do I contact Zoid customer support?",
            answer: (
                <p>
                    You can reach Zoid`&apos;`s customer support through the app by navigating to
                    the support section or by contacting us via our official website.
                </p>
            ),
        },
        {
            question:
                "What makes Zoid unique compared to other lifestyle management apps?",
            answer: (
                <p>
                    Zoid combines secure visitor management, integrated emergency support,
                    and a wide range of services—like shopping, bill payment, and real
                    estate listings—all in one app, making it a comprehensive lifestyle
                    solution.
                </p>
            ),
        },
    ];

    const filteredData = data.filter(({ question, answer }) => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
            question.toLowerCase().includes(lowerCaseQuery) ||
            answer.props.children.toLowerCase().includes(lowerCaseQuery)
        );
    });

    return (
        <>
            <div className="flex flex-col items-center justify-center py-[46px] text-white">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search question or keyword"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-[360px] bg-[#F0F0F0] text-black placeholder-[#000000] font-satoshi text-[14px] font-[400] rounded-[30px] py-[20px] pl-[40px] pr-[12px] focus:outline-none"
                    />
                </div>
            </div>

            <div className="bg-[#F0F0F0] rounded-lg">
                <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-10">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
                        <div
                            className="flex-1 overflow-y-scroll lg:pr-4"
                            style={{
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                            }}
                        >
                            {filteredData?.map(({ question, answer }, index) => (
                                <div key={index} className="bg-white px-4 rounded-[12px] my-3">
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
                                    >
                                        <span
                                            className={`text-[#1D2939] font-semibold text-[16px] ${activeIndex === index ? "font-bold" : "font-normal"
                                                }`}
                                        >
                                            {question}
                                        </span>
                                        
                                        <Image
                                            className={`w-5 h-5 transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""
                                                }`}
                                                width={100}
                                                height={100}
                                            src={
                                                activeIndex === index
                                                    ? "/minus.png"
                                                    : "/add.png"
                                            }
                                            alt="icon"
                                        />
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-max-height duration-300 ${activeIndex === index ? "max-h-screen" : "max-h-0"
                                            }`}
                                    >
                                        <div className="text-[#344054] text-[.95rem] py-4">
                                            {answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FaqPage;