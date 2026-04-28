"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"]
});

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={`w-full max-w-3xl ${lato.className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div key={item.id} className="border-b border-white/10">
            <button
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-white/70 focus:outline-none group"
            >
              <span className="text-xl font-medium tracking-tight text-foreground transition-colors group-hover:text-primary">
                {item.title}
              </span>
              <div className="flex h-6 w-6 items-center justify-center text-muted-foreground transition-colors group-hover:text-primary">
                {isOpen ? (
                  <Minus className="h-5 w-5" />
                ) : (
                  <Plus className="h-5 w-5" />
                )}
              </div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto", marginBottom: 24 },
                    collapsed: { opacity: 0, height: 0, marginBottom: 0 }
                  }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden"
                >
                  <div className="text-muted-foreground leading-relaxed text-md font-light">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
