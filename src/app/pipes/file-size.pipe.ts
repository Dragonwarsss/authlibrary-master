import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filesize'
})
export class FileSizePipe implements PipeTransform {

  nb: number;
  transform(size: number, extension: string = 'MB'): string {
    this.nb = (size / (1024 * 1024));
    console.log(this.nb);
    if (this.nb > 100)
      return ((this.nb / 1024).toFixed(2)) + 'GB';
    return (size / (1024 * 1024)).toFixed(2) + extension;
  }

}