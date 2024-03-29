import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'amdg-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  content = {
    title: null,
    content: null,
    cancel_text: null,
    ok_text: null
  };

  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.content = this.data;
  }

  close(): void {
    this.dialogRef.close();
  }

  ok(): void {
    this.dialogRef.close(true);
  }

}
