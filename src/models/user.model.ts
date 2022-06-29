import DB from "../database";
import User from "./Schema";
import config from "../config";

class UserModel {
  //create
  async create(u: User): Promise<User> {
    try {
      //opean connection with DB
      const connection = await DB.connect();
      console.log("dddd");

      const sql = `INSERT INTO users (title,desc,isComplete)
            values ($1,$2,$3) returning title,desc,isComplete`;
      //run query
      const result = await connection.query(sql, [
        u.title,
        u.desc,
        u.isComplete,
        // u.password
      ]);
      //release connection
      connection.release();
      //return create user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create (${u.title}):${(error as Error).message}`
      );
    }
  }
  //get all users
  async getMany(): Promise<User[]> {
    try {
      const connection = await DB.connect();
      const sql = `SELECT id,title,desc,isComplete from users`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error at retreving users ${(error as Error).message}`);
    }
  }
  // get specific user
  async getOne(id: string): Promise<User> {
    try {
      const connection = await DB.connect();
      const sql = `SELECT id,title,desc,isComplete from users where id =($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find user ${id},${(error as Error).message}`);
    }
  }
  // update user
  async updateOne(u: User): Promise<User> {
    try {
      const connection = await DB.connect();
      const sql = `UPDATE users SET,title=$1,desc=$2,isComplete=$3 where id=$4 returning
       id,title,desc,isComplete `;
      const result = await connection.query(sql, [
        u.title,
        u.desc,
        u.isComplete,
        // u.password,
        // hashPassword(u.password),
        u.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not update user ,${(error as Error).message}`);
    }
  }
  // delete user
  async deleteOne(id: string): Promise<void> {
    try {
      const connection = await DB.connect();
      const sql = `DELETE  FROM users WHERE id =($1)
        returning id,title,desc,isComplete`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not Delete user ${id},${(error as Error).message}`
      );
    }
  }
}
export default UserModel;
