import React, { useState, useRef, useEffect } from 'react';

const Processor = (props) => {
    const [opacity, setOpacity] = useState(1);
    const [centerX, setCenterX] = useState(0);
    const [centerY, setCenterY] = useState(0);
    const [scale, setScale] = useState(1);
    const [isOnClick, setOnClick] = useState(false);
    const [prePosX, setPrePosX] = useState(0);
    const [prePosY, setPrePosY] = useState(0);
    const imgRef = useRef();

    useEffect(() => {
        setCenterX(props.listImage[props.changeIdx].centerX);
        setCenterY(props.listImage[props.changeIdx].centerY);
        setScale(props.listImage[props.changeIdx].scale);
        setOpacity(props.listImage[props.changeIdx].opacity);
    }, []);

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
        if (prePosX < posX && prePosY >
            posY) {
            if (centerX >
                -300) setCenterX(centerX - 1);
            if (centerY < 300) setCenterY(centerY + 1);
            setPrePosX(posX);
            setPrePosY(posY);
            return;
        }
        if (prePosX >
            posX && prePosY == posY) {
            if (centerY >
                -300) setCenterY(centerY - 1);
            setPrePosX(posX);
            setPrePosY(posY);
            return;
        }
        if (prePosX >
            posX && prePosY < posY) {
            if (centerX < 300) setCenterX(centerX + 1);
            if (centerY >
                -300) setCenterY(centerY - 1);
            setPrePosX(posX);
            setPrePosY(posY);
            return;
        }
        if (prePosX >
            posX && prePosY >
            posY) {
            if (centerX >
                -300) setCenterX(centerX - 1);
            if (centerY >
                -300) setCenterY(centerY - 1);
            setPrePosX(posX);
            setPrePosY(posY);
            return;
        }
        if (prePosX == posX && prePosY >
            posY) {
            if (centerX >
                -300) setCenterX(centerX - 1);
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
        e.preventDefault();
        if (e.deltaY >
            0 && scale >
            1) {
            setScale(scale - 0.5);
        }
        if (e.deltaY < 0 && scale < 5) {
            setScale(scale + 0.5);
        }
    }

    return (
        <>
            <div role="presentation" className="MuiDialog-root mixtiles-dialog-root" style={{ position: 'fixed', zIndex: 1300, right: '0px', bottom: '0px', top: '0px', left: '0px' }}>
                <div className="MuiBackdrop-root mixtiles-backdrop" hidden={props.showAdjust} aria-hidden="true" style={{ opacity: 1, transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }} />
                <div tabIndex={0} data-test="sentinelStart" />
                <div className="MuiDialog-container MuiDialog-scrollPaper" role="none presentation" tabIndex={-1} style={{ opacity: 1, transform: 'none', transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }}>
                    <div className="MuiPaper-root MuiDialog-paper mixtiles-dialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiPaper-elevation24 MuiPaper-rounded" role="dialog">
                        <div className="tile-cropper">
                            <div className="top-bar-container no-bottom-margin">
                                <div className="top-bar ">
                                    <div className="left-comp" onClick={props.onClickHiddenAdjust}>
                                        <div className="CloseButton">
                                            <img src="/images/icons/xIcon.svg" />
                                        </div>
                                    </div>
                                    <div className="title ">Adjust</div>
                                    <div className="right-comp" onClick={e => props.changeImage(props.changeIdx, { scale, centerX, centerY, opacity, url: props.listImage[props.changeIdx].url })}>
                                        <div className="DoneButton">Done</div>
                                    </div>
                                </div>
                                <div className="bottom-comp" />
                            </div>
                            {
                                <div className="cropper-content filter-original">
                                    <div className="cropper-text">
                                        PINCH AND ZOOM</div>
                                    <div data-testid="container"
                                        style={{ textAlign: 'center', top: '100px', bottom: '100px' }}
                                        className="cropper-container-style css-1dkwqii"
                                        onMouseDown={e =>
                                            onMouseDown(e)}
                                        onMouseMove={e =>
                                            onMouseMove(e.clientX, e.clientY)}
                                        onMouseUp={e =>
                                            onMouseUp(e)}
                                        onWheel={e =>
                                            onScroll(e)}>
                                        <img
                                            alt="" className="cropper-image-style css-ebdd77"
                                            src={props.listImage[props.changeIdx] ? props.listImage[props.changeIdx].url : ''}
                                            style={{ width: '283px', opacity: { opacity }, transform: `translate(${centerY}px, ${centerX}px) rotate(0deg) scale(${scale})` }}
                                            onMouseUp={e =>
                                                onMouseUp(e)}
                                            ref={imgRef}
                                        />
                                        <div data-testid="cropper" className="cropper-area-style css-nikas5" style={{ width: '283px', height: '283px' }} />
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
                            }
                        </div>
                    </div>
                </div>
                <div tabIndex={0} data-test="sentinelEnd" />
            </div>
        </>
    );
}

export default Processor;