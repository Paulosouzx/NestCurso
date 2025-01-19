import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push(task);
    console.log(this.tasks);
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.filter((t) => t.id === id);

    //quantidade de elementos dentro de meu foundTask
    if (foundTask.length) return foundTask[0];

    throw new HttpException(
      `Task with id ${id} not found.`,
      HttpStatus.BAD_REQUEST,
    );
  }

  findAll(params: FindAllParameters): TaskDto[] {
    return this.tasks.filter((t) => {
      let match = true;

      //vai verificar se o title esta incluso nos parametros passados, caso seja diferente ele nao vai trazer e o mesmo para status
      if (params.title != undefined && !t.title.includes(params.title)) match = false;

      if (params.status != undefined && !t.status.includes(params.status))
        match = false;

      return match;
    });
  }

  update(task: TaskDto) {
    let taskIndex = this.tasks.findIndex((t) => t.id === task.id);

    if (taskIndex >= 0) this.tasks[taskIndex] = task;

    throw new HttpException(`Task with id ${task.id}`, HttpStatus.BAD_REQUEST);
  }

  remove(id: string) {
    let taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex >= length) {
      this.tasks.splice(taskIndex, 1);
      return;
    }
    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
