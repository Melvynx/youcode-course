import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CoursePlaceholder } from '../../../courses/[courseId]/CoursePlaceholder';

export default function CourseDialogLoading() {
  return (
    <Dialog open={true}>
      <DialogContent className="max-h-screen max-w-3xl overflow-auto">
        <DialogHeader>
          <DialogTitle>Loading...</DialogTitle>
        </DialogHeader>
        <CoursePlaceholder />
      </DialogContent>
    </Dialog>
  );
}
