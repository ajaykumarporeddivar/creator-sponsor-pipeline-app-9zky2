'use client';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import { Loader2, ArrowUp, ArrowDown, Minus, X } from 'lucide-react';
import Link from 'next/link';
import { Sparkline } from './charts';

export function cn(...inputs: Parameters<typeof clsx>): string {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  href?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  className,
  href,
  ...props
}: ButtonProps): JSX.Element {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 disabled:opacity-50 disabled:pointer-events-none rounded-lg';

  const variantStyles = {
    primary: 'bg-zinc-900 text-white hover:bg-zinc-700 active:bg-zinc-800',
    secondary: 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200 active:bg-zinc-300 border border-zinc-200',
    outline: 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 active:bg-zinc-100',
    ghost: 'text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200',
    danger: 'bg-red-600 text-white hover:bg-red-500 active:bg-red-700',
  };

  const sizeStyles = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  const content = (
    <>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </>
  );

  const Component = href ? Link : 'button';

  return (
    <Component
      {...(href ? { href } : {})}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        (loading || disabled) && 'pointer-events-none opacity-80',
        className
      )}
      onClick={onClick}
      disabled={disabled || loading}
      {...props as any} // Cast for type compatibility with Link or button
    >
      {content}
    </Component>
  );
}

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps): JSX.Element {
  return (
    <div className={cn('bg-white border border-zinc-200 rounded-xl shadow-sm', className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardProps): JSX.Element {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children }: CardProps): JSX.Element {
  return (
    <h3 className={cn('text-xl font-bold text-zinc-900 tracking-tight', className)}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children }: CardProps): JSX.Element {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps): JSX.Element {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';
  const variantStyles = {
    default: 'bg-zinc-100 text-zinc-700',
    success: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-600 border border-amber-200',
    error: 'bg-red-50 text-red-600 border border-red-200',
    info: 'bg-blue-50 text-blue-600 border border-blue-200',
    purple: 'bg-purple-50 text-purple-600 border border-purple-200',
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], className)}>
      {children}
    </span>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({
  label,
  placeholder,
  value,
  onChange,
  error,
  type = 'text',
  icon,
  disabled,
  className,
  ...props
}: InputProps): JSX.Element {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={props.id} className="text-sm font-medium text-zinc-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            'flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            icon ? 'pl-10' : '',
            error ? 'border-red-500 focus-visible:ring-red-500' : '',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}

export function Spinner({ className }: { className?: string }): JSX.Element {
  return (
    <Loader2 className={cn('h-5 w-5 animate-spin text-zinc-500', className)} />
  );
}

interface AvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ name, size = 'md', className }: AvatarProps): JSX.Element {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full font-semibold text-white flex-shrink-0',
        sizeClasses[size],
        bgColor,
        className
      )}
    >
      {initials}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  sparkline?: number[];
}

export function StatCard({ title, value, change, changeType = 'neutral', icon, sparkline }: StatCardProps): JSX.Element {
  const changeIcon =
    changeType === 'up' ? <ArrowUp className="h-3 w-3" /> :
      changeType === 'down' ? <ArrowDown className="h-3 w-3" /> :
        <Minus className="h-3 w-3" />;

  const changeColor =
    changeType === 'up' ? 'text-emerald-600' :
      changeType === 'down' ? 'text-red-500' :
        'text-zinc-500';

  return (
    <Card className="p-5 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-zinc-600">{title}</p>
          <p className="text-3xl font-bold text-zinc-900 tracking-tight mt-1">{value}</p>
        </div>
        {icon && <div className="text-zinc-500">{icon}</div>}
      </div>
      {(change || sparkline) && (
        <div className="mt-4 flex items-end justify-between">
          {change && (
            <div className={cn('flex items-center gap-1 text-sm font-medium', changeColor)}>
              {changeIcon}
              <span>{change}</span>
            </div>
          )}
          {sparkline && sparkline.length > 1 && (
            <Sparkline data={sparkline} width={40} height={20} color={
              changeType === 'up' ? '#10B981' :
                changeType === 'down' ? '#EF4444' :
                  '#71717A'
            } />
          )}
        </div>
      )}
    </Card>
  );
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps): JSX.Element | null {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, handleEscape]);

  if (!open) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fadein">
      <div
        ref={modalRef}
        className={cn(
          'bg-white rounded-2xl shadow-xl animate-slideup w-full',
          sizeClasses[size]
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-200">
          <h3 id="modal-title" className="text-lg font-bold text-zinc-900 tracking-tight">
            {title}
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
            <X className="h-5 w-5 text-zinc-500" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-zinc-900 tracking-tight mb-2">{title}</h3>
      <p className="text-zinc-600 mb-6 max-w-sm">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}

interface TableProps<T extends { id: string }> {
  columns: Array<{
    key: keyof T | 'actions'; // 'actions' for potential action buttons
    label: string;
    render?: (row: T) => React.ReactNode;
  }>;
  data: T[];
  onRowClick?: (row: T) => void;
}

export function Table<T extends { id: string }>({ columns, data, onRowClick }: TableProps<T>): JSX.Element {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-sm">
      <table className="min-w-full divide-y divide-zinc-200">
        <thead className="bg-zinc-50">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 bg-white">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-zinc-500">
                No data available.
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                className={cn(
                  'transition-colors',
                  onRowClick && 'cursor-pointer hover:bg-zinc-50'
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td key={String(column.key)} className="whitespace-nowrap px-6 py-4 text-sm text-zinc-700">
                    {column.render ? column.render(row) : (row[column.key as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}