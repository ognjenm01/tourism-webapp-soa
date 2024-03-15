import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Keypoint } from './model/keypoint.model';
import { environment } from 'src/env/environment';
import { Object } from './model/object.model';
import { Equipment } from '../administration/model/equipment.model';
import { TourEquipment } from './model/tour_equipment';
import { Tour } from './model/tour.model';
import { PublicEntityRequest } from './model/public-entity-request.model';
import { KeypointEncounter } from './model/keypointEncounter.model';
import { Location } from './model/location.model';


@Injectable({
  providedIn: 'root'
})
export class TourAuthoringService {

  private readonly apiUrl = `${environment.apiHost}author`;
  //                          https://localhost:44333/api/
  private readonly newApiUrl = `http://localhost:8080/api/`;
  constructor(private http: HttpClient) { }

  getKeypoints(): Observable<PagedResults<Keypoint>>{
    return this.http.get<PagedResults<Keypoint>>(`${this.apiUrl}/keypoints`);
  }

  getKeypointsByTour(tourId: number): Observable<Keypoint[]>{
    return this.http.get<Keypoint[]>(`http://localhost:8080/api/keypoints/tour/${tourId}`);
  }

  deleteKeypoint(id: number): Observable<Keypoint>{
    return this.http.delete<Keypoint>(`${this.apiUrl}/keypoints/${id}`);
  }

  addKeypoint(newKeypoint: Keypoint): Observable<Keypoint>{
    return this.http.post<Keypoint>(`http://localhost:8080/api/keypoints`, newKeypoint);
  }

  updateKeypoint(updatedKeypoint: Keypoint): Observable<Keypoint>{
    return this.http.put<Keypoint>(`${this.apiUrl}/keypoints/${updatedKeypoint.id}`, updatedKeypoint);
  }

  getPublicKeypoints(): Observable<PagedResults<Keypoint>>{
    return this.http.get<PagedResults<Keypoint>>(`${this.apiUrl}/publicKeypoints`);
  }

  getObjects() : Observable<PagedResults<Object>>{
    return this.http.get<PagedResults<Object>>(`${this.apiUrl}/objects`);
  }

  deleteObject(id: number): Observable<Object>{
    return this.http.delete<Object>(`${this.apiUrl}/objects/${id}`);
  }

  addObject(newObject: Object): Observable<Object>{
    return this.http.post<Object>(`${this.apiUrl}/objects`, newObject);
  }

  updateObject(updatedObject: Object): Observable<Object>{
    return this.http.put<Object>(`${this.apiUrl}/objects/${updatedObject.id}`, updatedObject);
  }
  
  getEquipment(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`http://localhost:8080/api/equipment`)
  }

  addEquipmentToTour(tourEquipment: TourEquipment): Observable<TourEquipment> {
    return this.http.post<TourEquipment>(`http://localhost:8080/api/tourequipment`, tourEquipment);
  }

  getEquipmentForTour(tourId: number): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`http://localhost:8080/api/equipment/tour/${tourId}`);
  }

  removeEquipmentFromTour(tourEquipment: TourEquipment): Observable<void> {
    return this.http.post<void>(`http://localhost:8080/api/tourequipment/delete`, tourEquipment);
  }
  
  getTours() : Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(`${this.apiUrl}/tours`);
  }

  getToursByAuthor(id: string) : Observable<Tour[]> {
    return this.http.get<Tour[]>(`http://localhost:8080/api/tours/byauthor/${id}`);
  }

  getTourById(tourId: number): Observable<Tour>{
    return this.http.get<Tour>(`http://localhost:8080/api/tours/${tourId}`);
  }

  deleteTour(id: number): Observable<Tour>{
    return this.http.delete<Tour>(`${this.apiUrl}/tours/${id}`);
  }

  addTour(newTour: Tour): Observable<Tour>{
    return this.http.post<Tour>('http://localhost:8080/api/tours', newTour);
  }

  addCustomTour(newTour: Tour): Observable<Tour>{
    return this.http.post<Tour>(`${this.apiUrl}/tours/custom`, newTour);
  }

  updateTour(updatedTour: Tour): Observable<Tour>{
    return this.http.put<Tour>(`http://localhost:8080/api/tours/${updatedTour.id}`, updatedTour);
  }

  addPublicEntityRequestObject(newRequest: PublicEntityRequest): Observable<PublicEntityRequest>{
    return this.http.post<PublicEntityRequest>(`${this.apiUrl}/publicEntityRequests/createObjectRequest`, newRequest);
  }

  addPublicEntityRequestKeypoint(newRequest: PublicEntityRequest): Observable<PublicEntityRequest>{
    return this.http.post<PublicEntityRequest>(`${this.apiUrl}/publicEntityRequests/createKeypointRequest`, newRequest);
  }
  
  getPublicEntityRequestByEntityId(entityId: number, entityType: number): Observable<PublicEntityRequest> {
    return this.http.get<PublicEntityRequest>(`${this.apiUrl}/publicEntityRequests/entity/${entityId}/${entityType}`);
  }
  getKeypointEncounters(keypointId: number): Observable<PagedResults<KeypointEncounter>>{
    return this.http.get<PagedResults<KeypointEncounter>>(`${this.apiUrl}/encounter/${keypointId}`);
  }
  deleteEncounter(id: number): Observable<KeypointEncounter>{
    return this.http.delete<KeypointEncounter>(`${this.apiUrl}/encounter/${id}`);
  }
  deleteKeypointEncounters(id: number): Observable<KeypointEncounter>{
    return this.http.delete<KeypointEncounter>(`${this.apiUrl}/encounter/keypoint/${id}`);
  }
  addEncounter(newEncounter: KeypointEncounter): Observable<KeypointEncounter>{
    return this.http.post<KeypointEncounter>(`${this.apiUrl}/encounter`, newEncounter);
  }

  updateEncounter(updatedEncounter: KeypointEncounter): Observable<KeypointEncounter>{
    return this.http.put<KeypointEncounter>(`${this.apiUrl}/encounter`, updatedEncounter);
  }
  updateEncountersLocation(keypointId: number, location: Location): Observable<KeypointEncounter>{
    return this.http.put<KeypointEncounter>(`${this.apiUrl}/encounter/${keypointId}`, location);
  }

  addCampaignTour(newTour: Tour): Observable<Tour>{
    return this.http.post<Tour>(`${this.apiUrl}/tours/campaign`, newTour);
  }
}
