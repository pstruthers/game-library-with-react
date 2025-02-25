import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  allowedPlatforms,
  platformIcons,
  platformMap,
} from "../constants/platforms";

const Games = () => {
  const [games, setGames] = useState([]);
  const [gamesCount, setGamesCount] = useState(0);
  const [page, setPage] = useState(1);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  useEffect(() => {
    async function fetchGames() {
      setIsLoading(true);

      const allowedPlatformIDs = allowedPlatforms
        .flatMap((platform) => platformMap[platform] || [])
        .join(",");

      const { data } = await axios.get(
        `https://api.rawg.io/api/games?key=58ee01e52ce14968a6c26b86c06b3f2b&page=${page}&platforms=${allowedPlatformIDs}`
      );

      setGames(data.results);
      setGamesCount(data.count);
      setPrevPage(data.previous);
      setNextPage(data.next);
      console.log(data.results);
      setIsLoading(false);
    }
    fetchGames();
  }, [page]);

  return (
    <div className="row">
      <header>
        <div className="games__header--container">
          {isLoading ? (
            <>
              <div className="games__header--title-skeleton" />
              <div className="games__header--count-skeleton" />
            </>
          ) : (
            <>
              <h2 className="games__header--title">All Games</h2>
              <p className="games__header--count">
                {gamesCount.toLocaleString()} results
              </p>
            </>
          )}
        </div>
      </header>
      <div className="games__container">
        {isLoading
          ? new Array(20).fill(0).map((_, index) => (
              <div className="game-card" key={index}>
                <div className="game-card__container--skeleton" />
              </div>
            ))
          : games.map((game) => (
              <div className="game-card" key={game.id}>
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
                        {formatDate(game.released)}
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
      </div>
    </div>
  );
};

export default Games;
