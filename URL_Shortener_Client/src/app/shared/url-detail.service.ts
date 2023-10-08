import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment } from 'src/environments/environment.development';
import { URLDetail } from './url-detail.model';
@Injectable({
  providedIn: 'root'
})
export class URLDetailService {

  url:string = environment.apiBaseUrl
  list:URLDetail[]=[];
  singleResult:URLDetail=new URLDetail();
  constructor(private http: HttpClient) { }
  
  refreshList()
  {
    this.http.get(this.url+'/short-urls-table')
    .subscribe({
      next:res=>{
        this.list = res as URLDetail[]
      },
      error:err=>{console.log(err)}
    })
  }
  getFullLink(shortened:string)
  {
    return this.http.get(this.url+'/'+shortened)
  }
  getSingleUrlInfo(id:number)
  {
    return this.http.get(this.url+'/short-url-info/'+id)
  }
  addUrl(urlToAdd:string)
  {
    this.http.post<string>(this.url+'/short-urls-table?actualURL='+urlToAdd,null)
    .subscribe({
      next:res=>{
        console.log(res);
        this.refreshList();
      },
      
      error:err=>{
        if(err.status == 400)
        {
          alert(err.error)}}
    })
  }

  deleteURLDetails(idToDelete:number){
    this.http.delete(this.url+'/short-urls-table/'+idToDelete)
    .subscribe({
      next:res=>{
        console.log(res);
        this.refreshList();
      },
      error:err=>{console.log(err);}
    })
  }
  deleteAllURLDetails(){
    this.http.delete(this.url+'/short-urls-table')
    .subscribe({
      next:res=>{
        console.log(res);
        this.refreshList();
      },
      error:err=>{console.log(err);}
    })
  }
}
