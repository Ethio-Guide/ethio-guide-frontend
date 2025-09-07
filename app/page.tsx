"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  MessageCircle,
  Search,
  Users,
  FileText,
  Dessert as Passport,
  Building,
  CreditCard,
  Calculator,
  Check,
  Bot,
  User,
  Facebook,
  Twitter,
  Linkedin,
  ChevronDown,
  Menu,
  X,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import LandingPageLoading from "@/components/ui/landing-page-loading"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleLoadingComplete = () => {
    setIsLoading(false)
    // Ensure content is visible after loading
    setTimeout(() => {
      setIsVisible(true)
      setVisibleSections(new Set(['hero', 'features', 'how-it-works', 'testimonials', 'cta']))
    }, 100)
  }

  useEffect(() => {
    // Only set up observers after loading is complete
    if (isLoading) return

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Intersection Observer for section animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    // Observe all sections
    const sections = document.querySelectorAll("[data-animate]")
    sections.forEach((section) => observerRef.current?.observe(section))

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observerRef.current?.disconnect()
    }
  }, [isLoading])

  // Show loading screen first
  if (isLoading) {
    return <LandingPageLoading onComplete={handleLoadingComplete} />
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] overflow-x-hidden">
      {/* Header */}
      <header
        className={`bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] px-3 sm:px-4 lg:px-6 py-3 fixed w-full top-0 z-50 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } ${scrollY > 50 ? "shadow-lg" : ""}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#3a6a8d] to-[#2e4d57] rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg group-hover:shadow-xl">
              <Image
                src="/images/ethioguide-logo.jpg"
                alt="EthioGuide Logo"
                width={24}
                height={24}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded transition-transform duration-300 group-hover:scale-110"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <span className="font-semibold text-[#111827] text-sm sm:text-base transition-all duration-300 group-hover:text-[#3a6a8d] group-hover:scale-105">
              EthioGuide
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {["Home", "Services", "Discussions"].map((item, index) => (
              <a
                key={item}
                href={item === 'Services' ? '#features' : '#'}
                className="text-[#4b5563] hover:text-[#111827] transition-all duration-500 hover:scale-105 relative group text-sm xl:text-base"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{item}</span>
                <div className="absolute inset-0 bg-[#3a6a8d]/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3a6a8d] to-[#2e4d57] group-hover:w-full transition-all duration-500"></div>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#4b5563] hover:text-[#111827] hover:bg-[#f3f4f6] transition-all duration-300 hover:scale-105 group px-2 sm:px-3 text-xs sm:text-sm"
                >
                  EN{" "}
                  <ChevronDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="animate-in slide-in-from-top-2 duration-300 backdrop-blur-md bg-white/95 w-32 sm:w-auto"
              >
                <DropdownMenuItem className="cursor-pointer hover:bg-[#f3f4f6] transition-all duration-200 hover:scale-105 text-xs sm:text-sm">
                  🇺🇸 English
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-[#f3f4f6] transition-all duration-200 hover:scale-105 text-xs sm:text-sm">
                  🇪🇹 አማርኛ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              size="sm"
              className="bg-gradient-to-r from-[#3a6a8d] to-[#2e4d57] hover:from-[#2e4d57] hover:to-[#1c3b2e] text-white transition-all duration-500 hover:scale-105 hover:shadow-xl hover:-translate-y-0.5 relative overflow-hidden group px-3 sm:px-4 text-xs sm:text-sm hidden sm:flex"
              asChild
            >
              <a href="/auth/login">
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </a>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] shadow-lg animate-in slide-in-from-top-2 duration-300">
            <div className="px-4 py-4 space-y-4">
              {["Home", "Services", "Discussions"].map((item) => (
                <a
                  key={item}
                  href={item === 'Services' ? '#features' : '#'}
                  className="block text-[#4b5563] hover:text-[#111827] transition-all duration-300 py-2 border-b border-[#f3f4f6] last:border-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Button className="w-full bg-gradient-to-r from-[#3a6a8d] to-[#2e4d57] hover:from-[#2e4d57] hover:to-[#1c3b2e] text-white transition-all duration-500">
                Sign In
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        className="px-3 sm:px-4 lg:px-6 pt-20 sm:pt-24 pb-12 sm:pb-16 bg-gradient-to-br from-[#f0fafa] via-[#f9fafb] to-[#f3f4f6] relative overflow-hidden"
        data-animate
        id="hero"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-[#3a6a8d]/10 to-[#2e4d57]/5 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-[#5e9c8d]/10 to-[#1c3b2e]/5 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-[#a7b3b9]/10 to-[#5e9c8d]/5 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          <div
            className={`transition-all duration-1000 ${
              visibleSections.has("hero") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#111827] mb-4 sm:mb-6 text-balance leading-tight">
              <span className="inline-block transition-all duration-700 hover:scale-105">Navigate</span>{" "}
              <span
                className="inline-block transition-all duration-700 hover:scale-105"
                style={{ transitionDelay: "100ms" }}
              >
                Ethiopia&#39;s
              </span>{" "}
              <span
                className="text-[#3a6a8d] inline-block transition-all duration-700 hover:scale-105 bg-gradient-to-r from-[#3a6a8d] to-[#2e4d57] bg-clip-text text-transparent"
                style={{ transitionDelay: "200ms" }}
              >
                Services
              </span>{" "}
              <span
                className="inline-block transition-all duration-700 hover:scale-105"
                style={{ transitionDelay: "300ms" }}
              >
                with
              </span>{" "}
              <span
                className="inline-block transition-all duration-700 hover:scale-105"
                style={{ transitionDelay: "400ms" }}
              >
                AI
              </span>{" "}
              <span
                className="inline-block transition-all duration-700 hover:scale-105"
                style={{ transitionDelay: "500ms" }}
              >
                Guidance
              </span>
            </h1>
            <p
              className={`text-sm sm:text-base lg:text-lg text-[#4b5563] mb-6 sm:mb-8 text-pretty transition-all duration-1000 leading-relaxed ${
                visibleSections.has("hero") ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              Get instant help with government procedures, business registration, document renewals, and more. Your
              AI-powered assistant for Ethiopian bureaucracy.
            </p>
            <Button
              className={`bg-gradient-to-r from-[#3a6a8d] to-[#2e4d57] hover:from-[#2e4d57] hover:to-[#1c3b2e] text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden group ${
                visibleSections.has("hero") ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
              asChild
            >
              <a href="/auth/register">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                <span className="relative z-10">Start AI Chat</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </a>
            </Button>

            <div
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 mt-6 sm:mt-8 text-xs sm:text-sm text-[#4b5563] transition-all duration-1000 ${
                visibleSections.has("hero") ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              {[
                { color: "#5e9c8d", text: "Easy to use" },
                { color: "#3a6a8d", text: "Secure & Private" },
                { color: "#a7b3b9", text: "24/7 Available" },
              ].map((item, index) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 group cursor-pointer"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div
                    className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150 group-hover:shadow-lg"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}40` }}
                  ></div>
                  <span className="transition-all duration-300 group-hover:text-[#111827] group-hover:scale-105">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 ${
              visibleSections.has("hero") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <Card className="bg-white/80 backdrop-blur-md shadow-2xl border-[#e5e7eb] hover:shadow-3xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#3a6a8d]/20 via-transparent to-[#5e9c8d]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-4 sm:p-6 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#3a6a8d] to-[#2e4d57] rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-12 shadow-lg">
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white transition-transform duration-300 hover:scale-110" />
                  </div>
                  <span className="font-medium text-[#111827] text-sm sm:text-base transition-colors duration-300 group-hover:text-[#3a6a8d]">
                    EthioGuide AI
                  </span>
                  <Badge className="bg-[#5e9c8d] text-white animate-pulse text-xs">●</Badge>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-[#f3f4f6] rounded-lg p-2 sm:p-3 transition-all duration-300 hover:bg-[#e5e7eb] hover:scale-[1.02]">
                    <p className="text-xs sm:text-sm text-[#4b5563]">How can I renew my Ethiopian passport?</p>
                  </div>

                  <div className="bg-gradient-to-r from-[#3a6a8d] to-[#2e4d57] text-white rounded-lg p-3 sm:p-4 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg">
                    <p className="text-xs sm:text-sm mb-2">
                      I&#39;ll help you with passport renewal. Here&#39;s what you need:
                    </p>
                    <ul className="text-xs space-y-1">
                      {["Current passport", "2 passport photos", "Birth certificate", "550 ETB fee"].map(
                        (item, index) => (
                          <li
                            key={item}
                            className="transition-all duration-300 hover:translate-x-1"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            • {item}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Ask anything about Ethiopian services..."
                      className="flex-1 text-xs sm:text-sm border-[#e5e7eb] focus:ring-2 focus:ring-[#3a6a8d] transition-all duration-300 focus:scale-[1.02]"
                    />
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-[#3a6a8d] to-[#2e4d57] hover:from-[#2e4d57] hover:to-[#1c3b2e] transition-all duration-300 hover:scale-110 hover:shadow-lg p-2"
                    >
                      <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="px-3 sm:px-4 lg:px-6 py-12 sm:py-16" data-animate id="search">
        <div className="max-w-4xl mx-auto">
          <Card
            className={`bg-white/80 backdrop-blur-md shadow-xl border-[#e5e7eb] hover:shadow-2xl transition-all duration-700 hover:scale-[1.02] ${
              visibleSections.has("search") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#111827] mb-4 sm:mb-6 transition-all duration-500 hover:scale-105">
                What can I help you with today?
              </h2>

              <div className="relative mb-4 sm:mb-6 group">
                <Input
                  placeholder="Search for services, locations, or procedures..."
                  className="w-full py-2 sm:py-3 pl-3 sm:pl-4 pr-10 sm:pr-12 text-sm sm:text-base lg:text-lg border-[#e5e7eb] focus:ring-2 focus:ring-[#3a6a8d] transition-all duration-500 focus:scale-[1.02] focus:shadow-lg"
                />
                <Button
                  size="sm"
                  className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#3a6a8d] to-[#2e4d57] hover:from-[#2e4d57] hover:to-[#1c3b2e] transition-all duration-300 hover:scale-110 hover:shadow-lg p-2"
                >
                  <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {["ID Renewal", "Business Registration", "Passport Application", "Tax Registration"].map(
                  (item, index) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="px-2 sm:px-3 lg:px-4 py-1 sm:py-2 text-xs sm:text-sm border-[#e5e7eb] text-[#4b5563] hover:bg-[#f3f4f6] hover:border-[#3a6a8d] hover:text-[#3a6a8d] transition-all duration-300 hover:scale-105 cursor-pointer hover:shadow-md"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {item}
                    </Badge>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="px-3 sm:px-4 lg:px-6 py-12 sm:py-16 bg-gradient-to-br from-[#f3f4f6] to-[#f9fafb]"
        data-animate
        id="features"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
              visibleSections.has("features") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827] mb-3 sm:mb-4 transition-all duration-500 hover:scale-105">
              Everything You Need in One Place
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-[#4b5563]">
              Comprehensive tools to navigate Ethiopian services
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: Bot,
                color: "#3a6a8d",
                bg: "#e6f0f5",
                title: "AI Assistant",
                desc: "Get instant answers about procedures, requirements, and timelines from our intelligent AI guide.",
                cta: "Try AI Chat →",
              },
              {
                icon: FileText,
                color: "#5e9c8d",
                bg: "#e8f4f2",
                title: "Step-by-step Guides",
                desc: "Detailed procedures with checklists, required documents, and estimated costs for every service.",
                cta: "View Procedures →",
              },
              {
                icon: Users,
                color: "#2e4d57",
                bg: "#e3e8ea",
                title: "Community Forum",
                desc: "Connect with other users, share experiences, and get help from the community.",
                cta: "Join Discussion →",
              },
            ].map((feature, index) => (
              <Card
                key={feature.title}
                className={`bg-white/80 backdrop-blur-md border-[#e5e7eb] hover:shadow-xl transition-all duration-700 hover:scale-105 hover:-translate-y-4 group ${
                  visibleSections.has("features") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{ backgroundColor: feature.bg }}
                  >
                    <feature.icon
                      className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:scale-110"
                      style={{ color: feature.color }}
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#111827] mb-2 sm:mb-3 transition-colors duration-300 group-hover:text-[#3a6a8d]">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#4b5563] mb-3 sm:mb-4 leading-relaxed">{feature.desc}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="transition-all duration-500 hover:scale-105 hover:shadow-lg bg-transparent group-hover:shadow-xl text-xs sm:text-sm"
                    style={
                      {
                        color: feature.color,
                        borderColor: feature.color,
                        "--hover-bg": feature.color,
                      } as React.CSSProperties
                    }
                    asChild
                  >
                    <a href="/auth/register">{feature.cta}</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="px-3 sm:px-4 lg:px-6 py-12 sm:py-16" data-animate id="services">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
              visibleSections.has("services") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827] mb-3 sm:mb-4 transition-all duration-500 hover:scale-105">
              Popular Services
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-[#4b5563]">Most requested procedures and services</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: Passport,
                gradient: "from-[#e6f0f5] to-[#d1e7f0]",
                color: "#3a6a8d",
                title: "Passport Services",
                desc: "Renewal, replacement, and new applications.",
              },
              {
                icon: Building,
                gradient: "from-[#e8f4f2] to-[#d1ede7]",
                color: "#5e9c8d",
                title: "Business Registration",
                desc: "Start your business legally in Ethiopia.",
              },
              {
                icon: CreditCard,
                gradient: "from-[#e3e8ea] to-[#d6dde0]",
                color: "#2e4d57",
                title: "ID Card Services",
                desc: "National ID renewal and replacement.",
              },
              {
                icon: Calculator,
                gradient: "from-[#f0f2f3] to-[#e6eaeb]",
                color: "#1c3b2e",
                title: "Tax Services",
                desc: "Tax registration and tax filing assistance.",
              },
            ].map((service, index) => (
              <Card
                key={service.title}
                className={`bg-gradient-to-br ${service.gradient} border-0 hover:shadow-xl transition-all duration-700 hover:scale-105 hover:-translate-y-4 group cursor-pointer ${
                  visibleSections.has("services") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center mb-3 sm:mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg group-hover:shadow-xl">
                    <service.icon
                      className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:scale-110"
                      style={{ color: service.color }}
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#111827] mb-2 transition-colors duration-300 group-hover:text-[#3a6a8d]">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4b5563] mb-3 sm:mb-4 leading-relaxed">{service.desc}</p>
                  <Button
                    variant="link"
                    className="p-0 h-auto font-medium transition-all duration-300 hover:scale-105 group-hover:translate-x-2 text-xs sm:text-sm"
                    style={{ color: service.color }}
                    asChild
                  >
                    <a href="/auth/register">Learn more →</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        className="px-3 sm:px-4 lg:px-6 py-12 sm:py-16 bg-gradient-to-br from-[#f3f4f6] to-[#f9fafb]"
        data-animate
        id="pricing"
      >
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
              visibleSections.has("pricing") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827] mb-3 sm:mb-4 transition-all duration-500 hover:scale-105">
              Simple, Transparent Pricing
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-[#4b5563]">Choose the plan that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Free Plan */}
            <Card
              className={`bg-white/80 backdrop-blur-md border-[#e5e7eb] relative hover:shadow-xl transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${
                visibleSections.has("pricing") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-2">Free</h3>
                <p className="text-sm sm:text-base text-[#4b5563] mb-4 sm:mb-6">Perfect for occasional users</p>

                <div className="mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827]">0 ETB</span>
                  <span className="text-sm sm:text-base text-[#4b5563]">/month</span>
                </div>

                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {[
                    "Basic AI guidance (10 questions/month)",
                    "Document checklists (5 downloads/month)",
                    "Basic procedure notifications",
                    "Community forum access",
                  ].map((feature, index) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 sm:gap-3 transition-all duration-300 hover:translate-x-2 text-sm sm:text-base"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#5e9c8d] transition-transform duration-300 hover:scale-110 flex-shrink-0 mt-0.5" />
                      <span className="text-[#4b5563] leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant="outline"
                  className="w-full border-[#e5e7eb] text-[#4b5563] bg-transparent hover:bg-[#f3f4f6] transition-all duration-500 hover:scale-105 hover:shadow-lg text-sm sm:text-base"
                  asChild
                >
                  <a href="/auth/register">Start Free</a>
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card
              className={`bg-white/80 backdrop-blur-md border-[#3a6a8d] relative hover:shadow-2xl transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${
                visibleSections.has("pricing") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-[#3a6a8d] to-[#2e4d57] text-white px-3 sm:px-4 py-1 animate-pulse text-xs sm:text-sm">
                  POPULAR
                </Badge>
              </div>
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-2">Pro</h3>
                <p className="text-sm sm:text-base text-[#4b5563] mb-4 sm:mb-6">For regular users with ongoing needs</p>

                <div className="mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827]">250 ETB</span>
                  <span className="text-sm sm:text-base text-[#4b5563]">/month</span>
                </div>

                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {[
                    "Unlimited AI guidance",
                    "Unlimited document storage",
                    "Priority notifications & reminders",
                    "Document expiry tracking",
                    "Procedure progress tracking",
                    "Priority support",
                  ].map((feature, index) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 sm:gap-3 transition-all duration-300 hover:translate-x-2 text-sm sm:text-base"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#5e9c8d] transition-transform duration-300 hover:scale-110 flex-shrink-0 mt-0.5" />
                      <span className="text-[#4b5563] leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full bg-gradient-to-r from-[#3a6a8d] to-[#2e4d57] hover:from-[#2e4d57] hover:to-[#1c3b2e] text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden group text-sm sm:text-base"
                  asChild
                >
                  <a href="/auth/register">
                    <span className="relative z-10">Upgrade to Pro</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="px-3 sm:px-4 lg:px-6 py-12 sm:py-16 bg-gradient-to-br from-[#3a6a8d] via-[#2e4d57] to-[#1c3b2e] relative overflow-hidden"
        data-animate
        id="cta"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-32 h-32 sm:w-48 sm:h-48 bg-white/5 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div
          className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 ${
            visibleSections.has("cta") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 transition-all duration-500 hover:scale-105">
            Ready to Get Started?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#a7b3b9] mb-6 sm:mb-8 leading-relaxed">
            Join thousands of Ethiopians who are navigating services with ease
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              className="bg-white text-[#3a6a8d] hover:bg-[#f3f4f6] px-4 sm:px-6 lg:px-8 py-2 sm:py-3 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden group text-sm sm:text-base"
              asChild
            >
              <a href="/auth/register">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                <span className="relative z-10">Try AI Assistant</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#3a6a8d]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#3a6a8d] px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-transparent transition-all duration-500 hover:scale-105 hover:shadow-xl hover:-translate-y-1 text-sm sm:text-base"
              asChild
            >
              <a href="/auth/register">
                <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Create Account
              </a>
            </Button>
          </div>
        </div>
      </section>

        <footer className="bg-[#2e4d57] py-10 px-3 sm:px-4 lg:px-6" data-animate id="footer">
        <div className="max-w-7xl mx-auto">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 transition-all duration-1000 ${
              visibleSections.has("footer") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4 group cursor-pointer">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#3a6a8d] to-[#2e4d57] rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                  <Image
                src="/images/ethioguide-logo.jpg"
                alt="EthioGuide Logo"
                width={24}
                height={24}
                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110"
                style={{ objectFit: "contain" }}
                priority
              />
                </div>
                <span className="font-semibold text-white text-sm sm:text-base transition-colors duration-300 group-hover:text-[#3a6a8d]">
                  EthioGuide
                </span>
              </div>
              <p className="text-[#a0aec0] text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                Your AI-powered guide to Ethiopian government services and procedures.
              </p>
              <div className="flex gap-3 sm:gap-4">
                {[Facebook, Twitter, Linkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-[#a0aec0] hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Services",
                links: ["AI Chat Assistant", "Procedure Guides", "Document Tracking", "Community Forum"],
              },
              {
                title: "Support",
                links: ["Help Center", "Contact Us", "Feedback", "Report Issue"],
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
              },
            ].map((column) => (
              <div key={column.title}>
                <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">{column.title}</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {column.links.map((item, index) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-[#a0aec0] hover:text-white transition-all duration-300 text-xs sm:text-sm hover:translate-x-2 inline-block"
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-[#4a5568] mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-[#a0aec0] text-xs sm:text-sm">© 2025 EthioGuide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
