import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();
    const handleSave = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName, lastName
            }, {
                withCredentials: true
            });
            if (res.status === 200) {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            }
            dispatch(addUser(res.data));
        } catch (error) {
            setError("Failed to save profile");
            console.error("Error saving profile:", error);
        }
    }
    return (
        <div className="flex justify-center my-10">
            <div className="flex justify-center mx-10">
                <div className="card bg-base-100 w-96 shadow-sm">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Edit Profile</h2>
                        <fieldset className="fieldset">
                            <input type="text" value={firstName} className="input" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <input type="text" value={lastName} className="input" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                        </fieldset>
                        <p className="text-red-500">{error}</p>
                        <div className="card-actions">
                            <button className="btn btn-primary" onClick={handleSave}>Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            <UserCard user={{ firstName, lastName }} />
            {showToast && <div className="flex justify-center my-10">
            <div className="toast toast-top toast-start">
                <div className="alert alert-success">
                    <span>Saved profile successfully.</span>
                </div>
            </div>
            </div>}
        </div>

    );
}
export default EditProfile;