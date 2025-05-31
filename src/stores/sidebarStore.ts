import { Store } from "@tanstack/store";

interface SidebarState {
  isCollapsed: boolean;
  searchSheetOpen: boolean;
  notificationsSheetOpen: boolean;
  isDialogOpen: boolean;
}

const initialState: SidebarState = {
  isCollapsed: false,
  searchSheetOpen: false,
  notificationsSheetOpen: false,
  isDialogOpen: false,
};

export const sidebarStore = new Store<SidebarState>({ ...initialState });

export const toggleCollapse = () =>
  sidebarStore.setState((state) => ({
    ...state,
    isCollapsed: !state.isCollapsed,
  }));

export const setSearchSheetOpen = (open: boolean) =>
  sidebarStore.setState((state) => ({
    ...state,
    searchSheetOpen: open,
  }));

export const setNotificationsSheetOpen = (open: boolean) =>
  sidebarStore.setState((state) => ({
    ...state,
    notificationsSheetOpen: open,
  }));

export const setDialogOpen = (open: boolean) =>
  sidebarStore.setState((state) => ({
    ...state,
    isDialogOpen: open,
  }));

export const closeAllSheets = () =>
  sidebarStore.setState((state) => ({
    ...state,
    searchSheetOpen: false,
    notificationsSheetOpen: false,
  }));

// Optional: Export selectors for easier state access
export const selectSidebarState = () => sidebarStore.state;
export const selectIsCollapsed = () => sidebarStore.state.isCollapsed;
export const selectSearchSheetOpen = () => sidebarStore.state.searchSheetOpen;
export const selectNotificationsSheetOpen = () =>
  sidebarStore.state.notificationsSheetOpen;
export const selectIsDialogOpen = () => sidebarStore.state.isDialogOpen;
