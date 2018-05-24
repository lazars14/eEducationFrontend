import { Course } from "./index";

export class Colloquium {
    id: number;
    course: Course;
    maxPoints: number;
    examType: string;
    examDateTime: Date;
}