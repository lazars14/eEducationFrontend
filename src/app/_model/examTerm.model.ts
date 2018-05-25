import { Course } from "./index";

export class ExamTerm {
    id: number;
    examDate: Date;
    classRoom: string;
    course: Course;
    examPeriod: number;
}