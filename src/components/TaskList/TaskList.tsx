import CardWrapper from "@/components/CardWrapper";
import DataTable from "@/components/DataTable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavTabsList, DataTaskList, type TypeTaskList } from "@/lib/const";
import { getColumns } from "@/components/DataTable/columns";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useTaskStore } from "@/store/taskStore";

import DeleteTaskModel from "@/components/Models/DeleteTaskModel";

function TaskList() {
  const [isDeleteTaskModelOpen, setIsDeleteTaskModelOpen] =
    useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<TypeTaskList | null>(null);

  const [activeTab, setActiveTab] = useState<string | null>("");
  const [taskData, setTaskData] = useState<TypeTaskList[]>([]);

  const setTaskInfo = useTaskStore((state) => state?.setTaskInfo);

  // Get Task Data List
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

  // Use Effect hook
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

  // On change method
  const onTabChange = (value: string | null) => {
    setActiveTab(value);
  };

  // Toggle model methods
  const openDeleteModal = (task: TypeTaskList) => {
    setIsDeleteTaskModelOpen(!isDeleteTaskModelOpen);
    setTaskToDelete(task);
  };

  // Edit Task Method
  const handleEdit = (task: TypeTaskList) => {
    try {
      console.log("edit task: ", task);
      toast.success("Task successfully updated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to edit!");
    }
  };

  // Delete Task Method
  const handleDelete = () => {
    if (!taskToDelete) return;

    try {
      console.log("delete task: ", taskToDelete);
      toast.success("Task successfully deleted!");
      // TODO: setTaskData(taskData.filter(t => t.id !== taskToDelete.id))
      // or call a delete API once one exists
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete!");
    } finally {
      setIsDeleteTaskModelOpen(false);
      setTaskToDelete(null);
    }
  };

  const columns = useMemo(
    () =>
      getColumns({
        onEdit: handleEdit,
        onDeleteClick: openDeleteModal,
      }),
    [],
  );

  return (
    <>
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

      {/* Modals */}
      <DeleteTaskModel
        open={isDeleteTaskModelOpen}
        onOpenChange={setIsDeleteTaskModelOpen}
        onDelete={handleDelete}
      />
    </>
  );
}

export default TaskList;
