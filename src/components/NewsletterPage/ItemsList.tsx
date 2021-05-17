import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import ItemsListProps from 'types/Props/ItemsListProps';
import OpenedState from 'types/Objects/OpenedState';
import ListItemToDisplay from 'types/Objects/ListItemToDisplay';
import defaultOpenedState from './defaultOpenedState';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nestedListItem: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

const ItemsList: React.FC<ItemsListProps> = ({ components, toDisplay }) => {
  const classes = useStyles();
  const [opened, setOpened] = useState<OpenedState[]>(defaultOpenedState)
  const collection = toDisplay === 'done' ? components.map(component => {
    return {
      name: component.name,
      icon: component.icon,
      toDisplay: component.done
    }
  }) : components.map(component => {
    return {
      name: component.name,
      icon: component.icon,
      toDisplay: component.todo
    }
  })
  const smallItemIcon = toDisplay === 'done' ? <TurnedInIcon /> : <TurnedInNotIcon />

  const handleClick = (clickedComponent: ListItemToDisplay) => {
    setOpened(opened => opened.map(openedComponent => {
      if (openedComponent.name === clickedComponent.name) {
        return {
          name: openedComponent.name,
          isOpen: !openedComponent.isOpen
        };
      }

      return openedComponent;
    }))
  };

  return (
    <List>
      {collection.map((component, index) => {
        if (component.toDisplay.length > 0) {
          return (
            <>
              <ListItem key={index} button onClick={() => handleClick(component)}>
                <ListItemIcon>
                  {component.icon}
                </ListItemIcon>
                <ListItemText primary={component.name} />
                {opened.find(openedComponent => openedComponent.name === component.name)?.isOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={opened.find(openedComponent => openedComponent.name === component.name)?.isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {component.toDisplay.map((thing, index) => {
                    return (
                      <ListItem key={index} className={classes.nestedListItem}>
                        <ListItemIcon>
                          {smallItemIcon}
                        </ListItemIcon>
                        <ListItemText primary={thing} />
                      </ListItem>
                    )
                  })}
                </List>
              </Collapse>
            </>
          )
        }

        return <></>;
      })}
    </List>
  )
}

export default ItemsList;