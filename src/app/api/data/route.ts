import {
  MOCK_SPONSOR_CONTACTS,
  MOCK_SPONSOR_DEALS,
  MOCK_DELIVERABLES,
  STATS,
} from '@/lib/data';
import { SponsorContact, SponsorDeal, Deliverable } from '@/lib/types';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET(): Promise<Response> {
  const data = {
    sponsorDeals: MOCK_SPONSOR_DEALS,
    sponsorContacts: MOCK_SPONSOR_CONTACTS,
    deliverables: MOCK_DELIVERABLES,
    stats: STATS,
    totalDeals: MOCK_SPONSOR_DEALS.length,
    totalContacts: MOCK_SPONSOR_CONTACTS.length,
    totalDeliverables: MOCK_DELIVERABLES.length,
  };

  return new Response(JSON.stringify({ ok: true, data }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  });
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    return new Response(JSON.stringify({
      ok: true,
      message: 'Demo mode — data not persisted',
      received: body,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      ok: false,
      error: 'Invalid JSON body',
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS,
      },
    });
  }
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}