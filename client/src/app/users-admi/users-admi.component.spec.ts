import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAdmiComponent } from './users-admi.component';

describe('UsersAdmiComponent', () => {
  let component: UsersAdmiComponent;
  let fixture: ComponentFixture<UsersAdmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAdmiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAdmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
