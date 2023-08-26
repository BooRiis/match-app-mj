export interface MatchesState {
  Matches: Match[];
  loading: boolean;
  error: string | null;
}

export interface Match {
  id: string;
  name: string;
  startDate: string;
  possibleWinner: string;
  isCompleted: boolean;
}

export enum DateFormat {
  DATE = 'dd.MM.YYYY, hh:mm',
}
