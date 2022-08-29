import { TestBed } from '@angular/core/testing';
import { HeroesService } from '../src/app/services/heroes.service';
import { HttpClientModule } from '@angular/common/http';

describe('HeroesService', () => {
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(HeroesService);
  });

  test('should be created', ()=> {
    expect(service).toBeTruthy();
  });

  test('resetear numero de pagina', () => {
    expect(service.resetPager()).toBe(0);
  });

  test('get Heroes', (done)=> {
    jest.spyOn(service, 'getHeroes').mockImplementationOnce;
    service.getHeroes();
    expect(service.getHeroes).toHaveBeenCalled();
    expect(service.heroes).toBeDefined();
    done();
  });

  test('probar Get Heroe por id', (done) => {
    service.getHeroe(1011334).subscribe((heroe: any) => {
      expect(heroe.data.results.name).toBe('3-D Man');
    });

    done();
  });

  test('probar GetTeamcolor', () => {
    service.teams.set("azul", "#1f8ff7")
                 .set("violeta", "#a43de3")
                 .set("naranjo", "#df5c0f")
                 .set("verde", "#0ea521")

    let color = service.getTeamColor('naranjo');
    expect(color).toBe('#df5c0f');
  });
});
