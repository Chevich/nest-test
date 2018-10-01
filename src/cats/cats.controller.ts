import { Get, Controller, Req, HttpCode, HttpException, HttpStatus, Param, Post, Body, Query, Res, UsePipes, UseGuards } from '@nestjs/common';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';
import { CatsDto } from './interface/cats.dto';
import { CatsService } from './cats.service';
import { ValidationPipe } from '../validation.pipe';
import { ParseIntPipe } from '../parse-int.pipe';
import { AuthGuard } from '../auth.guard';

@Controller('cats')
@UseGuards(AuthGuard)
export class CatsController {
  constructor(private readonly catService: CatsService) {
  }

  @Get()
  async catsRoot(@Query() queryParams): Promise<CatsDto[]> {
    return this.catService.getAllCats();
  }

  @Get('catsNo/:no')
  catsNo(@Param('no', new ParseIntPipe()) no): Observable<string> {
    const counter = no || 6;
    return of(`Returning ${counter} cats`);
  }

  @Get('catUnknown')
  async catUnknown(a: boolean = false): Promise<string> {
    console.log('1 ', a);

    if (!a) {
      console.log('1 ');
      throw new HttpException('Nothing is here !', HttpStatus.OK);
    }
    return Promise.resolve('asdfsdf');
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCat(@Body() catsDto: CatsDto): Observable<string> {
    this.catService.createCat(catsDto);
    return of(`Cat named ${catsDto.name} has been created`);
  }

  @Get('emptyCats')
  emptyCats(@Res() res) {
    res.status(HttpStatus.OK).send([]);
  }
}
