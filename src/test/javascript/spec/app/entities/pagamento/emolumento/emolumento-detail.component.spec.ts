import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { EmolumentoDetailComponent } from 'app/entities/pagamento/emolumento/emolumento-detail.component';
import { Emolumento } from 'app/shared/model/pagamento/emolumento.model';

describe('Component Tests', () => {
  describe('Emolumento Management Detail Component', () => {
    let comp: EmolumentoDetailComponent;
    let fixture: ComponentFixture<EmolumentoDetailComponent>;
    const route = ({ data: of({ emolumento: new Emolumento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [EmolumentoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EmolumentoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmolumentoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load emolumento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.emolumento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
