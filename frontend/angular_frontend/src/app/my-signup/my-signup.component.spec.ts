import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySignupComponent } from './my-signup.component';

describe('MySignupComponent', () => {
  let component: MySignupComponent;
  let fixture: ComponentFixture<MySignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MySignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
