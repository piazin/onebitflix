import { getPaginationParams } from '../helpers/getPaginationParams';
import { Category, Course } from '../models';

class CategoryService {
  async findAllPaginated(page: string, limit: string) {
    const [pageNumber, limitNumber] = getPaginationParams({ page, limit });
    const offset = (pageNumber - 1) * limitNumber;

    const { count, rows } = await Category.findAndCountAll({
      attributes: ['id', 'name', 'position'],
      order: [['position', 'ASC']],
      limit: limitNumber,
      offset,
    });

    return {
      categories: rows,
      page: pageNumber,
      limit,
      total: count,
    };
  }

  async findByIdWithCourses(id: string) {
    const category = Category.findByPk(id, {
      attributes: ['id', 'name', 'position'],
      include: {
        association: 'courses',
        attributes: ['id', 'name', 'synopsis', 'thumbnailUrl'],
      },
    });

    return category;
  }
}

export const categoryService = new CategoryService();
