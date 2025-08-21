import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "./utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store)=> store.connection);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true}
      );
        dispatch(addConnection(res.data.data));
        console.log(res.data.data);
    }
    catch (error) {
      console.error("Error fetching connections:", error);
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) {
    return <div className="flex justify-center my-10">No connections found.</div>;
  }
  return (
    <div className="text-center">
     <h1 className="text-2xl">Connections</h1> 
      {connections.map((connection) => (
      <div key={connection._id}>
        {connection.firstName} {connection.lastName}
      </div>
    ))}
    </div>   
  );
}

export default Connections;