import { useState, useCallback, useRef, type RefObject } from "react";
import { useClickOutside } from "./useClickOutside";

export interface MenuAction {
  label: string;
  href?: string;
  action?: () => void;
  highlight?: boolean;
}

export interface UseMenuReturn {
  isOpen: boolean;
  menuRef: RefObject<HTMLDivElement>;
  buttonRef: RefObject<HTMLButtonElement>;
  toggle: () => void;
  close: () => void;
  handleItemClick: (item: MenuAction) => void;
}

export function useMenu(onItemClick?: () => void): UseMenuReturn {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleItemClick = useCallback(
    (item: MenuAction) => {
      if (item.action) {
        item.action();
      } else if (item.href) {
        if (item.href.startsWith("#")) {
          const element = document.querySelector(item.href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          window.location.href = item.href;
        }
      }
      close();
      onItemClick?.();
    },
    [close, onItemClick]
  );

  return {
    isOpen,
    menuRef,
    buttonRef,
    toggle,
    close,
    handleItemClick,
  };
}
