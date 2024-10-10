import { SocialKey } from '@/utils/socialMedia'
import Image from 'next/image'
import githubIcon from '@/assets/images/icons/github.svg'
import linkedinIcon from '@/assets/images/icons/linkedin.svg'
import mediumIcon from '@/assets/images/icons/medium.svg'

interface SocialIconProps {
  type: SocialKey
  alt?: string
  size?: number
}

const icons: Record<SocialKey, string> = {
  github: githubIcon,
  linkedin: linkedinIcon,
  medium: mediumIcon,
}

export function SocialIcon({ type, alt, size = 18 }: Readonly<SocialIconProps>) {
  const iconSrc = icons[type]

  if (!iconSrc) return null

  alt ||= type

  return (
    <>
      <Image
        src={iconSrc}
        alt={alt}
        width={size}
        height={size}
        className='inline-block'
      />
      <span className='hidden ml-2 xl:inline-block'>{alt}</span>
    </>
  )
}
