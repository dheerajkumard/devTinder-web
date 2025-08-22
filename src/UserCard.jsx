import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "./utils/feedSlice";

const UserCard = ({user}) => {
    const { _id, firstName, lastName, about } = user;
    const dispatch = useDispatch();

    const handleRequests = async(status, userId) => {
      try {
        const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {
          withCredentials: true
        });
        dispatch(removeFeed(userId));
      } catch (error) {
        console.error("Error handling requests:", error);
      }
    }

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={() => handleRequests("ignored", _id)}>Ignore</button>
      <button className="btn btn-primary" onClick={() => handleRequests("interested", _id)}>Interested</button>
    </div>
  </div>
</div>
  );
}

export default UserCard;