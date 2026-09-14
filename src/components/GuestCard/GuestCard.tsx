import { Info } from "lucide-react";

type DemoCredential = {
  label: string;
  email: string;
  password: string;
};

const DEMO_CREDENTIALS: DemoCredential[] = [
  { label: "Admin", email: "admin@mealcart.com", password: "abcd1234" },
  // { label: "Staff", email: "staff@mealcart.com", password: "abcd1234" },
  // {
  //   label: "Customer",
  //   email: "customer@mealcart.com",
  //   password: "customer123",
  // },
];

type GuestCardProps = {
  onSelectCredentials: (email: string, password: string) => void;
};

function GuestCard({ onSelectCredentials }: GuestCardProps) {
  return (
    <div className="bg-amber-400/5 p-4 rounded-2xl border-b-4 border-amber-800">
      <div className="flex items-center gap-1 justify-center">
        <Info className="size-8 text-amber-600" />
        <span className="text-lg font-semibold text-amber-600">Visiting?</span>
      </div>
      <div className="text-xs text-gray-400 mt-4 space-y-1">
        <p>Demo mode — try:</p>
        {DEMO_CREDENTIALS.map((cred) => (
          <button
            key={cred.email}
            type="button"
            onClick={() => onSelectCredentials(cred.email, cred.password)}
            className="block text-left hover:text-amber-500 hover:underline transition-colors cursor-pointer"
          >
            {cred.email} / {cred.password}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GuestCard;
