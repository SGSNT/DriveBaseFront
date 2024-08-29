import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencaolistComponent } from './manutencaolist.component';

describe('ManutencaolistComponent', () => {
  let component: ManutencaolistComponent;
  let fixture: ComponentFixture<ManutencaolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManutencaolistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManutencaolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
