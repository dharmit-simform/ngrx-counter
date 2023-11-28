import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CustomToastService {

  constructor() {
  }

  success(message: string) {
    Swal.fire("Success", message, "success")
  }

  error(message: string) {
    Swal.fire("Error", message, "error");
  }
}
