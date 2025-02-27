This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

