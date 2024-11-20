import axios from "axios";
import success from "../../assets/success.svg";
import failed from "../../assets/failed.svg";
import usersImg from "../../assets/users.svg";

function Tbody({ todo, setData }) {
  const { user } = todo;
  console.log(user);

  const Delete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setData((prevData) => prevData.filter((item) => item.user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <tr className="border-b">
      <td className="p-2">
        <input type="checkbox" className="w-[15px] h-[15px] cursor-pointer" />
      </td>
      <td className="p-2">
        <img src={usersImg} alt="User" />
      </td>
      <td className="p-2">{todo.title}</td>
      <td className="p-2">{user?.email || "N/A"}</td>
      <td className="p-2">
        {user?.address
          ? `City: ${user.address.city}, Address: ${user.address.street}, ${user.address.suite}`
          : "N/A"}
      </td>
      <td className="p-2">{user?.address?.zipcode || "N/A"}</td>
      <td className="p-2">
        <span className="flex justify-center items-center">
          {todo.completed ? (
            <img src={success} alt="Success" />
          ) : (
            <img src={failed} alt="Failed" />
          )}
        </span>
      </td>
      <td className="p-2">
        <button
          onClick={() => Delete(user?.id)}
          className="bg-red-500 text-white p-1 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Tbody;
