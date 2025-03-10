This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
First, clone this repository to your local machine: 
```bash
git clone https://github.com/QuadlcorE/cryptotracker.git
```

Create a .env.local file and add your [CoinGecko API key](https://www.coingecko.com/en/api/pricing) in the following format:
```bash
API_KEY=CG-Yyb...Dhg
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
SUPPORT_EMAIL=support@yourdomain.com
```

Then install the dependencies and run the development server. This project uses pnpm as the package manager:
```bash
pnpm install
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Code Structure

### Main Page
layout.tsx: The project layout. Contains the <HomeHeader /> component which renders the header(project title and converter button).
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

Entrypoint (/src/app/page.tsx): This contains the 
```tsx
<div>
    <HeroSection/>
    <CryptoTrackingSection/>
</div>
```
Hero Section: Contains the project's hero
CryptoTrackingSection: Contains a tab which reroutes the user to one of the following tabs: 
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

Routes:
1.Top Cryptocurrencies: This calls the '/api/fetchtopcrypto' entrypoint of the CoinGecko API, saves the top 20 cryptocurrencies to state and renders the result.

2. Top NFT coins: This calls the '/api/fetchtopnftcoins' entrypoint of the CoinGecko API, saves the top 20 NFT coins to state and renders the result.

3. Top DeFi coins: This calls the '/api/fetchtopdeficoins' entrypoint of the CoinGecko API, saves the top 20 DeFi coins to state and renders the result.

4.Top yield farming: This calls the '/api/fetchtopyeildfarming' entrypoint of the CoinGecko API, saves the top 20 yield farming coins to state and renders the result.


### Converter
src/converter/components.page.tsx: Renders the cards for crypto-to-fiat and crypto-crypto conversion
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
[ConvertCryptoToFiat component]('src\app\converter\components\convertcryptotofiat.tsx'): handles the conversion of crypto to fiat and fiat to crypto with the following method: 
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

[ConvertCryptoToCrypto Componnt]('src\app\converter\components\convertcryptotocrypto.tsx'): Handles converting from one cryptocurrency to another: 
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

