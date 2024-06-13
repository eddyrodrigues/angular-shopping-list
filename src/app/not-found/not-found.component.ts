import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-component',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    console.log(this.router.events);
    console.log(this.router);
  }
}
