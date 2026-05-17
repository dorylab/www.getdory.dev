import { llms } from 'fumadocs-core/source';

import { llmsConfig } from '@/lib/llms';
import { source } from '@/lib/source';

export const revalidate = false;

export function GET() {
  return new Response(llms(source, llmsConfig).index(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
