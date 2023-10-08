import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { URLDetailService } from '../shared/url-detail.service';

@Component({
  selector: 'app-add-url',
  templateUrl: './add-url.component.html',
  styles: [
  ]
})
export class AddUrlComponent{
  constructor(public service:URLDetailService){
  }
  
  addUrl(actualURL:string)
  {
    this.service.addUrl(actualURL);
  }
}
