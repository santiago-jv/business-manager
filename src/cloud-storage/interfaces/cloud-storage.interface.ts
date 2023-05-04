export interface CloudStorage {
  uploadFile(file: Express.Multer.File): Promise<string>;
}
