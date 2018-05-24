import { Course, CourseFile, Student } from "./index";

export class Notification {
    id: number;
    message: string;
    nDate: Date;
    course: Course;
    document: CourseFile;
    seen: Boolean;
    student: Student;
}