import CardWrapper from "@/components/CardWrapper";
import DataTable from "@/components/DataTable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavTabsList, DataTaskList, type TypeTaskList } from "@/lib/const";
import { getColumns } from "@/components/DataTable/columns";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useTaskStore } from "@/store/taskStore";

import DeleteTaskModel from "@/components/Models/DeleteTaskModel";
import EditTaskModel from "@/components/Models/EditTaskModel";

function TaskList() {
  const [isDeleteTaskModelOpen, setIsDeleteTaskModelOpen] =
    useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<TypeTaskList | null>(null);
  const [isEditTaskModelOpen, setIsEditTaskModelOpen] =
    useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<TypeTaskList | null>(null);

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

  const openEditModal = (task: TypeTaskList) => {
    setIsEditTaskModelOpen(!isEditTaskModelOpen);
    setTaskToEdit(task);
  };

  // Edit Task Method
  const handleEdit = (updatedTask: TypeTaskList) => {
    try {
      console.log("edit task: ", updatedTask);
      toast.success("Task successfully edited!");
      // TODO: setTaskData(taskData.map(t => t.id === updatedTask.id ? updatedTask : t))
      // or call an update API once one exists
    } catch (error) {
      console.error(error);
      toast.error("Failed to edit!");
    } finally {
      setIsEditTaskModelOpen(false);
      setTaskToEdit(null);
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
        onEditClick: openEditModal,
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
      <EditTaskModel
        open={isEditTaskModelOpen}
        onOpenChange={setIsEditTaskModelOpen}
        task={taskToEdit}
        onEdit={handleEdit}
      />

      <DeleteTaskModel
        open={isDeleteTaskModelOpen}
        onOpenChange={setIsDeleteTaskModelOpen}
        onDelete={handleDelete}
      />
    </>
  );
}

export default TaskList;
