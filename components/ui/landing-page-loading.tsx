"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface LandingPageLoadingProps {
  onComplete: () => void
}

export default function LandingPageLoading({ onComplete }: LandingPageLoadingProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          // Complete loading after progress reaches 100%
          setTimeout(() => {
            onComplete()
          }, 500)
          return 100
        }
        return prev + Math.random() * 12
      })
    }, 150)

    return () => {
      clearInterval(progressInterval)
    }
  }, [onComplete])

  return (
    <>
      <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#F5F7F8] via-[#3A6A8D]/5 to-[#2E4D57]/10">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl bg-gradient-to-br from-[#3A6A8D]/20 to-[#5E9C8D]/20"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-3xl bg-gradient-to-br from-[#2E4D57]/20 to-[#3A6A8D]/20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-2xl bg-gradient-to-br from-[#5E9C8D]/30 to-[#3A6A8D]/30"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
          {/* Logo-Centered Loading Animation */}
          <div className="mb-8">
            <div className="relative">
              {/* Main Logo Container */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto">
                {/* Rotating Background Ring */}
                <div className="absolute inset-0 w-full h-full border-4 border-[#3A6A8D]/30 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-2 w-full h-full border-2 border-[#5E9C8D]/40 rounded-full animate-spin-reverse"></div>
                
                {/* Pulsing Background Circles */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#3A6A8D]/20 to-[#2E4D57]/20 rounded-full animate-pulse-slow"></div>
                <div className="absolute inset-4 w-full h-full bg-gradient-to-br from-[#5E9C8D]/15 to-[#3A6A8D]/15 rounded-full animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
                
                {/* Logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#3A6A8D] to-[#2E4D57] rounded-2xl flex items-center justify-center shadow-2xl animate-logo-glow">
                    <Image
                      src="/logo/ethioguide-logo.jpg"
                      alt="EthioGuide Logo"
                      width={80}
                      height={80}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl animate-logo-pulse"
                      style={{ objectFit: "contain" }}
                      priority
                    />
                  </div>
                </div>
                
                {/* Floating Particles Around Logo */}
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#5E9C8D] rounded-full animate-float-slow"></div>
                <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-[#3A6A8D] rounded-full animate-float-medium"></div>
                <div className="absolute top-1/2 -right-4 w-2 h-2 bg-[#2E4D57] rounded-full animate-float-fast"></div>
                <div className="absolute top-1/2 -left-4 w-2 h-2 bg-[#5E9C8D] rounded-full animate-float-slow" style={{ animationDelay: '1s' }}></div>
                <div className="absolute -top-4 left-1/2 w-1.5 h-1.5 bg-[#3A6A8D] rounded-full animate-float-medium" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute -bottom-4 left-1/2 w-1.5 h-1.5 bg-[#2E4D57] rounded-full animate-float-fast" style={{ animationDelay: '1.5s' }}></div>
              </div>
              
              {/* Brand Name */}
              <div className="text-center mt-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#2E4D57] mb-2 animate-text-glow">
                  EthioGuide
                </h1>
                <p className="text-[#3A6A8D] text-sm sm:text-base font-medium animate-text-fade">
                  Navigate Ethiopia's Services with AI Guidance
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar - Clean and Professional */}
          <div className="w-full max-w-md">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-[#2E4D57]">Loading EthioGuide...</span>
              <span className="text-sm font-bold text-[#3A6A8D]">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-2 overflow-hidden border border-white/30">
              <div 
                className="h-full bg-gradient-to-r from-[#3A6A8D] to-[#5E9C8D] rounded-full transition-all duration-300 ease-out animate-progress-glow"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.05); 
          }
        }
        
        @keyframes logo-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(58, 106, 141, 0.3);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 40px rgba(58, 106, 141, 0.6), 0 0 60px rgba(94, 156, 141, 0.4);
            transform: scale(1.02);
          }
        }
        
        @keyframes logo-pulse {
          0%, 100% { 
            transform: scale(1);
            filter: brightness(1);
          }
          50% { 
            transform: scale(1.05);
            filter: brightness(1.1);
          }
        }
        
        @keyframes float-slow {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-15px) rotate(180deg); 
            opacity: 1;
          }
        }
        
        @keyframes float-medium {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.7;
          }
          33% { 
            transform: translateY(-10px) translateX(8px) rotate(120deg); 
            opacity: 1;
          }
          66% { 
            transform: translateY(8px) translateX(-8px) rotate(240deg); 
            opacity: 0.9;
          }
        }
        
        @keyframes float-fast {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-20px) scale(1.1); 
            opacity: 1;
          }
        }
        
        @keyframes text-glow {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(46, 77, 87, 0.3);
            transform: scale(1);
          }
          50% { 
            text-shadow: 0 0 20px rgba(46, 77, 87, 0.6);
            transform: scale(1.02);
          }
        }
        
        @keyframes text-fade {
          0%, 100% { 
            opacity: 0.8;
            transform: translateY(0px);
          }
          50% { 
            opacity: 1;
            transform: translateY(-2px);
          }
        }
        
        @keyframes progress-glow {
          0%, 100% { 
            box-shadow: 0 0 10px rgba(58, 106, 141, 0.3);
          }
          50% { 
            box-shadow: 0 0 20px rgba(58, 106, 141, 0.6);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite !important;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 6s linear infinite !important;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite !important;
        }
        
        .animate-logo-glow {
          animation: logo-glow 2s ease-in-out infinite !important;
        }
        
        .animate-logo-pulse {
          animation: logo-pulse 1.5s ease-in-out infinite !important;
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite !important;
        }
        
        .animate-float-medium {
          animation: float-medium 3s ease-in-out infinite !important;
        }
        
        .animate-float-fast {
          animation: float-fast 2s ease-in-out infinite !important;
        }
        
        .animate-text-glow {
          animation: text-glow 2.5s ease-in-out infinite !important;
        }
        
        .animate-text-fade {
          animation: text-fade 2s ease-in-out infinite !important;
        }
        
        .animate-progress-glow {
          animation: progress-glow 1s ease-in-out infinite !important;
        }
      `}</style>
    </>
  )
}
