import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const platformMap = {
  PC: [4],
  PlayStation: [187, 18, 16, 15, 27, 19, 17],
  Xbox: [1, 186, 14, 80, 11, 12, 49, 3],
  Nintendo: [7, 8, 9, 13, 10, 83],
};

export const platformIcons = {
  PC: <FontAwesomeIcon icon="fa-brands fa-windows" />,
  PlayStation: <FontAwesomeIcon icon="fa-brands fa-playstation" />,
  Xbox: <FontAwesomeIcon icon="fa-brands fa-xbox" />,
  Nintendo: <img src="./Micrologo_Nintendo.svg" alt="Nintendo" className="nintendo" />,
};

export const platformNames = {
  "PlayStation": "PS1",
  "PlayStation 2": "PS2",
  "PlayStation 3": "PS3",
  "PlayStation 4": "PS4",
  "PlayStation 5": "PS5"
};

export const allowedPlatforms = ["PlayStation", "Xbox", "PC", "Nintendo"];
