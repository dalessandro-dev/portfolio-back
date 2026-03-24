import { Stack, type StackProps } from '../entities/Stack';

export class StackFactory {
  static createStack(props: StackProps, id: number) {
    return new Stack(props, id);
  }
}
