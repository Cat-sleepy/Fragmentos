import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Submeter } from './submeter';

describe('Submeter', () => {
  let component: Submeter;
  let fixture: ComponentFixture<Submeter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Submeter],
    }).compileComponents();

    fixture = TestBed.createComponent(Submeter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
