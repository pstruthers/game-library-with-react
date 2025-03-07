import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  allowedPlatforms,
  platformIcons,
  platformMap,
} from "../constants/platforms";
import { useNavigate, useSearchParams } from "react-router-dom";

const Games = () => {
  const GAMES_PER_PAGE = 20;

  const [games, setGames] = useState([]);
  const [gamesCount, setGamesCount] = useState(0);
  const [page, setPage] = useState(1);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [headerLoading, setHeaderLoading] = useState(true);
  const [clearBtn, setClearBtn] = useState(false);
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchInput.length > 0) {
      navigate(`/games?search=${encodeURIComponent(searchInput)}`);
    } else {
      navigate("/games");
    }
    setQuery(searchInput);
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
    setHeaderLoading(true);
  }, [query]);

  useEffect(() => {
    async function fetchGames() {
      setGamesLoading(true);

      const allowedPlatformIDs = allowedPlatforms
        .flatMap((platform) => platformMap[platform] || [])
        .join(",");

      const searchQuery = query && `&search=${query}`;

      const { data } = await axios.get(
        `https://api.rawg.io/api/games?key=58ee01e52ce14968a6c26b86c06b3f2b&page=${page}&platforms=${allowedPlatformIDs}${searchQuery}`
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
  }, [page, query]);

  return (
    <div>
      <header>
        <div className="games__banner">
          <img src="./bg.jpg" alt="Banner" className="games__banner--img" />
          <div className="games__banner--container container">
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
            <>
              <div className="games__header--title-skeleton" />
              <div className="games__header--count-skeleton" />
            </>
          ) : (
            <>
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
            </>
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
                      {game.released && (
                        <h6 className="game__release-date">
                          {formatDate(game.released)}
                        </h6>
                      )}
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
              <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
              PREV
            </button>
            {gamesLoading ? (
              <div className="page__skeleton" />
            ) : (
              <div>{`Page ${page} of ${Math.ceil(
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
    </div>
  );
};

export default Games;
