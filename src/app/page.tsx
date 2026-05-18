import Link from 'next/link';
import { Inter } from 'next/font/google';
import {
  Sparkle,
  PlusSquare,
  LayoutDashboard,
  BarChart2,
  Lock,
  ArrowRight,
  Star,
  CheckCircle,
  ShieldCheck,
  Globe,
  Gauge,
  Users,
  DollarSign,
  Star as StarIcon,
} from 'lucide-react';
import { Fragment } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Creator Sponsor Pipeline — Centralize Sponsor Deal Management',
  description: 'The Creator Sponsor Pipeline centralizes sponsor deal intake, management, and reporting into a single platform, helping creators efficiently track deliverables and prove campaign ROI.',
};

export default function LandingPage() {
  const productName = 'Creator Sponsor Pipeline';

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
  ];

  const socialProofMetrics = [
    { value: '10,000+', label: 'Creators Helped' },
    { value: '99.9%', label: 'Uptime' },
    { value: '$5M+', label: 'Creator Earnings Processed' },
    { value: '4