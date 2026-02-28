import type { Metadata } from 'next';
import { ConfigProvider } from 'antd';
import NavbarWrapper from '@/components/NavbarWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'MÍNIMO - Minimal Design Shop',
  description: 'Curated collection of minimal, timeless products.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#8B7355',
              fontFamily: 'var(--font-dm-sans)',
            },
          }}
        >
          <NavbarWrapper>{children}</NavbarWrapper>
        </ConfigProvider>
      </body>
    </html>
  );
}
