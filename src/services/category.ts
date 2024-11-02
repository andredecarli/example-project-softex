import CategoryRepository from 'src/repositories/category.js';
import { BadRequestError } from 'src/util/errors/badRequestError.js';
import { NotFoundError } from 'src/util/errors/notFoundError.js';

export default class CategoryService {
  static async insert(name: string) {
    const category = await CategoryRepository.getByName(name);
    if (category) {
      throw new BadRequestError('category already exists');
    }

    const newCategory = await CategoryRepository.insert(name);
    return newCategory;
  }

  static async list() {
    const categories = await CategoryRepository.getAll();
    return categories;
  }

  static async getById(id: number) {
    const category = await CategoryRepository.getById(id);
    if (!category) {
      throw new NotFoundError('category not found');
    }
    return category;
  }

  static async delete(id: number) {
    const category = await CategoryRepository.getById(id);
    if (!category) {
      throw new NotFoundError('category not found');
    }
    await CategoryRepository.deleteById(id);
  }

  static async update(id: number, name: string) {
    const category = await CategoryRepository.getById(id);
    if (!category) {
      throw new NotFoundError('category not found');
    }
    const updatedCategory = await CategoryRepository.update({ id, name });
    return updatedCategory;
  }
}
