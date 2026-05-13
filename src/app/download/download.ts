import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    Footer
  ],
  templateUrl: './download.html',
  styleUrls: ['./download.scss'],
})
export class DownloadComponent {

  serverName = 'Gratoxuia';
  version = '1.82 - Gratis';
}
