import { Injectable, NotFoundException } from '@nestjs/common';
import { createTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTaskFilterDto , user : User) {
    return this.taskRepository.getTasks(filterDto,user);
  }

  async getTaskById(
    id: number,
    user : User
  ) : Promise<Task> {
    const found = await this.taskRepository.findOne({where : { id, userId : user.id }});
    if (!found) {
      throw new NotFoundException(`Task With ID "${id}" not found`);
    }
    return found;
  }

  async createTask(
    createTaskDto : createTaskDto,
    user : User
  ) : Promise<Task> {
    return this.taskRepository.createTask(createTaskDto,user);
  }

  async deleteTaskById(
    id : number,
    user : User
  ) : Promise<void> {
    const result = await this.taskRepository.delete({ id, userId : user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task With ID "${id}" not found`);
    }
  }

  async updateTaskStatus(
    id: number, 
    status: TaskStatus,
    user: User
  ): Promise<Task> {
    const task = await this.getTaskById(id,user);
    task.status = status;
    await task.save();
    return task;
  }

  // updateTaskStatus(id: string, status: TaskStatus): Task{
  //     const task = this.getTaskById(id);
  //     task.status = status;
  //     return task;
  // }
}
