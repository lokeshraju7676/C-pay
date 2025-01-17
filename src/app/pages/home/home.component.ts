import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper'; // Import Swiper

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    // Initialize Swiper for the banner section
    new Swiper('.swiper-container', {
      loop: true, // Enable infinite loop
      autoplay: {
        delay: 1000, // Set delay between slides (1 second)
      },
      pagination: {
        el: '.swiper-pagination', // Enable pagination
        clickable: true, // Make pagination clickable
      },
    });
  }
}
