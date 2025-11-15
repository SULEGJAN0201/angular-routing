import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  name = '';
  email = '';
  message = '';
  
  onSubmit() {
    console.log('Contact form submitted:', { name: this.name, email: this.email, message: this.message });
    alert('Form submitted! (This is a demo - no actual submission)');
  }
}
