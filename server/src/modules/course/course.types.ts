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
