export function buildDiff(before: any, after: any, config: any) {
  const diff: Record<string, any> = {};

  for (const key in after) {
    if (config.exclude.includes(key)) continue;

    if (before?.[key] !== after?.[key]) {
      diff[key] = {
        before: config.redact.includes(key) ? '***' : before?.[key],
        after: config.redact.includes(key) ? '***' : after?.[key],
      };
    }
  }

  return diff;
}
