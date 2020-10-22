import { TrainingMenu } from './training-menu';

export interface MenuGroup {
  disabled?: boolean;
  part: string;
  menu: TrainingMenu[];
}
