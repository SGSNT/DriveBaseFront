import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietariodetailsComponent } from './proprietariodetails.component';

describe('ProprietariodetailsComponent', () => {
  let component: ProprietariodetailsComponent;
  let fixture: ComponentFixture<ProprietariodetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProprietariodetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProprietariodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
