declare type MyFile = {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  // Add more properties if needed
};

declare type FileList = {
  length: number;
  item(index: number): MyFile | null;
};
