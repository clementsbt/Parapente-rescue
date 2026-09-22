import Link from "next/link";
import Image from "next/image";
import { COLORS } from "@/theme";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-[8px]">
      <div className="relative w-12 h-12">
        <Image
          src="/images/logo/atelier-reparation-parapente-rescue-noir.webp"
          alt="Parapente Rescue"
          fill
          className="object-contain rounded-[6px]"
        />
      </div>
      <span className="text-[15px] whitespace-nowrap font-bold" style={{ color: "COLORS.textLightest" }}>
        PARAPENTE <span style={{ color: "COLORS.accent" }}>RESCUE</span>
      </span>
    </Link>
  );
}
