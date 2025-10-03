<<<<<<< HEAD
import { Component, AfterViewInit } from '@angular/core';
=======
import { Component } from '@angular/core';
>>>>>>> 9f685caed91c7db03b6ec1cf424982bb65cd5b9c

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
<<<<<<< HEAD
export class AppComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    // إخفاء spinner بعد تحميل Angular
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.display = 'none';
    }
  }

}
=======
export class AppComponent {
  title = 'todo-app';
}

>>>>>>> 9f685caed91c7db03b6ec1cf424982bb65cd5b9c
