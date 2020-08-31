import React, { useState, useRef } from 'react';
import './App.css';

const App = () => {
  const [opacity, setOpacity] = useState(1);
  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);
  const [scale, setScale] = useState(1);
  const [isOnClick, setOnClick] = useState(false);
  const [prePosX, setPrePosX] = useState(0);
  const [prePosY, setPrePosY] = useState(0);
  const imgRef = useRef();

  const onMouseDown = (e) => {
    setOnClick(true);
  }

  const onMouseUp = (e) => {
    setPrePosX(0);
    setPrePosY(0);
    setOnClick(false);
  }

  const onMouseMove = async (posX, posY) => {
    if (!isOnClick) return;
    if (!prePosX || !prePosY) {
      setPrePosX(posX);
      setPrePosY(posY);
    }

    if (prePosX < posX && prePosY == posY) {
      if (centerY < 300) setCenterY(centerY + 1);
      setPrePosX(posX);
      setPrePosY(posY);
      return;
    }

    if (prePosX < posX && prePosY < posY) {
      if (centerX < 300) setCenterX(centerX + 1);
      if (centerY < 300) setCenterY(centerY + 1);
      setPrePosX(posX);
      setPrePosY(posY);
      return;
    }

    if (prePosX < posX && prePosY > posY) {
      if (centerX > -300) setCenterX(centerX - 1);
      if (centerY < 300) setCenterY(centerY + 1);
      setPrePosX(posX);
      setPrePosY(posY);
      return;
    }

    if (prePosX > posX && prePosY == posY) {
      if (centerY > -300) setCenterY(centerY - 1);
      setPrePosX(posX);
      setPrePosY(posY);
      return;
    }

    if (prePosX > posX && prePosY < posY) {
      if (centerX < 300) setCenterX(centerX + 1);
      if (centerY > -300) setCenterY(centerY - 1);
      setPrePosX(posX);
      setPrePosY(posY);
      return;
    }

    if (prePosX > posX && prePosY > posY) {
      if (centerX > -300) setCenterX(centerX - 1);
      if (centerY > -300) setCenterY(centerY - 1);
      setPrePosX(posX);
      setPrePosY(posY);
      return;
    }

    if (prePosX == posX && prePosY > posY) {
      if (centerX > -300) setCenterX(centerX - 1);
      setPrePosX(posX);
      return;
    }

    if (prePosX == posX && prePosY < posY) {
      if (centerX < 300) setCenterX(centerX + 1);
      setPrePosX(posX);
      return;
    }
  }

  const onScroll = (e) => {
    if (e.deltaY > 0 && scale > 1) {
      setScale(scale - 0.5);
    }

    if (e.deltaY < 0 && scale < 5) {
      setScale(scale + 0.5);
    }
  }

  return (
    <div className="App">
      <div role="presentation" className="MuiDialog-root mixtiles-dialog-root" style={{ position: 'fixed', zIndex: 1300, right: '0px', bottom: '0px', top: '0px', left: '0px' }}>
        <div className="MuiBackdrop-root mixtiles-backdrop" aria-hidden="true" style={{ opacity: 1, transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }} />
        <div tabIndex={0} data-test="sentinelStart" />
        <div className="MuiDialog-container MuiDialog-scrollPaper" role="none presentation" tabIndex={-1} style={{ opacity: 1, transform: 'none', transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }}>
          <div className="MuiPaper-root MuiDialog-paper mixtiles-dialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiPaper-elevation24 MuiPaper-rounded" role="dialog">
            <div className="tile-cropper">
              <div className="cropper-content filter-original">
                <div className="cropper-text">
                  PINCH AND ZOOM</div>
                <div data-testid="container"
                  style={{ textAlign: 'center' }}
                  className="cropper-container-style css-1dkwqii"
                  onMouseDown={e => onMouseDown(e)}
                  onMouseMove={e => onMouseMove(e.clientX, e.clientY)}
                  onMouseUp={e => onMouseUp(e)}
                  onWheel={e => onScroll(e)}
                >
                  <img
                    alt="" className="cropper-image-style css-ebdd77"
                    src="https://res.cloudinary.com/mixtiles/image/fetch/q_auto/https://mixtiles-uploads.s3.amazonaws.com/e66dc9c0cf9b2d334dbbbfdbee696daa_upload_web.jpg"
                    style={{ width: '283px', opacity: { opacity }, transform: `translate(${centerY}px, ${centerX}px) rotate(0deg) scale(${scale})` }}
                    onMouseUp={e => onMouseUp(e)}
                    ref={imgRef}
                  />
                  <div data-testid="cropper" className="cropper-area-style css-nikas5" style={{ width: '283px', height: '283px' }}
                    onScroll={e => onScroll(e)} />
                </div>
                <div className="frame-container">
                  <div className="tile-base transparent" />
                  <div className="TileFrame">
                    <img className="frame" src="/images/frames/none.svg" />
                    <img className="frame hidden" src="/images/frames/white.svg" />
                    <img className="frame hidden" src="/images/frames/white.svg" />
                    <img className="frame hidden" src="/images/frames/black.svg" />
                    <img className="frame hidden" src="/images/frames/black.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div tabIndex={0} data-test="sentinelEnd" />
      </div>


    </div>




  );
}

export default App;