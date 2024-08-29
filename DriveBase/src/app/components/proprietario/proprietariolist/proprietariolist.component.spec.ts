import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietariolistComponent } from './proprietariolist.component';

describe('ProprietariolistComponent', () => {
  let component: ProprietariolistComponent;
  let fixture: ComponentFixture<ProprietariolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProprietariolistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProprietariolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
