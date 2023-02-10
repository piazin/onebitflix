import { Category } from './Category';
import { Course } from './Course';
import { Episode } from './Episode';
import { Favorite } from './Favorite';
import { Like } from './Like';
import { User, UserCreationAttributes } from './User';
import { WatchTime } from './WatchTime';

Category.hasMany(Course, { as: 'courses' });
Course.belongsTo(Category);

Course.hasMany(Episode, { as: 'episodes' });
Episode.belongsTo(Course);

Course.belongsToMany(User, { through: Favorite });
User.belongsToMany(Course, { through: Favorite });

Course.hasMany(Favorite, { as: 'FavoritesUsers', foreignKey: 'course_id' });
Favorite.belongsTo(Course);
Favorite.belongsTo(User);
User.hasMany(Favorite, { as: 'FavoritesCourses', foreignKey: 'user_id' });

Course.belongsToMany(User, { through: Like });
User.belongsToMany(Course, { through: Like });

Episode.belongsToMany(User, { through: WatchTime });
User.belongsToMany(Episode, { through: WatchTime });

export { Category, Course, Episode, User, Favorite, Like, WatchTime };
export { UserCreationAttributes };
