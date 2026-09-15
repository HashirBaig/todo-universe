import Wrapper from "../components/Wrapper";
import Hero from "../components/Hero";
import AddTaskCard from "@/components/AddTaskCard";
import TaskList from "@/components/TaskList";

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
            <p>
              {"5"} tasks . {"2"} remaining
            </p>
          </div>
        </div>
      </section>

      {/* Add Task Card */}
      <section className="mt-8">
        <AddTaskCard />
      </section>

      {/* Task Listing */}
      <section className="mt-8">
        <TaskList />
      </section>
    </Wrapper>
  );
}

export default LandingPage;
