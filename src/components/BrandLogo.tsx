import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "icon" | "full";
};

export default function BrandLogo({
  className = "",
  priority = false,
  variant = "icon",
}: BrandLogoProps) {
  if (variant === "full") {
    return (
      <Image
        src="/brand/careleo-main.png"
        alt="Care Leo logo"
        width={120}
        height={40}
        priority={priority}
        className={className}
        style={{ width: 'auto', height: 'auto' }}
      />
    );
  }

  return (
    <Image
      src="/brand/careleo-main.png"
      alt="Care Leo mascot"
      width={120}
      height={40}
      priority={priority}
      className={className}
      style={{ width: 'auto', height: 'auto' }}
    />
  );
}
