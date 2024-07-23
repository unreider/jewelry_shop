import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";

import { ProductsProvider } from "./context/ProductsProvider";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { UserProductsProvider } from "./context/UserProductsProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JBA",
  description: "Jewelry By Artur",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`h-full flex flex-col ${inter.className}`}>
        <AuthProvider>
          <ProductsProvider>
            <UserProductsProvider>
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </UserProductsProvider>
          </ProductsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
