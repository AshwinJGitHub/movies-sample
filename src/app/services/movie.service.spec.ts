import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService, SearchType } from './movie.service';
import { HttpClient } from '@angular/common/http';
import { defer } from 'rxjs';

/** Create async observable that emits-once and completes
 *  after a JS engine turn */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
/** Create async observable error that errors
 *  after a JS engine turn */
export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('MovieService', () => {
let httpClientSpy: { get: jasmine.Spy };
let movieServiceSpy;
let movieService: MovieService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    movieServiceSpy =jasmine.createSpyObj('MovieService',['get']
    );
    movieService = new MovieService(<any> httpClientSpy);
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [MovieService, {provide: HttpClient,useValue:movieServiceSpy}]
    });
});

  it('should be created', () => {
    const service: MovieService = TestBed.get(MovieService);
    expect(service).toBeTruthy();
  });

  it('should return', () => {
    const service: MovieService = TestBed.get(MovieService);
    expect(service).toBeTruthy();
  });


  it('should return True', () => {
    httpClientSpy.get.and.returnValue(asyncData(true));
    movieService.getDetails('AA1234').subscribe(
      movies => expect(movies).toBeTruthy(), fail
    );
  });

});
