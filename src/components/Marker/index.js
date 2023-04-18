import "./style.css";

import MarkerRed from "./../../images/marker-red.svg";
import MarkerYellow from "./../../images/marker-yellow.svg";

const Marker = ({ player, position }) => {
  const markerImg = player ? MarkerRed : MarkerYellow;
  const markerAlt = player ? "marker_red" : "marker_yellow";

  return (
    <div className="gameboard-marker" style={{ left: position + "px" }}>
      <img src={markerImg} alt={markerAlt} />
    </div>
  );
};

export default Marker;
