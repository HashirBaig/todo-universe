import CardWrapper from "@/components/CardWrapper";
import DataTable from "@/components/DataTable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavTabsList, type TYPE_TASK_LIST } from "@/lib/const";
import { getColumns } from "@/components/DataTable/columns";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useTaskStore } from "@/store/taskStore";

import DeleteTaskModel from "@/components/Models/DeleteTaskModel";
import EditTaskModel from "@/components/Models/EditTaskModel";

type TaskListProps = {
  dataList: TYPE_TASK_LIST[];
  getList: (activeTab?: string) => void;
};

function TaskList({ dataList, getList }: TaskListProps) {
  // Model states
  const [isDeleteTaskModelOpen, setIsDeleteTaskModelOpen] =
    useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<TYPE_TASK_LIST | null>(null);
  const [isEditTaskModelOpen, setIsEditTaskModelOpen] =
    useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<TYPE_TASK_LIST | null>(null);

  // Active tab state
  const [activeTab, setActiveTab] = useState<string | null>("");

  // Store methods
  const setTaskInfo = useTaskStore((state) => state?.setTaskInfo);
  const setMultiSelect = useTaskStore((state) => state?.setMultiSelect);

  // useEffect Hook
  useEffect(() => {
    getList(activeTab ?? "all");
  }, [activeTab, getList]);

  useEffect(() => {
    setTaskInfo({
      totalTask: dataList?.length || 0,
      remainingTask: dataList?.filter((item) => !item?.isCompleted)?.length,
    });
  }, [setTaskInfo, dataList]);

  // On change method
  const onTabChange = (value: string | null) => {
    setActiveTab(value);
  };

  const handleSelectionCountChange = useCallback(
    (count: number) => {
      setMultiSelect(count > 1);
    },
    [setMultiSelect],
  );

  // Toggle model methods
  const openDeleteModal = (task: TYPE_TASK_LIST) => {
    setIsDeleteTaskModelOpen(true);
    setTaskToDelete(task);
  };

  const openEditModal = (task: TYPE_TASK_LIST) => {
    setIsEditTaskModelOpen(true);
    setTaskToEdit(task);
  };

  // Edit Task Method
  const handleEdit = (updatedTask: TYPE_TASK_LIST) => {
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
            <DataTable
              columns={columns}
              data={dataList}
              onSelectionCountChange={handleSelectionCountChange}
            />
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
