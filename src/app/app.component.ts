import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  final_date:Date;
  flag:Boolean= false;
  startDate = new Date(Date.now());
  final_arr=[];
  final_data=[];
  final_final=[];
  final_only_push:any = [];
  check_date:Date;
  i:number=0;
  constructor(private _http:HttpClient,private datepipe:DatePipe){}
   ngOnInit() {
    this.onChangeDate(this.startDate);    
}
onChangeDate(data:any){
   
  let check_data = this.datepipe.transform(data, 'YYYY-MM-dd');

    this._http.get<any>('https://www.gov.uk/bank-holidays.json').subscribe(data => {
      this.final_arr = Object.values(data);
      for (this.i = 0; this.i < this.final_arr.length; this.i++) {
        this.final_data = this.final_arr[this.i]['events'];
        this.final_final = this.final_data.filter(item => {
          return item['date'] == check_data
        })     
      }
      if(this.final_final.length > 0){
        this.final_only_push.push(...this.final_final)
        this.flag = true;
     }else{
        this.flag=false;
     }
    });
   }
   onUpdateDate(){
    this.final_only_push=[];
     this.onChangeDate(this.final_date);
   }

   
}
