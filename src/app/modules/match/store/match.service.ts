import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from './match.model';

@Injectable()
export class MatchService {
  private readonly apiUrl = 'https://64e9efb9bf99bdcc8e671c9f.mockapi.io';

  constructor(private http: HttpClient) {}

  fetchMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}/api/v1/match`);
  }

  addMatch(match: Match): Observable<Match> {
    return this.http.post<Match>(`${this.apiUrl}/api/v1/match`, match);
  }

  updateMatchStatus(id: string, isCompleted: boolean): Observable<Match> {
    return this.http.put<Match>(`${this.apiUrl}/api/v1/match/${id}`, {
      isCompleted,
    });
  }

  deleteMatch(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/v1/match/${id}`);
  }
}
