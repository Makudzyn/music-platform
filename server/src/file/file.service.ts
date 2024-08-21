import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";


export enum FileType {
  AUDIO = 'audio',
  THUMBNAIL = 'thumbnail',
}

@Injectable()
export class FileService {
  createFile(type: FileType, file): {fullFilePath: string, dynamicPath: string} {
    try {
      const fileExtension = file.originalname.split(".").pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', type);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      const fullFilePath = path.resolve(filePath, fileName);
      fs.writeFileSync(fullFilePath, file.buffer);
      const dynamicPath = `${type}/${fileName}`;
      return {fullFilePath, dynamicPath};
    } catch (e) {
      console.error('Error:', e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  deleteFile(filePath: string): void {
    try {
      const fullPath = path.resolve(__dirname, '..', 'static', filePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);  // Удаляем файл
      }
    } catch (e) {
      throw new HttpException(`Failed to remove file: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}