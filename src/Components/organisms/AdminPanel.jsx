import { useState, useEffect } from "react";
import axios from "axios";
import Thead from "./../molecules/Thead";

function AdminPanel() {
  const [mergedData, setMergedData] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [fetchTodos, fetchUsers] = await Promise.all([
          axios.get("https://jsonplaceholder.typicode.com/todos"),
          axios.get("https://jsonplaceholder.typicode.com/users"),
        ]);

        const todos = fetchTodos.data.slice(0, 10);
        const users = fetchUsers.data.slice(0, 10);
        const merged = todos.map((todo, index) => ({
          ...todo,
          user: users[index] || {},
        }));

        setMergedData(merged);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="flex flex-col p-4 gap-[30px]">
      <h1>All ({mergedData.length})</h1>
      <Thead data={mergedData} setData={setMergedData} />
    </div>
  );
}

export default AdminPanel;
