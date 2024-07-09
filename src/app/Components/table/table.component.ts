import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Author } from './table.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
constructor (private dataservice:DataServiceService, private router:Router
){}
// SelectedAuthors:Author={
//   au_id: '',
//   au_lname: '',
//   au_fname: '',
//   address: '',
//   city: '',
//   state: '',
//   zip: '',
//   contract: '',
//   phone: ''
// };
 SelectedAuthors:Author[]=[];

AllAuthors:Author[]=[]

  
ngOnInit(): void {
  console.log("init called")
 this.getAllAuthors();
}
getAllAuthors(){
  this.dataservice.getData().subscribe(
    (data:Author[]) => {
      console.log('Data received:', data);
      this.AllAuthors = data; 
      this.AllAuthors=data;
      console.log("AAuthor",this.AllAuthors)
    },
    error => {
      console.error('Error fetching data:', error);
    }
  );
}
Edit(id:any){
  console.log(id);
  console.log("id");
  this.router.navigate(['/Edit', id]);
}
deleteAuthor(authorId: string) {
  this.dataservice.deleteAuthor(authorId).subscribe(
    () => {
      console.log('Author deleted successfully');
      // Optionally, update UI or perform other actions upon successful deletion
      this.ngOnInit()
    },
    error => {
      console.error('Error deleting author:', error);
      // Handle error, display error message, etc.
    }
  );
  
}
AddAuthorbutton(){
    this.router.navigate(['/Add'])
}
}
