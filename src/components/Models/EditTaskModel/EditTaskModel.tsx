import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

type EditTaskModelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
};

function EditTaskModel({ open, onOpenChange, onDelete }: EditTaskModelProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Edit Task</DialogTitle>
        </DialogHeader>

        <form className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="task">Task</Label>
            <Input id="task" type="text" />
          </div>

          <DialogFooter className="bg-gray-900 border-gray-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-700 text-gray-300 hover:bg-gray-900 hover:text-gray-100"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-800" onClick={onDelete}>
              Edit Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditTaskModel;
