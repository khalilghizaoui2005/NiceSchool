import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'ecole'; // ضع اسم مشروعك الصحيح هنا

  ngAfterViewInit(): void {
    // إخفاء spinner بعد تحميل Angular
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.display = 'none';
    }
  }
}
