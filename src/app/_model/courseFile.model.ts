import { CourseLesson, Course } from "./index";

export class CourseFile {
    id: number;
    documentName: string;
    documentType: string;
    documentURL: string;
    mimeType: string;
    course: Course;
    courseLesson: CourseLesson;
}