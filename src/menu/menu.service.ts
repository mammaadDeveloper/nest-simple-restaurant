import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuItem } from 'src/entities/menu-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
    constructor(@InjectRepository(MenuItem) private readonly menuRepo: Repository<MenuItem>) { }
    
    async findAll(): Promise<MenuItem[]> {
        return await this.menuRepo.find();
    }
}
