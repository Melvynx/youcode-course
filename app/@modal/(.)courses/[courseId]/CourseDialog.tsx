"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";

export type CourseDialogProps = PropsWithChildren;

export const CourseDialog = (props: CourseDialogProps) => {
  const router = useRouter();

  return (
    <Dialog
      open={true}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className="max-h-screen max-w-3xl overflow-auto">
        {props.children}
      </DialogContent>
    </Dialog>
  );
};
