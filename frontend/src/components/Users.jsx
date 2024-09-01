import { useState } from "react";
import Button from "./Button";

const Users = () => {
  const [users, setUsers] = useState([
    {
      firstName: "Adarsh",
      lastName: "Pathak",
      _id: 1,
    },
  ]);
  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} key={users[0]._id} />
        ))}
      </div>
    </>
  );
};

function User(user) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-1/2 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user[0].firstName}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          {user[0].firstName} {user.lastName}
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button label={"Send Money"} />
      </div>
    </div>
  );
}

export default Users;
