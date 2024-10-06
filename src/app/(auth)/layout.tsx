import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";
import Loading from "@/libs/customFunction";
import { AppProvider, useAppContext } from "@/libs/AppContext";
import { getServerSession } from "next-auth";
import { authConfig, loginIsRequiredServer } from "@/libs/auth";
import { redirect } from "next/navigation";

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

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await loginIsRequiredServer();
  return <AppProvider>{children}</AppProvider>;
}
