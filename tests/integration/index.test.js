import request from 'supertest'; // Para realizar solicitudes HTTP a tu servidor
import app from '../../index.js'; // Importa tu aplicación Express

describe('Test de integración para mi aplicación Express', () => {
  it('Debe responder con status 200 en la ruta /', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  // Agrega más pruebas según sea necesario para tus rutas y funcionalidades
});
