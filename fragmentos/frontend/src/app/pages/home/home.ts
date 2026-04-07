import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Fragment, FragmentData } from '../../services/fragment';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  fragments: FragmentData[] = [];
  loading = true;
  mensagemLoading = 'A carregar fragmentos...';

  constructor(private fragmentService: Fragment) {}

  ngOnInit() {
    setTimeout(() => {
      if (this.loading) {
        this.mensagemLoading = 'O servidor está a acordar, aguarda um momento...';
      }
    }, 5000);

    this.fragmentService.getFragments().subscribe({
      next: (res) => {
        this.fragments = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // 👇 ADICIONA ISTO AQUI (dentro da classe, depois do ngOnInit)
  getRandomStyle() {
    const sizes = ['0.9rem', '1.1rem', '1.3rem', '1.6rem'];
    const rotations = ['-2deg', '0deg', '2deg'];
    const colors = ['#1a1a1a', '#7c5cbf', '#999'];

    return {
      'font-size': sizes[Math.floor(Math.random() * sizes.length)],
      'color': colors[Math.floor(Math.random() * colors.length)],
      'transform': `rotate(${rotations[Math.floor(Math.random() * rotations.length)]})`
    };
  }
}