"use client";
import Header from "@/components/Header"
import LandingHero from "@/components/LandingHero"
import { UserProvider } from "@/components/context/UserContext";

export default function LandingPage() {
  return (
    <main>
      <UserProvider>
        <Header />
        <LandingHero />
      </UserProvider>
    </main>
  )
}
