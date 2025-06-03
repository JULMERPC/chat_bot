import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  tallas: string[];
  colores: string[];
  imagen: string;
  estilo: string[];
  ocasion: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  mensaje: string = '';
  historial: { pregunta: string; respuesta: string; productos?: Producto[] }[] = [];
  perfilUsuario: any = {};
  preguntasSugeridas: string[] = [];

  catalogo: Producto[] = [
    {
      id: 'CAM001',
      nombre: 'Camisa Ejecutiva Blanca',
      categoria: 'camisas',
      precio: 89.90,
      tallas: ['S', 'M', 'L', 'XL', 'XXL'],
      colores: ['Blanco', 'Azul Claro'],
      imagen: 'camisa-ejecutiva-blanca.jpg',
      estilo: ['formal', 'ejecutivo', 'clásico'],
      ocasion: ['trabajo', 'reuniones', 'presentaciones']
    },
    {
      id: 'PAN001',
      nombre: 'Pantalón Formal Negro',
      categoria: 'pantalones',
      precio: 129.90,
      tallas: ['28', '30', '32', '34', '36', '38'],
      colores: ['Negro', 'Gris Oscuro', 'Azul Marino'],
      imagen: 'pantalon-formal-negro.jpg',
      estilo: ['formal', 'ejecutivo', 'elegante'],
      ocasion: ['trabajo', 'reuniones', 'eventos']
    },
    {
      id: 'SAC001',
      nombre: 'Saco Ejecutivo Slim Fit',
      categoria: 'sacos',
      precio: 299.90,
      tallas: ['S', 'M', 'L', 'XL'],
      colores: ['Negro', 'Gris', 'Azul Marino'],
      imagen: 'saco-ejecutivo-slim.jpg',
      estilo: ['formal', 'moderno', 'slim'],
      ocasion: ['trabajo', 'reuniones', 'eventos', 'presentaciones']
    },
    {
      id: 'POL001',
      nombre: 'Polo Casual Premium',
      categoria: 'polos',
      precio: 69.90,
      tallas: ['S', 'M', 'L', 'XL'],
      colores: ['Blanco', 'Negro', 'Azul', 'Gris'],
      imagen: 'polo-casual-premium.jpg',
      estilo: ['casual', 'moderno', 'cómodo'],
      ocasion: ['casual', 'fin de semana', 'informal']
    },
    {
      id: 'COR001',
      nombre: 'Corbata Ejecutiva',
      categoria: 'accesorios',
      precio: 49.90,
      tallas: ['Única'],
      colores: ['Azul', 'Rojo', 'Negro', 'Gris'],
      imagen: 'corbata-ejecutiva.jpg',
      estilo: ['formal', 'elegante', 'clásico'],
      ocasion: ['trabajo', 'reuniones', 'eventos']
    },
    {
      id: 'ZAP001',
      nombre: 'Zapatos Ejecutivos Cuero',
      categoria: 'calzado',
      precio: 189.90,
      tallas: ['39', '40', '41', '42', '43', '44'],
      colores: ['Negro', 'Marrón'],
      imagen: 'zapatos-ejecutivos.jpg',
      estilo: ['formal', 'elegante', 'clásico'],
      ocasion: ['trabajo', 'reuniones', 'eventos']
    }
  ];

  respuestasLocales: { [clave: string]: string } = {
    'hola': `
      👋 ¡Hola! Soy tu <strong>Stylist Virtual de Infotel Business</strong><br>
      Estoy aquí para ayudarte a encontrar el look perfecto. ¿En qué te puedo ayudar hoy?<br><br>
      📋 <strong>Puedo ayudarte con:</strong><br>
      • Recomendaciones de outfits completos<br>
      • Looks para ocasiones específicas<br>
      • Combinaciones de colores<br>
      • Sugerencias según tu presupuesto<br>
      • Asesoría de estilo personalizada
    `,
    '¿qué ocasiones manejan?': `
      🎯 <strong>Nuestros looks están diseñados para:</strong><br>
      👔 <strong>Trabajo/Ejecutivo:</strong> Outfits formales para la oficina<br>
      🤝 <strong>Reuniones:</strong> Looks profesionales que causan impacto<br>
      🎤 <strong>Presentaciones:</strong> Estilo que proyecta confianza<br>
      🎉 <strong>Eventos:</strong> Elegancia para ocasiones especiales<br>
      😎 <strong>Casual:</strong> Comodidad con estilo para el día a día
    `,
    '¿qué categorías tienen?': `
      🛍 <strong>Nuestro catálogo incluye:</strong><br>
      👔 Camisas ejecutivas<br>
      👖 Pantalones formales<br>
      🧥 Sacos y blazers<br>
      👕 Polos casuales<br>
      👞 Calzado ejecutivo<br>
      👔 Corbatas y accesorios
    `
  };

  constructor(private http: HttpClient) {
    this.generarPreguntasInteligentes();
  }

  enviar() {
    const pregunta = this.mensaje.trim().toLowerCase();

    if (this.esConsultaDeEstilo(pregunta)) {
      this.procesarConsultaEstilo(pregunta);
      return;
    }

    if (this.respuestasLocales[pregunta]) {
      this.historial.push({
        pregunta: this.mensaje,
        respuesta: this.respuestasLocales[pregunta]
      });
      this.mensaje = '';
      return;
    }

    this.llamarBackend(pregunta);
  }

  esConsultaDeEstilo(pregunta: string): boolean {
    const palabrasClave = [
      'outfit', 'look', 'vestir', 'combinar', 'reunión', 'trabajo',
      'evento', 'casual', 'formal', 'presupuesto', 'recomendación',
      'qué me pongo', 'cómo combino', 'necesito', 'busco', 'frío', 'calor', 'cómodo'
    ];
    return palabrasClave.some(palabra => pregunta.includes(palabra));
  }

  procesarConsultaEstilo(pregunta: string) {
    let respuesta = '';
    let productosRecomendados: Producto[] = [];

    if (pregunta.includes('frío')) {
      respuesta = '🧥 Para el frío te recomiendo usar prendas que incluyan sacos o camisas de manga larga.';
      productosRecomendados = this.catalogo.filter(p => p.categoria === 'sacos' || p.categoria === 'camisas');
    }
    else if (pregunta.includes('calor')) {
      respuesta = '☀️ Para el calor te sugerimos polos casuales y ropa ligera y cómoda.';
      productosRecomendados = this.catalogo.filter(p => p.categoria === 'polos');
    }
    else if (pregunta.includes('cómodo')) {
      respuesta = '😌 Si buscas comodidad, prueba nuestros polos casuales y zapatos de cuero acolchados.';
      productosRecomendados = this.catalogo.filter(p => p.estilo.includes('cómodo') || p.categoria === 'polos');
    }

    this.historial.push({
      pregunta: this.mensaje,
      respuesta: respuesta,
      productos: productosRecomendados
    });
    this.mensaje = '';
  }

  llamarBackend(pregunta: string) {
    this.historial.push({
      pregunta,
      respuesta: '🤖 Estoy buscando la mejor opción para ti...'
    });

    // Aquí deberías conectar con ChatService si está disponible
    // this.chatService.enviarMensaje(pregunta).subscribe(...)
  }

  generarPreguntasInteligentes() {
    const preguntas: Set<string> = new Set();

    for (const producto of this.catalogo) {
      for (const ocasion of producto.ocasion) {
        preguntas.add(`¿Qué me recomiendas para ${ocasion}?`);
      }

      for (const estilo of producto.estilo) {
        preguntas.add(`¿Qué puedo usar si quiero verme ${estilo}?`);
      }
    }

    preguntas.add('¿Qué me recomiendas para el frío?');
    preguntas.add('¿Qué puedo usar en días de calor?');
    preguntas.add('¿Qué outfit es ideal para sentirme cómodo?');

    this.preguntasSugeridas = Array.from(preguntas);
  }

  enviarRapido(pregunta: string) {
    this.mensaje = pregunta;
    this.enviar();
  }
}
