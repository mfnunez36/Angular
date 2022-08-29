import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesService } from '../src/app/services/heroes.service';

import { ListadoDeHeroesComponent } from '../src/app/components/listado-de-heroes/listado-de-heroes.component';
import { FormsModule } from '@angular/forms';

describe('ListadoDeHeroesComponent', () => {
  let component: ListadoDeHeroesComponent;
  let service: HeroesService;
  let fixture: ComponentFixture<ListadoDeHeroesComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ HeroesService ],
      imports: [ HttpClientTestingModule, FormsModule ],
      declarations: [ ListadoDeHeroesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoDeHeroesComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(HeroesService);

    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('sloud be created', ()=> {
    expect(component).toBeTruthy();
  });

  test('Probando match snapshot', () => {
    fixture.detectChanges();
    expect(compiled.innerHTML).toMatchSnapshot();
  });

  test('tets getHeroes', () => {
    const spy = jest.spyOn( component.heroesService, 'getHeroes');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledTimes(1);
  });

});
