import request from 'supertest';
import app from '../../index.js'; // Suponiendo que app es tu aplicación Express
import Jwt from 'jsonwebtoken';
import Game from '../../src/Models/game.model.js';
import jest from 'jest'; // Importación correcta

jest.mock('jsonwebtoken', () => ({
  decode: jest.fn().mockReturnValue({ _id: 'someUserId' }), // Mockear decode de Jwt
}));

describe('newgame controller', () => {
  it('should create a new game', async () => {
    // Simular token en la cabecera de la solicitud
    const token = 'someAuthToken';
    Jwt.decode.mockReturnValueOnce({ _id: 'someUserId' });

    // Realizar solicitud a la ruta donde se encuentra el controlador
    const response = await request(app)
      .post('/newgame') // Actualiza la ruta con la ruta real de tu endpoint
      .set('auth-token', token);

    // Verificar que se haya llamado al constructor del modelo Game con el usuario decodificado
    expect(Game.mock.calls.length).toBe(1);
    expect(Game.mock.calls[0][0].user).toBe('someUserId'); // Asegúrate de que 'someUserId' sea el ID correcto del usuario

    // Verificar que la respuesta sea 200 y que devuelva el juego creado
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('game');
  });

  it('should handle errors', async () => {
    // Mockear el método save del modelo Game para que arroje un error
    const mockError = new Error('Some error occurred');
    jest.spyOn(Game.prototype, 'save').mockRejectedValueOnce(mockError);

    // Simular token en la cabecera de la solicitud
    const token = 'someAuthToken';
    Jwt.decode.mockReturnValueOnce({ _id: 'someUserId' });

    // Realizar solicitud a la ruta donde se encuentra el controlador
    const response = await request(app)
      .post('/newgame') // Actualiza la ruta con la ruta real de tu endpoint
      .set('auth-token', token);

    // Verificar que la respuesta sea 500 y que contenga el mensaje de error
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: mockError });
  });
});
