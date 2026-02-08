"use client";

import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

interface LoginRequiredDialogProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

export default function LoginRequiredDialog({
  isOpen,
  onClose,
  featureName = "this feature",
}: LoginRequiredDialogProps) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login Required</DialogTitle>
          <p className="text-sm text-muted-foreground">To access {featureName}, you need to be logged in</p>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <LogIn className="w-8 h-8 text-primary" />
            </div>
            <p className="text-foreground font-medium">
              You're almost there! Please log in to continue.
            </p>
            <p className="text-sm text-muted-foreground">
              Create an account if you don't have one yet and start playing now.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            <Button
              onClick={handleLogin}
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Go to Login
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
