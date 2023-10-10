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
  font-size: ${props => props.large ? "2rem" : "1rem" };
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
`;

const StyledFront = styled.div`
  height: 100%;
  div.color-bg {
    background: linear-gradient(red, red) padding-box,
      linear-gradient(135deg, rgba(255, 121, 121, 1), rgba(144, 0, 0, 1))
        border-box;
  }
  p {
    color: white;
    font-size: 2em;
    line-height: 0;
    &.left,
    &.right {
      position: absolute;
    }
    &.left {
      top: -0.35em;
      left: 0.15em;
    }
    &.right {
      bottom: -0.35em;
      right: 0.15em;
      transform: rotate(180deg);
    }
    &.center {
      font-size: 4em;
      text-shadow: 0 0 0 #000000, 0 0.1em 0.15em #000000;
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
      top: calc(50% - 2.75em);
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
      transform: rotate(-15deg);
      font-size: 2.5em;
      text-align: center;
      line-height: 1em;
      color: orange;
      margin-left: 0.5em;
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

const Card = ({ value = "12", show = false }) => {
  const cardRef = useRef();

  useEffect(() => {
    if (show && cardRef.current?.classList.contains("hide")) {
      cardRef.current.classList.add("show");
    }
  }, [show]);

  return (
    <StyledCard ref={cardRef} className={`${show ? "show" : "hide"}`}>
      <StyledFront className="layout front">
        <div className="content color-bg">
          <p className="center">{value}</p>
          <p className="left">{value}</p>
          <p className="right">{value}</p>
        </div>
      </StyledFront>
      <StyledBack className="layout back">
        <div className="content color-bg">
          <div className="overlay">
            <div className="white-bg" />
          </div>
          <p className="center">Skip-Po</p>
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
