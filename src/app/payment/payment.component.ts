import { Component, OnInit } from '@angular/core';
import { paymentCard } from '../models/paymentCard';
import { PaymentService } from '../service/payment.service';
declare var $: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public isExpired: boolean;
  public date = new Date();
  public paymentInfo: paymentCard;
  public currentYear = this.date.getFullYear();
  constructor(private payment:PaymentService) { }

  ngOnInit(): void {
    this.paymentInfo = new paymentCard();

    $('.noNumber').keydown(function (e) {

      if (e.shiftKey || e.ctrlKey || e.altKey) {

        e.preventDefault();
      }
      else {

        var key = e.keyCode;

        if (!((key == 8) || (key == 32) || (key == 46)
          || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {

          e.preventDefault();
        }
      }
    });
    $('.justNumber').keydown(function (e) {

      if (e.shiftKey || e.ctrlKey || e.altKey) {

        e.preventDefault();
      }
      else {

        var key = e.keyCode;
        if (((key == 107) || (key == 109) || (key == 110) || (key == 32) || (key == 46)
          || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {

          e.preventDefault();
        }
      }
    });
    (function () {
      'use strict'

      var forms = document.querySelectorAll('.needs-validation')

      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }

            form.classList.add('was-validated')
          }, false)
        })
    })()
  }
  public sendPayment(form) {
    const expDate = document.getElementById('date');
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    this.paymentInfo.expirationDate = new Date(this.paymentInfo.expirationDate);
    if (this.paymentInfo.expirationDate.getFullYear() < currentYear || (this.paymentInfo.expirationDate.getFullYear() == currentYear && this.paymentInfo.expirationDate.getMonth() <= currentMonth)) {
      this.isExpired = true;
      expDate.classList.add('invalid');
    } else {
      this.isExpired = false;
      if (form.checkValidity() === true) {
        this.payment.createPayment(this.paymentInfo);
      }

    }



  }
}
