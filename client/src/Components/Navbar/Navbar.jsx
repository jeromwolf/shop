import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import { AuthContext } from "../../Context/AuthContext";
import nav_dropdown from '../Assets/nav_dropdown.png'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  let [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);

  const menuRef = useRef();
  const navigate = useNavigate()

  const { dispatch } = useContext(AuthContext);

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await axios.post(`${apiUrl}/auth/logout`, {}, { withCredentials: true })
      dispatch({ type: "LOGOUT" });
      navigate("/");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='nav'>
      <Link to='/' onClick={() => { setMenu("shop") }} style={{ textDecoration: 'none' }} className="nav-logo">
        <img src={logo} alt="logo" />
        <p>SHOPPER</p>
      </Link>
      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => { setMenu("shop") }}><Link to='/' style={{ textDecoration: 'none' }}>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("mens") }}><Link to='/mens' style={{ textDecoration: 'none' }}>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("womens") }}><Link to='/womens' style={{ textDecoration: 'none' }}>Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("kids") }}><Link to='/kids' style={{ textDecoration: 'none' }}>Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
      </ul>
      <div className="nav-login-cart">
        {user
          ? <button onClick={handleLogout}>Logout</button>
          : <Link to='/login' style={{ textDecoration: 'none' }}><button>Login</button></Link>}
        <Link to="/cart"><img src={cart_icon} alt="cart" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
