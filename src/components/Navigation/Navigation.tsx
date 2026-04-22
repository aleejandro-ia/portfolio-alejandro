import React from "react";
import { Menu, X } from "lucide-react";
import { useMenu } from "../../hooks/useMenu";
import { COLORS } from "../../constants";

export interface NavItem {
  label: string;
  href?: string;
  highlight?: boolean;
  action?: () => void;
}

interface NavigationProps {
  items: NavItem[];
  onItemSelect?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ items, onItemSelect }) => {
  const { isOpen, menuRef, buttonRef, toggle, handleItemClick } = useMenu(onItemSelect);

  return (
    <div ref={menuRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        className="p-2 transition-colors duration-300 z-50 text-neutral-500 hover:text-accent"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={toggle}
      >
        {isOpen ? (
          <X className="w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300" strokeWidth={2} />
        ) : (
          <Menu className="w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300" strokeWidth={2} />
        )}
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-[-16px] sm:left-0 w-[100vw] sm:w-[240px] border-none shadow-2xl mt-4 sm:mt-2 sm:ml-4 p-6 sm:p-4 rounded-b-2xl sm:rounded-lg z-[100] bg-black/95 backdrop-blur-md sm:bg-black border-t border-b sm:border border-white/10"
        >
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href || "#"}
              className="block text-xl sm:text-lg md:text-xl font-bold tracking-tight py-4 sm:py-2 px-6 sm:px-3 cursor-pointer transition-colors duration-300"
              style={{
                color: item.highlight ? COLORS.accent : COLORS.white,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = COLORS.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = item.highlight
                  ? COLORS.accent
                  : COLORS.white;
              }}
              onClick={(e) => {
                e.preventDefault();
                handleItemClick(item);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
