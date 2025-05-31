"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  ChefHatIcon,
  CompassIcon,
  HeartIcon,
  HomeIcon,
  LucideIcon,
  MessageCircleIcon,
  PlusSquareIcon,
  SearchIcon,
  UserIcon,
  VideoIcon,
  ClockIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface LinkProps {
  href: string;
  title: string;
  icon: LucideIcon;
  matchExact?: boolean;
  type?: "link" | "sheet" | "dialog";
}

const links: LinkProps[] = [
  {
    href: "/home",
    title: "Home",
    icon: HomeIcon,
    type: "link",
  },
  {
    href: "/search",
    title: "Search",
    icon: SearchIcon,
    type: "sheet",
  },
  {
    href: "/explore",
    title: "Explore",
    icon: CompassIcon,
    type: "link",
  },
  {
    href: "/reels",
    title: "Reels",
    icon: VideoIcon,
    type: "link",
  },
  {
    href: "/messages",
    title: "Messages",
    icon: MessageCircleIcon,
    type: "link",
  },
  {
    href: "/notifications",
    title: "Notifications",
    icon: HeartIcon,
    type: "sheet",
  },
  {
    href: "/create",
    title: "Create",
    icon: PlusSquareIcon,
    type: "dialog",
  },
  {
    href: "/profile",
    title: "Profile",
    icon: UserIcon,
    type: "link",
  },
];

// Mock data for notifications
const mockNotifications = [
  {
    id: 1,
    type: "like",
    user: "chef_maria",
    avatar: "",
    message: "liked your pasta recipe",
    time: "2m ago",
    read: false,
  },
  {
    id: 2,
    type: "comment",
    user: "foodie_john",
    avatar: "",
    message: "commented on your chocolate cake post",
    time: "1h ago",
    read: false,
  },
  {
    id: 3,
    type: "follow",
    user: "baker_sarah",
    avatar: "",
    message: "started following you",
    time: "3h ago",
    read: true,
  },
];

