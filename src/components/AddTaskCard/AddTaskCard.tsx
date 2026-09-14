import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import CardWrapper from "@/components/CardWrapper";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Calendar } from "lucide-react";

type AddTaskFormData = {
  task: string;
};

function AddTaskCard() {
  const [formData, setFormData] = useState<AddTaskFormData>({ task: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const _data = { ...formData };
      console.log("form-data: ", _data);

      toast.success("Task successfully created!");
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      toast.error(`Error Occurred ${err}`);
    }
  };

  return (
    <CardWrapper>
      <form className="flex items-center gap-4" onSubmit={handleOnSubmit}>
        <div className="flex items-center grow border-2 border-blue-400/10 rounded-xl focus-within:ring-2 focus-within:ring-blue-300/10 focus-within:outline-none transition-shadow">
          <Input
            id="task"
            type="text"
            className="text-lg border-none focus-visible:ring-0 focus-visible:outline-none"
            placeholder="What needs to be done?"
            value={formData.task}
            onChange={(e) =>
              setFormData({ ...formData, task: e?.target?.value })
            }
            disabled={isLoading}
          />

          <Calendar className="size-8 text-blue-400 mr-2" />
        </div>

        <Button className={"text-lg"}>
          {isLoading ? (
            <Spinner className="size-6" />
          ) : (
            <>
              <Plus className="size-7" />
              <span>Add Task</span>
            </>
          )}
        </Button>
      </form>
    </CardWrapper>
  );
}

export default AddTaskCard;
