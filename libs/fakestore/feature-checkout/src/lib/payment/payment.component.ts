import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
