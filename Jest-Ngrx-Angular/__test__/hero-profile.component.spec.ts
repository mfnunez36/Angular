import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { HeroesService } from '../src/app/services/heroes.service';

import { HeroProfileComponent } from '../src/app/components/hero-profile/hero-profile.component';
import { ModalPollComponent } from '../src/app/components/modal-poll/modal-poll.component';

describe('HeroProfileComponent', () => {
  let component: HeroProfileComponent;
  let fixture: ComponentFixture<HeroProfileComponent>;
  let compiled: HTMLElement;
  let service: HeroesService;
  let mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get(id: string) {
          return '1011334'
        }
      }
    }
  }
  let LocationMock = {
    back():void {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useValue: LocationMock }
      ],
      imports: [ HttpClientTestingModule ],
      declarations: [ HeroProfileComponent, ModalPollComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroProfileComponent);
    service = TestBed.inject(HeroesService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('should be created', () => {
    expect(component).toBeTruthy();
  });

  test('Probando match snapshot', () => {
    fixture.detectChanges();
    expect(compiled.innerHTML).toMatchSnapshot();
  });

  test('cargar heroe', () => {
    jest.spyOn(component, 'getHeroe');
    component.id = '1010870';
    component.heroe = mockHeroe;
    component.getHeroe();
    fixture.detectChanges();
    expect(component.getHeroe).toBeCalled();
    expect(component.heroe.id).toBe('1');
  });

  test('Probar go_back', () => {
    jest.spyOn(component, 'goBack');
    component.goBack();
    expect(component.goBack).toBeCalled();
  })
});


let mockHeroe = {
  id: '1',
  name: 'Spiderman',
  description: 'El hombre que araña',
  modified: new Date(),
  thumbnail: {
    'path': 'https://i.pinimg.com/originals/c2/93/56/c293563aa553250601d8cb768c044d4b',
    'extension': 'jpg'
  },
  resourceURI: 'http://gateway.marvel.com/v1/public/characters/1011334',
  teamColor: 'azul'
}
