import CardWrapper from "@/components/CardWrapper";
import DataTable from "@/components/DataTable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavTabsList, DataTaskList, type TypeTaskList } from "@/lib/const";
import { getColumns } from "@/components/DataTable/columns";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useTaskStore } from "@/store/taskStore";

function TaskList() {
  const [activeTab, setActiveTab] = useState<string | null>("");
  const [taskData, setTaskData] = useState<TypeTaskList[]>([]);
  const setTaskInfo = useTaskStore((state) => state?.setTaskInfo);

  const getTaskData = useCallback(() => {
    if (activeTab === "active") {
      const _data = DataTaskList?.filter((item) => !item?.isCompleted);
      setTaskData(_data);
    } else if (activeTab === "completed") {
      const _data = DataTaskList?.filter((item) => item?.isCompleted);
      setTaskData(_data);
    } else {
      setTaskData(DataTaskList);
    }
  }, [activeTab]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getTaskData();
  }, [getTaskData]);

  useEffect(() => {
    setTaskInfo({
      totalTask: taskData?.length || 0,
      remainingTask: taskData?.filter((item) => !item?.isCompleted)?.length,
    });
  }, [setTaskInfo, taskData]);

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
          <DataTable columns={columns} data={taskData} />
        </TabsContent>
      </Tabs>
    </CardWrapper>
  );
}

export default TaskList;
