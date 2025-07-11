import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LucideShoppingCart, UserCircle2 } from "lucide-react";
import logo from "../../assets/svg/logo.svg";
import GlobalSearch from "../Input/SearchBox";
import ImageButton from "../Button/ImageBtn";
import NotificationButton from "../Alert/NotificationButton";
import NotificationCard from "../Alert/NotificationCard";
import { ModeToggle } from "../mode-toggle";
import InvisibleSection from "@/UIBlocks/InvisibleSection";

function AppHeader() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  const loginRef = useRef<HTMLDivElement>(null!);
  const showTimer = useRef<NodeJS.Timeout | null>(null);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const showLabel = windowWidth > 600;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      // Clear timers on unmount
      if (showTimer.current) clearTimeout(showTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const handleLoginMouseEnter = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    showTimer.current = setTimeout(() => {
      setShowLoginDropdown(true);
    }, 200); // Delay before showing
  };

  const handleLoginMouseLeave = () => {
    if (showTimer.current) clearTimeout(showTimer.current);
    hideTimer.current = setTimeout(() => {
      setShowLoginDropdown(false);
    }, 300); // Delay before hiding
  };

  const NotificationData = [
    {
      date: "2023-08-01",
      title: 'Created "Preline in React" task',
      description: "Find more detailed instructions here.",
      user: {
        name: "James Collins",
        avatar: "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?...",
      },
    },
    {
      date: "2023-08-01",
      title: 'Created "Preline in React" task',
      description: "Find more detailed instructions here.",
      user: {
        name: "James Collins",
        avatar: "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?...",
      },
      
    },
    {
      date: "2023-09-01",
      title: 'Created "Preline in React" task',
      description: "Find more detailed instructions here.",
      user: {
        name: "James Collins",
        avatar: "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?...",
      },
      
    },
  ];

  const menu = [
    {
      label: "My Profile",
      path: "/profile",
      icon: "user",
    },
    {
      label: "Register",
      path: "/signup",
      icon: "register",
    },
    {
      label: "My Orders",
      path: "/orders",
      icon: "plus",
    },
    {
      label: "Wishlist",
      path: "/wishlist",
      icon: "like",
    },
    {
      label: "Logout",
      path: "/logout",
      icon: "logout",
    },
  ];

  return (
    <header className="sticky top-0 z-50 px-[5%] sm:px-5 py-1 bg-background border-b border-ring/30 shadow-lg">
      {showMobileSearch ? (
        <div className="flex justify-end p-2 gap-2 w-full">
          <GlobalSearch className="flex-1 w-full" />
          <ImageButton
            icon="close"
            onClick={() => setShowMobileSearch(false)}
            className="border border-ring/30 p-2"
          />
        </div>
      ) : (
        <div className="flex items-center justify-between gap-5">
          {/* Logo */}
          <div className="flex-shrink-0 p-2">
            <img
              src={logo}
              alt="Mazsone Logo"
              className="w-10 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 flex-1 justify-end lg:gap-5 p-2">
            {/* Desktop Search */}
            <div className="hidden sm:block">
              <GlobalSearch className="flex-1 md:min-w-[300px] lg:min-w-[500px]" />
            </div>

            {/* Mobile Search */}
            <div className="flex sm:hidden items-center gap-2">
              <ImageButton
                icon="search"
                onClick={() => setShowMobileSearch(true)}
                className="border border-ring/30 p-2"
              />
            </div>

            {/* Notification */}
            <div className="relative">
              <NotificationButton
                mode="icon"
                count={3}
                icon="bell"
                onClick={() => setShowNotification(!showNotification)}
              />
              {showNotification && (
                <div className="absolute top-12 z-100 right-0">
                  <NotificationCard
                    items={NotificationData}
                    showCollapse
                    onClose={() => setShowNotification(false)}
                  />
                </div>
              )}
            </div>

            {/* Cart */}
            <div
              className="flex items-center gap-2 text-md text-foreground/80 cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <LucideShoppingCart size={25} />
              {showLabel && "Cart"}
            </div>

            {/* Login with Dropdown */}
            <div
              className="relative flex items-center gap-2 text-md text-foreground/80 cursor-pointer"
              ref={loginRef}
              onMouseEnter={handleLoginMouseEnter}
              onMouseLeave={handleLoginMouseLeave}
            >
              <UserCircle2 size={25} />
              {showLabel && "Login"}

              <InvisibleSection
                anchorRef={loginRef}
                visible={showLoginDropdown}
                content={
                  <div className="w-[220px] flex flex-col rounded-md bg-background shadow-xl ring-1 ring-ring/30 p-2 space-y-1 text-sm transform duration-500">
                    {menu.map((item, idx) => (
                      <ImageButton
                        key={idx}
                        className="hover:bg-accent p-2 rounded cursor-pointer"
                        icon={item.icon}
                        label={item.label}
                        onClick={() => navigate(item.path)}
                      />
                    ))}
                  </div>
                }
              />
            </div>

            {/* Dark Mode Toggle */}
            <div className="hidden sm:block">
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default AppHeader;
