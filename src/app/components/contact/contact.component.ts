import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  @Output() clicked = new EventEmitter<string>();

  constructor(private api: ApiService, private snackbar: MatSnackBar) {}

  contactForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    message: new FormControl('',Validators.required),
  })

  sendMessage() {
    if(this.contactForm.invalid) {
      this.snackbar.open(`Please fill in all fields`, 'Ok', {duration: 2000})
      return;
    } else { 
      let formValue = this.contactForm.value

    this.api.genericPost('send-message', formValue) 
    .subscribe({
      next:(res:any) => {
      this.snackbar.open(`Message sent: ${res}`, 'Ok', {duration: 2000});
        this.contactForm.reset()
        this.clicked.emit('closed')
      },
      error: (err: any) => this.snackbar.open(err.error, 'Ok', { duration: 3000 }),
      complete: () => { }
    })
    }

  }


}
