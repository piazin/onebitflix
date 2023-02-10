import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export interface IWatchTime {
  userId: number;
  seconds: number;
  episodeId: number;
}

export interface WatchTimeInstance extends Model<IWatchTime>, IWatchTime {}

export const WatchTime = sequelize.define<WatchTimeInstance, IWatchTime>(
  'WatchTime',
  {
    seconds: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    episodeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'episodes', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }
);
