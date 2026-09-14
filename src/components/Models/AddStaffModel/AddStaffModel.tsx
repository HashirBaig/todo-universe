import { useState } from "react";
import { toast } from "sonner";
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
import { register, type RegisterPayload } from "../../../services/authService";

type AddStaffModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

const initialFormData: RegisterPayload = {
  email: "newstaff@mealcart.com",
  password: "abcd1234",
  fullName: "new staff",
  role: "STAFF",
};

function AddStaffModal({ open, onOpenChange, onSuccess }: AddStaffModalProps) {
  const [formData, setFormData] = useState<RegisterPayload>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await register(formData);
      setFormData(initialFormData);
      onSuccess();
      onOpenChange(false);
      toast.success("Staff member added successfully");
    } catch {
      setError("Failed to add staff member. Please try again.");
      toast.error("Failed to add staff member");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Add Staff Member</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-gray-300">
              Full Name
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="bg-gray-900 border-gray-800 text-gray-100 placeholder:text-gray-600"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-gray-900 border-gray-800 text-gray-100 placeholder:text-gray-600"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="bg-gray-900 border-gray-800 text-gray-100 placeholder:text-gray-600"
              required
            />
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
            <Button type="submit" className="bg-lime-800" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Staff"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddStaffModal;
