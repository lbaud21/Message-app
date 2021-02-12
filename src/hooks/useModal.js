import { useState, useCallback } from "react";

export default function useModal() {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  return [open, openModal, closeModal];
}
