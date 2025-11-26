import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showTagline?: boolean
  href?: string
}

export function Logo({ size = "md", showTagline = true, href = "/" }: LogoProps) {
  const sizes = {
    sm: { container: "h-8", image: 32, text: "text-base", tagline: "text-[8px]" },
    md: { container: "h-12", image: 48, text: "text-xl", tagline: "text-[10px]" },
    lg: { container: "h-16", image: 64, text: "text-3xl", tagline: "text-xs" },
    xl: { container: "h-24", image: 96, text: "text-5xl", tagline: "text-sm" },
  }

  const currentSize = sizes[size]

  const LogoContent = () => (
    <div className="flex items-center gap-3">
      <div className="relative" style={{ width: currentSize.image, height: currentSize.image }}>
        <Image
          src="/images/design-mode/darin-fitness-vip-dark-blue.jpeg"
          alt="DARIN FITNESS VIP"
          width={currentSize.image}
          height={currentSize.image}
          className="object-contain"
          priority
        />
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="inline-block hover:opacity-80 transition-opacity">
        <LogoContent />
      </Link>
    )
  }

  return <LogoContent />
}

export default Logo
