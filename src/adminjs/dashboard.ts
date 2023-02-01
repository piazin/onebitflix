import AdminJS, { PageContext, PageHandler } from 'adminjs';
import { Category, Course, Episode, User } from '../models';

export const dashboardOptions: { component: string; handler: PageHandler } = {
  component: AdminJS.bundle('./components/Dashboard'),
  handler: async (req: any, res: any, context: PageContext) => {
    const courses = await Course.count();
    const episodes = await Episode.count();
    const categories = await Category.count();
    const standardUsers = await User.count({ where: { role: 'user' } });

    res.status(200).json({
      Cursos: courses,
      Episodios: episodes,
      Categorias: categories,
      Usuários: standardUsers,
    });
  },
};
