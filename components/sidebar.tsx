"use client"
import { useState } from "react"
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar"
import { IconArrowLeft, IconBrandTabler, IconChartPie, IconSettings, IconUserBolt } from "@tabler/icons-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import  Map from "@/app/protected/map/page" 
import Profile from "@/app/protected/profile/page"
import { signOutAction } from "@/app/actions"
export default function SidebarDemo() {
  const [open, setOpen] = useState(false)
  const [activePage, setActivePage] = useState("dashboard")

  const links = [
    {
      label: "Map",
      href: "/map",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      id: "map",
    },
    {
      label: "Analytics",
      href: "#",
      icon: <IconChartPie className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      id: "analytics",
    },
    {
      label: "Profile",
      href: "#",
      icon: <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      id: "profile",
    },
    {
      label: "Settings",
      href: "#",
      icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      id: "settings",
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft onClick={signOutAction}className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      id: "logout",
    },
  ]

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen", // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  className={activePage === link.id ? "bg-neutral-200 dark:bg-neutral-700 rounded-md" : ""}
                  onClick={(e) => {
                    e.preventDefault()
                    setActivePage(link.id)
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1 bg-white dark:bg-neutral-900">    
        {activePage === "map" && <Map />}
        {activePage === "profile" && <Profile />}
        {activePage === "logout" && signOutAction()}
      </div>
    </div>
  )
}

export const Logo = () => {
  return (
    <a href="#" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Acet Labs
      </motion.span>
    </a>
  )
}

export const LogoIcon = () => {
  return (
    <a href="#" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  )
}

// Placeholder component for pages that aren't fully implemented yet

