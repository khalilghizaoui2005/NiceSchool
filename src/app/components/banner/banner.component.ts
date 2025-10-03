import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  @Input() title: string = 'Welcome';         
  @Input() subtitle?: string;                 
  @Input() gradientStart: string = '#43e97b'; 
  @Input() gradientEnd: string = '#38f9d7';  
}
