import { TaskService } from './task.service';
import { Body, Controller, Post } from '@nestjs/common';
import { TaskDto } from './task.dto.js';

@Controller('task')
export class TaskController {
  //vai verificar se ja esta instanciado, para economizar recursos de memoria
  constructor(private readonly TaskService: TaskService) {}

  @Post()
  create(@Body() task: TaskDto) {
    this.TaskService.create(task);
  }
}
