import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '../index.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0D0D0D',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Lyzr Enterprise AI Agent Platform',
  description:
    'Enterprise AI Agent Platform. Agents built on AWS, Azure, LangChain, Agentforce, or anywhere else – all governed, observed, and controlled from a single control plane.',
  keywords: [
    'Enterprise AI',
    'AI Agent Platform',
    'Agent Governance',
    'Agent Mesh',
    'AI Control Plane',
    'Agent Observability',
    'Autonomous Agents',
    'LLM Orchestration',
    'Lyzr',
  ],
  authors: [{ name: 'Lyzr AI' }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.lyzr.ai/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.lyzr.ai/',
    siteName: 'Lyzr',
    title: 'Lyzr Enterprise AI Agent Platform',
    description:
      'Enterprise AI Agent Platform. Agents built on AWS, Azure, LangChain, Agentforce, or anywhere else – all governed, observed, and controlled from a single control plane.',
    images: [
      {
        url: 'https://www.lyzr.ai/wp-content/uploads/2024/02/Lyzr-OG.png',
        width: 1200,
        height: 630,
        alt: 'Lyzr Enterprise AI Agent Platform - Single Control Plane for Multi-Agent Enterprise Governance',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@LyzrAI',
    creator: '@LyzrAI',
    title: 'Lyzr Enterprise AI Agent Platform',
    description:
      'Enterprise AI Agent Platform. Agents built on AWS, Azure, LangChain, Agentforce, or anywhere else – all governed, observed, and controlled from a single control plane.',
    images: ['https://www.lyzr.ai/wp-content/uploads/2024/02/Lyzr-OG.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-white text-black antialiased selection:bg-[#E5FE54] selection:text-black font-sans">
        {children}
      </body>
    </html>
  );
}
