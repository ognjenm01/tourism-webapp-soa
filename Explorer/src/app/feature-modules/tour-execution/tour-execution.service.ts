import { HttpClient } from '@angular/common/http';
import { Injectable, ɵisEnvironmentProviders } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourReview } from './model/tour-review.model';
import { environment } from 'src/env/environment';
import { TourReviewString } from './model/tour-review-string.model';
import { TouristPosition } from './model/tourist-position.model';
import { TourProgress } from './model/tour-progress.model';
import { Encounter } from '../tour-authoring/model/keypointEncounter.model';
import { EncounterCompletion } from '../encounters-managing/model/encounterCompletion.model';

@Injectable({
  providedIn: 'root'
})
export class TourExecutionService {

  constructor(private http: HttpClient) { }

  getTourReviews(): Observable<TourReview[]> {
    return this.http.get<TourReview[]>(`https://localhost:44333/api/tourexecution/tourreview`);
  }

  addTourReview(tourreview: TourReview): Observable<TourReview> {
    return this.http.post<TourReview>(`https://localhost:44333/api/tourexecution/tourreview/`, tourreview);
  }

  updateTourReview(tourreview: TourReviewString): Observable<TourReviewString> {
    return this.http.put<TourReviewString>(`${environment.apiHost}tourexecution/tourreview/` + tourreview.id, tourreview);
  }

  deleteTourReview(tourreview: TourReview): Observable<TourReview> {
    return this.http.delete<TourReview>(`${environment.apiHost}tourexecution/tourreview/` + tourreview.id);
  }

  getTourReviewByTourId(tourId: number): Observable<PagedResults<TourReview>> {
    return this.http.get<PagedResults<TourReview>>(`${environment.apiHost}tourexecution/tourreview/tour/` + tourId);
  }

  getTouristPosition(userid: string): Observable<TouristPosition> {
    return this.http.get<TouristPosition>(`https://localhost:44333/api/tourexecution/position/${userid}`);
  }

  addTouristPosition(touristPosition: TouristPosition): Observable<TouristPosition> {
    return this.http.post<TouristPosition>(`https://localhost:44333/api/tourexecution/position`, touristPosition);
  }

  updateTouristPosition(touristPosition: TouristPosition): Observable<TouristPosition> {
    return this.http.put<TouristPosition>(`https://localhost:44333/api/tourexecution/position/${touristPosition.id}`, touristPosition);
  }

  getActiveTour(): Observable<TourProgress> {
    return this.http.get<TourProgress>(`${environment.apiHost}tourexecution/activeTour`);
  }

  startTour(p: TourProgress): Observable<TourProgress> {
    return this.http.post<TourProgress>(`http://localhost:8080/api/tourprogress`, p);
  }

  abandonTour(): Observable<TourProgress> {
    return this.http.put<TourProgress>(`${environment.apiHost}tourexecution/abandonActive`, null);
  }

  updateActiveTour(areRequiredDone: boolean): Observable<TourProgress> {
    return this.http.put<TourProgress>(`${environment.apiHost}tourexecution/updateActive`, areRequiredDone);
  }
  
  updateSocialEncounters(): Observable<void> {
    return this.http.post<void>(`${environment.apiHost}tourist/encounter/updateSocialEncounters`, null);
  }
  getTouristCompletedEncounters(): Observable<PagedResults<EncounterCompletion>> {
    return this.http.get<PagedResults<EncounterCompletion>>(`${environment.apiHost}tourist/encounter`);
  }
}

