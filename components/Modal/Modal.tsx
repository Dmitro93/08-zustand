"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

 useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      if (onClose) onClose();
      else router.back();
    }
  };

  document.addEventListener("keydown", handleEsc);
  document.body.style.overflow = "hidden";

  return () => {
    document.removeEventListener("keydown", handleEsc);
    document.body.style.overflow = "auto";
  };
}, [onClose, router]);

  
  const modalRoot =
    typeof window !== "undefined"
      ? document.getElementById("modal-root")
      : null;

  if (!modalRoot) return null;

  return createPortal(
    <div onClick={handleClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot
  );
}