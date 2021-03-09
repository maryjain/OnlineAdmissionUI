import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  breakpoint: number;
  rHeight: string;
  constructor() { }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 7;
    this.rHeight= (window.innerWidth <= 600) ? "1:5" : "1:5";
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 7;

  }

}
