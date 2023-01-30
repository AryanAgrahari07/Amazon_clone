import React from 'react'
import './header.css'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { Link } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import { auth } from './firebase'

function Header() {
  const [{ basket ,user}, dispatch] = useStateValue();
  const handleAuthentication =()=>{
      if(user){
        auth.signOut();  
      }
    }
  return (

    
    <div className='header'>
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt='' />

      </Link>
      <div
        className='header__search'>
        <input
          className='header__searchInput'
          type="text" />
        {/*logo*/}
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className='header_nav'>
        <Link to={!user && '/login'} className='xyz'>
        <div onClick={handleAuthentication} className='header_option'>
          <span className='header_optionLineone'>
            Hello, Aryan
          </span>
          <span className='header_optionLinetwo'>
           {user ? 'Sign Out':'Sign In'}
          </span>
        </div>
        </Link>
        <div className='header_option'>
          <span className='header_optionLineone'>
            Return
          </span>
          <span className='header_optionLinetwo'>
            Order
          </span>
        </div>
        <Link to="/checkout" className='xyz'>
        <div className='header_option'>
          <span className='header_optionLineone'>
            Your
          </span>
          <span className='header_optionLinetwo'>
            Cart
          </span>
        </div>
        </Link>
        <Link to="/checkout" className='xyz'>
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>

      </div>
    </div>
  )
}

export default Header;