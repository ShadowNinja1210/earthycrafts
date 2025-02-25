"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NotebookPen, X } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function ContactFloater() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <Button
          onClick={togglePanel}
          className="rounded-full w-[58px] h-[58px] shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
          aria-label={isOpen ? "Close social panel" : "Open social panel"}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close-icon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp-icon"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Image src="/images/contact-floater.svg" alt="WhatsApp" width={50} height={50} />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {isOpen && (
        <motion.div
          className={cn(
            "absolute bottom-16 right-0 bg-background border rounded-lg shadow-lg p-4 flex flex-col gap-2 w-fit",
            "transition-all duration-500 ease-in-out"
          )}
          initial={{ opacity: 0, scale: 0.8, height: 0 }}
          animate={{ opacity: 1, scale: 1, height: "auto" }}
          exit={{ opacity: 0, scale: 0.8, height: 0 }}
          transition={{ duration: 0, ease: "easeInOut" }}
        >
          <SocialLink
            target="_blank"
            rel="noopener noreferrer"
            href={process.env.NEXT_PUBLIC_WHATSAPP_URL || "#"}
            icon={<FaWhatsapp size={24} />}
          />
          <SocialLink
            target="_blank"
            rel="noopener noreferrer"
            href={process.env.NEXT_PUBLIC_FB_URL || "#"}
            icon={<FaFacebook size={24} />}
          />
          <SocialLink
            target="_blank"
            rel="noopener noreferrer"
            href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#"}
            icon={<FaInstagram size={24} />}
          />
          <SocialLink
            target="_blank"
            rel="noopener noreferrer"
            href={process.env.NEXT_PUBLIC_LINKEDIN_URL || "#"}
            icon={<FaLinkedin size={24} />}
          />
          <SocialLink href="/contact" icon={<NotebookPen size={24} />} />
        </motion.div>
      )}
    </div>
  );
}

function SocialLink({
  href,
  icon,
  target,
  rel,
}: {
  href: string;
  icon: React.ReactNode;
  target?: string;
  rel?: string;
}) {
  return (
    <Link className="hover:text-neutral-700" href={href || "#"} target={target} rel={rel}>
      {icon}
      <span className=" sr-only">WhatsApp</span>
    </Link>
  );
}
