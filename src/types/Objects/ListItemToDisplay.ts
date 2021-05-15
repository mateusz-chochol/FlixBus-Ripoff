import { SvgIconProps } from '@material-ui/core';

export default interface ListItemToDisplay {
  icon: React.ReactElement<SvgIconProps>,
  name: string,
  toDisplay: string[],
}