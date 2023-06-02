import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const matchPathname = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };
  console.log(typeof location.pathname);

  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
          <li className='navbarListItem' onClick={() => navigate("/")}>
            <ExploreIcon
              fill={matchPathname("/") ? "#2c2c2c" : "#8f8f8f"}
              width='36px'
              height='36px'
            />
            <p
              className={
                matchPathname("/")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Explore
            </p>
          </li>
          <li className='navbarListItem' onClick={() => navigate("/offers")}>
            <OfferIcon
              fill={matchPathname("/offers") ? "#2c2c2c" : "#8f8f8f"}
              width='36px'
              height='36px'
            />
            <p
              className={
                matchPathname("/offers")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Offer
            </p>
          </li>
          <li className='navbarListItem' onClick={() => navigate("/profile")}>
            <PersonOutlineIcon
              fill={matchPathname("/profile") ? "#2c2c2c" : "#8f8f8f"}
              width='36px'
              height='36px'
            />
            <p
              className={
                matchPathname("/profile")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
