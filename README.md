# Crypto Tracker: A Support Environment for Cryptocurrency Data.

This project is built as a support environment that helps users get information on cryptocurrencies, view trends on the prices of the cryptocurrency tokens, and carry out multiple conversions: from crypto to crypto and crypto to fiat. Users can also fetch information like the top cryptocurrency tokens, top NFT tokens, Decentralised Finance tokens and top yield farming tokens within a period.

## Getting Started
First, clone this repository to your local machine: 
```bash
git clone https://github.com/QuadlcorE/cryptotracker.git
```

Create a .env.local file and add your [CoinGecko API key](https://www.coingecko.com/en/api/pricing) in the following format:
```bash
API_KEY=CG-Yyb...Dhg
```

Then install the dependencies and run the development server. This project uses pnpm as the package manager:
```bash
pnpm install
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Code Structure

### Main Page
<strong> layout.tsx </strong>: The project layout. Contains the <HomeHeader /> component which renders the header(project title and converter button).
```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HomeHeader/>
        {children}
      </body>
    </html>
  );
}
```

<strong> Entrypoint (/src/app/page.tsx) </strong>: This contains the hero section and the Crypto Tracking section
```tsx
<div>
    <HeroSection/>
    <CryptoTrackingSection/>
</div>
```
<strong>Hero Section </strong>: Contains the project's hero.
```tsx
export default function HeroSection() {
  return (
    <div>
        <div className="relative h-[300px] overflow-hidden">
        <Image
          src={'/bitcoin.jpg'}
          alt="Bitcoin illustration"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
          <h2 className="text-4xl font-bold text-white mb-2">Track the top cryptocurrencies</h2>
          <p className="text-gray-200">Find new coins and track your favorites with prices, market cap, and more.</p>
        </div>
      </div>
    </div>
  )
}
```

<strong>CryptoTrackingSection </strong>: Contains a tab which reroutes the user to one of the following tabs: 
```tsx
<TabsList className="grid grid-cols-2 md:grid-cols-4 w-full gap-2">
    <TabsTrigger value="cryptocurrencies">
        Top Cryptocurrencies
    </TabsTrigger>
    <TabsTrigger value="nft">Top NFT Coins</TabsTrigger>
    <TabsTrigger value="defi">Top DeFi Coins</TabsTrigger>
    <TabsTrigger value="yield">Top Yield Farming</TabsTrigger>
</TabsList>
```
<br>
<strong>Routes: </strong> 
<br>
1.Top Cryptocurrencies: This calls the '/api/fetchtopcrypto' entrypoint of the CoinGecko API, saves the top 20 cryptocurrencies to state and renders the result.

2. Top NFT coins: This calls the '/api/fetchtopnftcoins' entrypoint of the CoinGecko API, saves the top 20 NFT coins to state and renders the result.

3. Top DeFi coins: This calls the '/api/fetchtopdeficoins' entrypoint of the CoinGecko API, saves the top 20 DeFi coins to state and renders the result.

4.Top yield farming: This calls the '/api/fetchtopyeildfarming' entrypoint of the CoinGecko API, saves the top 20 yield farming coins to state and renders the result.


### Converter
<strong>src/converter/components.page.tsx</strong>: Renders the cards for crypto-to-fiat and crypto-crypto conversion
```tsx
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div className=" rounded-lg shadow-lg">
            <ConvertCryptoToFiat />
          </div>
          <div className=" rounded-lg shadow-lg">
            <ConvertCryptoToCrypto />
          </div>
        </div>
      </div>
    </div>
  );
```
<br>

<strong> ConvertCryptoToFiat component </strong>: handles the conversion of crypto to fiat and fiat to crypto with the following method: 
```tsx
const handleConvert = async () => {
    if (!fromType || !toType || !amount) {
      return;
    }

    let fromRate, toRate;

    if (conversionType === "asset-to-currency") {
      try {
        const response = await fetch("/api/convertcryptotofiat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "asset-to-currency",
            from: fromType,
            to: toType,
            amount: Number(amount),
          }),
        });
        const data = await response.json();
        setResult(data.result);
      } catch (err) {
        console.error(err);
        setError("Conversion failed");
      }
    } else {
      try {
        const response = await fetch("/api/convertcryptotofiat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "currency-to-asset",
            from: fromType,
            to: toType,
            amount: Number(amount),
          }),
        });
        const data = await response.json();
        setResult(data.result);
      } catch (err) {
        console.error(err);
        setError("Conversion failed");
      }
    }

    if (fromRate && toRate) {
      const conversion = (Number.parseFloat(amount) * toRate) / fromRate;
      setResult(conversion);
    }
  };
```

<strong> ConvertCryptoToCrypto Component </strong>: Handles converting from one cryptocurrency to another: 
```tsx
  const handleConvert = async () => {
    if (!fromCrypto || !toCrypto || !amount) {
      return;
    }

    try {
      const response = await fetch("/api/convertcryptotocrypto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromCrypto,
          to: toCrypto,
          amount: Number(amount),
        }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      console.error("Conversion error:", err);
      setError("Conversion failed");
    }
  };
```

