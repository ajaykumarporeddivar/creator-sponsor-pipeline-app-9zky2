'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronUp, ChevronDown, Check, X, Command } from 'lucide-react';
import { Modal, Button, Badge, Input, cn, Avatar } from '@/components/ui';

interface EntityDetailModalProps {
  item: Record<string, unknown> | null;
  open: boolean;
  onClose: () => void;
  title: string;
}

export function EntityDetailModal({ item, open, onClose, title }: EntityDetailModalProps): JSX.Element {
  if (!item) return <Modal open={open} onClose={onClose} title={title} />;

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Completed':
      case 'Delivered':
        return 'success';
      case 'In Progress':
      case 'Negotiating':
      case 'Pitched':
        return 'info';
      case 'Rejected':
      case 'Archived':
        return 'danger';
      case 'Lead':
      default:
        return 'neutral';
    }
  };

  const formatValue = (key: string, value: unknown): React.ReactNode => {
    if (typeof value === 'string' && (key.toLowerCase().includes('date') || key.toLowerCase().includes('at'))) {
      try {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
        }
      } catch (e) {
        // Fallback to original value if date parsing fails
      }
    }
    if (typeof value === 'number') {
      if (key.toLowerCase().includes('value')) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
      }
      return new Intl.NumberFormat('en-US').format(value);
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    return String(value);
  };

  const statusKey = Object.keys(item).find(key => key.toLowerCase() === 'status') as keyof typeof item | undefined;
  const currentStatus = statusKey ? (item[statusKey] as string) : 'Unknown';

  return (
    <Modal open={open} onClose={onClose} title={title} className="max-w-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-zinc-900">{item.name as string || 'Detail'}</h3>
        <Badge variant={getStatusVariant(currentStatus)}>{currentStatus}</Badge>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm text-zinc-700">
        {Object.entries(item)
          .filter(([key]) => key !== 'id' && item[key] !== undefined && item[key] !== null && String(item[key]).trim() !== '')
          .map(([key, value]) => (
            <React.Fragment key={key}>
              <div className="font-medium text-zinc-500">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</div>
              <div className="text-zinc-800 break-words">{formatValue(key, value)}</div>
            </React.Fragment>
          ))}
      </div>
      <div className="mt-6 pt-4 border-t border-zinc-100 flex justify-end gap-3">
        <Button variant="danger" onClick={() => { console.log(`Deleting ${item.name}`); onClose(); }}>
          Delete
        </Button>
        <Button variant="secondary" onClick={() => { console.log(`Archiving ${item.name}`); onClose(); }}>
          Archive
        </Button>
        <Button variant="primary" onClick={() => { console.log(`Approving ${item.name}`); onClose(); }}>
          Approve
        </Button>
      </div>
    </Modal>
  );
}

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmLabel?: string;
  variant?: 'danger' | 'info';
}

export function ConfirmModal({
  open,
  onClose,
  title,
  message,
  onConfirm,
  confirmLabel = 'Confirm',
  variant = 'info',
}: ConfirmModalProps): JSX.Element {
  const confirmButtonVariant = variant === 'danger' ? 'danger' : 'primary';

  return (
    <Modal open={open} onClose={onClose} title={title} className="max-w-sm">
      <p className="text-zinc-600 text-sm mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant={confirmButtonVariant} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}

interface CommandPaletteItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  description?: string;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: CommandPaletteItem[];
}

export function CommandPalette({ open, onClose, items }: CommandPaletteProps): JSX.Element {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setSearch('');
      setSelectedIndex(0);
      inputRef.current?.focus();
    }
  }, [open]);

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!open) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredItems.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          router.push(filteredItems[selectedIndex].href);
          onClose();
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  }, [open, filteredItems, selectedIndex, router, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    // Scroll selected item into view
    if (resultsRef.current && selectedIndex >= 0 && filteredItems.length > 0) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      selectedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex, filteredItems]);

  if (!open) return <></>;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 lg:p-8 pt-20">
      <div
        className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-xl max-h-[80vh] flex flex-col overflow-hidden">
        <div className="flex items-center border-b border-zinc-100 p-4">
          <Search className="h-5 w-5 text-zinc-400 mr-2" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search deals, contacts, reports..."
            className="flex-grow border-none focus:ring-0 p-0 text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="ml-2 text-zinc-400 text-sm">
            <kbd className="inline-flex items-center justify-center h-5 w-5 rounded-md border border-zinc-200 bg-zinc-50 font-mono text-[10px] text-zinc-500 shadow-sm">
              <Command className="h-3 w-3" />
            </kbd>{' '}
            K
          </span>
        </div>
        <div ref={resultsRef} className="flex-grow overflow-y-auto py-2">
          {filteredItems.length === 0 ? (
            <p className="p-4 text-center text-zinc-500 text-sm">No results found for "{search}"</p>
          ) : (
            filteredItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(item.href);
                  onClose();
                }}
                className={cn(
                  'flex items-center px-4 py-3 cursor-pointer transition-colors',
                  index === selectedIndex ? 'bg-zinc-100' : 'hover:bg-zinc-50'
                )}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {item.icon && <span className="mr-3 text-zinc-500">{item.icon}</span>}
                <div>
                  <div className="font-medium text-zinc-800">{item.label}</div>
                  {item.description && <div className="text-sm text-zinc-500">{item.description}</div>}
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}