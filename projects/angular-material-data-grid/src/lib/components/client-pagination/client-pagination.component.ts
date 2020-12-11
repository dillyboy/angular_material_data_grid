import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amdg-client-pagination',
  templateUrl: './client-pagination.component.html',
  styleUrls: ['../pagination/pagination.component.scss']
})
export class ClientPaginationComponent implements OnInit {

  @Output() toggleFullScreen: any = new EventEmitter<any>();
  fullscreen = false;
  constructor() { }

  ngOnInit(): void {
  }

}
