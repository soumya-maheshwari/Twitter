import React, { useState } from "react";
import searchImg from "../../../Assets/search.svg";
import { useDispatch } from "react-redux";
import { searchUserThunk } from "../../../Redux/authSlice";
// import "./searchUsers.css";
import SearchToChatComp from "./SearchToChatComp";

const SearchToChat = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [onSearch, setOnSearch] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);

  const handleSearchUser = async (query) => {
    setSearch(query);
    console.log(search);
    if (!query) {
      return;
    } else {
      try {
        // setLoadingUser(true);
        dispatch(searchUserThunk(search))
          .then((res) => {
            console.log(res);
            setOnSearch(res.payload.data.user);

            if (res.payload.data.user.length > 0) {
              setLoadingUser(false);
            }
            return res;
          })
          .catch((err) => {
            console.log(err);
            return err.response;
          });
      } catch (error) {
        console.log(error);
        return error.response;
      }
    }
  };

  console.log(onSearch, "on search");
  // console.log(onSearch.length);

  const handleUserSearch = (e) => {
    e.preventDefault();
    alert(search);
    dispatch(searchUserThunk())
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  };
  return (
    <>
      <div className="search-users">
        <div className="search-user-body">
          <img
            src={searchImg}
            alt="search"
            className="search-icon"
            onClick={handleUserSearch}
          />
          <input
            type="text"
            className="search-user-input"
            value={search}
            placeholder="Search user by name or username"
            onChange={(e) => {
              handleSearchUser(e.target.value);
            }}
          />
        </div>
        {loadingUser ? null : (
          <>
            {onSearch?.slice(0, 4).map((userr) => {
              return (
                <>
                  <SearchToChatComp
                    name={userr.name}
                    username={userr.username}
                    key={userr._id}
                    userId={userr.id}
                    pic={userr.profile_pic}
                    // object={userr}
                  />
                  {/* {console.log(userr)} */}
                </>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default SearchToChat;
