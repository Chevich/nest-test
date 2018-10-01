import { Injectable } from '@nestjs/common';
import { CatsDto } from './cats.dto';

@Injectable()
export class CatsService {
  private readonly cats: CatsDto[] = [];

  createCat(cat: CatsDto) {
    this.cats.push(cat);
    console.log('cats create ', this.cats);
    return cat;
  }

  getAllCats() {
    console.log('cats ', this.cats);

    return this.cats;
  }
}
