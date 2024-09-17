import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl(''),
  })

  sendMessage() {
    if(this.contactForm.invalid) return
    
    let formValue = this.contactForm.value

    this.api.genericPost('/send-message', formValue) 
    .subscribe({
      next:(res:any) => {
        sessionStorage.setItem('currentUser', JSON.stringify('res'));
        this.contactForm.reset()
        this.clicked.emit('closed')
      },
      error: (err: any) => this.snackbar.open(err.error, 'Ok', { duration: 3000 }),
      complete: () => { }
    })

  }


}
