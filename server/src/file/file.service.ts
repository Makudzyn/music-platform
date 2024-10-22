import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import * as sharp from "sharp";
import * as ffmpeg from 'fluent-ffmpeg';
import { promisify } from 'util';
import { Readable } from 'stream';
import { Buffer } from 'buffer';

const ffprobe = promisify(ffmpeg.ffprobe);

export enum FileType {
  AUDIO = 'audio',
  THUMBNAIL = 'thumbnail',
  COVER_IMAGE = 'cover',
  ARTIST_IMAGE = 'artist-image',
  AVATAR = 'avatar'
}

interface ProcessedFile {
  fullFilePath: string;
  dynamicPath: string;
  metadata?: any;
}

interface FFprobeMetadata {
  format: {
    duration: number;
    bit_rate: string;
    format_name: string;
  };
}

@Injectable()
export class FileService {
  private async handleFile(
    type: FileType,
    file: Express.Multer.File,
    extension: string,
    processBuffer?: (buffer: Buffer) => Promise<Buffer>,
    processStream?: (inputStream: Readable, outputPath: string) => Promise<void>,
  ): Promise<ProcessedFile> {
    if (!processBuffer && !processStream) {
     throw new Error('No processing function provided.');
    }

    try {
      const fileName = `${Date.now()}-${uuid.v4()}.${extension}`;
      const filePath = path.resolve(__dirname, '..', 'static', type);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true});
      }

      const fullFilePath = path.resolve(filePath, fileName);

      if (typeof processBuffer === 'function') {
        const processedBuffer = await processBuffer(file.buffer);
        await fs.promises.writeFile(fullFilePath, processedBuffer);
      } else if (typeof processStream === 'function') {
        const inputStream = Readable.from(file.buffer);
        await processStream(inputStream, fullFilePath)
      }

      const dynamicPath = `${type}/${fileName}`;
      return {fullFilePath, dynamicPath};
    } catch (e) {
      console.error(`Error processing ${type}:`, e);
      throw new HttpException(`Failed to process ${type}: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      const fullPath = path.resolve(__dirname, '..', 'static', filePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);  // Удаляем файл
      }
    } catch (e) {
      throw new HttpException(`Failed to remove file: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async processImage(
    file: Express.Multer.File,
    type: FileType,
    options: {
      width?: number,
      height?: number,
      quality?: number
    } = {}
  ): Promise<ProcessedFile> {
    const processBuffer = async (buffer: Buffer) => {
      return sharp(buffer)
      .resize({
        width: options.width || 800,
        height: options.height || 800,
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({quality: options.quality || 80})
      .toBuffer();
    };

    return this.handleFile(type, file, 'webp', processBuffer);
  }

  async processAudio(
    file: Express.Multer.File,
    options: {
      format?: 'mp3' | 'ogg' | 'wav',
      bitrate?: string
    } = {}
  ): Promise<ProcessedFile> {
    const format = options.format || 'mp3';
    const bitrate = options.bitrate || '128k';

    const processStream = async (inputStream: Readable, outputPath: string) => {
      const tempOutputPath = path.resolve(__dirname, '..', 'temp', `output.${format}`);

      // Убедитесь, что временная директория существует
      const tempDir = path.resolve(__dirname, '..', 'temp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      try {
        await new Promise<void>((resolve, reject) => {
          ffmpeg(inputStream)
          .audioCodec(format === 'mp3' ? 'libmp3lame' : format)
          .audioBitrate(bitrate)
          .toFormat(format)
          .on('error', reject)
          .on('end', () => resolve())
          .save(tempOutputPath);
        });
        await fs.promises.rename(tempOutputPath, outputPath);
      } catch (error) {
       try {
         await fs.promises.unlink(tempOutputPath);
       } catch (unlinkError) {
         console.error('Failed to delete temporary file:', unlinkError);
       }
        throw error;
      }
    };

    const result = await this.handleFile(FileType.AUDIO, file, options.format || 'mp3', undefined, processStream);

    // Get audio metadata
    const metadata = await ffprobe(result.fullFilePath) as FFprobeMetadata;
    result.metadata = {
      duration: metadata.format.duration,
      bitrate: metadata.format.bit_rate,
      format: metadata.format.format_name
    };

    return result;
  }
}