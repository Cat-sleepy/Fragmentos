import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  title = 'frontend';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // acorda o servidor ao carregar a app
    this.http.get('https://fragmentos-backend.onrender.com/health').subscribe();
  }
}