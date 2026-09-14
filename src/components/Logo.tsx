import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-[8px]">
      <div className="relative w-8 h-8">
        <Image
          src="/images/logo/atelier-reparation-parapente-rescue-noir.webp"
          alt="Parapente Rescue"
          fill
          className="object-contain rounded-[6px]"
        />
      </div>
      <span className="text-[15px] whitespace-nowrap font-bold" style={{ color: "#1c3328" }}>
        PARAPENTE <span style={{ color: "#82a390" }}>RESCUE</span>
      </span>
    </Link>
  );
}
