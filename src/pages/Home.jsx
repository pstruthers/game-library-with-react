import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const [clearBtn, setClearBtn] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [clearBtn]);

  return (
    <div className="container">
      <h1 className="home__title">
        Search our library of over <span className="blue">600,000</span> games
      </h1>
      <h5 className="home__subtitle">
        Find your new favorite game with <span className="blue">Game Library</span>
      </h5>
      <div className="home__search-bar">
        <form id="home__search-form">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by game title..."
            value={searchInput}
            onChange={(e) => {
              setClearBtn(e.target.value.length > 0);
              setSearchInput(e.target.value);
            }}
          />
          {clearBtn && (
            <button
              type="button"
              className="clear-search__btn"
              onClick={() => {
                setSearchInput("");
                setClearBtn(false);
              }}
            >
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </button>
          )}
          <button type="submit" className="search__btn">
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </button>
        </form>
      </div>
      <img
        src="./undraw_video-game-night_fxcu.svg"
        alt=""
        className="home__img"
      />
    </div>
  );
};

export default Home;
