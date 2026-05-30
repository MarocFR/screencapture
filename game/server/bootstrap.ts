import { createServer } from './koa-router';
import './export';
import { UploadStore } from './upload-store';

export const uploadStore = new UploadStore();

import { registerImageHandlers } from './image';
import { registerStreamHandlers } from './stream';

async function boot() {
  createServer(uploadStore);
  registerImageHandlers();
  registerStreamHandlers();
}

boot();
