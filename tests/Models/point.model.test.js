import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Point from '../../src/Models/point.model.js';
import User from '../../src/Models/auth.model.js';
import Game from '../../src/Models/game.model.js';
import Option from '../../src/Models/option.model.js';
import Block from '../../src/Models/block.model.js'; // Asegúrate de que esta ruta es correcta
import Category from '../../src/Models/category.model.js'; // Asegúrate de que esta ruta es correcta


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

describe('Point Model Tests', () => {
    let userId;
    let gameId;
    let optionId;

    beforeAll(async () => {
        // Crear instancias necesarias para la prueba de Point
        const user = await User.create({
            email: 'testuser@example.com',
            password: 'testpassword',
            uname: 'testuser',
        });
        userId = user._id;

        const game = await Game.create({
            user: userId,
        });
        gameId = game._id;

        const block = await Block.create({
            name: 'Test Block',
            levelId: new mongoose.Types.ObjectId(),
        });

        const category = await Category.create({
            name: 'Test Category',
        });

        const option = await Option.create({
            name: 'Test Option',
            description: 'This is a test option',
            blockId: block._id,
            categoryId: category._id,
            cardURL: 'http://example.com/card.png',
        });
        optionId = option._id;
    });

    it('should create a new point', async () => {
        const newPoint = await Point.create({
            userId: userId,
            gameId: gameId,
            optionId: optionId,
            value: '10',
        });

        expect(newPoint).toBeDefined();
        expect(newPoint.userId.toString()).toBe(userId.toString());
        expect(newPoint.gameId.toString()).toBe(gameId.toString());
        expect(newPoint.optionId.toString()).toBe(optionId.toString());
        expect(newPoint.value).toBe('10');
        expect(newPoint.createdAt).toBeDefined(); // Verifica que el campo createdAt está definido
        expect(newPoint.updatedAt).toBeDefined(); // Verifica que el campo updatedAt está definido
    });

    // Agrega más pruebas según sea necesario
});
