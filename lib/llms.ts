import type { LLMsConfig } from 'fumadocs-core/source';

import { source } from '@/lib/source';

export const llmsConfig = {
  renderDescription(item, ctx) {
    if ('description' in item && typeof item.description === 'string') {
      return item.description;
    }

    if ('type' in item && item.type === 'page') {
      return source.getNodePage(item, ctx.lang)?.data.description ?? '';
    }

    return '';
  }
} satisfies LLMsConfig;
