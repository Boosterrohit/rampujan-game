"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DialogContextType {
  openDialog: (content: ReactNode) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const openDialog = (content: ReactNode) => {
    setContent(content);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Dialog open={isOpen} onOpenChange={closeDialog}>
        <DialogContent>{content}</DialogContent >
      </Dialog>
    </DialogContext.Provider>
  );
}

export const useDialog = () => useContext(DialogContext)!;