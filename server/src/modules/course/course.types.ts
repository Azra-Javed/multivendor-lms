// add questions in course
export interface IAddQuestionData{
    question: string;
    courseId: string;
    contentId: string;
}

//add answer in course questions
export interface IAddAnswerData{
    answer:string;
    courseId:string;
    contentId:string;
    questionId: string;
}

//add review in course
export interface IAddReviewData{
    review: string;
    rating: number;
    userId: string;
}

//add reply for review
export interface IAddAnswerToReviewData{
    comment: string;
    courseId: number;
    reviewId: string;
}

