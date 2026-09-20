import Wrapper from "../components/Wrapper";
import Hero from "../components/Hero";
import AddTaskCard from "@/components/AddTaskCard";
import TaskList from "@/components/TaskList";

import { useState, useEffect, useCallback } from "react";
import { useTaskStore } from "@/store/taskStore";
import { getAllTaskByUser } from "@/services/taskService";
import { type TYPE_TASK_LIST } from "@/lib/const";
import { toast } from "sonner";
import { filterTasksByTab } from "@/lib/utils";

function LandingPage() {
  const totalTask = useTaskStore((state) => state.totalTask);
  const remainingTask = useTaskStore((state) => state.remainingTask);
  const [taskData, setTaskData] = useState<TYPE_TASK_LIST[]>([]);

  const getTaskData = useCallback(async (activeTab: string | null = "all") => {
    try {
      console.log("active tab: ", activeTab);
      const res = await getAllTaskByUser();
      setTaskData(filterTasksByTab(res?.data ?? [], activeTab));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch data");
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getTaskData();
  }, [getTaskData]);

  return (
    <Wrapper>
      <Hero />

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3 text-blue-100">
            <h1 className="text-4xl font-semibold">All Tasks</h1>
            <p>
              {totalTask || 0} tasks . {remainingTask || 0} remaining
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <AddTaskCard getList={getTaskData} />
      </section>

      <section className="mt-8">
        <TaskList dataList={taskData} getList={getTaskData} />
      </section>
    </Wrapper>
  );
}

export default LandingPage;
