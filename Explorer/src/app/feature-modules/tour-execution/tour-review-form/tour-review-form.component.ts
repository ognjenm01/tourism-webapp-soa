import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TourExecutionService } from '../tour-execution.service';
import { TourReview } from '../model/tour-review.model';
import { TourReviewString } from '../model/tour-review-string.model';
import { Tour } from '../../tour-authoring/model/tour.model';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { ImageLink } from '../model/image-link.model';
@Component({
  selector: 'xp-tour-review-form',
  templateUrl: './tour-review-form.component.html',
  styleUrls: ['./tour-review-form.component.css']
})
export class TourReviewFormComponent implements OnChanges {
  tours: Tour[];
  selectedTour : Tour;
  selectedTourID? : number | null;

  @Output() tourReviewUpdated = new EventEmitter<null>(); 
  @Input() tourReview: TourReview;
  @Input() shouldEdit: boolean = false;

  constructor(private service: TourExecutionService, private tourService: TourAuthoringService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getTours();
    this.tourReviewForm.reset();
    if(this.shouldEdit) {
      console.log(this.tourReview)
      this.tourReview.visitDate = this.tourReview.visitDate.split('T')[0]
      this.tourReviewForm.patchValue(this.tourReview);
    }
  }

  tourReviewForm = new FormGroup({
    rating: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required]),
    visitDate: new FormControl('', [Validators.required]),
    imageLinksString: new FormControl('')
    //imageLinks: new FormControl('', [Validators.required])
  })

  addTourReview(): void {
  
    let ImageLinks: ImageLink[] = [];
    let strings = this.tourReviewForm.value.imageLinksString
    let id = this.radioClicked(this.selectedTour)
    alert(strings)
    alert(id)
    if(strings !== null && strings !== undefined && id !== undefined && id !== null)
    {
      alert("BBBBBBB")
      strings.split("\n").forEach(s => {
        alert(s)
        ImageLinks.push(
          {
            tourReviewId: Number(id),
            link: s
          }
        )
      })
    }

    const tourReview: TourReview = {
      rating: this.tourReviewForm.value.rating as string,
      comment: this.tourReviewForm.value.comment || "",
      visitDate: new Date(this.tourReviewForm.value.visitDate as string).toISOString().toString(),
      ratingDate: new Date().toISOString(),
      imageLinks:  ImageLinks,
      tourId: this.radioClicked(this.selectedTour) as number,
      userId: Number(localStorage.getItem('loggedId'))??1,
      imageLinksString: ""
    }
    
    this.clearFormFields();

    this.service.addTourReview(tourReview).subscribe({
      next: (_) => {
        this.tourReviewUpdated.emit();
        alert('Successfully added tour review!');
      }
    });
  }

  updateTourReview(): void {
    /*const tourReview: TourReviewString = {
      rating: Number(this.tourReviewForm.value.rating),
      comment: this.tourReviewForm.value.comment || "",
      visitDate: this.tourReviewForm.value.visitDate + "T00:00:00.000Z",
      ratingDate: new Date().toISOString(),
      imageLinks: this.tourReviewForm.value.imageLinks as unknown as string[],
      tourId: this.tourReview.tourId.toString(),
      userId: localStorage.getItem('loggedId')??'1'
    }

    tourReview.id = this.tourReview.id;
    this.clearFormFields();

    this.service.updateTourReview(tourReview).subscribe({
      next: (_) => {
        this.tourReviewUpdated.emit();
        alert('Successfully updated tour review!');
      }
    });*/
  }

  clearFormFields(): void {
    this.tourReviewForm.value.rating = "";
    this.tourReviewForm.value.comment = "";
    this.tourReviewForm.value.visitDate = "";
    //this.tourReviewForm.value.imageLinks = "";
  }

  getTours(): void {
    this.tourService.getTours().subscribe({
      next: (result: Tour[]) => {
        this.tours = result;
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  radioClicked(tour : Tour): number | undefined {
    this.selectedTour = tour;
    this.selectedTourID = this.selectedTour.id;
    return this.selectedTourID;
  }

}
