import { SvgIconProps } from '@material-ui/core';

export default interface Component {
  icon: React.ReactElement<SvgIconProps>,
  name: string,
  done: string[],
  todo: string[],
}