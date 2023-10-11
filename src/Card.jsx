import { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const flipAnimation = css`
  transition: transform 0.5s;
  div.layout {
    transition: visibility 0s;
    transition-delay: 0.15s;
  }
  &.show {
    transform: rotateY(0deg);
    .front {
      visibility: visible;
    }
    .back {
      visibility: hidden;
    }
  }
  &.hide {
    transform: rotateY(180deg);
    .front {
      visibility: hidden;
    }
    .back {
      visibility: visible;
    }
  }
`;

const StyledCard = styled.div`
  ${flipAnimation}
  font-size: ${(props) => (props.large ? "2rem" : "1rem")};
  background-color: white;
  border-radius: 0.75em;
  padding: 0.75em;
  box-shadow: 0em 0em 0.5em 0.1em rgba(0, 0, 0, 0.6);
  overflow: hidden;
  width: 7em;
  height: 11em;
  div.layout {
    width: 7em;
    height: 11em;
    position: absolute;
  }
  div.color-bg {
    height: calc(100% - 0.5em);
    box-shadow: 0.1em 0.1em 0.2em 0.1em rgba(0, 0, 0, 0.6);
    border: 0.25em solid transparent;
  }
  div.content {
    position: relative;
    border-radius: 0.5em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  p.logo {
    transform: rotate(-15deg);
    text-align: center;
  }
  p.center {
  }
`;

const StyledFront = styled.div`
  height: 100%;
  div.color-bg {
    background: ${(props) => props.backgroundColor};
  }
  p {
    color: white;
    font-size: 2em;
    line-height: 0;
    &.left,
    &.right {
      position: absolute;
      &.logo {
        font-size: 1em;
        width: 3em;
        line-height: 1em;
      }
    }
    &.left {
      top: -0.35em;
      left: 0.15em;
      &.logo {
        top: -0.75em;
      }
    }
    &.right {
      bottom: -0.35em;
      right: 0.15em;
      transform: rotate(180deg);
      &.logo {
        bottom: -0.75em;
        transform: rotate(165deg);
      }
    }
    &.center {
      font-size: 4em;
      text-shadow: 0 0 0 #000000, 0 0.1em 0.15em #000000;
      &.logo {
        margin-left: 0.5em;
        font-size: 2.5em;
        line-height: 1em;
      }
    }
  }
`;

const StyledBack = styled.div`
  height: 100%;
  transform: rotateY(180deg);
  div.content {
    div.overlay {
      height: 100%;
      width: 108%;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-content: center;
      justify-content: center;
    }
    div.white-bg {
      position: absolute;
      top: calc(50% - 2.5em);
      width: 10em;
      height: 5em;
      transform: rotate(-15deg);
      border: 0.25em solid transparent;
      background: linear-gradient(white, white) padding-box,
        linear-gradient(
            0deg,
            rgba(256, 255, 121, 1) 0%,
            rgba(10, 135, 0, 1) 100%
          )
          border-box;
    }
  }
  p {
    &.center {
      position: absolute;
      font-size: 2.5em;
      line-height: 1em;
      margin-left: 0.5em;
      color: orange;
      text-shadow: 0 0 0 #000000, 0 0.1em 0.15em #000000;
    }
  }
  div.color-bg {
    background: linear-gradient(
          160deg,
          rgba(26, 148, 13, 1) 0%,
          rgba(156, 255, 121, 1) 50%,
          rgba(26, 148, 13, 1) 70%,
          rgba(156, 255, 121, 1) 100%
        )
        padding-box,
      linear-gradient(
          145deg,
          rgba(256, 255, 121, 1) 0%,
          rgba(10, 135, 0, 1),
          50%,
          rgba(256, 255, 121, 1) 60%,
          rgba(10, 135, 0, 1) 100%
        )
        border-box;
  }
`;

const getBackgroundColor = (value, isSkipPo) => {
  if (isSkipPo)
    return "linear-gradient(orange, orange) padding-box, linear-gradient(135deg, rgba(255, 233, 138, 1), rgba(198, 103, 0, 1)) border-box";
  else if (value < 5)
    return "linear-gradient(#0018ff, #0018ff) padding-box, linear-gradient(135deg, rgba(138, 168, 255, 1), rgba(13, 33, 148, 1)) border-box";
  else if (value >= 5 && value < 9)
    return "linear-gradient(#00ae0d, #00ae0d) padding-box, linear-gradient(135deg, rgba(139, 255, 138, 1), rgba(0, 90, 7, 1)) border-box";
  else if (value >= 9)
    return "linear-gradient(red, red) padding-box, linear-gradient(135deg, rgba(255, 121, 121, 1), rgba(144, 0, 0, 1)) border-box";
  else return;
};

const Card = ({ value = "12", show = false, ...attrs }) => {
  const cardRef = useRef();

  useEffect(() => {
    if (show && cardRef.current?.classList.contains("hide")) {
      cardRef.current.classList.add("show");
    }
  }, [show]);

  const isSkipPo = value === "*";
  value = isSkipPo ? "Skip-Po" : value;
  const backgroundColor = getBackgroundColor(value, isSkipPo);

  return (
    <StyledCard
      ref={cardRef}
      className={`card ${show ? "show" : "hide"}`}
      {...attrs}
    >
      <StyledFront className="layout front" backgroundColor={backgroundColor}>
        <div className="content color-bg">
          <p className={`center ${isSkipPo ? "logo" : ""}`}>{value}</p>
          <p className={`left ${isSkipPo ? "logo" : ""}`}>{value}</p>
          <p className={`right ${isSkipPo ? "logo" : ""}`}>{value}</p>
        </div>
      </StyledFront>
      <StyledBack className="layout back">
        <div className="content color-bg">
          <div className="overlay">
            <div className="white-bg" />
          </div>
          <p className="center logo">Skip-Po</p>
        </div>
      </StyledBack>
    </StyledCard>
  );
};

Card.propTypes = {
  value: PropTypes.string,
  show: PropTypes.bool,
};

export default Card;
