import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Profile } from './model/profile.model';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/env/environment';
import { ChatMessage } from './model/chat-preview.model';
import { MessageInput } from './model/message-input.model';
import { FollowRequest } from './model/follow-request.model';
import {PersonNode} from './model/person-node.model';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {

  }

  getProfile(userId: number): Observable<Profile> {
    return this.http.get<Profile>(`${environment.apiHost}profile/${userId}`);
  }

  getPerson(userId: number): Observable<Profile> {
    return this.http.get<Profile>(`${environment.apiHost}profile/zelimdaumrem/${userId}`);
  }

  //TODO
  getFollowers(id: number): Observable<Profile[]> {
    return this.http.get<Profile[]>(`http://localhost:4201/api/person/following/${id}`);
  }

  //TODO
  getFollowing(id: number): Observable<Profile[]> {
    //return this.http.get<Profile[]>(`${environment.apiHost}profile/following`);
    return this.http.get<Profile[]>(`http://localhost:4201/api/person/followers/${id}`);
  }

    //TODO
    getSuggested(id: number): Observable<Profile[]> {
      //return this.http.get<Profile[]>(`${environment.apiHost}profile/following`);
      return this.http.get<Profile[]>(`http://localhost:4201/api/person/suggest/${id}`);
    }

  //TODO
  unfollow(request: FollowRequest): Observable<PagedResults<Profile>> {
    return this.http.post<PagedResults<Profile>>(`http://localhost:4201/api/person/unfollow`, request);
  }

  //TODO
  follow(request: FollowRequest): Observable<PagedResults<any>> {
    //return this.http.put<PagedResults<Profile>>(`${environment.apiHost}profile/follow`, followingId);
    return this.http.post<PagedResults<Profile>>(`http://localhost:4201/api/person/follow`, request);
  }


  getAllProfiles(): Observable<Profile[]> {
    //return this.http.get<PagedResults<Profile>>(environment.apiHost + `profile/not-followed`);
    return this.http.get<Profile[]>(`${environment.apiHost}profile/all`);
  }
  //TODO
  createIfNotExist(request: PersonNode): Observable<PagedResults<any>> {
    //return this.http.put<PagedResults<Profile>>(`${environment.apiHost}profile/follow`, followingId);
    return this.http.post<PagedResults<Profile>>(`http://localhost:4201/api/person`, request);
  }

  updateProfile(userId: number, updatedProfile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${environment.apiHost}profile/${userId}`, updatedProfile);
  }

  //TODO
  getProfiles(id: number): Observable<Profile[]> {
    //return this.http.get<PagedResults<Profile>>(environment.apiHost + `profile/not-followed`);
    return this.http.get<Profile[]>(`http://localhost:4201/api/person/unfollowed/${id}`);
  }

  getPreviewChats(): Observable<ChatMessage[]>{
    return this.http.get<ChatMessage[]>(`${environment.apiHost}chat/preview`);
  }

  getMessages(followerId: number): Observable<PagedResults<ChatMessage>>{
    return this.http.get<PagedResults<ChatMessage>>(`${environment.apiHost}chat/${followerId}`);
  }

  sendMessage(message: MessageInput): Observable<ChatMessage>{
    return this.http.post<ChatMessage>(`${environment.apiHost}chat`, message);
  }
}
