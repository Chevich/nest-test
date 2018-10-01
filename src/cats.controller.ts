import { Get, Controller, Req, HttpCode, HttpException, HttpStatus, Param, Post, Body, Query, Res } from '@nestjs/common';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';
import { CatsDto } from './cats.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {
  }

  @Get()
  async catsRoot(@Query() queryParams): Promise<CatsDto[]> {
    return this.catService.getAllCats();
  }

  @Get('catsNo/:no')
  catsNo(@Param('no') no): Observable<string> {
    const counter = no || '6';
    return of(`Returning ${counter} cats`);
  }

  @Get('catUnknown')
  async catUnknown(): Promise<HttpException> {
    return new HttpException('Nothing Here !', HttpStatus.NO_CONTENT);
  }

  @Post()
  createCat(@Body() catsDto: CatsDto): Observable<string> {
    this.catService.createCat(catsDto);
    return of(`Cat named ${catsDto.name} has been created`);
  }

  @Get('emptyCats')
  emptyCats(@Res() res) {
    res.status(HttpStatus.OK).send([]);
  }
}