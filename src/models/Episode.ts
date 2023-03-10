import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from '../database';
import { WatchTimeInstance } from './WatchTime';

interface Episode {
  id: number;
  name: string;
  synopsis: string;
  order: number;
  videoUrl: string;
  secondsLong: string;
  courseId: number;
}

interface EpisodeCreationAttributes
  extends Optional<Episode, 'id' | 'videoUrl' | 'secondsLong'> {}
export interface EpisodeInstance
  extends Model<Episode, EpisodeCreationAttributes>,
    Episode {
  watchTime?: WatchTimeInstance;
}

export const Episode = sequelize.define<EpisodeInstance, Episode>('episodes', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  synopsis: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  order: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  videoUrl: {
    type: DataTypes.STRING,
  },
  secondsLong: {
    type: DataTypes.INTEGER,
  },
  courseId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'courses', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  },
});
