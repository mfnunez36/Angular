import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPollComponent } from '../src/app/components/modal-poll/modal-poll.component';

describe('ModalPollComponent', () => {
  let component: ModalPollComponent;
  let fixture: ComponentFixture<ModalPollComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('should be created', ()=> {
    expect(component).toBeTruthy();
  });

  test('Probando match snapshot', () => {
    fixture.detectChanges();
    expect(compiled.innerHTML).toMatchSnapshot();
  });

  test('Emit team', () => {
    const spy = jest.spyOn( component.setTeam, 'emit' );
    component.send_team('1');
    expect(spy).toBeCalledTimes(1);
  })

});
