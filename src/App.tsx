// TODO
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFreeCodeCamp } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState, useCallback } from "react";

function App() {
  const [isPowerOn, setIsPowerOn] = useState<boolean>(false);
  const [isBankOn, setIsBankOn] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(50);
  const [message, setMessage] = useState<string>("");

  const handlePowerClick = () => {
    setIsPowerOn(!isPowerOn);
  };
  const handleBankClick = () => {
    setIsBankOn(!isBankOn);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
    setMessage("Volume : " + e.target.value);
    setTimeout(() => setMessage(""), 1000);
  };

  interface sounds {
    [key: string]: string;
  }
  interface audio {
    [key: string]: HTMLAudioElement;
  }

  const sounds: sounds = {
    Q: "Heater 1",
    W: "Heater 2",
    E: "Heater 3",
    A: "Heater 4",
    S: "Clap",
    D: "Open-HH",
    Z: "Kick-n'-Hat",
    X: "Kick",
    C: "Closed-HH",
  };
  const audio: audio = {};

  for (const item in sounds) {
    audio[item] = new Audio("./sounds/" + item + ".mp3");
    audio[item].preload = "none";
  }

  const handleSoundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    s: string
  ) => {
    if (isPowerOn) {
      const el = e.target as HTMLElement;
      el.classList.add("active");
      setTimeout(() => {
        el.classList.remove("active");
      }, 100);
      audio[s].volume = volume / 100;
      audio[s].play();
      setMessage(sounds[s]);
    }
  };

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      const el: HTMLElement = document.querySelector(
        "#" + e.key
      ) as HTMLElement;
      if (el && isPowerOn) {
        el.classList.add("active");
        el.click();
        setTimeout(() => {
          el.classList.remove("active");
        }, 100);
      }
    },
    [isPowerOn]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="container">
      <div className="header">
        <div className="logo">FCC</div>
        <FontAwesomeIcon icon={faFreeCodeCamp} />
      </div>
      <div className="main">
        <div className="buttons">
          <div
            id="q"
            className="button"
            onClick={(e) => handleSoundClick(e, "Q")}
          >
            Q
          </div>
          <div
            id="w"
            className="button"
            onClick={(e) => handleSoundClick(e, "W")}
          >
            W
          </div>
          <div
            id="e"
            className="button"
            onClick={(e) => handleSoundClick(e, "E")}
          >
            E
          </div>
          <div
            id="a"
            className="button"
            onClick={(e) => handleSoundClick(e, "A")}
          >
            A
          </div>
          <div
            id="s"
            className="button"
            onClick={(e) => handleSoundClick(e, "S")}
          >
            S
          </div>
          <div
            id="d"
            className="button"
            onClick={(e) => handleSoundClick(e, "D")}
          >
            D
          </div>
          <div
            id="z"
            className="button"
            onClick={(e) => handleSoundClick(e, "Z")}
          >
            Z
          </div>
          <div
            id="x"
            className="button"
            onClick={(e) => handleSoundClick(e, "X")}
          >
            X
          </div>
          <div
            id="c"
            className="button"
            onClick={(e) => handleSoundClick(e, "C")}
          >
            C
          </div>
        </div>
        <div className="controller">
          <div className="control">
            Power
            <div className="outer" onClick={handlePowerClick}>
              <div
                className="inner"
                style={{ float: isPowerOn ? "right" : "left" }}
              ></div>
            </div>
          </div>
          <div className="display">{message}</div>
          <div className="slider">
            <input
              max="100"
              min="0"
              step="1"
              type="range"
              value={volume}
              onChange={(e) => handleVolumeChange(e)}
              disabled={!isPowerOn}
            />
          </div>
          <div className="control">
            Bank
            <div className="outer" onClick={handleBankClick}>
              <div
                className="inner"
                style={{ float: isBankOn ? "right" : "left" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
