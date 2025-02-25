import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

import { useAppDispatch, useAppSelector } from "../state/hooks";
import { setTheme } from "../state/settings/settingsSlice";

export function Navbar() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.settings.theme);

  const onThemeChange = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
  };

  return (
    <div className="navbar bg-base-content fixed z-1 px-8 py-3">
      <div className="navbar-start"></div>
      <div className="navbar-center text-base-100 text-5xl">Sticky Notes</div>
      <div className="navbar-end">
        <label className="toggle border-base-100 text-base-content">
          <input
            type="checkbox"
            value="dark"
            className="theme-controller"
            checked={theme === "dark"}
            onChange={onThemeChange}
          />
          <SunIcon />
          <MoonIcon />
        </label>
      </div>
    </div>
  );
}
