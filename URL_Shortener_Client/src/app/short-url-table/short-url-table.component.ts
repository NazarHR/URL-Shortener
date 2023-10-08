import { Component, OnInit } from '@angular/core';
import { URLDetailService } from '../shared/url-detail.service';
import { URLDetail } from '../shared/url-detail.model';

@Component({
  selector: 'app-short-url-table',
  templateUrl: './short-url-table.component.html',
  styles: [
  ]
})
export class ShortUrlTableComponent implements OnInit{
  constructor(public service:URLDetailService){}
  ngOnInit(): void {
    this.service.refreshList();
  }

  deleteClick(item:URLDetail)
  {
    if(confirm("Are you sure?"))
    {
      this.service.deleteURLDetails(item.id)
    }
  }
  deleteAllClick()
  {
    if(confirm("Are you sure?"))
    {
      this.service.deleteAllURLDetails();
    }
  }
}


