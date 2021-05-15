import Component from 'types/Objects/Component';

export default interface ItemsListProps {
  components: Component[],
  toDisplay: 'done' | 'todo',
}