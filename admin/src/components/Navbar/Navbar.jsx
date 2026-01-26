// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  PlusCircle,
  List as ListIcon,
  CalendarCheck,
  Search,
  Clock
} from "lucide-react";



export default function Navbar() {
  const [open, setOpen] = useState(false);

  const NavItem = ({ to, Icon, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ` +
        (isActive
          ? "bg-slate-300 text-slate-900 shadow"
          : "text-slate-700 hover:bg-slate-100")
      }
      onClick={() => setOpen(false)}
    >
      {Icon && <Icon className="w-4 h-4 text-slate-600" />}
      <span>{children}</span>
    </NavLink>
  );

  return (
    <header className="w-full fixed top-4 left-0 z-50 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main rounded bar */}
        <div className="relative bg-gradient-to-r from-slate-50 to-slate-200 border border-slate-300/60 rounded-2xl shadow-sm px-4 py-3 flex items-center">
          {/* Left: Brand */}
          <div className="flex items-center gap-3 mr-4">
            <div className="w-11 h-11 rounded-xl bg-white/60 flex items-center justify-center ring-1 ring-slate-200 shadow-sm">
              <Clock className="w-5 h-5 text-slate-700" />
            </div>
            <NavLink
              to="/add"
              className="text-lg font-semibold text-slate-800"
              style={{
                fontFamily:
                  'Poppins, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial'
              }}
            >
              ChronoLite
            </NavLink>
          </div>

          {/* Center: nav options (centered) */}
          <nav className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center gap-3">
              <NavItem to="/add" Icon={PlusCircle}>
                Add
              </NavItem>
              <NavItem to="/list" Icon={ListIcon}>
                List
              </NavItem>
              <NavItem to="/booking" Icon={CalendarCheck}>
                Manage Bookings
              </NavItem>
            </div>
          </nav>

          {/* Right: search + mobile toggle */}
          <div className="ml-auto flex items-center gap-3">

            {/* mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
              onClick={() => setOpen(!open)}
              aria-label="menu"
            >
              {open ? <X className="w-6 h-6 text-slate-700" /> : <Menu className="w-6 h-6 text-slate-700" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown (centered items) */}
        {open && (
          <div className="mt-3 md:hidden bg-gradient-to-r from-slate-50 to-slate-200 border border-slate-300/60 rounded-2xl shadow-sm p-4">
            <div className="flex flex-col items-center gap-3">
              <NavItem to="/add" Icon={PlusCircle}>
                Add
              </NavItem>
              <NavItem to="/list" Icon={ListIcon}>
                List
              </NavItem>
              <NavItem to="/booking" Icon={CalendarCheck}>
                Manage Bookings
              </NavItem>

            </div>
          </div>
        )}
      </div>
    </header>
  );
}
