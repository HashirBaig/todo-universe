import Wrapper from "../components/Wrapper";
import Hero from "../components/Hero";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

function LandingPage() {
  return (
    <Wrapper>
      {/* Hero/Header */}
      <Hero />

      {/* Main */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3 text-blue-100">
            <h1 className="text-4xl font-semibold">All Tasks</h1>
            <p>5 tasks . 2 remaining</p>
          </div>
          <Button className={"text-blue-100"}>
            <Plus className="size-8" />
            <span className="text-xl">Add Task</span>
          </Button>
        </div>
      </section>
    </Wrapper>
  );
}

export default LandingPage;
