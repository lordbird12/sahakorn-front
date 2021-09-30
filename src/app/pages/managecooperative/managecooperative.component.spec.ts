import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecooperativeComponent } from './managecooperative.component';

describe('BaseComponent', () => {
  let component: ManagecooperativeComponent;
  let fixture: ComponentFixture<ManagecooperativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagecooperativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagecooperativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

