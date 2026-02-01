import pino from 'pino';
import { getContext } from '../core/context';

export const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
  formatters: {
    log(obj) {
      const ctx = getContext();
      return {
        ...obj,
        userId: ctx?.userId,
        requestId: ctx?.requestId,
      };
    },
  },
});
