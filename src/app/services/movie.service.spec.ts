import { TestBed } from '@angular/core/testing';
import { MOCK_MOVIE_RESPONSE } from '../mocks/movie-mock-data';

import { MovieService } from './movie.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should get all movies", () => {
    const expectedRes = MOCK_MOVIE_RESPONSE;

    service.getAll().subscribe({
      next: (data) => {
        expect(data).toEqual(expectedRes);
      }
    })

    const req = httpMock.expectOne(`${environment.apiUrl}/movie`);
    req.flush(expectedRes);

  });

  it("should get popular movies", () => {
    const expectedRes = MOCK_MOVIE_RESPONSE;

    service.getPopular().subscribe({
      next: (data) => {
        expect(data).toEqual(expectedRes);
      }
    })

    const req = httpMock.expectOne(`${environment.apiUrl}/popular/movie`);
    req.flush(expectedRes);
  });

  it("should get trending movies", () => {
    const expectedRes = MOCK_MOVIE_RESPONSE;

    service.getTrending().subscribe({
      next: (data) => {
        expect(data).toEqual(expectedRes);
      }
    })

    const req = httpMock.expectOne(`${environment.apiUrl}/trending/movie?timeWindow=day`);
    req.flush(expectedRes);
  });

  it("should get recommendations", () => {
    const expectedRes = MOCK_MOVIE_RESPONSE;

    service.getRecommendations(3).subscribe({
      next: (data) => {
        expect(data).toEqual(expectedRes);
      }
    })
    const req = httpMock.expectOne(`${environment.apiUrl}/movie/3/recommendations`);
    req.flush(expectedRes);
  });

  afterEach(() => {
    httpMock.verify();
  })
});
