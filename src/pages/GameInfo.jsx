import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { platformNames } from "../constants/platforms";
import { esrbRatings } from "../constants/esrb";

const GameInfo = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState({});
  const [relatedGames, setRelatedGames] = useState([]);
  const [gameInfoLoading, setGameInfoLoading] = useState(true);
  const [relatedGamesLoading, setRelatedGamesLoading] = useState(true);

  function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  useEffect(() => {
    async function fetchGameInfo() {
      setGameInfoLoading(true);

      const { data } = await axios.get(
        `https://api.rawg.io/api/games/${params.id}?key=58ee01e52ce14968a6c26b86c06b3f2b`
      );

      console.log(data);
      setGame(data);
      setGameInfoLoading(false);
    }

    fetchGameInfo();
  }, [params.id]);

  useEffect(() => {
    async function fetchRelatedGames() {
      setRelatedGamesLoading(true);

      const genreIds = game.genres?.map((genre) => genre.id).join(",");

      const { data } = await axios.get(
        `https://api.rawg.io/api/games?key=58ee01e52ce14968a6c26b86c06b3f2b&genres=${genreIds}`
      );

      const sortedGames = data.results.sort(() => Math.random() - 0.5);

      setRelatedGames(sortedGames.filter((g) => g.id !== game.id));
      setRelatedGamesLoading(false);
    }
    fetchRelatedGames();
  }, [game]);

  return (
    <div className="row">
      <div className="btn__container">
        <button onClick={() => navigate("/games")} className="back__btn">
          <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
          Back to Games
        </button>
      </div>
      {gameInfoLoading ? (
        <>
          <div className="game-info__container">
            <div className="game-info__img--container--skeleton" />
            <div className="game-info__wrapper">
              <div className="game-info__title--skeleton" />
              <div className="game-info__labels--skeleton">
                <div className="game-info__label--skeleton release-date-label__skeleton" />
                <div className="game-info__label--skeleton" />
                <div className="game-info__label--skeleton" />
                <div className="game-info__label--skeleton--hidden" />
              </div>
              <div className="game-info__row-1--skeleton" />
              <div className="game-info__row-2--skeleton" />
              <div className="game-info__label--skeleton" />
              <div className="game-info__row-3--skeleton" />
              <div className="description__container--skeleton" />
              <div className="game-info__label--skeleton genres-label__skeleton" />
              <div className="genres__container--skeleton" />
              <div className="game-info__label--skeleton tags-label__skeleton" />
              <div className="tags__container--skeleton" />
            </div>
          </div>
          <div className="related-games__container">
            <h2 className="related-games__heading">More Games Like This</h2>
            <div className="related-games__list">
              {new Array(6).fill(0).map((_, index) => (
                <div
                  className="related-game__container related-game__container--skeleton"
                  key={index}
                >
                  <div className="related-game__img--skeleton" />
                  <div className="related-game__title--skeleton" />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="game-info__container">
            <div className="game-info__img--container">
              {game.background_image ? (
                <img
                  src={game.background_image}
                  alt="Game cover"
                  className="game-info__img"
                />
              ) : (
                <div className="no-img">
                  <p className="no-img__text">No image available</p>
                </div>
              )}
              {game.esrb_rating && (
                <div className="esrb-rating">
                  {esrbRatings[game.esrb_rating.name]}
                </div>
              )}
            </div>
            <div className="game-info__wrapper">
              <h2 className="game-info__title">{game.name}</h2>
              <div className="game-info__row-1">
                <div className="release-date__container">
                  <h5 className="release-date__label">RELEASE DATE</h5>
                  <h5 className="release-date">
                    {game.released ? formatDate(game.released) : "N/A"}
                  </h5>
                </div>
                <div className="developer__container">
                  <h5 className="developer__label">DEVELOPER</h5>
                  <h5 className="developers">
                    {game.developers?.length > 0
                      ? game.developers
                          ?.map((developer) => developer.name)
                          .join(", ")
                      : "N/A"}
                  </h5>
                </div>
                <div className="publisher__container">
                  <h5 className="publisher__label">PUBLISHER</h5>
                  <h5 className="publishers">
                    {game.publishers?.length > 0
                      ? game.publishers
                          ?.map((publisher) => publisher.name)
                          .join(", ")
                      : "N/A"}
                  </h5>
                </div>
              </div>
              <div className="game-info__row-2">
                <div className="playtime__container">
                  <FontAwesomeIcon
                    icon="fa-solid fa-stopwatch"
                    className="playtime__icon"
                  />
                  <h5 className="playtime">
                    {game.playtime !== 0 ? game.playtime : "-"}{" "}
                    <span className="playtime__label">HOURS</span>
                  </h5>
                </div>
                <div className="achievements__container">
                  <FontAwesomeIcon
                    icon="fa-solid fa-trophy"
                    className="achievements__icon"
                  />
                  <h5 className="achievements">
                    {game.parent_achievements_count !== 0
                      ? game.parent_achievements_count
                      : "-"}{" "}
                    <span className="achievements__label">ACHIEVEMENTS</span>
                  </h5>
                </div>
                <div className="rating__container">
                  <FontAwesomeIcon
                    icon="fa-solid fa-star"
                    className="rating__icon"
                  />
                  <h5 className="rating">
                    {game.metacritic ? game.metacritic : "- "}
                    <span className="rating__label">/100</span>
                  </h5>
                </div>
              </div>
              <div className="game-info__row-3">
                <div className="platforms__container">
                  <h5 className="platforms__label">PLATFORMS</h5>
                  <h5 className="platforms">
                    {game.platforms?.length > 0
                      ? game.platforms
                          ?.sort((a, b) =>
                            a.platform.name
                              .toUpperCase()
                              .localeCompare(b.platform.name)
                          )
                          .map((platform) =>
                            platform.platform.name.includes("PlayStation")
                              ? platformNames[platform.platform.name]
                              : platform.platform.name
                          )
                          .join(", ")
                      : "N/A"}
                  </h5>
                </div>
              </div>
              <div className="description__container">
                <p className="description">
                  {game.description_raw
                    ? game.description_raw
                    : "Description: N/A"}
                </p>
              </div>
              <div className="genres__container">
                <h5 className="genres__label">GENRES</h5>
                <div className="genres">
                  {game.genres?.length > 0 ? (
                    game.genres?.map((genre) => (
                      <h5 className="genre" key={genre.id}>
                        {genre.name}
                      </h5>
                    ))
                  ) : (
                    <h5 className="genre">N/A</h5>
                  )}
                </div>
              </div>
              <div className="tags__container">
                <h5 className="tags__label">TAGS</h5>
                <div className="tags">
                  {game.tags?.length > 0 ? (
                    game.tags?.map((tag) => (
                      <h5 className="tag" key={tag.id}>
                        {tag.name}
                      </h5>
                    ))
                  ) : (
                    <h5 className="tag">N/A</h5>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="related-games__container">
            <h2 className="related-games__heading">More Games Like This</h2>
            {relatedGamesLoading ? (
              <div className="related-games__list">
                {new Array(6).fill(0).map((_, index) => (
                  <div
                    className="related-game__container related-game__container--skeleton"
                    key={index}
                  >
                    <div className="related-game__img--skeleton" />
                    <div className="related-game__title--skeleton" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="related-games__list">
                {relatedGames
                  .map((game) => (
                    <div
                      className="related-game__container"
                      key={game.id}
                      onClick={() => navigate(`/games/${game.id}`)}
                    >
                      <figure className="related-game__img--wrapper">
                        <img
                          src={game.background_image}
                          alt=""
                          className="related-game__img"
                        />
                      </figure>
                      <h5 className="related-game__title">{game.name}</h5>
                    </div>
                  ))
                  .slice(0, 6)}
              </div>
            )}
          </div>
          <div className="attribution">
            <p>
              Data obtained from RAWG API:{" "}
              <Link to="https://rawg.io/apidocs">https://rawg.io/apidocs</Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default GameInfo;
