// lib/api.ts
import {Stack}  from './contentstack';
import { PageEntry } from '../types/contentstack';

export async function getPageByUid(uid: string): Promise<PageEntry> {
  const response = await Stack.ContentType('page')
    .Entry(uid)
    .toJSON()
    .fetch();
  
  return response as PageEntry;
}

export async function getPageBySlug(slug: string): Promise<PageEntry | null> {
  const response = await Stack.ContentType('page')
    .Query()
    .where('url_slug', slug)
    .toJSON()
    .find();
  
  if (response[0].length > 0) {
    return response[0][0] as PageEntry;
  }
  
  return null;
}