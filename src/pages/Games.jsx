import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  allowedPlatforms,
  platformIcons,
  platformMap,
} from "../constants/platforms";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Games = () => {
  const GAMES_PER_PAGE = 20;

  const [games, setGames] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const dropdownRef = useRef(null);
  const [gamesCount, setGamesCount] = useState(0);
  const [page, setPage] = useState(1);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [headerLoading, setHeaderLoading] = useState(true);
  const [clearBtn, setClearBtn] = useState(false);
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("search") || "";
  const initialSort = searchParams.get("sort") || null;
  const [searchInput, setSearchInput] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchInput) params.set("search", searchInput);
    if (sortOrder) params.set("sort", sortOrder);

    const queryString = params.toString();
    navigate(`/games${queryString ? `?${queryString}` : ""}`);
    setQuery(searchInput);
    setPage(1);
  };


  const handleSortChange = (selectedSort) => {
    const newSortOrder = selectedSort === null ? "default" : selectedSort;
    const params = new URLSearchParams();
    if (query) params.set("search", query);
    if (newSortOrder) params.set("sort", newSortOrder);

    const queryString = params.toString();
    navigate(`/games${queryString ? `?${queryString}` : ""}`);

    setSortOrder(newSortOrder);
    setPage(1);
  };


  function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSortOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setHeaderLoading(true);
  }, [query]);

  useEffect(() => {
    async function fetchGames() {
      setGamesLoading(true);

      const allowedPlatformIDs = allowedPlatforms
        .flatMap((platform) => platformMap[platform] || [])
        .join(",");
      
      if (initialSort) {
        setSortOrder(initialSort);
      }

      const params = new URLSearchParams();
      if (query) params.set("search", query);
      if (initialSort) params.set("ordering", initialSort);

      const queryString = params.toString();

      const { data } = await axios.get(
        `https://api.rawg.io/api/games?key=58ee01e52ce14968a6c26b86c06b3f2b&page=${page}&platforms=${allowedPlatformIDs}${
          queryString ? `&${queryString}` : ""
        }`
      );

      setGames(data.results);

      setGamesCount(data.count);
      setPrevPage(data.previous);
      setNextPage(data.next);
      setGamesLoading(false);
      setHeaderLoading(false);
    }

    setClearBtn(query.length > 0);
    fetchGames();
  }, [query, page, initialSort]);

  return (
    <div>
      <header>
        <div className="games__banner">
          <img src="./bg.jpg" alt="Banner" className="games__banner--img" />
          <div className="games__banner--container">
            <h3 className="games__banner--title">Browse Games</h3>
            <div className="home__search-bar">
              <form
                id="home__search-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                <input
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
          </div>
        </div>
        <div className="games__header--container row">
          {headerLoading ? (
            <div className="games__header--wrapper">
              <div className="games__header--left">
                <div className="games__header--title-skeleton" />
                <div className="games__header--count-skeleton" />
              </div>
              <div className="games__header--right">
                <div className="sort__container--skeleton" />
              </div>
            </div>
          ) : (
            <div className="games__header--wrapper">
              <div className="games__header--left">
                <h2 className="games__header--title">
                  {query ? (
                    <>
                      Search results for <span className="blue">"{query}"</span>
                    </>
                  ) : (
                    "All Games"
                  )}
                </h2>
                {gamesCount !== 0 && (
                  <p className="games__header--count">
                    {gamesCount.toLocaleString()} results
                  </p>
                )}
              </div>
              <div className="games__header--right">
                <div className="sort__container">
                  <p className="sort__label">Sort by:</p>
                  <div
                    className="sort__dropdown"
                    onClick={() => setShowSortOptions(!showSortOptions)}
                    ref={dropdownRef}
                  >
                    {sortOrder
                      ? sortOrder === "name"
                        ? "Title A-Z"
                        : sortOrder === "-name"
                        ? "Title Z-A"
                        : sortOrder === "released"
                        ? "Oldest to Newest"
                        : sortOrder === "-released"
                        ? "Newest to Oldest"
                        : sortOrder === "-metacritic"
                        ? "Metacritic Score"
                        : "Default"
                      : "Default"}
                    <FontAwesomeIcon
                      icon="fa-solid fa-chevron-down"
                      className="sort-arrow"
                    />
                    {showSortOptions && (
                      <div className="sort__options">
                        <div onClick={() => handleSortChange(null)}>
                          Default
                        </div>
                        <div onClick={() => handleSortChange("name")}>
                          Title A-Z
                        </div>
                        <div onClick={() => handleSortChange("-name")}>
                          Title Z-A
                        </div>
                        <div onClick={() => handleSortChange("released")}>
                          Oldest to Newest
                        </div>
                        <div onClick={() => handleSortChange("-released")}>
                          Newest to Oldest
                        </div>
                        <div onClick={() => handleSortChange("-metacritic")}>
                          Metacritic Score
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      <div className="games__container row">
        {gamesLoading
          ? new Array(20).fill(0).map((_, index) => (
              <div className="game-card" key={index}>
                <div className="game-card__container--skeleton" />
              </div>
            ))
          : games.map((game) => (
              <div
                className="game-card"
                key={game.id}
                onClick={() => navigate(`/games/${game.id}`)}
              >
                <div className="game-card__container">
                  <figure className="game__img--wrapper">
                    <img
                      src={game.background_image}
                      alt=""
                      className="game__img"
                    />
                  </figure>
                  <div className="game__info--wrapper">
                    <div className="game__info">
                      <h5 className="game__title">{game.name}</h5>
                      <h6 className="game__release-date">
                        {game.released
                          ? formatDate(game.released)
                          : "Release date: N/A"}
                      </h6>
                      <h6 className="game__platforms">
                        {game.parent_platforms
                          .filter((platform) =>
                            allowedPlatforms.includes(platform.platform.name)
                          )
                          .map(
                            (platform) => platformIcons[platform.platform.name]
                          )}
                      </h6>
                    </div>
                    {game.metacritic && (
                      <h6 className="game__score">{game.metacritic}</h6>
                    )}
                  </div>
                </div>
              </div>
            ))}
        {!gamesLoading && gamesCount === 0 ? (
          <div className="no-results__container">
            <p className="no-results__text">No results found.</p>
            <img
              src="./undraw_web-search_9qqc.svg"
              alt=""
              className="no-results__img"
            />
          </div>
        ) : (
          <div className="btn__container">
            <button
              type="button"
              className="btn prev__btn"
              disabled={!prevPage}
              onClick={() => {
                setPage((prevPage) => prevPage - 1);
                window.scrollTo({ top: 0 });
              }}
            >
              PREV
              <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            </button>
            {gamesLoading ? (
              <div className="page__skeleton" />
            ) : (
              <div className="page__count">{`Page ${page} of ${Math.ceil(
                gamesCount / GAMES_PER_PAGE
              ).toLocaleString()}`}</div>
            )}
            <button
              type="button"
              className="btn next__btn"
              disabled={!nextPage}
              onClick={() => {
                setPage((prevPage) => prevPage + 1);
                window.scrollTo({ top: 0 });
              }}
            >
              NEXT
              <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
            </button>
          </div>
        )}
      </div>
      <div className="attribution">
        <p className="attribution__para">
          Data obtained from RAWG API:{" "}
          <Link to="https://rawg.io/apidocs">https://rawg.io/apidocs</Link>
        </p>
      </div>
    </div>
  );
};

export default Games;
