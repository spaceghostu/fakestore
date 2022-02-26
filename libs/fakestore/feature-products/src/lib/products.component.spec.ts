import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductsFacade } from './+state/products/products.facade';
import { of, Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ProductCardModule } from '@fakestore/ui/products';
import { IProductEntity } from '@fakestore/data';
import { createProductEntity } from '@fakestore/util/testing';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  const configureFacade = async (value: {
    loadProducts: () => void;
    products$: Observable<Array<IProductEntity>>;
    loaded$: Observable<boolean>;
    error$: Observable<string | null>;
  }) => {
    TestBed.overrideProvider(ProductsFacade, {
      useValue: value
    });
    await TestBed.compileComponents();
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [ProductCardModule],
      providers: [
        {
          provide: ProductsFacade,
          useValue: {},
        }
      ]
    });
  });

  describe('before loaded', () => {
    beforeEach(async () => {
      await configureFacade({
        loadProducts: jest.fn(),
        products$: of([]),
        loaded$: of(false),
        error$: of(null),
      });
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should render a loader', () => {
      const containerElement = fixture.debugElement;
      const loader = containerElement.query(By.css('.loader'));
      expect(loader).toBeTruthy();
    });
  });

  describe('after loaded', () => {
    beforeEach(async () => {
      await configureFacade({
        loadProducts: jest.fn(),
        products$: of([
          createProductEntity(0),
          createProductEntity(1),
          createProductEntity(2),
        ]),
        loaded$: of(true),
        error$: of(null),
      });
    });

    it('should render a list of products', () => {
      const containerElement = fixture.debugElement;
      const cards = containerElement.queryAll(By.css('product-card'));
      expect(cards.length).toEqual(3);
    });
  });

  describe('if error occurred', () => {
    beforeEach(async () => {
      await configureFacade({
        loadProducts: jest.fn(),
        products$: of([]),
        loaded$: of(false),
        error$: of('An error occurred'),
      });
    });

    it('should render an error message', () => {
      const containerElement = fixture.debugElement;
      const error = containerElement.query(By.css('.error-message'));
      expect(error?.nativeElement).toBeTruthy();
    });
  });

});
