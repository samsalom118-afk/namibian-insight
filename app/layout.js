import './globals.css';

export const metadata = {
  title: 'Namibian Insight | Stories that move us',
  description: 'Student-led digital journalism from Namibia and beyond.',
  manifest: '/manifest.json',
  themeColor: '#172521',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Namibian Insight' }
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
