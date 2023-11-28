import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { registerStart } from '../state/auth.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      address: new FormGroup({
        street: new FormControl('Ahmedabad', [Validators.required]),
        suite: new FormControl('Ahmedabad', [Validators.required]),
        city: new FormControl('Ahmedabad', [Validators.required]),
        zipcode: new FormControl('Ahmedabad', [Validators.required]),
        geo: new FormGroup({
          lat: new FormControl('77', [Validators.required]),
          long: new FormControl('33', [Validators.required]),
        })
      }),
      phone: new FormControl('9876543210', [Validators.required]),
      website: new FormControl('http://something.com', [Validators.required]),
    })
  }

  onRegisterSubmit() {
    const formValue = this.registerForm.value;
    this.store.dispatch(registerStart(formValue));
  }
}
