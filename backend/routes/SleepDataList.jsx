import React, { useEffect, useState } from "react";
import axios from "axios";

const SleepDataList = () => {
  const [sleepData, setSleepData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [updatedHours, setUpdatedHours] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("/api/sleepdata");
    setSleepData(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/sleepdata/${id}`);
    fetchData();
  };

  const handleUpdate = async (id) => {
    await axios.put(`/api/sleepdata/${id}`, { hoursSlept: updatedHours });
    setEditingId(null);
    setUpdatedHours("");
    fetchData();
  };

  return (
    <div>
      <h2>Sleep Records</h2>
      {sleepData.map((item) => (
        <div key={item._id}>
          <p>
            {editingId === item._id ? (
              <>
                <input
                  type="number"
                  value={updatedHours}
                  onChange={(e) => setUpdatedHours(e.target.value)}
                />
                <button onClick={() => handleUpdate(item._id)}>Save</button>
              </>
            ) : (
              <>
                Hours Slept: {item.hoursSlept}
                <button onClick={() => {
                  setEditingId(item._id);
                  setUpdatedHours(item.hoursSlept);
                }}>
                  Edit
                </button>
              </>
            )}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default SleepDataList;
