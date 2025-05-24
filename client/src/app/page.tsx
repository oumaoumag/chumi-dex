import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl front-bold mb-4">Welcome to ChumiDex</h1>
      <p className="text-lg mb-8 text-center">
        A decentralized exchange on Lisk L2 for tokenizing and trading Kenyan stock with transparent governance and DeFi access.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/swap" className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600">
        Swap Tokens
        </Link>
        <Link href="/liquidity" className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600">
        Add/Remove Liquidity
        </Link>
        <Link href="/governance" className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600">
        Governance
        </Link>
        <Link href="/dashboard" className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600">
        Dashboard
        </Link>
      </div>
    </div>
  );
}
