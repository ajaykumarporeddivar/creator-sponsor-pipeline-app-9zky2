'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui'
import { AppHeader } from '@/components/layout'
import { formatDate, formatCurrency } from '@/lib/utils'
// ⚠ Import ONLY the MOCK arrays defined in your SPEC CONTRACT Entity Reference Table:
import { MOCK_SPONSOR_DEALS, MOCK_SPONSOR_CONTACTS, MOCK_DELIVERABLES } from '@/lib/data'
import { Search, Plus, Download, Eye } from 'lucide-react'
import { SponsorDeal } from '@/lib/types'

export default function FeaturePage() {
  const params = useParams()
  const slug = (params.feature as string) ?? ''
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  // Helper to find sponsor contact name
  const getSponsorContactName = (contactId: string | undefined): string => {
    if (!contactId) return 'N/A';
    const contact = MOCK_SPONSOR_CONTACTS.find(c => c.id === contactId);
    return contact ? contact