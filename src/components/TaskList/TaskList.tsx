import CardWrapper from "@/components/CardWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavTabsList, DataTaskList } from "@/lib/const";
import DataTable from "@/components/DataTable";
import { columns } from "@/components/DataTable/columns";

import { useState } from "react";

function TaskList() {
  const [activeTab, setActiveTab] = useState<string | null>("");

  const onTabChange = (value: string | null) => {
    setActiveTab(value);
  };

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
