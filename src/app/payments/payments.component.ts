import { Component, OnInit } from '@angular/core';
import { StudentService, PaymentService } from '../_services/index';
import { roles } from './../_core/constants';
import { SessionService } from '../_core/index';
import { Payment } from '../_model/index';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  constructor(private studentService: StudentService, private paymentService: PaymentService,
    private sessionService: SessionService, private toasterService: ToasterService) { }

  payments = Array<Payment>();

  accountNumber: string;
  referenceNumber: string;
  balance = 0;

  ngOnInit() {
    this.paymentService.getByStudent().subscribe(data => {
      this.payments = data;
      data.forEach(payment => {
        this.balance = (payment.owes == true) ? this.balance += payment.amount : this.balance -= payment.amount;
      });
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Get Payments For Student', body: error.status + ' ' + error.statusText });
    });

    this.studentService.findById(this.sessionService.getUserId()).subscribe(student => {
      this.accountNumber = student.accountNumber;
      this.referenceNumber = student.referenceNumber;
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Get Student By Id', body: error.status + ' ' + error.statusText });
    });

  }

}
