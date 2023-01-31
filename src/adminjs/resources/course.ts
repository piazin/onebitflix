import uploadFileFeature from '@adminjs/upload';
import { FeatureType, ResourceOptions } from 'adminjs';
import path from 'path';

export const courseResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: [
    'name',
    'synopsis',
    'uploadThumbnail',
    'featured',
    'categoryId',
  ],
  filterProperties: [
    'name',
    'featured',
    'categoryId',
    'createdAt',
    'updatedAt',
  ],
  listProperties: ['id', 'name', 'featured', 'categoryId'],
  showProperties: [
    'id',
    'name',
    'synopsis',
    'thumbnailUrl',
    'featured',
    'categoryId',
    'createdAt',
    'updatedAt',
  ],
};

export const courseResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        bucket: path.join(__dirname, '..', '..', '..', 'public')
      }
    },
    properties: {
      key: 'thumbnailUrl',
      file:'uploadThumbnail',
    },
    uploadPath: (record, filename) => `thumbnails/course-${record.id()}/${filename}`,
    validation: {
      mimeTypes: ['image/png', 'image/jpg', 'image/jpeg']
    }
  })
]
