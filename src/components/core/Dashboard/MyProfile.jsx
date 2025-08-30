import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { formattedDate } from "../../../utils/dateFormatter";
import IconBtn from "../common/IconBtn";



export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  
  return (
      <div id="main-profile">
      <div id="secmain-profile">
      <h1 className="myprofile-title">My Profile</h1>

      <div className="myprofile-section profile-header">
        <div className="profile-user-info">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="profile-user-img"
          />
          <div className="profile-user-text">
            <p className="profile-user-name">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="profile-user-email">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => navigate("/dashboard/settings")}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      <div className="myprofile-section profile-about">
        <div className="profile-section-header">
          <p className="profile-section-title">About</p>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`profile-about-text ${
            user?.additionalDetails?.about
              ? "text-present"
              : "text-placeholder"
          }`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>

      <div className="myprofile-section profile-details">
        <div className="profile-section-header">
          <p className="profile-section-title">Personal Details</p>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="profile-info-container">
          <div className="profile-info-column">
            <div>
              <p className="profile-label">First Name</p>
              <p className="profile-value">{user?.firstName}</p>
            </div>
            <div>
              <p className="profile-label">Email</p>
              <p className="profile-value">{user?.email}</p>
            </div>
            <div>
              <p className="profile-label">Gender</p>
              <p className="profile-value">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="profile-info-column">
            <div>
              <p className="profile-label">Last Name</p>
              <p className="profile-value">{user?.lastName}</p>
            </div>
            <div>
              <p className="profile-label">Phone Number</p>
              <p className="profile-value">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="profile-label">Date Of Birth</p>
              <p className="profile-value">
                { user?.additionalDetails?.dateOfBirth ?formattedDate(user?.additionalDetails?.dateOfBirth):
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
  
  );
}
