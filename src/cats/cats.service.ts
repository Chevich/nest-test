import { Injectable } from '@nestjs/common';
import { CatsDto } from './interface/cats.dto';

@Injectable()
export class CatsService {
  private readonly cats: CatsDto[] = [];

  createCat(cat: CatsDto) {
    this.cats.push(cat);
    return cat;
  }

  getAllCats() {
    return this.cats;
  }
}
