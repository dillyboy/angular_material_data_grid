import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amdg-client-pagination',
  templateUrl: './client-pagination.component.html',
  styleUrls: ['../pagination/pagination.component.scss']
})
export class ClientPaginationComponent implements OnInit {

  @Input() noOfTotalRecords = null;
  @Input() noOfSelectedRow = null;
  @Output() toggleFullScreen: any = new EventEmitter<any>();
  fullscreen = false;
  constructor() { }

  ngOnInit(): void {
  }

}
