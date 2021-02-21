import * as express from 'express';
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";

import { UsersService } from '@modules/user/service';
import { UserInterface } from '@modules/user/interface';

@Route("users")
export class UsersController extends Controller{
  @Get("{id}")
  public async getUser(
    @Path() id: string
  ): Promise<UserInterface> {
    return new UsersService().get(id);
  }
}
