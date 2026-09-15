import CardWrapper from "@/components/CardWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavTabsList } from "@/lib/const";

function TaskList() {
  return (
    <CardWrapper>
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          {NavTabsList?.map(({ label, value }, idx) => (
            <TabsTrigger value={value} key={`nav-tabs-todo-${idx}`}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">All.</TabsContent>
        <TabsContent value="active">Active.</TabsContent>
        <TabsContent value="completed">Completed.</TabsContent>
      </Tabs>
    </CardWrapper>
  );
}

export default TaskList;
