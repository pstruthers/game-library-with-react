import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

const Games = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);

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
      const { data } = await axios.get(
        `https://api.rawg.io/api/games?key=58ee01e52ce14968a6c26b86c06b3f2b&page=${page}`
      );
      setGames(data.results);
      setPrevPage(data.previous);
      setNextPage(data.next);
    }
    fetchGames();
  }, [page]);

  // PLATFORM ICONS:
  // <FontAwesomeIcon icon="fa-brands fa-playstation" />
  // <FontAwesomeIcon icon="fa-brands fa-xbox" />
  // <FontAwesomeIcon icon="fa-solid fa-desktop" />

  return (
    <div>
      <div className="games__container">
        {games.map((game) => (
          <div className="game-card" key={game.id}>
            <div className="game-card__container">
              <figure className="game__img--wrapper">
                <img src={game.background_image} alt="" className="game__img" />
              </figure>
              <div className="game__info--wrapper">
                <div className="game__info">
                  <h5 className="game__title">{game.name}</h5>
                  <h6 className="game__release-date">
                    {formatDate(game.released)}
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
            onClick={() => setPage((prevPage) => prevPage - 1)}
          >
            <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            PREV
          </button>
          <button
            type="button"
            className="btn next__btn"
            disabled={!nextPage}
            onClick={() => setPage((prevPage) => prevPage + 1)}
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
