export function calculateDaysDifference(targetDate: Date, type: 'countdown' | 'daysSince'): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (type === 'countdown') {
    return diffDays;
  } else {
    return Math.abs(diffDays);
  }
}

export function formatDaysText(days: number, type: 'countdown' | 'daysSince'): string {
  if (type === 'countdown') {
    if (days > 0) {
      return `${days} day${days === 1 ? '' : 's'} to go`;
    } else if (days === 0) {
      return 'Today!';
    } else {
      return `${Math.abs(days)} day${Math.abs(days) === 1 ? '' : 's'} ago`;
    }
  } else {
    return `${days} day${days === 1 ? '' : 's'}`;
  }
}

export function isMilestone(days: number): boolean {
  if (days === 0) return true;
  if (days === 1) return true;
  if (days === 7) return true;
  if (days === 30) return true;
  if (days === 100) return true;
  if (days === 365) return true;
  if (days % 100 === 0) return true;
  if (days % 365 === 0) return true;
  return false;
}