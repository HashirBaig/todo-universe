import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import CardWrapper from "@/components/CardWrapper";

import { useState } from "react";
import { toast } from "sonner";

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
        <Input
          id="task"
          type="task"
          className="text-lg"
          placeholder="What needs to be done?"
          value={formData.task}
          onChange={(e) => setFormData({ ...formData, task: e?.target?.value })}
          disabled={isLoading}
        />

        <Button className={"w-20 text-lg"}>
          {isLoading ? <Spinner className="size-6" /> : <span>Add</span>}
        </Button>
      </form>
    </CardWrapper>
  );
}

export default AddTaskCard;
