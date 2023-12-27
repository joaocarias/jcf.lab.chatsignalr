import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as signalR from '@microsoft/signalR';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NameDialogComponent } from '../../shared/name-dialog/name-dialog.component';

interface Message {
  userName: string,
  text: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule, 
  ]
})
export class HomeComponent implements OnInit {

  messages: Message[] = [];
  messageControl = new FormControl('');
  userName: string = "";

  connection = new signalR.HubConnectionBuilder()
                      .withUrl("https://localhost:7195/chat")
                      .build();

  constructor(public dialog: MatDialog){
    this.openDialog();
  }

  openDialog(){
    const dialogRef = this.dialog.open(NameDialogComponent, {
      width: '250px',
      data: this.userName,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe( result => {
      this.userName = result;
      this.startConnection();
    });
  }
  

  ngOnInit(): void {
  
  }

  sendMessage(){
    this.connection.send("newMessage", this.userName, this.messageControl.value)
      .then(() => {
        this.messageControl.setValue('');
      });
  }

  startConnection(){
    this.connection.on("newMessage", (userName: string, text: string) => {
      this.messages.push({
        text: text,
        userName: userName
      })
    });

    this.connection.start();
  }

}
