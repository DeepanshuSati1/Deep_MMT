import {
  faBed,
  faCalendarDays,
  faPerson,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { useState, useContext } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import "./header.css";
import Navbar from "./nav";
import { SearchContext } from "../context/searchcontext";

const Header = ({ type, mode }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [activeClass, setActiveClass] = useState(1);

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    if (destination !== "") {
      dispatch({
        type: "NEW_SEARCH",
        payload: { destination, dates, options },
      });
      navigate("/hotels", { state: { destination, dates, options } });
    }
  };

  return (
    <div className="header">
      <div className="Box">
        <div
          className={
            type === "list" ? "headerContainer listMode" : "headerContainer"
          }
        >
          <Navbar />
          {type !== "list" && (
            <>
              <h1 className="headerTitle">
                Travel the world with tickets in hand, where every journey is a
                grandstand.
              </h1>
              <p className="headerDesc">
                Get rewarded for your travels - unlock instant savings of 10% or
                more with a free &nbsp
                <span style={{ color: "black" }}> Make My Trip</span> account.
              </p>
              <div className="headerList">
                <div
                  onClick={() => {
                    setActiveClass(1);
                    mode(1);
                  }}
                  className={
                    activeClass === 1
                      ? "headerListItem active"
                      : "headerListItem"
                  }
                >
                  <FontAwesomeIcon icon={faBed} />
                  <span>Hotels</span>
                </div>
                <div
                  onClick={() => {
                    setActiveClass(2);
                    mode(2);
                  }}
                  className={
                    activeClass === 2
                      ? "headerListItem active"
                      : "headerListItem"
                  }
                >
                  <FontAwesomeIcon icon={faPlane} />
                  <span>Flights</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
