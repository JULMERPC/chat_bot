import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should add a question to the history when enviar() is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.mensaje = 'Hola';
    // Simular una respuesta falsa del backend
    spyOn(app['http'], 'post').and.returnValue({
      subscribe: (cb: any) =>
        cb({
          choices: [
            {
              message: {
                content: 'Hola, esta es una respuesta simulada del bot.'
              }
            }
          ]
        }),
    } as any);

    app.enviar();

    expect(app.historial.length).toBe(1);
    expect(app.historial[0].pregunta).toBe('Hola');
    expect(app.historial[0].respuesta).toContain('Hola');
  });
});
