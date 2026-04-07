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
  fragmentStyles: Record<string, string>[] = [];

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
        this.fragmentStyles = this.generateFragmentStyles(this.fragments.length);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  generateFragmentStyles(total: number) {
    const styles: Record<string, string>[] = [];

    for (let i = 0; i < total; i++) {
      const offsetX = Math.floor(Math.random() * 700) - 350;
      const offsetY = Math.floor(Math.random() * 420) - 210;
      const duration = (6 + Math.random() * 8).toFixed(2);
      const delay = (Math.random() * 6).toFixed(2);
      const rotation = Math.floor(Math.random() * 10) - 5;

      styles.push({
        '--x': `${offsetX}px`,
        '--y': `${offsetY}px`,
        '--duracao': `${duration}s`,
        '--delay': `${delay}s`,
        '--rotacao': `${rotation}deg`,
      });
    }

    return styles;
  }

  getRandomTextStyle(index: number) {
    const sizes = ['0.95rem', '1.1rem', '1.35rem', '1.6rem'];
    const colors = ['#1a1a1a', '#7c5cbf', '#8f7aa8', '#5e4b7e', '#999'];
    const size = sizes[index % sizes.length];
    const color = colors[index % colors.length];

    return {
      'font-size': size,
      color: color,
    };
  }
}