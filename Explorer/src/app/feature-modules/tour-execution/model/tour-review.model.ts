import { ImageLink } from "./image-link.model";
import { UserInfo } from "./user-info.model";

export interface TourReview {
    id? : number,
    rating: string,
    comment: string,
    visitDate: string,
    ratingDate: string,
    imageLinks: ImageLink[],
    imageLinksString: string,
    tourId: number,
    userId: number,
    userInfo: UserInfo
}