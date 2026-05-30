import { uploadStore } from './bootstrap';
import { base64ToBuffer } from './process-upload';
import { appendFile } from 'node:fs/promises';
import { finalizeStream } from './koa-router';

export function registerStreamHandlers() {
  onNet('screencapture:stream-chunk-nui', async (token: string, base64Data: string) => {
    try {
      const streamData = uploadStore.getStream(token);
      const chunk = base64ToBuffer(base64Data);

      await appendFile(streamData.tempFilePath, chunk);
      streamData.bytesReceived += chunk.length;
    } catch (err) {
      console.error('[screencapture] stream-chunk-nui error:', err);
    }
  });

  onNet('screencapture:stream-finalize-nui', async (token: string) => {
    try {
      const streamData = uploadStore.getStream(token);
      uploadStore.removeStream(token);

      await finalizeStream(streamData);
    } catch (err) {
      console.error('[screencapture] stream-finalize-nui error:', err);
    }
  });
}
