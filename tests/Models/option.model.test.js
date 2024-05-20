
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Option from '../../src/Models/option.model.js';
import Block from '../../src/Models/block.model.js';
import Category from '../../src/Models/category.model.js';

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

describe('Option Model Tests', () => {
    let blockId;
    let categoryId;

    beforeAll(async () => {
        // Crea instancias de Block y Category necesarias para el test de Option
        const block = await Block.create({ name: 'Test Block', levelId: new mongoose.Types.ObjectId() });
        blockId = block._id;

        const category = await Category.create({ name: 'Test Category' });
        categoryId = category._id;
    });

    it('should create a new option', async () => {
        const newOption = await Option.create({
            name: 'Test Option',
            description: 'This is a test option',
            blockId: blockId,
            categoryId: categoryId,
            cardURL: 'http://example.com/card.png',
        });

        expect(newOption).toBeDefined();
        expect(newOption.name).toBe('Test Option');
        expect(newOption.description).toBe('This is a test option');
        expect(newOption.blockId.toString()).toBe(blockId.toString());
        expect(newOption.categoryId.toString()).toBe(categoryId.toString());
        expect(newOption.cardURL).toBe('http://example.com/card.png');
        expect(newOption.createdAt).toBeDefined(); // Verifica que el campo createdAt está definido
        expect(newOption.updatedAt).toBeDefined(); // Verifica que el campo updatedAt está definido
    });

    // Agrega más pruebas según sea necesario
});
