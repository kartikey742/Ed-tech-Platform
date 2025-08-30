import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteProfile } from "../../../../services/operations/SettingsAPI";


export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  }

  return (
    <div className="delete-account">
      <div className="delete-icon-wrap">
        <FiTrash2 className="delete-icon" />
      </div>

      <div className="delete-content">
        <h2 className="delete-title">Delete Account</h2>

        <div className="delete-desc">
          <p>Would you like to delete account?</p>
          <p>
            This account may contain Paid Courses. Deleting your account is
            permanent and will remove all the content associated with it.
          </p>
        </div>

        <button
          type="button"
          className="delete-action"
          onClick={handleDeleteAccount}
        >
          I want to delete my account.
        </button>
      </div>
    </div>
  );
}
