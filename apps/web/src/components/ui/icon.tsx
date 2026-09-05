import React from 'react';
import {
  LayoutDashboard,
  SlidersHorizontal,
  Briefcase,
  BookOpen,
  Coins,
  Compass,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Search,
  Bell,
  Lock,
  Play,
  GraduationCap,
  Network,
  Brain,
  UserSearch,
  Layers,
  FlaskConical,
  Users,
  BarChart3,
  Filter,
  FileText,
  FileBadge,
  Grid,
  Sparkles,
  Download,
  Upload,
  ExternalLink,
  ChevronRight,
  Check,
  X,
  Clock,
  MapPin,
  Calendar,
  Building2,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  tune: SlidersHorizontal,
  work_history: Briefcase,
  menu_book: BookOpen,
  token: Coins,
  travel_explore: Compass,
  verified: CheckCircle2,
  verified_user: ShieldCheck,
  warning: AlertTriangle,
  check_circle: CheckCircle2,
  arrow_forward: ArrowRight,
  search: Search,
  notifications: Bell,
  lock: Lock,
  play_arrow: Play,
  school: GraduationCap,
  hub: Network,
  psychology: Brain,
  person_search: UserSearch,
  layers: Layers,
  biotech: FlaskConical,
  groups: Users,
  analytics: BarChart3,
  filter_alt: Filter,
  article: FileText,
  badge: FileBadge,
  grid_view: Grid,
  sparkles: Sparkles,
  download: Download,
  upload: Upload,
  external: ExternalLink,
  chevron_right: ChevronRight,
  check: Check,
  close: X,
  clock: Clock,
  location: MapPin,
  calendar: Calendar,
  building: Building2,
};

export interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 18, className = '' }) => {
  const Component = iconMap[name.toLowerCase()];
  if (Component) {
    return <Component size={size} className={className} />;
  }

  return (
    <span
      className={`material-symbols-outlined inline-block align-middle ${className}`}
      style={{ fontSize: `${size}px`, lineHeight: 1 }}
    >
      {name}
    </span>
  );
};
