import { useEffect, useState } from "react";
import NotificationButton from "../Alert/NotificationButton";
import logo from '../../assets/svg/logo.svg';
import GlobalSearch from "../Input/SearchBox";
import ImageButton from "../Button/ImageBtn";
import NotificationCard from "../Alert/NotificationCard";
import { ModeToggle } from "../mode-toggle";

function AppHeader() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // ✅ Track window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showLabel = windowWidth > 600;

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
    date: "2023-08-01",
    title: 'Created "Preline in React" task',
    description: "Find more detailed instructions here.",
    user: {
      name: "James Collins",
     initial:"J"
    },
  },
  {
    date: "2023-05-01",
    title: 'Created "Preline in React" task',
    description: "Find more detailed instructions here.",
    user: {
      name: "James Collins",
     initial:"J"
    },
  },
  {
    date: "2023-06-01",
    title: 'Created "Preline in React" task',
    description: "Find more detailed instructions here.",
    user: {
      name: "James Collins",
     initial:"J"
    },
  },
    {
    date: "2023-07-01",
    title: 'Created "Preline in React" task',
    description: "Find more detailed instructions here.",
    user: {
      name: "James Collins",
     initial:"J"
    },
  },
];

  return (
   <header className="sticky top-0 z-50 px-2 sm:px-5 py-1 bg-background border-b border-ring/20">
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
            <img src={logo} alt="LogicX Logo" className="w-25" />
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3 flex-1 justify-end p-2">
            <div className="hidden sm:block">
              <GlobalSearch className="flex-1 max-w-[800px]" />
            </div>

            <div className="flex sm:hidden items-center gap-2">
              <ImageButton
                icon="search"
                onClick={() => setShowMobileSearch(true)}
                className="border border-ring p-2"
              />
            </div>

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

            {/* ✅ Conditional Label */}
            <ImageButton icon="user" label={showLabel ? "Login" : ""} path={'/login'} />
            <ImageButton icon="cart" label={showLabel ? "Cart" : ""} path="/cart"/>

            {/* Dark mode toggle hidden for now */}
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
