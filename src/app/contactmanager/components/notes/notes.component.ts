import {Component, Input, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Note} from '../../models/note';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, AfterViewInit {

  @Input() notes: Note[];

  displayedColumns: string[] = ['position', 'title', 'date'];
  dataSource: MatTableDataSource<Note>;

  constructor() { }

  // for pagination
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // for sorting
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Note>(this.notes);
  }

  ngAfterViewInit() {

    // for pagination
    this.dataSource.paginator = this.paginator;

    // for sorting
    this.dataSource.sort = this.sort;
  }

  // filtering
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
