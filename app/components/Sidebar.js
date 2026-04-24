"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
import {
  Home,
  Flame,
  Clock,
  Heart,
  Leaf,
  Palette,
  Square,
  Moon,
  Zap,
  Car,
  Rocket,
  Building2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

export default function Sidebar({ isOpen, onClose, collapsed, onToggleCollapse }) {
  const pathname = usePathname();

  // Close mobile sidebar on route change
  useEffect(() => {
    onClose();
  }, [pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isActive = (href) => pathname === href;

  const menuItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Popular", icon: Flame, href: "/popular" },
    { name: "Recent", icon: Clock, href: "/new" },
    { name: "Favorites", icon: Heart, href: "/favorites" },
  ];

  const categories = [
    { name: "Nature", icon: Leaf, href: "/category/nature" },
    { name: "Abstract", icon: Palette, href: "/category/abstract" },
    { name: "Minimal", icon: Square, href: "/category/minimal" },
    { name: "Dark", icon: Moon, href: "/category/dark" },
    { name: "Anime", icon: Zap, href: "/category/anime" },
    { name: "Cars", icon: Car, href: "/category/cars" },
    { name: "Space", icon: Rocket, href: "/category/space" },
    { name: "City", icon: Building2, href: "/category/city" },
  ];

  const collapsedWidth = "w-16";
  const expandedWidth = "w-64";

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar (Full slide-out, always expanded) */}
      <aside
        className={`
          fixed lg:hidden top-0 left-0 z-50
          h-[100dvh] w-72
          bg-surface border-r border-border
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          flex flex-col overflow-hidden
        `}
      >
        {/* Mobile Header with Theme Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="text-lg font-bold text-primary">Menu</span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted/20 text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Menu */}
          <div className="p-4">
            <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-3 px-3">
              Menu
            </h3>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                      ${active ? "bg-accent/10 text-accent" : "text-muted hover:text-primary hover:bg-muted/10"}
                    `}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {item.name}
                    {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mx-4 h-px bg-border" />

          {/* Categories */}
          <div className="p-4">
            <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-3 px-3">
              Categories
            </h3>
            <nav className="space-y-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const active = isActive(cat.href);
                return (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                      ${active ? "bg-accent/10 text-accent" : "text-muted hover:text-primary hover:bg-muted/10"}
                    `}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {cat.name}
                    {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mx-4 h-px bg-border" />

          {/* Stats */}
          <div className="p-4">
            <div className="bg-background rounded-xl p-4 border border-border">
              <p className="text-xs text-muted mb-2">Total Wallpapers</p>
              <p className="text-2xl font-black text-primary">12,847</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-accent">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Live updates
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="p-4 border-t border-border bg-surface">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-primary truncate">Guest User</p>
              <p className="text-xs text-muted truncate">Sign in to save</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar (Collapsible) */}
      <aside
        className={`
          hidden lg:flex flex-col
          sticky top-16 left-0
          h-[calc(100dvh-4rem)]
          ${collapsed ? collapsedWidth : expandedWidth}
          bg-surface border-r border-border
          transition-all duration-300 ease-in-out
          overflow-hidden
        `}
      >
        {/* Collapse Toggle Button */}
        <div className="flex justify-end p-2">
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg hover:bg-muted/20 text-muted hover:text-primary transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {/* Main Menu */}
          <div className="px-2 pb-4">
            {!collapsed && (
              <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2 px-3">
                Menu
              </h3>
            )}
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center gap-3 rounded-xl transition-all
                      ${collapsed ? "justify-center px-2 py-3" : "px-3 py-2.5"}
                      ${active ? "bg-accent/10 text-accent" : "text-muted hover:text-primary hover:bg-muted/10"}
                    `}
                    title={collapsed ? item.name : undefined}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="text-sm font-medium truncate">{item.name}</span>
                        {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
                      </>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mx-3 h-px bg-border" />

          {/* Categories */}
          <div className="px-2 py-4">
            {!collapsed && (
              <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2 px-3">
                Categories
              </h3>
            )}
            <nav className="space-y-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const active = isActive(cat.href);
                return (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className={`
                      flex items-center gap-3 rounded-xl transition-all
                      ${collapsed ? "justify-center px-2 py-3" : "px-3 py-2.5"}
                      ${active ? "bg-accent/10 text-accent" : "text-muted hover:text-primary hover:bg-muted/10"}
                    `}
                    title={collapsed ? cat.name : undefined}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="text-sm font-medium truncate">{cat.name}</span>
                        {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
                      </>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {!collapsed && (
            <>
              <div className="mx-3 h-px bg-border" />
              {/* Stats */}
              <div className="p-4">
                <div className="bg-background rounded-xl p-4 border border-border">
                  <p className="text-xs text-muted mb-2">Total Wallpapers</p>
                  <p className="text-2xl font-black text-primary">12,847</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-accent">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    Live updates
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom User Section */}
        <div className="p-3 border-t border-border bg-surface">
          <div
            className={`
              flex items-center gap-3 rounded-xl transition-all
              ${collapsed ? "justify-center p-2" : "px-3 py-2"}
            `}
          >
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm shrink-0">
              U
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-primary truncate">Guest User</p>
                <p className="text-xs text-muted truncate">Sign in to save</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}