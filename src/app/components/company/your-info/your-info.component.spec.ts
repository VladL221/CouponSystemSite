import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourInfoComponent } from './your-info.component';

describe('YourInfoComponent', () => {
  let component: YourInfoComponent;
  let fixture: ComponentFixture<YourInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
