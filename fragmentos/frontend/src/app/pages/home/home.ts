import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Fragment } from '../../services/fragment';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  fragments: any[] = [];
  loading = true;

  constructor(private fragmentService: Fragment) {}

  ngOnInit() {
    this.fragmentService.getFragments().subscribe({
      next: (res) => {
        this.fragments = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}