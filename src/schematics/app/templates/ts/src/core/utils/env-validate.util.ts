import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, validateSync, IsNotEmpty } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  // Node
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  NODE_PORT: number;

  // Swagger
  @IsNotEmpty()
  SWAGGER_SERVER_URLS: string;

  // Mysql
  @IsNotEmpty()
  MYSQL_ROOT_PASSWORD: string;

  @IsNotEmpty()
  MYSQL_USER: string;

  @IsNotEmpty()
  MYSQL_PASSWORD: string;

  @IsNotEmpty()
  MYSQL_HOST: string;

  @IsNotEmpty()
  MYSQL_PORT: string;

  @IsNotEmpty()
  MYSQL_DATABASE: string;

  @IsNotEmpty()
  MYSQL_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
