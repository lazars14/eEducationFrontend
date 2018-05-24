import { Student, Course } from "./index";

export class StudentDocument {
    id: number;
    documentName: string;
    documentType: string;
    documentURL: string;
    mimeType: string;
    student: Student;
    course: Course;
}