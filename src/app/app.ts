import { Component, HostListener, OnDestroy, signal } from '@angular/core';
import { Router, RouterOutlet, ChildrenOutletContexts, NavigationEnd } from '@angular/router';
import { slideInAnimation } from './animations';
import { filter, Subject, takeUntil } from 'rxjs';
import { Hart } from './services/hart';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [
    slideInAnimation
  ]
})
export class App implements OnDestroy {
  private destroy$ = new Subject<void>();
  protected readonly title = signal('cms_ankama');
  showBackToTop = false;

  constructor(
    private contexts: ChildrenOutletContexts,
    private router: Router,
    private hart: Hart,
  ) {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.hart.refreshCurrentUser();
      });
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showBackToTop = window.scrollY > 420;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
