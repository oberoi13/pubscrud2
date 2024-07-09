import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Author } from '../table/table.model';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  SelectedAuthor:any;
  updatedAuthor:Author={
    au_id:'',
   au_lname: '',
   au_fname: '',
   address: '',
   city: '',
   state: '',
   zip: '',
   contract: '',
   phone: ''
 };


AllAuthors:Author[]=[]
  constructor (private route:ActivatedRoute,private router:Router,private dataservice:DataServiceService){}
  async ngOnInit(): Promise<void> {
    const authorId:string = this.route.snapshot.paramMap.get('id');
    console.log(authorId)
   this.getAllAuthors(authorId);
   console.log("all authors loaded",this.AllAuthors)
   
}
  getAllAuthors(id:string){
  this.dataservice.getData().subscribe(
    (data:Author[]) => {
      console.log('Data received:', data);
      this.AllAuthors = data; 
      console.log("AAuthor",this.AllAuthors)   
    this.filterAuthors(id); },
    error => {
      console.error('Error fetching data:', error);
      return null
    }
  );
}
 filterAuthors(id: string) {
  // console.log("Edit All Authors:", this.AllAuthors);
  this.SelectedAuthor = this.AllAuthors.find(x => x.au_id == id);

  console.log("Edit Selected Author:", this.SelectedAuthor);

}
goBack(){
  this.router.navigate(["/Authors"])
}
Save(){
 console.log( this.SelectedAuthor)
 this.updatedAuthor.au_fname=this.SelectedAuthor.au_fname
 this.updatedAuthor.au_lname=this.SelectedAuthor.au_lname
 this.updatedAuthor.address=this.SelectedAuthor.address
 this.updatedAuthor.city=this.SelectedAuthor.city
 this.updatedAuthor.state=this.SelectedAuthor.state
 this.updatedAuthor.zip=this.SelectedAuthor.zip
 this.updatedAuthor.phone=this.SelectedAuthor.phone
 this.updatedAuthor.contract=this.SelectedAuthor.contract

 console.log(this.updatedAuthor)
 this.dataservice.updateData(this.SelectedAuthor.au_id, this.updatedAuthor).subscribe(
  response => {
    console.log(response);
    // this.loadData(); // Refresh data after update
  },
  error => console.error(error)
);
}

}

