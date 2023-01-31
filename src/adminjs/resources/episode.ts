import uploadFileFeature from '@adminjs/upload';
import { FeatureType, ResourceOptions } from 'adminjs';
import path from 'path';

export const episodeResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: [
    'name',
    'synopsis',
    'order',
    'uploadVideo',
    'secondsLong',
    'courseId',
  ],
  listProperties: ['id', 'name', 'order', 'secondsLong', 'courseId'],
  filterProperties: [
    'id',
    'name',
    'order',
    'secondsLong',
    'courseId',
    'createdAt',
    'updatedAt',
  ],
  showProperties: [
    'id',
    'name',
    'synopsis',
    'courseId',
    'order',
    'videoUrl',
    'secondsLong',
    'createdAt',
    'updatedAt',
  ],
};

export const episodeResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        bucket: path.join(__dirname, '..', '..', '..', 'uploads')
      }
    }, 
    properties: {
      key: 'videoUrl',
      file: 'uploadVideo'
    },
    uploadPath: (record, filename) => `videos/course-${record.get('courseId')}/${filename}`
  })
]
