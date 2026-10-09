import Image from "next/image";

export default function Logo({ size = 42, showTag = true }) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logo.jpg"
        alt="AFRIBAGS by D'Avafrik"
        width={size}
        height={size}
        className="object-contain rounded-sm"
        priority
      />
      {showTag && (
        <div className="flex flex-col leading-none">
          <span className="font-display font-medium text-lg tracking-[0.04em] text-ink">
            AFRIBAGS
          </span>
          <span className="text-[8px] tracking-[0.35em] uppercase text-terracotta">
            by D&apos;Avafrik
          </span>
        </div>
      )}
    </div>
  );
}
