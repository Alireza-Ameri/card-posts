import "./Card.css";
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import {  toast } from 'react-toastify';
import { BiRepost } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import moment from "jalali-moment";

const Card = ({ name, username, timestamp, text, id, posts, setPosts }) => {
  const date = new Date(timestamp);

  const deleteHandler = (id) => {
    fetch(`http://localhost:3000/posts/${id}`, { method: "DELETE" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        setPosts(posts.filter((value) => value.id !== id));
        toast.success(`Post ${id} deleted successfully`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
  
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="cardContainer">
        <div className="headerContainer">
          <div className="header">
            <img
              src="src/assets/profile.jpg"
              alt="profile"
              className="profile-image"
            />
            <div className="profile-div">
              <sapn className="profile-username">{username}</sapn>
              <sapn className="profile-name">{name}</sapn>
            </div>
          </div>
        </div>
        <div className="divider" />
        <div className="card">
          <img
            src="src/assets/postImage.jpg"
            alt="profile"
            className="card-image"
          />
          <div className="actions-div">
            <div className="icon-div">
              <AiOutlineEye className="icon" /> <span>14</span>
            </div>
            <div className="icon-div">
              <BiRepost className="icon" /> <span>0</span>
            </div>
            <div className="icon-div">
              <FaRegCommentDots className="icon" /> <span>1</span>
            </div>
            <div className="icon-div">
              <AiOutlineHeart className="icon" /> <span>1</span>
            </div>
          </div>
          <span className="date">
            {moment(date, "YYYY-M-D HH:mm:ss")
              .endOf("jMonth")
              .format("jYYYY/jM/jD HH:mm:ss")}
          </span>
          <span className="content">{text}</span>
        </div>

        <div className="divider" />

        <div className="delete-container">
          <button
            className="delete-button"
            onClick={(e) => {
              e.preventDefault();
              deleteHandler(id);
            }}
          >
            حذف پست
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
