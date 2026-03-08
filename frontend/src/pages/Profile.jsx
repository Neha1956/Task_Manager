import React from "react";
import { useSelector } from "react-redux";
//import { useDispatch } from "react-redux";
function Profile() {
  const { user } = useSelector((state) => state.auth);
//console.log(user);
 if (!user) {
    return <p>Loading...</p>;
  }
  /*const user = {
    firstName: "Rahul",
    lastName: "Kumar",
    email: "rahul@example.com"
  };*/

  const initials = user.name
  .split(" ")
  .map((word) => word.charAt(0).toUpperCase())
  .join("")
  .slice(0,2);

  return (
    <div className="flex ml-4 mb-6">

      <div className=" ">

        {/* Profile Avatar */}
        <div className="flex mb-4">
          <div className="w-22 h-22 flex items-center justify-center rounded-full bg-blue-500 text-white text-3xl font-bold">
            {initials}
          </div>
        </div>

        {/* Name */}
        <h2 className="text-xl font-semibold">
          {user.name}
        </h2>

        {/* Email */}
        <p className="text-gray-600 mt-2">{user.email}</p>

      </div>

    </div>
  );
}

export default Profile;