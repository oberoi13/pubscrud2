import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Books } from './all-books.model';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})

export class AllBooksComponent implements OnInit {
  constructor(private Dataservice:DataServiceService){}
  AllBooks:Books[]

  ngOnInit(): void {
    this.getAllBooks()
  }

  getAllBooks(){
    this.Dataservice.getBooksData().subscribe((data:Books[])=> {
      console.log("Books Data Received",data)
    this.AllBooks=data

    }
  );
  }
}
