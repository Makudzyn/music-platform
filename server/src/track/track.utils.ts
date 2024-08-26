import * as ffmpeg from 'fluent-ffmpeg';
import * as ffprobeStatic from 'ffprobe-static';
import { FileService, FileType } from "../file/file.service";

ffmpeg.setFfprobePath(ffprobeStatic.path);

export function getAudioDuration(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        return reject(err);
      }
      const duration = metadata.format.duration;
      resolve(duration);
    });
  });
}

export function getFilePaths(fileService: FileService, thumbnail?: Express.Multer.File | undefined, audio?: Express.Multer.File | undefined) {
  let thumbnailPath: string | undefined;
  let fullAudioPath: string | undefined;
  let dynamicAudioPath: string | undefined;
  if (thumbnail) {
    const thumbnailPaths = fileService.createFile(FileType.THUMBNAIL, thumbnail);
    thumbnailPath = thumbnailPaths.dynamicPath;
  }
  if (audio) {
    const audioPaths = fileService.createFile(FileType.AUDIO, audio);
    fullAudioPath = audioPaths.fullFilePath;
    dynamicAudioPath = audioPaths.dynamicPath;
  }
  return {thumbnailPath, fullAudioPath, dynamicAudioPath}
}