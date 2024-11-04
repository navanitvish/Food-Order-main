import { initialUserData } from "../components/content_data/content_data";
import { TiArrowBackOutline } from "react-icons/ti";
import { FaUserCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserProfileType } from "../types/contentType";

// Define the UserProfile component
type UserProfileProps = {
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfileType>>;
  isUserProfile: UserProfileType;
};

const UserProfile: React.FC<UserProfileProps> = ({
  setUserProfile,
  isUserProfile,
}) => {
  const closeHandler = () => {
    setUserProfile((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
      userProfile: initialUserData,
    }));
  };
  const previntingPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const userObject = {
    ...isUserProfile?.userProfile,
  };

  const objectHeading = Object.keys(userObject);
  const objectValues = Object.values(userObject);
  console.log(userObject, objectHeading, objectValues);

  //

  console.log(userObject);
  return (
    <div
      className={`fixed flex justify-center items-center z-10 inset-0 bg-black/60`}
      onClick={closeHandler}
    >
      <section
        className="p-6 text-gray-600 bg-white border-gray-200 rounded-md md:p-8"
        onClick={previntingPropagation}
      >
        <div className="flex items-center">
          <FaUserCog className="w-9 h-9" />
          <h1 className="text-[28px] font-bold md:text-4xl ml-2">
            User Profile
          </h1>
          <Link to={"/dashboard"}>
            <TiArrowBackOutline className="w-10 h-10 ml-4 hover:text-orange-600 text-sky-600" />
          </Link>
        </div>
        <div className="pt-4 border-b border-gray-200"></div>
        <div className="pt-4 mt-4 md:pl-4 font-montserrat">
          <section className="mb-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <p className="text-sm font-semibold md:text-base">
                <span className="pr-2 text-sm font-medium text-gray-400">
                  Name:
                </span>
                <span className="pr-2 text-base font-medium text-gray-700">
                  {userObject.name}
                </span>
              </p>

              <p className="text-sm font-semibold md:text-base">
                <span className="pr-2 text-sm font-medium text-gray-400">
                  Mobile No:
                </span>
                <span className="pr-2 text-base font-medium text-gray-700">
                  {userObject.mobile}
                </span>
              </p>
              <p className="text-sm font-semibold md:text-base">
                <span className="pr-2 text-sm font-medium text-gray-400">
                  Role:
                </span>
                <span className="pr-2 text-base font-medium text-gray-700">
                  {userObject.role}
                </span>
              </p>
              <p className="text-sm font-semibold md:text-base">
                <span className="pr-2 text-sm font-medium text-gray-400">
                  Email:
                </span>
                <span className="pr-2 text-base font-medium text-gray-700">
                  {userObject.email}
                </span>
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
