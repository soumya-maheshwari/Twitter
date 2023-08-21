import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./homepage.css";
import { getHomeFeedsThunk } from "../../Redux/postSlice";
import PostComponent from "../Posts/PostComponent";

const HomeFeeds = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState();
  const [likesARR, setLikesARR] = useState();
  const [isLike, setIsLike] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(user.accessToken);
  const userid = user.id;
  // console.log(userid);

  dispatch(getHomeFeedsThunk())
    .then((res) => {
      console.log(res);

      setPosts(res.payload.data.homeFeed);
      return res;
    })
    .catch(
      (err) => {
        console.log(err);
        return err.reponse;
      },
      [posts]
    );
  return (
    <>
      <div className="home-feeds">
        <div className="home-feeds-div">
          {posts &&
            posts.map((post) => {
              return (
                // <></>
                <PostComponent
                  content={post.content}
                  name={post.user.name}
                  username={post.user.username}
                  postid={post._id}
                  key={post._id}
                  no_of_likes={post.likes.length}
                  image={post.image}
                  isLike={post.likes.includes(userid)}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default HomeFeeds;
