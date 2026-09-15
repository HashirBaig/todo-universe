function Hero() {
  const GUEST_USER_INITIALS = "HB";
  return (
    <header className="flex items-center justify-end">
      <div className="p-2 cursor-pointer border-2 border-blue-400 hover:bg-blue-400/5 rounded-full">
        <h1 className="text-blue-400 text-2xl font-semibold text-center">
          {GUEST_USER_INITIALS}
        </h1>
      </div>
    </header>
  );
}

export default Hero;
