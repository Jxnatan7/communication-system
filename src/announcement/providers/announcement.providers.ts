import { Connection } from 'mongoose';
import { AnnouncementSchema } from '../core/schema/announcement.schema';

export const announcementProviders = [
  {
    provide: 'ANNOUNCEMENT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Announcement', AnnouncementSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
