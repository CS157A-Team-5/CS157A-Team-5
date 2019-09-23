import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetbookComponent } from './petbook.component';

describe('PetbookComponent', () => {
  let component: PetbookComponent;
  let fixture: ComponentFixture<PetbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
