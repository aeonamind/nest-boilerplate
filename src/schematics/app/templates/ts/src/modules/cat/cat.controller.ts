import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiParam,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { swaggerResponse, SWAGGER_SETTINGS, swaggerParam } from '@core/swagger';
import { ApiPagination, PaginationQuery } from '@core/decorators';
import { SerializeClass } from '@core/interceptors';
import { PaginateParams, PaginatedResponseDto } from '@core/types';
import { sitemap } from '@core/constants';
import { CatResponseDto, CreateCatDto, UpdateCatDto } from './dtos';
import { CatService } from './cat.service';

@ApiTags(SWAGGER_SETTINGS.TAGS.CAT)
@SerializeClass(CatResponseDto)
@ApiUnauthorizedResponse(swaggerResponse.unAuthorized())
@ApiBadRequestResponse(swaggerResponse.badRequest())
@ApiInternalServerErrorResponse(swaggerResponse.internalServerError())
@Controller()
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  @ApiCreatedResponse(
    swaggerResponse.createSuccess({
      type: CatResponseDto,
    }),
  )
  create(@Body() data: CreateCatDto) {
    return this.catService.create(data);
  }

  @Get()
  @SerializeClass(PaginatedResponseDto(CatResponseDto))
  @ApiPagination()
  @ApiOkResponse(
    swaggerResponse.getSuccess({ type: PaginatedResponseDto(CatResponseDto) }),
  )
  getCatList(@PaginationQuery() paginateParams: PaginateParams) {
    return this.catService.findCatList(paginateParams);
  }

  @Get(sitemap.cat.ID)
  @ApiParam(swaggerParam.id)
  @ApiOkResponse(
    swaggerResponse.getSuccess({
      type: CatResponseDto,
    }),
  )
  @ApiNotFoundResponse(swaggerResponse.notFound())
  async getCat(@Param(swaggerParam.id.name, ParseIntPipe) id: number) {
    return await this.catService.findCatById(id);
  }

  @Patch(sitemap.cat.ID)
  @ApiParam(swaggerParam.id)
  @ApiOkResponse(
    swaggerResponse.updateSuccess({
      type: CatResponseDto,
    }),
  )
  @ApiNotFoundResponse(swaggerResponse.notFound())
  async update(
    @Param(swaggerParam.id.name, ParseIntPipe) id: number,
    @Body() data: UpdateCatDto,
  ) {
    return this.catService.update(id, data);
  }

  @Delete(sitemap.cat.ID)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam(swaggerParam.id)
  @ApiNoContentResponse({ description: 'No content' })
  @ApiNotFoundResponse(swaggerResponse.notFound())
  async delete(@Param(swaggerParam.id.name, ParseIntPipe) id: number) {
    await this.catService.delete(id);
  }
}
