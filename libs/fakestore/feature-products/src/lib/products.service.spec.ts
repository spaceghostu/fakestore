import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { createProductEntity } from './+state/products/util-create-mock-product';

import { ProductsService } from './products.service';
import { IProductEntity } from '@fakestore/data';

describe('ProductsService', () => {
  let service: ProductsService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductsService);
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('#getAll', () => {
    it('should return an Observable<IProductEntity[]>', () => {
      const dummyProducts: IProductEntity[] = [
        createProductEntity(0),
        createProductEntity(1),
      ];

      service.getAll().subscribe(products => {
        expect(products).toEqual(dummyProducts);
      });

      const req = httpMock.expectOne(`${service._baseUrl}/products`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyProducts);
    });
  });
});
