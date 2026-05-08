import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Hart } from '../services/hart';
import { API_BASE } from '../services/api.constants';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    Footer
  ],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class News implements OnInit {
  serverNews: any[] = [];
  readonly fallbackImage = 'assets/news-cards/7.jpg';

  constructor(
    private hart: Hart,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews() {
    this.hart.getNews().subscribe({
      next: (response) => {
        if (response && response.success) {
          console.log('Noticias cargadas del servidor:', response.data); // Log para verificar datos
          this.serverNews = response.data.map((item: any) => ({
            id: item.id,
            titulo: item.titulo,
            descripcion: item.descripcion,
            imagen: this.getImageUrl(item.imagen_url ?? item.imageUrl ?? item.imagen),
            date: new Date(item.fecha).toLocaleDateString(),
            big: 0
          }));
          this.cd.detectChanges(); // Forzar actualización de la vista
        }
      },
      error: (error) => {
        console.error('Error cargando noticias', error);
      }
    });
  }

  goNew(news: any) {
    this.router.navigate(['/new', news.id]);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src.endsWith(this.fallbackImage)) {
      return;
    }

    img.src = this.fallbackImage;
  }

  private getImageUrl(image?: string): string {
    const value = String(image ?? '').trim();

    if (!value) {
      return this.fallbackImage;
    }

    if (value.startsWith('//')) {
      return `https:${value}`;
    }

    if (/^https?:\/\//i.test(value) || value.startsWith('assets/')) {
      return value;
    }

    return `${API_BASE}/${value.replace(/^\/+/, '')}`;
  }
}
