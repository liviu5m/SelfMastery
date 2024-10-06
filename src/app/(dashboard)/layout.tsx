import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";
import Loading from "@/libs/customFunction";
import { AppProvider } from "@/libs/AppContext";
import Sidebar from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import { authConfig, loginIsRequired } from "@/libs/auth";
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

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await loginIsRequired();
  return (
    <div className="flex justify-center gap-20 m-8">
      <Sidebar />
      <div className="w-1/4"></div>
      <div className="w-3/4">{children}</div>
    </div>
  );
}
