import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { STATUS_STYLES, type Order } from "../../lib/const";
import { formatCurrency } from "../../lib/utils";

import dayjs from "dayjs";

type DataTableProps = {
  data: Order[];
};

function DataTable({ data }: DataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className=" text-gray-100">Order #</TableHead>
          <TableHead className=" text-gray-100">Customer</TableHead>
          <TableHead className=" text-gray-100">Date</TableHead>
          <TableHead className="text-right text-gray-100">Amount</TableHead>
          <TableHead className=" text-gray-100">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((order: Order) => (
          <TableRow key={order.orderNumber}>
            <TableCell className="font-medium py-4">
              {order?.orderNumber}
            </TableCell>
            <TableCell className="py-4">{order.customerName}</TableCell>
            <TableCell className="py-4">
              {dayjs(order?.orderDate).format("DD/MM/YYYY")}
            </TableCell>
            <TableCell className="text-right py-4">
              {formatCurrency(order.totalAmount)}
            </TableCell>
            <TableCell className="py-4">
              <Badge variant="outline" className={STATUS_STYLES[order?.status]}>
                {order.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DataTable;
