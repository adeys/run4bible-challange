import { RiDeleteBinLine } from "@remixicon/react";
import { useEffect } from "react";

import type { Reading } from "~/components/calendar";
import { ReadingForm } from "~/components/reading/reading-form";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

interface ReadingDialogProps {
  reading: Reading | null;
  error?: string | null;
  action?: string;
  isOpen: boolean;
  onClose?: () => void;
  // onSave: (reading: Reading) => void;
  onDelete?: (eventId: string) => void;
}

export function ReadingFormDialog({
  action,
  reading,
  error,
  isOpen,
  onClose,
  onDelete,
}: ReadingDialogProps) {
  // Debug log to check what reading is being passed
  useEffect(() => {
    console.log("ReadingFormDialog received reading:", reading);
  }, [reading]);

  const handleDelete = () => {
    if (reading?.id) {
      onDelete?.(reading.id);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {reading?.id ? "Edit Event" : "Create Event"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {reading?.id
              ? "Edit the details of this reading"
              : "Add a new reading to your calendar"}
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="bg-destructive/15 text-destructive rounded-md px-3 py-2 text-sm">
            {error}
          </div>
        )}

        <ReadingForm reading={reading} action={action} />

        <DialogFooter className="flex-row sm:justify-between">
          {reading?.id && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleDelete}
              aria-label="Delete reading"
            >
              <RiDeleteBinLine size={16} aria-hidden="true" />
            </Button>
          )}
          <div className="flex flex-1 justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" form="reading-form">
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
