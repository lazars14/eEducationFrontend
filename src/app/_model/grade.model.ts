import { Course, Student } from "./index";

export class Grade {
    id: number;
    points: number;
    grade: number;
    course: Course;
    student: Student;
}