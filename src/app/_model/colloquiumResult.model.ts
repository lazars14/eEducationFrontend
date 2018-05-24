import { Colloquium, Student, StudentDocument } from "./index";

export class ColloquiumResult {
    id: number;
    points: number;
    colloquium: Colloquium;
    student: Student;
    document: StudentDocument;
}