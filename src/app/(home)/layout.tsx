import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";
import Loading from "@/libs/customFunction";
import { AppProvider } from "@/libs/AppContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SelfMastery",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
