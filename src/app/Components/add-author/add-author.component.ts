import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhoneDirective } from 'src/app/directives/PhoneDirective';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Author } from '../table/table.model';
import { filter } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {
  SelectedAuthor:any={};
  duplicatauthor:any={};
  error:boolean=false;
  dataerror:boolean=false;
  AllAuthors:Author[]=[]

 constructor(private router:Router,private Dataservice:DataServiceService){}
 
ngOnInit(): void {
  this.SelectedAuthor={};
  this.error=false;
  this.getAllAuthors();


}
  goBack(){
    this.router.navigate(["/Authors"])
  }
  async Save(){
    this.filterAuthors(this.SelectedAuthor.au_id)
    if (this.duplicatauthor){
    this.error=true;
  }else{
    console.log(this.SelectedAuthor);

     (await this.Dataservice.AddAuthor(this.SelectedAuthor)).subscribe(
     response =>{console.log(response);this.router.navigate(['/','Authors']);}, error => console.error(error)
   ) ;
   
    

  }
  
  
   

    // if(this.SelectedAuthor.au_id)
    // console.log("selected Author",this.SelectedAuthor);
 



  
  }


  getAllAuthors(){
  this.Dataservice.getData().subscribe(
    (data:Author[]) => {
      console.log('Data received:', data);
      this.AllAuthors = data; 
      console.log("AAuthor",this.AllAuthors)   
    // this.filterAuthors(id);
     },
    error => {
      console.error('Error fetching data:', error);
      return null
    }
  );
}
 filterAuthors(id: string) {
  // console.log("Edit All Authors:", this.AllAuthors);
  this.duplicatauthor = this.AllAuthors.find(x => x.au_id == id);

  console.log("Edit Selected Author:", this.SelectedAuthor);

}




}
