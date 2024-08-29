import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencaodetailsComponent } from './manutencaodetails.component';

describe('ManutencaodetailsComponent', () => {
  let component: ManutencaodetailsComponent;
  let fixture: ComponentFixture<ManutencaodetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManutencaodetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManutencaodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
