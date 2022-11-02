import { AppService } from './../app.service';
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  SimpleChanges,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BotLogsInterface } from './teble.interface';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  tabledata: any;
  didGet: boolean = false;
  displayedColumns: any[] = [
    'createdAt',
    'name',
    'BTCUSDT',
    'DOGEUSDT',
    'ETHUSDT',
    'LTCUSDT',
    'SOLUSDT',
    'TRXUSDT',
    'XRPUSDT',
    'BNBUSDT',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.get().subscribe((data: any) => {
      console.log(data.slice(0, 50));
      this.dataSource = new MatTableDataSource<BotLogsInterface[]>(data);

      // set pagination
      this.dataSource.paginator = this.paginator;
      this.didGet = true;
    });
  }

  ngAfterViewInit() {
    if (this.didGet) this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.dataSource = new MatTableDataSource<BotLogsInterface[]>(this.dataset);
    // this.applyFilter(this.filter);
  }

  applyFilter(event: Event) {
    console.log('event', event);
    console.log((event.target as HTMLInputElement).value);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
