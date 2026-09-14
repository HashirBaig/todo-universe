import { MoveUp, MoveDown } from "lucide-react";

type MetricCardProps = {
  title: string;
  amount: number;
  isPositive: boolean;
  percValue: number;
  icon: React.ReactNode;
};

function MetricCard({
  title,
  amount,
  isPositive,
  percValue,
  icon,
}: MetricCardProps) {
  return (
    <div className="p-6 border border-gray-700 bg-inherit rounded-2xl space-y-2">
      <h1 className="text-sm">{title}</h1>
      <h1 className="text-3xl font-semibold">{amount}</h1>

      <div className="flex mt-8">
        <div className="flex gorw items-center gap-2">
          {isPositive ? (
            <MoveUp className="size-6 text-lime-600" />
          ) : (
            <MoveDown className="size-6 text-red-600" />
          )}
          <span className="text-xl">{percValue}%</span>
        </div>
        <div className="flex grow items-center justify-end">{icon}</div>
      </div>
    </div>
  );
}

export default MetricCard;
