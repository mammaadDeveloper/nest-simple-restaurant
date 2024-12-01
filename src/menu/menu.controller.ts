import { Controller, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { MenuService } from './menu.service';

@ApiTags('Menu')
@Controller('menu-items')
@UseGuards(JwtStrategy)
export class MenuController {
    constructor(private readonly menuService: MenuService){}

    @ApiOperation({summary: 'Get all menu items'})
    @ApiResponse({status: 200, description: 'List of menu items'})
    @ApiResponse({status: 403, description: 'Unauthorized'})
    async findAll(@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message: 'All menus fetches successfully!',
            data:this.menuService.findAll()
        });
    }

}
