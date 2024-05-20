import request from 'supertest';
import app from '../../index.js'; // Importa tu aplicación Express
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('POST /newgame', () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      });
    
      afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
      });

  it('should create a new game', async () => {
    // Simula un usuario autenticado y obtiene su token (puedes adaptarlo según tus necesidades)
    const token = 'tu_token_de_prueba';

    // Realiza una solicitud POST a la ruta /newgame con el token de autenticación
    const response = await request(app)
      .post('/newgame')
      .set('auth-token', token);

    // Comprueba si la solicitud fue exitosa (código de estado 200)
    expect(response.status).toBe(200);

    // Comprueba si la respuesta contiene un objeto de juego
    expect(response.body).toHaveProperty('game');
    expect(response.body.game).toMatchObject({
      // Puedes agregar más comprobaciones según la estructura de tu objeto de juego
    });
  });

  it('should return 401 if no auth token is provided', async () => {
    // Realiza una solicitud POST a la ruta /newgame sin un token de autenticación
    const response = await request(app).post('/newgame');

    // Comprueba si la solicitud devuelve un código de estado 401 (Unauthorized)
    expect(response.status).toBe(401);
  });
});
