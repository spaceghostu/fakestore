import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductsFacade } from './+state/products/products.facade';
import { of, Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ProductCardModule } from '@fakestore/ui/products';
import { Categories, IProductEntity } from '@fakestore/data';
import { createProductEntity } from '@fakestore/util/testing';
import { UtilSharedModule } from '@fakestore/util/shared';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  const configureFacade = async (value: {
    loadProducts: () => void;
    products$: Observable<Array<IProductEntity>>;
    loaded$: Observable<boolean>;
    error$: Observable<string | null>;
    filter$: Observable<string | null>;
    category$: Observable<string | null>;
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
      imports: [ProductCardModule, UtilSharedModule],
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
        filter$: of(''),
        category$: of(''),
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
        filter$: of(''),
        category$: of(''),
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
        filter$: of(''),
        category$: of(''),
      });
    });

    it('should render an error message', () => {
      const containerElement = fixture.debugElement;
      const error = containerElement.query(By.css('.error'));
      expect(error?.nativeElement).toBeTruthy();
    });
  });
  describe('when filter is applied', () => {
    beforeEach(async () => {
      await configureFacade({
        loadProducts: jest.fn(),
        products$: of([
          createProductEntity(0, 'Men\'s Jeans'),
          createProductEntity(1, 'Women\'s Jeans'),
          createProductEntity(2, 'T-Shirt'),
        ]),
        loaded$: of(true),
        error$: of(null),
        filter$: of('jeans'),
        category$: of(''),
      });
    });

    it('should render a list of products that match the filter', () => {
      const containerElement = fixture.debugElement;
      const cards = containerElement.queryAll(By.css('product-card'));
      expect(cards.length).toEqual(2);
    });
  });
  describe('when a category is selected', () => {
    beforeEach(async () => {
      await configureFacade({
        loadProducts: jest.fn(),
        products$: of([
          createProductEntity(0, '', 0, Categories.MENS_CLOTHING),
          createProductEntity(1, '', 0, Categories.MENS_CLOTHING),
          createProductEntity(2, '', 0, Categories.JEWELRY),
        ]),
        loaded$: of(true),
        error$: of(null),
        filter$: of(''),
        category$: of(Categories.MENS_CLOTHING),
      });
    });

    it('should render a list of products that match the filter', () => {
      const containerElement = fixture.debugElement;
      const cards = containerElement.queryAll(By.css('product-card'));
      expect(cards.length).toEqual(2);
    });
  });

});
