import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Author } from './table.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit,AfterViewInit {
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
displayedColumns: string[] = ['au_id', 'au_fname', 'au_lname', 'address', 'city', 'state', 'zip', 'phone', 'contract', 'actions'];
dataSource: MatTableDataSource<Author>;
@ViewChild(MatPaginator) paginator: MatPaginator;

  
ngOnInit():void {
  console.log("init called")
 this.getAllAuthors();
}
ngAfterViewInit() {
  
}
getAllAuthors(){
  this.dataservice.getData().subscribe(
    (data:Author[]) => {
      console.log('Data received:', data);
      this.AllAuthors = data; 
      this.AllAuthors=data;
      this.dataSource = new MatTableDataSource(this.AllAuthors);
      this.dataSource.paginator = this.paginator;

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
GoToBooks(){
  this.router.navigate(['/Books'])
}
}
