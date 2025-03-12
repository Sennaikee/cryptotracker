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
            question: "What is cryptocurrency and how does it work?",
            answer: (
                <p>
                   Cryptocurrency is a digital or virtual currency that uses cryptography for security. 
                   It operates on decentralized networks based on blockchain technology, allowing secure, 
                   transparent, and tamper-proof transactions.  

                </p>
            ),
        },
        {
            question: "What are the most popular cryptocurrencies?",
            answer: (
                <p>
                   Some of the most well-known cryptocurrencies include Bitcoin (BTC), 
                   Ethereum (ETH), Binance Coin (BNB), Cardano (ADA), Solana (SOL), and Ripple (XRP).  
                </p>
            ),
        },
        {
            question: "What is currency comversion?",
            answer: (
                <p>
                    ThCurrency conversion is the process of exchanging one country’s currency 
                    for another based on exchange rates. It is commonly done for travel, international trade, 
                    or investment purposes.  
                </p>
            ),
        },
        {
            question: "How are currency exchange rates determined",
            answer: (
                <p>
                   Exchange rates fluctuate based on supply and demand, economic conditions, inflation, 
                   interest rates, and geopolitical factors. Central banks and financial markets play a 
                   significant role in setting rates.  
                </p>
            ),
        },
        {
            question: "What is the difference between the buy and sell rate in currency exchange?",
            answer: (
                <p>
                    -The <strong>buy rate</strong> is the price a currency exchange service is willing to pay for your currency.  
                    - The <strong>sell rate</strong> is the price at which they will sell you a foreign currency.  
                    The difference between the two is called the <strong>exchange spread</strong> and represents the service provider’s profit.  
                </p>
            ),
        },
        {
            question: "How can I get the best exchange rate?",
            answer: (
                <p>
                   To get the best rate, compare rates across banks, online forex platforms, 
                   and currency exchange services. Avoid exchanging currency at airports, 
                   as they often have higher fees and poor rates.  
                </p>
            ),
        },
        {
            question: "Can I exchange money online?",
            answer: (
                <p>
                    Yes, many online platforms allow you to convert currencies digitally,
                     including Wise (formerly TransferWise), PayPal, Revolut, and online banking services.  
                </p>
            ),
        },
        {
            question: "How do I convert cryptocurrency to fiat currency (USD, EUR, etc.)?",
            answer: (
                <p>
                   You can convert crypto to fiat using a cryptocurrency exchange, a peer-to-peer (P2P) platform, or crypto ATMs. 
                   Simply select the cryptocurrency, input the amount, and choose your preferred withdrawal method.  
                </p>
            ),
        },
        {
            question: "What is the best exchange rate for converting crypto to fiat?",
            answer: (
                <p>
                    Exchange rates fluctuate across platforms.
                    Checking multiple exchanges, such as Binance, Kraken, and Coinbase, helps you find the best rate.  
                </p>
            ),
        },
        {
            question: "How long does it take to process a crypto-to-fiat conversion?",
            answer: (
                <p>
                    Processing times vary based on network congestion, payment method, and platform policies. 
                    On exchanges, it can take anywhere from a few minutes to several hours.  
                </p>
            ),
        },
        {
            question: "Can I exchange one cryptocurrency for another?",
            answer: (
                <p>
                    Yes, crypto-to-crypto exchanges allow you to swap one cryptocurrency for another.
                    This can be done on platforms like Binance, Uniswap, or KuCoin.  
                </p>
            ),
        },
        {
            question: "How can I protect myself from crypto scams?",
            answer: (
                <p>
                    Avoid suspicious links, double-check website URLs, 
                    enable two-factor authentication (2FA), and never share your private keys. Only use reputable exchanges and wallets.  
                </p>
            ),
        },
        {
            question: "Are my transactions private and anonymous?",
            answer: (
                <p>
                    Most blockchain transactions are <em>pseudonymous</em>, meaning they don’t reveal your identity but can be traced. 
                    Privacy coins like Monero (XMR) and Zcash (ZEC) offer more anonymity.  
                </p>
            ),
        },
        {
            question: "What should I do if I lose access to my crypto wallet?",
            answer: (
                <p>
                    If you lose access, recover your wallet using the <strong>recovery seed phrase</strong>. 
                    If you lost your private keys without a backup, unfortunately, you may not be able to recover your funds.  
                </p>
            ),
        },
        {
            question: "How can I use cryptocurrency for online payments?",
            answer: (
                <p>
                    Many online merchants accept cryptocurrency through payment gateways like BitPay, CoinGate, 
                    or even direct wallet-to-wallet transfers. 
                    Some companies issue crypto debit cards for spending crypto like cash.  
                </p>
            ),
        },
        {
            question: "What happens if a crypto transaction is delayed or stuck?",
            answer: (
                <p>
                Transactions can get stuck due to <strong>low network fees</strong>.
                Some wallets allow you to speed up transactions by increasing fees or cancel them if not confirmed.  
                </p>
            ),
        },
        {
            question: "Can I reverse a cryptocurrency transaction?",
            answer: (
                <p>
                    No, crypto transactions are <strong>irreversible</strong> once confirmed on the blockchain. 
                    Always verify recipient details before sending funds.  
                </p>
            ),
        },
        {
            question: "What are network fees, and why do I have to pay them?",
            answer: (
                <p>
                    Network fees (also called <strong>gas fees</strong>) are charges paid to miners or 
                    validators for processing transactions on the blockchain. They vary depending on network congestion.  
                </p>
            ),
        },
        {
            question: " Do I need to pay taxes on my cryptocurrency transactions?",
            answer: (
                <p>
                    In many countries, crypto is taxed as <strong>capital gains or income</strong>.
                    You may need to report gains or losses, so check with your local tax authority.  
                </p>
            ),
        },
        {
            question:
                "How do regulations affect cryptocurrency trading and conversion?",
            answer: (
                <p>
                   Regulations impact how exchanges operate, KYC (Know Your Customer) requirements, and taxation. 
                   Some countries have <strong>strict laws</strong>, while others are more crypto-friendly. Always stay updated on your local regulations.
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