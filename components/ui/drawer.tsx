type DrawerProps = {
  children: React.ReactNode;
  isOpen: boolean;
  toggleDrawer: () => void;
};

const Drawer = ({ children, isOpen, toggleDrawer }: DrawerProps) => {
  return (
    <>
      {/* Drawer content */}
      <div
        className={`fixed inset-x-0 bottom-0 bg-white transition-transform transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } shadow-lg rounded-t-lg z-40`}
      >
        <div className="p-6">{children}</div>
      </div>

      {/* Backdrop to close the drawer when clicked outside */}
      {isOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black opacity-50 z-30"
        ></div>
      )}
    </>
  );
};

export default Drawer;
