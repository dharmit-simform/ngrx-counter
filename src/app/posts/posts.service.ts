import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllPosts(page: number = 1, limit: number = 10, sortBy: string = '_id'): Observable<any> {
    return this.http.get<any>(`/api/posts/all-posts?page=${page}&limit=${limit}&sortBy=${sortBy}`, httpOptions);
  }
}
