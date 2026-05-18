'use client';

import { AppSidebar } from '@/components/layout';
import { LayoutDashboard, PlusSquare, BarChart2 } from 'lucide-react';
import React from 'react';

const navItems = [
  { icon: <PlusSquare size={16} />, label: 'New Deal', href: '/dashboard/intake' },
  { icon: <LayoutDashboard size={16} />, label: 'Dashboard', href: '/dashboard' },
  { icon: <BarChart2 size={16} />, label: 'Reporting', href: '/dashboard/reporting' },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AppSidebar items={navItems} projectName="Creator Sponsor Pipeline" />
      <div className="flex-1 ml-64 flex flex-col min-h-full">
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}