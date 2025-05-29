import { useLocation } from '@remix-run/react';
import { menuData, MenuItem } from '~/lib/data';


const findMenuItem = (items: MenuItem[], path: string): MenuItem | null => {
  for (const item of items) {
    if (item.url === path) {
      return item;
    }
    if (item.items) {
      const found = findMenuItem(item.items, path);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

function useMenu() {

  const location = useLocation();
  return findMenuItem(menuData.navMain, location.pathname);
}

export default useMenu;
