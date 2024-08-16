import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Author } from 'src/app/Components/table/table.model';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-add-authors-dialog',
  templateUrl: './add-authors-dialog.component.html',
  styleUrls: ['./add-authors-dialog.component.css']
})
export class AddAuthorsDialogComponent implements OnInit {

  AllAuthors:Author[]
  SelectedAuths:any
  AuthorId:string
  titleId:string
  searchText: any;

  
constructor(private dataservice:DataServiceService,    @Inject(MAT_DIALOG_DATA) public data: any
){}
ngOnInit(): void {
  this.SelectedAuths=this.data.Authors
  console.log(this.SelectedAuths);
  this.getAllAuthors()
  this.titleId=this.data.titleId
}

getAllAuthors(){
  this.dataservice.getData().subscribe(
    (data:Author[]) => {
      console.log('Data received:', data);
      this.AllAuthors = data; 
      console.log("AAuthor",this.AllAuthors)
      let filteredAuthors = this.AllAuthors.filter(author => 
        !this.SelectedAuths.some(toRemove => toRemove.au_id === author.au_id)
      );
      this.AllAuthors=filteredAuthors
      console.log("filtered Authors",this.AllAuthors)
    },
    error => {
      console.error('Error fetching data:', error);
    }
  );
}
AddAuthor(AuthID: string) {
  console.log(AuthID)
  console.log(this.titleId)
  this.dataservice.AddBookAuthor(String(AuthID),String(this.titleId)).subscribe(()=>{console.log("Author added to book")},error=>{console.log("Error",error)}); 
  }
  get filteredAuthors() {
    if (!this.searchText) {
      return this.AllAuthors;
    }
    return this.AllAuthors.filter(author => 
      author.au_fname.toLowerCase().includes(this.searchText.toLowerCase()) || 
      author.au_lname.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

}
