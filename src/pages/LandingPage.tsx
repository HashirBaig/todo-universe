import Wrapper from "../components/Wrapper";
import Hero from "../components/Hero";
import AddTaskCard from "@/components/AddTaskCard";
import TaskList from "@/components/TaskList";

import { useState, useEffect, useCallback } from "react";
import { useTaskStore } from "@/store/taskStore";
import { useUserStore } from "@/store/userStore";
import { getTaskListByUser } from "@/services/taskService";
import { toast } from "sonner";

import type { TYPE_TASK_LIST, TYPE_PAGINATION } from "@/lib/const";

const DEFAULT_PAGINATION: TYPE_PAGINATION = {
  page: 1,
  limit: 4,
  total: 0,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
};

function LandingPage() {
  const totalTask = useTaskStore((state) => state?.totalTask);
  const remainingTask = useTaskStore((state) => state?.remainingTask);
  const username = useUserStore((state) => state?.username);

  const [pagination, setPagination] =
    useState<TYPE_PAGINATION>(DEFAULT_PAGINATION);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [taskData, setTaskData] = useState<TYPE_TASK_LIST[]>([]);

  const getTaskData = useCallback(
    async (tab: string = "all", page: number = 1) => {
      try {
        const params = { filter: tab || "all", page, limit: pagination.limit };

        console.log("params: ", params);

        const res = await getTaskListByUser(params);
        setTaskData(res?.data?.data);
        setPagination(res?.data?.pagination ?? DEFAULT_PAGINATION);
        setActiveTab(tab);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch data");
      }
    },
    [pagination.limit],
  );

  useEffect(() => {
    if (username) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getTaskData();
    }
  }, [getTaskData, username]);

  const handlePageChange = (page: number) => {
    console.log("page: ", page);
    getTaskData(activeTab, page);
  };

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
        <TaskList
          dataList={taskData}
          getList={getTaskData}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </section>
    </Wrapper>
  );
}

export default LandingPage;
