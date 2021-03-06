import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherListComponent } from './another-list.component';

describe('AnotherListComponent', () => {
  let component: AnotherListComponent;
  let fixture: ComponentFixture<AnotherListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnotherListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnotherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
