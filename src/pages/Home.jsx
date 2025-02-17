const Home = () => {
  return (
    <div className="container">
      <h1 className="home__title">
        Search our library of over <span className="blue">800,000</span> games
      </h1>
      <input placeholder="Search by game title..." className="home__input" />
      <img
        src="./undraw_video-game-night_fxcu.svg"
        alt=""
        className="home__img"
      />
    </div>
  );
};

export default Home;
