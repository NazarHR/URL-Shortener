import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import { URLDetailService } from '../shared/url-detail.service';
import { URLDetail } from '../shared/url-detail.model';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styles: [
  ]
})
export class RedirectComponent implements OnInit{
  shortenedUrl:string="";
  fullUrlDetails:URLDetail= new URLDetail();
  constructor(private route: ActivatedRoute,private router:Router,public service:URLDetailService)
  {
    
  }
    
  ngOnInit(): void {
    this.route.params.subscribe(parameter=>
      {
        this.shortenedUrl=parameter['shortLink']
      })
      this.service.getFullLink(this.shortenedUrl)
      .subscribe({
        next:res=>{
          this.fullUrlDetails=res as URLDetail;
          window.location.href=this.fullUrlDetails.originalUrl;
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
  
