import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-[8px]">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 rounded-[6px]"
      >
        <rect width="32" height="32" rx="6" fill="#1A3829"/>
        <path
          d="M16 6C16 6 8 14 8 18C8 22.4183 11.5817 26 16 26C20.4183 26 24 22.4183 24 18C24 14 16 6 16 6Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 10V22M12 18H20"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[15px] whitespace-nowrap font-bold" style={{ color: "#1c3328" }}>
        PARAPENTE <span style={{ color: "#82a390" }}>RESCUE</span>
      </span>
    </Link>
  );
}
