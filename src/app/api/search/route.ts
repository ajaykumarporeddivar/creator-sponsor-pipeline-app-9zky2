import {
  MOCK_SPONSOR_CONTACTS,
  MOCK_SPONSOR_DEALS,
  MOCK_DELIVERABLES,
} from '@/lib/data';
import { SponsorContact, SponsorDeal, Deliverable } from '@/lib/types';

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type'); // Optional: 'deals', 'contacts', 'deliverables'

  let results: (SponsorDeal | SponsorContact | Deliverable)[] = [];

  const lowerCaseQuery = query.toLowerCase();

  if (!query) {
    // If query is empty, return the first 5 sponsor deals
    results = MOCK_SPONSOR_DEALS.slice(0, 5);
  } else {
    // Search across specified types or all
    if (!type || type === 'deals') {
      const dealResults = MOCK_SPONSOR_DEALS.filter(deal =>
        deal.name.toLowerCase().includes(lowerCaseQuery) ||
        (deal.notes && deal.notes.toLowerCase().includes(lowerCaseQuery))
      );
      results.push(...dealResults);
    }

    if (!type || type === 'contacts') {
      const contactResults = MOCK_SPONSOR_CONTACTS.filter(contact =>
        contact.name.toLowerCase().includes(lowerCaseQuery) ||
        contact.company?.toLowerCase().includes(lowerCaseQuery) ||
        contact.email.toLowerCase().includes(lowerCaseQuery)
      );
      results.push(...contactResults);
    }

    if (!type || type === 'deliverables') {
      const deliverableResults = MOCK_DELIVERABLES.filter(deliverable =>
        deliverable.type.toLowerCase().includes(lowerCaseQuery) ||
        (deliverable.description && deliverable.description.toLowerCase().includes(lowerCaseQuery))
      );
      results.push(...deliverableResults);
    }
  }

  // Ensure unique results and limit to max 20
  const uniqueResults = Array.from(new Set(results.map(item => item.id)))
    .map(id => results.find(item => item.id === id))
    .filter(Boolean) as (SponsorDeal | SponsorContact | Deliverable)[];

  const limitedResults = uniqueResults.slice(0, 20);

  return Response.json({
    ok: true,
    data: {
      results: limitedResults,
      total: limitedResults.length,
      query: query,
    },
  });
}