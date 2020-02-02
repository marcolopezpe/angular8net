import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { IOrder } from '../../shared/models/iorder';
import { DataService } from '../../core/services/data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ICustomer } from '../../shared/models/icustomer';
import { IOrderItem } from '../../shared/models/iorder-item';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss']
})
export class CustomerOrdersComponent implements OnInit, OnChanges {

  customer: ICustomer =
    {
      Id: 0,
      FirstName: '',
      LastName: '',
      Gender: '',
      Address: '',
      City: '',
      State: {
        Abbreviation: '',
        Name: ''
      },
      Orders: []
    };

  displayedColumns: string[] = ['ProductName', 'ItemCost'];
  dataSource: MatTableDataSource<IOrderItem>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id !== 0) {
        this.getCustomer(id);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //this.loadData(changes.customers.currentValue);
  }

  getCustomer(id: number) {
    this.dataService.getCustomer(id).subscribe((customer: ICustomer) => {
      console.log(customer);
      this.customer = customer;
      
    });
  }

  loadData(data: IOrderItem[]) {
    this.dataSource = new MatTableDataSource<IOrderItem>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    return this.dataSource;
  }
}
