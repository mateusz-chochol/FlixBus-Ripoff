import { SvgIconProps } from '@material-ui/core';

export default interface AppBarMenuItem {
  index: number,
  key: string,
  text: string,
  route: string,
  icon: React.ReactElement<SvgIconProps>
}