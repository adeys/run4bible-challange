import { useEffect, useState } from "react";

import type { Reading } from "~/components/calendar";
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
  isOpen: boolean;
  onClose: () => void;
  onSave: (reading: Reading) => void;
  onDelete: (eventId: string) => void;
}

function ReadingDetailItem({
  label,
  value,
}: {
  label: string;
  value: string | string[] | undefined;
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="font-bold text-sm">{label}</dt>
      <div className="text-gray-700">
        {Array.isArray(value) ? value.join(", ") : value || "-"}
      </div>
    </div>
  );
}

export function ReadingDialog({
  reading,
  isOpen,
  onClose,
}: ReadingDialogProps) {
  const [error, setError] = useState<string | null>(null);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{reading?.label} Reading</DialogTitle>
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
        <div className="grid gap-4 py-4">
          <dl className="space-y-4">
            <ReadingDetailItem label="Passages" value={reading?.passages} />
            <ReadingDetailItem label="Context" value={reading?.context} />
            <ReadingDetailItem label="Summary" value={reading?.summary} />
            <ReadingDetailItem label="Lesson" value={reading?.lesson} />
          </dl>
        </div>
        <DialogFooter className="flex-row sm:justify-between">
          <div className="flex flex-1 justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
