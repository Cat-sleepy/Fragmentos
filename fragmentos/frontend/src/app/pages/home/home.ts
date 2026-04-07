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
  textStyles: Record<string, string>[] = [];

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
      this.textStyles = this.generateTextStyles(this.fragments.length);
      this.loading = false;

      // 👇 COLOCA AQUI
      setTimeout(() => {
        const audios = document.querySelectorAll('audio');
        audios.forEach((audio: any) => {
          audio.muted = false;
          audio.volume = Math.random() * 0.2;
        });
      }, 2000);
    },
    error: () => {
      this.loading = false;
    }
  });
}

  generateFragmentStyles(total: number) {
    const styles: Record<string, string>[] = [];

    for (let i = 0; i < total; i++) {
      const offsetX = Math.floor(Math.random() * 900) - 450;
      const offsetY = Math.floor(Math.random() * 520) - 260;
      const duration = (5 + Math.random() * 10).toFixed(2);
      const delay = (Math.random() * 6).toFixed(2);
      const rotation = Math.floor(Math.random() * 16) - 8;
      const scale = (0.65 + Math.random() * 0.9).toFixed(2);

      styles.push({
        '--x': `${offsetX}px`,
        '--y': `${offsetY}px`,
        '--duracao': `${duration}s`,
        '--delay': `${delay}s`,
        '--rotacao': `${rotation}deg`,
        '--escala': scale,
      });
    }

    return styles;
  }

  generateTextStyles(total: number) {
    const styles: Record<string, string>[] = [];
    const colors = ['#1a1a1a', '#7c5cbf', '#8f7aa8', '#5e4b7e', '#999999', '#4b3d68'];
    const sizes = ['0.95rem', '1.1rem', '1.25rem', '1.45rem', '1.7rem'];

    for (let i = 0; i < total; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const weight = Math.random() > 0.5 ? '400' : '600';
      const spacing = `${(Math.random() * 0.08).toFixed(2)}rem`;

      styles.push({
        color: color,
        'font-size': size,
        'font-weight': weight,
        'letter-spacing': spacing,
      });
    }

    return styles;
  }
}