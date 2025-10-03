import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "../AuthDialog";

export default function AuthDialogExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>Abrir Login</Button>
      <AuthDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
