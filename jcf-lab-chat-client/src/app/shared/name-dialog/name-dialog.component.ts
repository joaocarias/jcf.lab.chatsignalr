import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-name-dialog',
  standalone: true,
  imports: [ MatDialogModule, 
            MatFormFieldModule, 
            FormsModule,
            ReactiveFormsModule,
    ],
  templateUrl: './name-dialog.component.html',
  styleUrl: './name-dialog.component.css',  
})
export class NameDialogComponent implements OnInit {
  
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public name: string,
    public dialogRef: MatDialogRef<NameDialogComponent>
  ) { }
  
  ngOnInit(): void {
    
  }

}
