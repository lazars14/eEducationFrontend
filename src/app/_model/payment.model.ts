import { Student } from "./index";

export class Payment {
    id: number;
    student: Student;
    amount: number;
    cause: string;
    paymentDate: Date;
    owes: boolean;
}