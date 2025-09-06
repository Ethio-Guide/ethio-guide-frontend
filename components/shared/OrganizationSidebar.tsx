"use client"
import { useRouter } from "next/navigation"
import { UserSidebar } from "./UserSidebar"
import { signOut } from "next-auth/react";

const adminMenuItems = [
  { iconSrc: "/icons/dashboard.svg", iconAlt: "Dashboard", label: "dashboard" },
  { iconSrc: "/icons/official-notices.svg", iconAlt: "Notices", label: "notices" },
  { iconSrc: "/icons/discussions.svg", iconAlt: "View Feedbacks", label: "feedback" },
  { iconSrc: "/icons/manage-procedure.svg", iconAlt: "Manage Procedures", label: "procedures" },
];

import { usePathname } from "next/navigation";

export default function OrganizationSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleSettingsClick = () => {
    // org settings logic
  };

  const handleLogoutClick = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const handleMenuItemClick = (label: string) => {
    router.push(`/organization/${label}`);
  };

  const menuItemsWithHandlers = adminMenuItems.map((item) => {
    const isActive = pathname === `/organization/${item.label}`;
    return {
      ...item,
      active: isActive,
      onClick: () => handleMenuItemClick(item.label),
    };
  });

  return (
    <UserSidebar
      menuItems={menuItemsWithHandlers}
      onSettingsClick={handleSettingsClick}
      onLogoutClick={handleLogoutClick}
      settingsLabel="Settings"
      logoutLabel="Sign Out"
    />
  );
}
