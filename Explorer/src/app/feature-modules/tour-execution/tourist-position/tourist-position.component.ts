import { Component, OnInit } from '@angular/core';
import { TouristPosition } from '../model/tourist-position.model';
import { TourExecutionService } from '../tour-execution.service';
import { MarkerPosition } from 'src/app/shared/model/markerPosition.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-tourist-position',
  templateUrl: './tourist-position.component.html',
  styleUrls: ['./tourist-position.component.css']
})
export class TouristPositionComponent implements OnInit {
  
  public touristPosition: TouristPosition = {
    latitude: 0.0,
    longitude: 0.0
  };
  public mode: string = 'add';
  public touristMapPosition: MarkerPosition;
  user: User | undefined;

  constructor(private service: TourExecutionService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.getPosition();
  }

  getPosition(): void {
    if(this.user !== undefined)
    this.service.getTouristPosition(this.user.id.toString()).subscribe({
      next: (result: TouristPosition) => { 
        //alert(result)
        if(result !== null){
        this.touristPosition = result;
        this.touristMapPosition = {
          latitude: this.touristPosition.latitude,
          longitude: this.touristPosition.longitude
        }
        this.mode = 'edit';
      } else {
        this.mode = 'add';
      }
      },
      error: () => { 
        this.mode = 'add';
      },
    });
  }

  updateTouristPosition(event: number[]): void {
    console.log("ja sam null")
    this.touristPosition = {
      id: this.touristPosition.id,
      latitude: event[0],
      longitude: event[1],
      userId: this.user?.id
    }
  }

  confirmPosition(): void {
    if(this.touristPosition == null) {
      window.alert("Please select your position");
      return;
    }

    if (this.mode === 'edit' ) {
      this.service.updateTouristPosition(this.touristPosition).subscribe({
        next: () => {
          window.alert("Position successfully updated");  

          this.service.updateSocialEncounters().subscribe({
            next: () => {
          }
          });
        },
      });
    }
    else if (this.mode ==='add') {
      this.service.addTouristPosition(this.touristPosition).subscribe({
        next: () => {
          window.alert("Position successfully added");  
          this.mode = 'edit';

          this.service.updateSocialEncounters().subscribe({
            next: () => {
          }
          });
          
        },
      });
    }
  }
}
