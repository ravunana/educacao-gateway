import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../test.module';
import { ContactoInstituicaoDetailComponent } from 'app/entities/contacto-instituicao/contacto-instituicao-detail.component';
import { ContactoInstituicao } from 'app/shared/model/contacto-instituicao.model';

describe('Component Tests', () => {
  describe('ContactoInstituicao Management Detail Component', () => {
    let comp: ContactoInstituicaoDetailComponent;
    let fixture: ComponentFixture<ContactoInstituicaoDetailComponent>;
    const route = ({ data: of({ contactoInstituicao: new ContactoInstituicao(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [ContactoInstituicaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ContactoInstituicaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContactoInstituicaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load contactoInstituicao on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.contactoInstituicao).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
