import { Component, OnInit } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-previewdetails',
  templateUrl: './previewdetails.component.html',
  styleUrls: ['./previewdetails.component.scss']
})
export class PreviewdetailsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PreviewdetailsComponent>) { }

  ngOnInit(): void {
  }
  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
