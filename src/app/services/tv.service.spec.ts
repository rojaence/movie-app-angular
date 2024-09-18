import { TestBed } from '@angular/core/testing';

import { TvService } from './tv.service';
import { MOCK_TV_RESPONSE } from '../mocks/tv-mock-data';
import { environment } from '../../environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TvService', () => {
  let service: TvService;
  let httpMock:  HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(TvService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should get all tvseries", () => {
    const expectedRes = MOCK_TV_RESPONSE;

    service.getAll().subscribe({
      next: (data) => {
        expect(data).toEqual(expectedRes);
      }
    })

    const req = httpMock.expectOne(`${environment.apiUrl}/tv?page=1&genres=&sortBy=popularity.desc`);
    req.flush(expectedRes);
  });

  it("should get popular series", () => {
    const expectedRes = MOCK_TV_RESPONSE;

    service.getPopular().subscribe({
      next: (data) => {
        expect(data).toEqual(expectedRes);
      }
    })

    const req = httpMock.expectOne(`${environment.apiUrl}/tv/popular?page=1`);
    req.flush(expectedRes);
  });

  it("should get trending series", () => {
    const expectedRes = MOCK_TV_RESPONSE;

    service.getTrending().subscribe({
      next: (data) => {
        expect(data).toEqual(expectedRes);
      }
    })

    const req = httpMock.expectOne(`${environment.apiUrl}/tv/trending?timeWindow=day&page=1`);
    req.flush(expectedRes);
  });

  it("should get recommendations", () => {
    const expectedRes = MOCK_TV_RESPONSE;

    service.getRecommendations(3).subscribe({
      next: (data) => {
        expect(data).toEqual(expectedRes);
      }
    })
    const req = httpMock.expectOne(`${environment.apiUrl}/tv/3/recommendations`);
    req.flush(expectedRes);
  });
});
