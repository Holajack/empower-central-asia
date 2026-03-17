export interface OnlineUser {
  userId: string;
  firstName: string;
  initial: string;
  color: string;
  weekNum: number;
  dayNum: number;
}

export function usePresence(
  _channel: string,
  _weekNum: number,
  _dayNum: number
) {
  return [] as OnlineUser[];
}
