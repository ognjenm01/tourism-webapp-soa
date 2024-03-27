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
    return this.http.get<Keypoint[]>(`https://localhost:44333/api/author/keypoints/tour/${tourId}`);
  }

  deleteKeypoint(id: number) {
    return this.http.delete<Keypoint>(`https://localhost:44333/api/author/keypoints/${id}`);
  }

  addKeypoint(newKeypoint: Keypoint) {
    return this.http.post<Keypoint>(`https://localhost:44333/api/author/keypoints`, newKeypoint);
  }

  updateKeypoint(updatedKeypoint: Keypoint) {
    return this.http.put<Keypoint>(`http://localhost:8080/api/keypoints`, updatedKeypoint);
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
    return this.http.get<Equipment[]>(`https://localhost:44333/api/administration/equipment`)
  }

  addEquipmentToTour(tourEquipment: TourEquipment): Observable<TourEquipment> {
    return this.http.post<TourEquipment>(`https://localhost:44333/api/author/tour-equipment/add`, tourEquipment);
  }

  getEquipmentForTour(tourId: number): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`https://localhost:44333/api/author/tour-equipment/${tourId}`);
  }

  removeEquipmentFromTour(tourEquipment: TourEquipment): Observable<void> {
    return this.http.post<void>(`https://localhost:44333/api/author/tour-equipment/remove`, tourEquipment);
  }
  
  getTours() : Observable<Tour[]> {
    return this.http.get<Tour[]>(`https://localhost:44333/api/author/tours`);
  }

  getToursByAuthor(id: string) : Observable<Tour[]> {
    return this.http.get<Tour[]>(`https://localhost:44333/api/author/tours/byauthor/${id}`);
  }

  getTourById(tourId: number): Observable<Tour>{
    return this.http.get<Tour>(`https://localhost:44333/api/author/tours/${tourId}`);
  }

  //FIXME
  deleteTour(id: number): Observable<Tour>{
    return this.http.delete<Tour>(`${this.apiUrl}/tours/${id}`);
  }

  addTour(newTour: Tour): Observable<Tour>{
    return this.http.post<Tour>('https://localhost:44333/api/author/tours', newTour);
  }

  addCustomTour(newTour: Tour): Observable<Tour>{
    return this.http.post<Tour>(`${this.apiUrl}/tours/custom`, newTour);
  }

  updateTour(updatedTour: Tour): Observable<Tour>{
    return this.http.put<Tour>(`https://localhost:44333/api/author/tours/${updatedTour.id}`, updatedTour);
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
