import { TIME_FILTER_LIST } from "../../lib/const";
import { BellIcon } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between  bg-gray-950 py-3">
      <h1 className="text-xl">Dashboard</h1>

      <div className="flex items-center gap-4">
        <select className="cursor-pointer rounded-lg border border-gray-700 bg-gray-950 p-2 text-lg text-gray-100 outline-none">
          {TIME_FILTER_LIST.map((item) => (
            <option
              value={item.value}
              key={item.value}
              className="bg-gray-950 text-gray-100"
            >
              {item.label}
            </option>
          ))}
        </select>

        <BellIcon className="size-7 cursor-pointer text-gray-100" />
      </div>
    </header>
  );
}

export default Header;
