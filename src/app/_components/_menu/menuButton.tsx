import IconButton from '@/app/_components/_ui/_buttons/icon';
import { IconMenu } from '@/app/ui/icons';

const MenuButton = ({ toggleMenuDrawer }: { toggleMenuDrawer: () => void }) => {
  return (
    <IconButton onClick={toggleMenuDrawer}>
      <IconMenu />
    </IconButton>
  );
};

export default MenuButton;
