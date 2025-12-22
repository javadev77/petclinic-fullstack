import { http } from './http';
import type { Owner } from '@/types/Owner.ts';
import type { Page } from '@/types/Page';

export function getOwners(): Promise<Owner[]> {
  return http<Owner[]>('/owners');
}

export function getOwnerById(id: number): Promise<Owner> {
  return http<Owner>(`/owners/${id}`)
}

export function getOwnersPage(page: number = 0, size: number = 10, lastName?: string): Promise<Page<Owner>> {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (lastName) {
    params.append('lastName', lastName);
  }

  return http<Page<Owner>>(`/owners/page?${params.toString()}`);
}
