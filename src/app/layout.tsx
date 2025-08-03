import './globals.css'
import { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'MyPlug.shop — Add AI Chat to Your website in Minutes',
    template: '%s | MyPlug.shop',
  },
  description:
    'MyPlug.shop helps you embed an AI-powered chat assistant into your website or store with a few lines of code.',
  keywords: [
    'AI Chatbot',
    'Plug and Play',
    'Next.js SaaS',
    'ShadCN',
    'Chat for Shopify',
    'Ecommerce assistant',
    'MyPlug.shop',
    'AI Support Chat',
    'Next.js AI Bot',
  ],
  metadataBase: new URL('https://myplug.shop'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://myplug.shop',
    siteName: 'MyPlug.shop',
    title: 'MyPlug.shop — Add AI Chat to Your Store',
    description:
      'Plug in your AI assistant to boost engagement and conversions. Just copy, paste, and launch.',
    images: [
      {
        url: 'https://myplug.shop/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MyPlug.shop — Smart AI Chat Assistant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyPlug.shop — Add AI Chat to Your Store',
    description:
      'No-code AI chatbot that boosts customer engagement on your storefront.',
    images: ['https://myplug.shop/og-image.png'],
    creator: '@myplugai',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          poppins.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}