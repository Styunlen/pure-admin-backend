import Joi from "joi";
import { messages } from "../utils/messages";

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

/** user validator */
export const userSchema = {
  login: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    info: Joi.object()
  }),
  register: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string()
      .required()
      .min(7)
      .error(errors => {
        // console.log(errors);
        for (const err of errors) {
          console.log(err.code);
          switch (err.code) {
            case "string.min":
              return new Error(messages.errMsg.weakPwd);
            case "string.empty":
            case "any.required":
              return new Error(messages.errMsg.emptyPwd);
            default:
              return new Error("密码格式错误");
          }
        }
      }),
    info: Joi.object()
  })
};

@Entity()
export default class User {
  /*
    // Uncomment this code if your want a uuid column of table
    @PrimaryGeneratedColumn("uuid")
  */
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "text", nullable: false })
  username: string;

  @Column({ type: "text", nullable: false })
  password: string;

  /*
    This column can store user info with json
  */
  @Column({
    type: "simple-json",
    nullable: false,
    default: '{ "enabled": true }'
  })
  userInfo: object;

  @CreateDateColumn()
  time: string;
}
