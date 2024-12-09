import IconButton from '@/app/_components/_ui/_buttons/icon';
import { IconMenu } from '@/app/ui/icons';

const MenuButton = (props: any) => {
  return (
    <IconButton onClick={props.toggleMenuDrawer}>
      <IconMenu />
    </IconButton>
  );
};

export default MenuButton;
