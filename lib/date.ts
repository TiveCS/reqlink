import { formatDistance, formatRelative } from 'date-fns';

export function formatRelativeDate({
  from,
  to,
}: {
  from: Date;
  to: Date;
}): string {
  return formatRelative(from, to, { weekStartsOn: 1 });
}

export function formatDistanceDate({
  from,
  to,
}: {
  from: Date;
  to: Date;
}): string {
  return formatDistance(from, to, { addSuffix: true });
}
