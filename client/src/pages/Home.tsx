import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import auth from '../utils/auth';
import buddy from '../assets/buddyimg.webp'
import Jobs from "./Jobs";

const Home = () => {

  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  useEffect(() => {
    if (loginCheck) {
      fetchUsers();
    }
  }, [loginCheck]);

  console.log(users);

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data)
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
  }

  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      {
        !loginCheck ? (
          <div className='login-notice'>
            {/* Add the image here */}
            <img

              src={buddy} // Replace with your image path
              style={{ maxWidth: 300 }}
              alt="Job Search Guy image"
              className="login-image" // Optional: add a CSS class for styling
            />
            <h1></h1>
            <h1>
              Login to view all your Jobs!   <br />
              Encouraging your Job Search
            </h1>
          </div>
        ) : (
          <Jobs />
        )}
    </>
  );
};

export default Home;