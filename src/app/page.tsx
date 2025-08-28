'use client'

import {  Footer, Header, HeroSection, NewsEventsSection } from "./components"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />      
      <HeroSection />
      <NewsEventsSection />
      <Footer />     
    </div>
  )
} 