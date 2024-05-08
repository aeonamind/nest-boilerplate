import { join, Path, strings } from '@angular-devkit/core';
import {
  apply,
  move,
  Rule,
  template,
  url,
  Tree,
  SchematicContext,
} from '@angular-devkit/schematics';
import { Answers, prompt } from 'inquirer';
import { basename, parse } from 'path';
import { Observable } from '@angular-devkit/core/node_modules/rxjs/internal/Observable';
import { DEFAULT_DESCRIPTION, DEFAULT_VERSION } from '../default';
import schema from './schema';

export interface ApplicationOptions {
  name: string;
  version: string;
  description?: string;
  packageManager?: 'npm' | 'yarn' | 'pnpm';
}

export function main(options: ApplicationOptions): Rule {
  return (_: Tree, ctx: SchematicContext) => {
    const observer = new Observable<Tree>((observer) => {
      let path;

      prompt(schema.questions)
        .then((answers: Answers) => {
          options = { ...answers } as ApplicationOptions;
          options.name = strings.dasherize(options.name);

          path = options.name;

          options = transform(options);

          return (
            generate(options, path, ctx) as unknown as Observable<Tree>
          ).toPromise<Tree>();
        })
        .then((tree: Tree) => {
          observer.next(tree);

          observer.complete();
        })
        .catch((err) => {
          console.error('ERROR BUILDING THE TREE', err);
          observer.error(err);
        });
    });

    return observer as unknown as Rule;
  };
}

function transform(options: ApplicationOptions): ApplicationOptions {
  const target: ApplicationOptions = { ...options };

  target.description = target.description ?? DEFAULT_DESCRIPTION;
  target.name = resolvePackageName(target.name);
  target.version = target.version ?? DEFAULT_VERSION;

  target.packageManager = target.packageManager ? 'npm' : target.packageManager;

  return target;
}

function resolvePackageName(path: string) {
  const { name } = parse(path);
  if (name === '.') {
    return basename(process.cwd());
  }
  return name;
}

function generate(
  options: ApplicationOptions,
  path: string,
  ctx: SchematicContext,
) {
  return apply(url(join('./templates' as Path, 'ts')), [
    template({
      ...strings,
      ...options,
    }),
    move(path),
  ])(ctx);
}
