import { UserCircle } from "lucide-react";

function Hero() {
  const GUEST_USER_INITIALS = "HB";
  return (
    <header className="flex items-center justify-end">
      <div className="px-2 py-1 cursor-pointer flex items-center justify-between gap-3 border-2 border-blue-400 rounded-lg">
        <UserCircle className="size-10 text-blue-400" />
        <h1 className="text-blue-400 text-2xl font-semibold text-center">
          {GUEST_USER_INITIALS}
        </h1>
      </div>
    </header>
  );
}

export default Hero;
