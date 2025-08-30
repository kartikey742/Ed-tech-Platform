import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { logout } from "../../../services/operations/authAPI";



export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;

  return (
    <button className="profile-dropdown-wrapper" onClick={() => setOpen(true)}>
      <div className="profile-dropdown-trigger">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="profile-dropdown-avatar"
        />
        <AiOutlineCaretDown className="profile-dropdown-icon" />
      </div>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="profile-dropdown-menu"
          ref={ref}
        >
          <Link
            to="/dashboard/my-profile"
            onClick={() => setOpen(false)}
            className="profile-dropdown-item"
          >
            <VscDashboard className="profile-dropdown-item-icon" />
            Dashboard
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="profile-dropdown-item"
          >
            <VscSignOut className="profile-dropdown-item-icon" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
}
