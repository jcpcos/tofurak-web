import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-static-navbar',
  imports: [CommonModule],
  templateUrl: './static-navbar.html',
  styleUrl: './static-navbar.scss',
})
export class StaticNavbar {
  modalConfig: string = '{"target": "#modalVideo"}';

  openModal() {
    // Your logic to open the modal
  }
}
