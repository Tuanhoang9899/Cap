import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { ProcessOrderService } from '../../../services/process-order.service';


@Component({
  selector: 'app-booking-request-dialog',
  templateUrl: './booking-request-dialog.component.html',
  styleUrls: ['./booking-request-dialog.component.css']
})
export class BookingRequestDialogComponent implements OnInit {
  processOrders = [];
  constructor(public dialogRef: MatDialogRef<BookingRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private processOrderService: ProcessOrderService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.getAllProcessOrder();
  }
  getAllProcessOrder() {
    this.processOrderService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.processOrders = data;
      console.log("processOrders: ", this.processOrders);
    });
  }
  chooseTable(id) {

    this.router.navigate(['/set-table'],{ relativeTo: this.route, queryParams: { id: id }, replaceUrl: true }).then(val => {
      this.dialogRef.close();
    });

  }
}
