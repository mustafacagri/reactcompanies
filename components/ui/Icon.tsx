'use client'

import {
  ArchiveBoxXMarkIcon,
  ArrowDownTrayIcon,
  ArrowSmallDownIcon,
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  ArrowSmallUpIcon,
  BackwardIcon,
  BanknotesIcon,
  Bars3Icon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  ExclamationTriangleIcon,
  FolderOpenIcon,
  HomeIcon,
  InformationCircleIcon,
  ListBulletIcon,
  PhotoIcon,
  PauseCircleIcon,
  PauseIcon,
  PencilIcon,
  PencilSquareIcon,
  PlusIcon,
  PlusCircleIcon,
  StopCircleIcon,
  UserCircleIcon,
  UserIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'

import { CheckCircleIcon } from '@heroicons/react/24/solid'

type IconName =
  | 'archiveBoxXMark'
  | 'arrowDownTray'
  | 'arrowSmallDown'
  | 'arrowSmallLeft'
  | 'arrowSmallRight'
  | 'arrowSmallUp'
  | 'backward'
  | 'banknotes'
  | 'bars3'
  | 'briefcase'
  | 'buildingOffice2'
  | 'chat'
  | 'checkCircle'
  | 'chevronDown'
  | 'chevronRight'
  | 'chevronUp'
  | 'clipboardDocumentList'
  | 'clock'
  | 'devicePhoneMobile'
  | 'exclamationTriangle'
  | 'home'
  | 'information'
  | 'folderOpen'
  | 'listBullet'
  | 'pause'
  | 'pauseCircle'
  | 'pencil'
  | 'pencilSquare'
  | 'plus'
  | 'plusCircle'
  | 'photo'
  | 'userCircle'
  | 'user'
  | 'stopCircle'
  | 'xCircle'

const iconMaps: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  archiveBoxXMark: ArchiveBoxXMarkIcon,
  arrowDownTray: ArrowDownTrayIcon,
  arrowSmallDown: ArrowSmallDownIcon,
  arrowSmallLeft: ArrowSmallLeftIcon,
  arrowSmallRight: ArrowSmallRightIcon,
  arrowSmallUp: ArrowSmallUpIcon,
  backward: BackwardIcon,
  banknotes: BanknotesIcon,
  bars3: Bars3Icon,
  briefcase: BriefcaseIcon,
  buildingOffice2: BuildingOffice2Icon,
  chat: ChatBubbleLeftRightIcon,
  checkCircle: CheckCircleIcon,
  chevronDown: ChevronDownIcon,
  chevronRight: ChevronRightIcon,
  chevronUp: ChevronUpIcon,
  clipboardDocumentList: ClipboardDocumentListIcon,
  clock: ClockIcon,
  devicePhoneMobile: DevicePhoneMobileIcon,
  exclamationTriangle: ExclamationTriangleIcon,
  home: HomeIcon,
  information: InformationCircleIcon,
  folderOpen: FolderOpenIcon,
  listBullet: ListBulletIcon,
  pause: PauseIcon,
  pauseCircle: PauseCircleIcon,
  pencil: PencilIcon,
  pencilSquare: PencilSquareIcon,
  plus: PlusIcon,
  plusCircle: PlusCircleIcon,
  photo: PhotoIcon,
  userCircle: UserCircleIcon,
  user: UserIcon,
  stopCircle: StopCircleIcon,
  xCircle: XCircleIcon,
}

// Type guard to check if the icon name is valid
function isValidIconName(icon: string): icon is IconName {
  return icon in iconMaps
}

export function Icon({
  name,
  className = '',
  size = 24,
}: Readonly<{
  name: string // Keep it as string for external use, but validate it internally
  className?: string
  size?: number
}>) {
  if (!isValidIconName(name)) {
    return null
  }

  const IconComponent = iconMaps[name]

  return (
    <IconComponent
      className={className}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  )
}
