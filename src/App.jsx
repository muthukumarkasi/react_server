import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
function App() {
  const [users, setUsers] = useState([]);
  const [filterdata, setfilterdata] = useState("");
  const [ismodelopen, setismodelopen] = useState(false);
  const [userdata, setuserdata] = useState({ name: "", age: "", city: "" });

  const getUsers = async () => {
    await axios.get("http://localhost:8080/users").then((res) => {
      setUsers(res.data);
      setfilterdata(res.data);
    });
  };
  useEffect(() => {
    getUsers();
  }, []);
  const handlesearchusers = (curd) => {
    const searchtext = curd.target.value.toLowerCase();
    const filterdata = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchtext) ||
        user.city.toLowerCase().includes(searchtext)
    );
    setfilterdata(filterdata);
  };

  const closeModel = () => {
    setismodelopen(false);
    getUsers();
  }

  const handleDelete = async (id) => {
    const isconfirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!isconfirm) {
      return;
    }
    await axios.delete(`http://localhost:8080/users/${id}`).then((res) => {
      setUsers(res.data);
      setfilterdata(res.data);
    });
  };
  const handleAddrecord = () => {
    setuserdata({ name: "", age: "", city: "" });
    setismodelopen(true);

  };
  const handledata = (e) => {
    setuserdata({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (userdata.id) {
      await axios
        .patch(`http://localhost:8080/users/${userdata.id}`, userdata)
        .then((res) => {
          console.log(res);
        });
    }
    else{
      await axios.post("http://localhost:8080/users", userdata).then((res) => {
        console.log(res);
      });
    }
   
    closeModel();
     setuserdata({ name: "", age: "", city: "" });
  };
const handleupdate = (user) => {
  setuserdata({ ...user }); // Populate state with selected user's data
  setismodelopen(true);
};
  return (
    <div>
      <div className="flex justify-center text-2xl text-pink-500 font-bold pt-8 underline decoration-blue-400 decoration-2 decoration-double">
        Curd application with React js frontend and Node js backend
      </div>

      <div className="mt-10">
        <div className=" flex justify-center gap-4 items-center">
          <input
            className="text-blue-600 p-2 border border-gray-300 rounded"
            type="search"
            placeholder="Search"
            onChange={handlesearchusers}
          />
          <button
            className="border-2 bg-blue-500 text-white p-2 border-none hover:bg-green-700"
            onClick={handleAddrecord}
          >
            {userdata.id ? "Update Recordr" : "Add Record"} 
          </button>
        </div>
        <div className="flex justify-center ">
          <table className="mt-7 border-collapse border border-slate-500  text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-slate-600 px-4 py-2">S.No</th>
                <th className="border border-slate-600 px-4 py-2">Name</th>
                <th className="border border-slate-600 px-4 py-2">City</th>
                <th className="border border-slate-600 px-4 py-2">Age</th>
                <th className="border border-slate-600 px-4 py-2">Edit</th>
                <th className="border border-slate-600 px-4 py-2">Delete</th>
              </tr>
            </thead>

            <tbody>
              {filterdata &&
                filterdata.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="border border-slate-600 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-slate-600 px-4 py-2">
                      {user.name}
                    </td>
                    <td className="border border-slate-600 px-4 py-2">
                      {user.city}
                    </td>
                    <td className="border border-slate-600 px-4 py-2">
                      {user.age}
                    </td>
                    <td className="border border-slate-600 px-4 py-2 text-center">
                      <button className="bg-blue-600 text-white px-4 py-1 hover:bg-green-700"onClick={() => handleupdate(user)}>
                        Edit
                      </button>
                    </td>
                    <td className="border border-slate-600 px-4 py-2 text-center">
                      <button
                        className="bg-red-500 text-white px-4 py-1 hover:bg-green-700"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {ismodelopen && (
            <div className="block fixed top-1/1 left-auto w-1/2 h-auto bg-white overflow-auto record  border-2  bg-opacity-50 z-10 pointer-events-auto">
              <span
                className="cursor-pointer font-bold float-right pe-4 text-4xl hover:text-rose-800 text-blue-700"
                onClick={closeModel}
              >
                &times;
              </span>
              <div className=" flex flex-col justify-center gap-4 items-center p-10 scrollbar"> 
                <div className="font-bold text-2xl">
                {userdata.id ? "Update Record" : "Add Record"}
                </div>
                <label htmlFor="name"> Full Name:</label>
                <input
                  className=" border border-gray-300 w-80 h-8 text-blue-700 p-2 text-sm "
                  type="text"
                  name="name"
                  value={userdata.name}
                  id="name"
                  onChange={handledata}
                />
                <label htmlFor="city"> City:</label>
                <input
                  className=" border border-gray-300 w-80 h-8 text-blue-700 p-2 text-sm "
                  type="text"
                  name="city"
                  value={userdata.city}
                  id="city"
                  onChange={handledata}
                />
                <label htmlFor="age"> Age:</label>
                <input
                  className=" border border-gray-300 w-80 h-8  text-blue-700 p-2 text-sm "
                  type="text"
                  name="age"
                  value={userdata.age}
                  id="age"
                  onChange={handledata}
                />
                <button
                  className="bg-blue-600 text-white px-4 py-1 hover:bg-green-700"
                  onClick={handleSave}
                >
                 {userdata.id ? "Update user" : "Add user"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
