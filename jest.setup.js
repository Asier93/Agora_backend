import { jest } from '@jest/globals';
import bcryptjs from 'bcryptjs';
import User from './src/Models/auth.model.js';

jest.mock('bcryptjs', () => ({
  genSalt: jest.fn().mockResolvedValue('salt'),
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn(),
}));

jest.mock('./src/Models/auth.model.js', () => ({
    __esModule: true,
  default: {
    findOne: jest.fn(),
    save: jest.fn(),
  },
  }));

  jest.mock('./src/Middlewares/Auth.middleware.js', () => (req, res, next) => {
    req.user = { _id: 'mockUserId' }; // Mockear el usuario decodificado
    next();
  });

// También puedes agregar otras configuraciones de jest aquí si es necesario