const mockRecentSearches = [
  "chocolate chip cookies",
  "pasta carbonara",
  "vegan desserts",
  "quick breakfast ideas",
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const [searchSheetOpen, setSearchSheetOpen] = useState(false);
  const [notificationsSheetOpen, setNotificationsSheetOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isSheetOpen = searchSheetOpen || notificationsSheetOpen;

  const isActive = (href: string, matchExact?: boolean): boolean =>
    matchExact ? pathname === href : pathname.startsWith(href);

  const renderLinkContent = (link: LinkProps, iconOnly = false) => (
    <>
      {link.href === "/profile" && user?.imageUrl ? (
        <Image
          src={user.imageUrl}
          alt={`${user.firstName || "User"}'s profile`}
          width={24}
          height={24}
          className="rounded-full size-6 object-cover flex-shrink-0"
        />
      ) : (
        <link.icon className="size-6 flex-shrink-0" />
      )}
      {!iconOnly && <span className="font-medium">{link.title}</span>}
    </>
  );

  const getButtonStyles = (isActive: boolean, iconOnly = false) =>
    cn(
      "transition-colors duration-200 gap-4",
      iconOnly ? "size-12 p-0" : "w-full justify-start text-xl px-3 py-2",
      isActive
        ? "bg-secondary text-secondary-foreground"
        : "hover:bg-muted hover:text-muted-foreground"
    );

  const renderSearchSheet = (link: LinkProps) => {
    const active = isActive(link.href, link.matchExact);

    return (
      <Sheet
        key={link.href}
        open={searchSheetOpen}
        modal={false}
        onOpenChange={setSearchSheetOpen}
      >
        <SheetTrigger asChild>
          <Button
            size={isSheetOpen ? "default" : "lg"}
            variant="ghost"
            className={getButtonStyles(active, isSheetOpen)}
            aria-label={`Open ${link.title}`}
            onClick={() => {
              if (notificationsSheetOpen) {
                setNotificationsSheetOpen(false);
              }
            }}
          >
            {renderLinkContent(link, isSheetOpen)}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[350px] shadow-none ml-20 border-l-0"
        >
          <div className="p-6 space-y-6">
            <h2 className="font-semibold text-xl">Search</h2>

            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Search recipes, users, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />

              {!searchQuery ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <ClockIcon className="size-4" />
                      Recent
                    </h3>
                    <div className="space-y-2">
                      {mockRecentSearches.map((search, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <SearchIcon className="size-4 text-muted-foreground" />
                            <span className="text-sm">{search}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 text-xs"
                          >
                            <XIcon />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Search results for &quot;{searchQuery}&quot; would appear
                    here...
                  </p>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  };

  const renderNotificationsSheet = (link: LinkProps) => {
    const active = isActive(link.href, link.matchExact);

    return (
      <Sheet
        key={link.href}
        open={notificationsSheetOpen}
        modal={false}
        onOpenChange={setNotificationsSheetOpen}
      >
        <SheetTrigger asChild>
          <Button
            size={isSheetOpen ? "default" : "lg"}
            variant="ghost"
            className={getButtonStyles(active, isSheetOpen)}
            aria-label={`Open ${link.title}`}
            onClick={() => {
              if (searchSheetOpen) {
                setSearchSheetOpen(false);
              }
            }}
          >
            {renderLinkContent(link, isSheetOpen)}
            {!isSheetOpen && (
              <div className="ml-auto">
                <span className="bg-red-500 text-white text-xs rounded-full size-5 flex items-center justify-center">
                  2
                </span>
              </div>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[380px] shadow-none ml-20 border-l-0"
        >
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-xl">Notifications</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-700"
              >
                Mark all as read
              </Button>
            </div>

            <div className="space-y-1">
              {mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors",
                    !notification.read && "bg-blue-50 hover:bg-blue-100"
                  )}
                >
                  <Image
                    src={notification.avatar}
                    alt={notification.user}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm">
                        {notification.user}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {notification.message}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                      {!notification.read && (
                        <div className="size-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-center text-blue-600 hover:text-blue-700"
              >
                See all notifications
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  };

  const handleCloseSheets = () => {
    setSearchSheetOpen(false);
    setNotificationsSheetOpen(false);
  };

  const renderDialogTrigger = (link: LinkProps) => {
    const active = isActive(link.href, link.matchExact);

    return (
      <Dialog
        key={link.href}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogTrigger asChild>
          <Button
            size={isSheetOpen ? "default" : "lg"}
            variant="ghost"
            className={getButtonStyles(active, isSheetOpen)}
            aria-label={`Open ${link.title} dialog`}
            onClick={handleCloseSheets}
          >
            {renderLinkContent(link, isSheetOpen)}
          </Button>
        </DialogTrigger>
        <DialogContent className="p-6 max-w-md">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Create Something New</h2>
            <p className="text-sm text-muted-foreground">
              Share your culinary creations with the YumBook community.
            </p>
            <div className="flex gap-2">
              <Button className="flex-1">Create Post</Button>
              <Button variant="outline" className="flex-1">
                Create Recipe
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const renderRegularLink = (link: LinkProps) => {
    const active = isActive(link.href, link.matchExact);

    return (
      <Button
        key={link.href}
        size={isSheetOpen ? "default" : "lg"}
        variant="ghost"
        className={getButtonStyles(active, isSheetOpen)}
        asChild
        aria-label={`Navigate to ${link.title}`}
        onClick={handleCloseSheets}
      >
        <Link
          href={link.href}
          className={cn(
            "flex items-center",
            isSheetOpen ? "justify-center" : "gap-4"
          )}
        >
          {renderLinkContent(link, isSheetOpen)}
        </Link>
      </Button>
    );
  };

  return (
    <aside
      className={cn(
        "bg-background h-screen border-r flex flex-col transition-all duration-300",
        isSheetOpen ? "w-20 px-2" : "w-[18rem] px-5"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Header */}
      <header
        className={cn(
          "py-10 transition-all duration-300",
          isSheetOpen ? "px-0" : "pl-5"
        )}
      >
        <Link
          href="/home"
          className={cn(
            "flex items-center font-mono hover:opacity-80 transition-opacity",
            isSheetOpen ? "justify-center" : "text-2xl gap-2"
          )}
          aria-label="YumBook home"
          onClick={handleCloseSheets}
        >
          <ChefHatIcon
            className={cn(
              "transition-all duration-300",
              isSheetOpen ? "size-6" : "size-8"
            )}
          />
          {!isSheetOpen && <span>YumBook</span>}
        </Link>
      </header>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col justify-between">
        <div
          className={cn(
            "space-y-1.5",
            isSheetOpen && "flex flex-col items-center"
          )}
          role="list"
        >
          {links.map((link) => {
            if (link.type === "sheet" && link.href === "/search") {
              return renderSearchSheet(link);
            }

            if (link.type === "sheet" && link.href === "/notifications") {
              return renderNotificationsSheet(link);
            }

            if (link.type === "dialog") {
              return renderDialogTrigger(link);
            }

            return renderRegularLink(link);
          })}
        </div>

        {/* Footer section */}
        {!isSheetOpen && (
          <div className="pb-6">
            {user && (
              <div className="text-sm text-muted-foreground px-3">
                Welcome back, {user.firstName || "Chef"}!
              </div>
            )}
          </div>
        )}
      </nav>
    </aside>
  );
}
