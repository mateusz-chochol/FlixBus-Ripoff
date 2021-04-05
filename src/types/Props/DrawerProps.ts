import AppBarMenuItem from 'types/Objects/AppBarMenuItem';

export default interface DrawerProps {
  items: AppBarMenuItem[],
  open: boolean,
  setOpen: (value: React.SetStateAction<boolean>) => void
}