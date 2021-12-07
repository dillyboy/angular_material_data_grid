import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  urlExtracts: any = {params: null, queryParams: null};
  constructor(private route: ActivatedRoute) {
    const {params, queryParams} = route.snapshot;
    this.urlExtracts.params = params;
    this.urlExtracts.queryParams = queryParams;
  }

}
