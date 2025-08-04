import './globals.css'
import { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/ui/theme-provider'
import QueryClientProviderWrapper from '@/providers/QueryClientProviderWrapper'
import { Toaster } from 'sonner'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'MyPlug — Add AI Chat to Your website in Minutes',
    template: '%s | MyPlug',
  },
  description:
    'MyPlug helps you embed an AI-powered chat assistant into your website with a few lines of code.',
  keywords: [
    'AI Chatbot',
    'Plug and Play',
    'Next.js SaaS',
    'ShadCN',
    'Chat for Shopify',
    'Ecommerce assistant',
    'MyPlug',
    'AI Support Chat',
    'Next.js AI Bot',
  ],
  metadataBase: new URL('https://myplug.shop'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://myplug.shop',
    siteName: 'MyPlug',
    title: 'MyPlug — Add AI Chat to Your website',
    description:
      'Plug in your AI assistant to boost engagement and conversions. Just copy, paste, and launch.',
    images: [
      {
        url: 'https://myplug.shop/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MyPlug — Smart AI Chat Assistant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyPlug — Add AI Chat to Your website',
    description:
      'No-code AI chatbot that boosts customer engagement on your website.',
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
      <head>
        <meta name="apple-mobile-web-app-title" content="MyPlug" />
      </head>
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
          <QueryClientProviderWrapper>
            {children}
            <Toaster richColors expand />
          </QueryClientProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}