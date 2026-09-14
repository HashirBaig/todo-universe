import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { type OrderTrend } from "../../lib/const";

type OrderTrendChartProps = {
  data: OrderTrend[];
};

function OrderTrendChart({ data }: OrderTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
        <XAxis
          dataKey="date"
          tickFormatter={(date: string) => dayjs(date).format("DD MMM")}
          stroke="#a1a1aa"
          fontSize={12}
        />
        <YAxis allowDecimals={false} stroke="#a1a1aa" fontSize={12} />
        <Tooltip
          labelFormatter={(date: React.ReactNode) => {
            if (typeof date === "string") {
              return dayjs(date).format("DD MMM YYYY");
            }

            return date;
          }}
          contentStyle={{
            backgroundColor: "#18181b",
            border: "1px solid #3f3f46",
            borderRadius: "8px",
          }}
        />
        <Line
          type="monotone"
          dataKey="orderCount"
          stroke="#3f6212"
          strokeWidth={2}
          dot={{ fill: "#3f6212", r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default OrderTrendChart;
