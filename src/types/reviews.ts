export interface RatingCard {
  category: string,
  icon: any,
  rating: number,
  reviews: number,
}

export interface Review {
    readonly id: number,
    readonly external_id: number,
    channel: string,
    type: string,
    status: string,
    review_text: string,
    cleanliness: number,
    communication: number,
    respect_house_rules: number,
    average_rating: number,
    submitted_at: string,
    guest_name: string,
    listing_name: string
}