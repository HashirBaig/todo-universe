import CardWrapper from "@/components/CardWrapper";
import DataTable from "@/components/DataTable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavTabsList, DataTaskList, type TypeTaskList } from "@/lib/const";
import { getColumns } from "@/components/DataTable/columns";

import { useMemo, useState } from "react";
import { toast } from "sonner";

function TaskList() {
  const [activeTab, setActiveTab] = useState<string | null>("");

  const onTabChange = (value: string | null) => {
    setActiveTab(value);
  };

  const handleEdit = (task: TypeTaskList) => {
    try {
      console.log("edit task: ", task);
      toast.success("Task successfully updated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to edit!");
    }
  };

  const handleDelete = (task: TypeTaskList) => {
    try {
      console.log("delete task: ", task);
      toast.success("Task successfully deleted!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to edit!");
    }
  };

  const columns = useMemo(
    () => getColumns({ onEdit: handleEdit, onDelete: handleDelete }),
    [],
  );

  return (
    <CardWrapper>
      <Tabs className="w-full" onValueChange={onTabChange}>
        <TabsList>
          {NavTabsList?.map(({ label, value }, idx) => (
            <TabsTrigger value={value} key={`nav-tabs-todo-${idx}`}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab}>
          <DataTable columns={columns} data={DataTaskList} />
        </TabsContent>
      </Tabs>
    </CardWrapper>
  );
}

export default TaskList;
