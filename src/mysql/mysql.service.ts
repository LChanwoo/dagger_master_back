import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2';
@Injectable()
export class MysqlService {
  private connection;

  constructor(private configService: ConfigService) {
    this.connection = mysql.createConnection({
      host: this.configService.get<string>('DB_HOST'),
      user: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
    });

    this.connection.connect();
    console.log('Connected to MySQL');
  }

  query(sql: string, values?: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, values, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }
  close() {
    this.connection.end();
  }
}
