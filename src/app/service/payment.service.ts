import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  public createPayment(paymentInfo){
    const	options = {
      headers: {
         "Content-Type": "application/json,charset=utf-8",
         "access-control-allow-origin": "*",
         "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
         "access-control-allow-headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"

        }
      };
    paymentInfo.text = "Hello, I am learning how to test APIs with Postman!";
    this.http.post('https://api.funtranslations.com/translate/yoda',paymentInfo,options).subscribe(data => {
      console.log('payment done')
    },err => {
        console.log('payment error');
      })
  }
}
