"use client";
import NavBar from "@/components/nav";
import { useUser } from "@clerk/nextjs";
import { Spin } from "antd";
import { Loader2 } from "lucide-react";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <>
        <div className="h-screen w-screen flex justify-center items-center">
          <Spin
            indicator={
              <Loader2
                color="#000000"
                strokeWidth={2}
                style={{ fontSize: 50 }}
                className="animate-spin"
              />
            }
          />
        </div>
      </>
    );
  }

  return (
    <main className="h-screen flex flex-col">
      <div>
        <NavBar />
      </div>
      {children}
    </main>
  );
}
