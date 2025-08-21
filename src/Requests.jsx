import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "./utils/requestSlice";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.request);

    const reviewRequests = async (status, _id) => {
        try {
            const res = axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {
                withCredentials: true
            })
            dispatch(removeRequests(_id));
        }
        catch (error) {
            console.error("Error reviewing requests:", error);
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true
            }
            );
            dispatch(addRequests(res.data.data));
            console.log(res.data.data);
        }
        catch (error) {
            console.error("Error fetching requests:", error);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return;
    if (requests.length === 0) {
        return <div className="flex justify-center my-10">No Requests found.</div>;
    }
    return (
        <div className="text-center">
            <h1 className="text-2xl">Requests</h1>
            {requests.map((request) => (
                <div>
                    {request.fromUserId.firstName} {request.fromUserId.lastName}
                    <button className="btn btn-active btn-success mx-2 my-2" onClick={() => reviewRequests("accepted", request._id )}>Accept</button>
                    <button className="btn btn-active btn-warning mx-2 my-2" onClick={() => reviewRequests("rejected", request._id )}>Reject</button>
                </div>
            ))}
        </div>
    );
}

export default Requests;