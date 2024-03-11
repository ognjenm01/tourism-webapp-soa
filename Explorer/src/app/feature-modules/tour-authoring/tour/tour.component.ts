import { Component, OnInit } from '@angular/core';
import { Tour } from '../model/tour.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';


@Component({
  selector: 'xp-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit{

  tours: Tour[] = [];
  public selectedTour: Tour;
  public mode : string = 'add';
  public renderTour: boolean = false;
  user: User | undefined;

  constructor(private tourAuthoringService: TourAuthoringService, private authService: AuthService,  private router: Router){}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.getTours(); 
  }

  deleteTour(id: number): void{
    if(window.confirm('Are you sure that you want to delete this tour?')){
      this.tourAuthoringService.deleteTour(id).subscribe({
        next: () => {
          this.getTours();
        },
        error: () => {
          
        }
      });
    }
  }

  onEditClicked(tour: Tour):void{
    this.selectedTour = tour;
    console.log(this.selectedTour);
    this.mode = 'edit';
    this.renderTour = true;
  }

  onAddClicked(): void{
    this.mode = 'add';
    this.renderTour = true;
  }

  getTours(): void{
    if(this.user !== undefined)
    this.tourAuthoringService.getToursByAuthor(this.user.id.toString()).subscribe({
      next: (response: Tour[]) => {
        this.tours = response;
      },
      error: () => {
        
      }
    });
  }

  navigateToTourManagement(id: number): void{
    this.router.navigate(
      ['/tour-management', id]
    );
  }

}
