import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Block from '../../src/Models/block.model.js'; // Asegúrate de ajustar la ruta correcta al modelo Block


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

describe('Block Model Tests', () => {
    it('should create a new block', async () => {
        const newBlock = await Block.create({
            name: 'Test Block',
            levelId: new mongoose.Types.ObjectId(), // Se puede cambiar a un ObjectId existente si es necesario
        });

        expect(newBlock).toBeDefined();
        expect(newBlock.name).toBe('Test Block');
        expect(new mongoose.Types.ObjectId(newBlock.levelId)).toBeInstanceOf(mongoose.Types.ObjectId);
        expect(newBlock.createdAt).toBeDefined(); // Verifica que el campo createdAt está definido
        expect(newBlock.updatedAt).toBeDefined(); // Verifica que el campo updatedAt está definido
    });

    // Agrega más pruebas según sea necesario
});
