import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Level from '../../src/Models/level.model.js'; // Ajusta la ruta si es necesario


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

describe('Level Model Tests', () => {
    it('should create a new level', async () => {
        const newLevel = await Level.create({
            name: 'Test Level',
            number: 1,
        });

        expect(newLevel).toBeDefined();
        expect(newLevel.name).toBe('Test Level');
        expect(newLevel.number).toBe(1);
        expect(newLevel.createdAt).toBeDefined(); // Verifica que el campo createdAt está definido
        expect(newLevel.updatedAt).toBeDefined(); // Verifica que el campo updatedAt está definido
    });

    // Agrega más pruebas según sea necesario
});
