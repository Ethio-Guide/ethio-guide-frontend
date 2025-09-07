"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CustomIcon } from "./CustomIcon"
import { cn } from "@/lib/utils"

interface MenuItem {
  iconSrc: string
  iconAlt: string
  label: string
  active?: boolean
  href?: string
  onClick?: () => void
}

interface UserSidebarProps {
  menuItems: MenuItem[]
  settingsLabel?: string
  logoutLabel?: string
  onSettingsClick?: () => void
  onLogoutClick?: () => void
  className?: string
}

export function UserSidebar({
  menuItems,
  logoutLabel = "Logout",
  onLogoutClick,
  className,
}: UserSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "bg-white/90 backdrop-blur-sm border-r border-[#a7b3b9]/30 transition-all duration-300 ease-in-out relative",
        collapsed ? "w-20" : "w-64",
        className,
      )}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 z-10 w-6 h-6 rounded-full border border-[#a7b3b9]/30 bg-white hover:bg-[#3a6a8d]/10 shadow-sm hover:shadow-md transition-all"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed 
          ? <ChevronRight className="w-3 h-3 text-[#3a6a8d]" /> 
          : <ChevronLeft className="w-3 h-3 text-[#3a6a8d]" />
        }
      </Button>

      <div className="flex flex-col h-full">
        <nav className="p-4 space-y-2 flex-1">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                "relative overflow-hidden group flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-300 border",
                item.active
                  ? "bg-[#3a6a8d]/10 border-[#3a6a8d]/30 text-[#2e4d57] shadow-sm"
                  : "bg-white/90 border-[#a7b3b9]/30 text-[#2e4d57] hover:shadow-md hover:-translate-y-0.5",
                collapsed ? "justify-center" : "",
              )}
              style={{ animationDelay: `${Math.min(index * 0.04, 0.4)}s` }}
              onClick={item.onClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  item.onClick?.()
                }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#a7b3b9]/5 to-[#5e9c8d]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              <div className="relative z-10 flex items-center gap-3">
                <CustomIcon
                  src={item.iconSrc}
                  alt={item.iconAlt}
                  className={cn("flex-shrink-0", collapsed ? "w-8 h-8" : "w-5 h-5")}
                />
                {!collapsed && (
                  <span className={cn("transition-colors duration-300", item.active ? "font-medium" : "group-hover:text-[#3a6a8d]") }>
                    {item.iconAlt}
                  </span>
                )}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 space-y-2 border-t border-[#a7b3b9]/30">

          <div
            className={cn(
              "relative overflow-hidden group flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-300 border bg-white/90 border-[#a7b3b9]/30 text-[#2e4d57] hover:shadow-md",
              collapsed ? "justify-center" : "",
            )}
            onClick={onLogoutClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onLogoutClick?.()
              }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <div className="relative z-10 flex items-center gap-3">
              <CustomIcon
                src="/icons/logout.svg"
                alt="Logout"
                className={cn("flex-shrink-0", collapsed ? "w-8 h-8" : "w-5 h-5")}
              />
              {!collapsed && <span className="group-hover:text-red-700 transition-colors">{logoutLabel}</span>}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}