import { Course, ExamPeriod } from "./index";

export class ExamTerm {
    id: number;
    examDate: Date;
    classRoom: string;
    course: Course;
    examPeriod: ExamPeriod;
}