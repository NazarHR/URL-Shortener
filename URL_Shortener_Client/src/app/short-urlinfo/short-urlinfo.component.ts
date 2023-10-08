import { Component, OnInit } from '@angular/core';
import { URLDetailService } from '../shared/url-detail.service';
import { URLDetail } from '../shared/url-detail.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-short-urlinfo',
  templateUrl: './short-urlinfo.component.html',
  styles: [
  ]
})
export class ShortURLInfoComponent implements OnInit {
  singleResult:URLDetail=new URLDetail();
  urlId:number=0;
  
  constructor(private route: ActivatedRoute,private router:Router,public service:URLDetailService)
  {
    
  }
  ngOnInit(): void {
    this.route.params.subscribe(parameter=>
      {
        this.urlId=parameter['id'];
      })
      this.service.getSingleUrlInfo(this.urlId)
      .subscribe({
        next:res=>{
          this.singleResult = res as URLDetail;
        },
        error:err=>{
          if(err.status==404 )
          {
            this.router.navigate(["404"])
          }
        }
      })
  }
  
}
