import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[]{
  //     if(Object.keys(filterDto).length){
  //         return this.tasksService.getTaskWithFilter(filterDto);
  //     }else{
  //         return this.tasksService.getAllTasks();
  //     }
  // }

  // @Get()
  // getAllTasks(): Task[] {
  //    return this.tasksService.getAllTasks()
  // }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: createTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string):  void{
  //     return this.tasksService.deleteTaskById(id);

  // }

  // @Patch('/:id')
  // updateTaskStatus(
  //     @Param('id') id: string,
  //     @Body('status' , TaskStatusValidationPipe) status: TaskStatus
  //     ): Task{
  //     return this.tasksService.updateTaskStatus(id,status);
  // }
}
