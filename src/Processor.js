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

    const onMouseDown = async (e) => {
        e = window.event || e;
        e.preventDefault();
        setOnClick(true);
    }

    const onMouseUp = async (e) => {
        e = window.event || e;
        e.preventDefault();
        setPrePosX(0);
        setPrePosY(0);
        setOnClick(false);
    }

    const onMouseMove = async (e) => {
        e = window.event || e;
        e.preventDefault();
        if (!isOnClick) return;
        if (!prePosX || !prePosY) {
            setPrevPosX(e.clientX);
            setPrevPosY(e.clientY);
            return;
        }
        if (prePosX < e.clientX && prePosY == e.clientY) {
            if (centerY < 300) setCenterPosY(centerY + 2 * scale);
            setPrevPosX(e.clientX);
            setPrevPosY(e.clientY);
            return;
        }
        if (prePosX < e.clientX && prePosY < e.clientY) {
            if (centerX < 300) setCenterPosX(centerX + 2 * scale);
            if (centerY < 300) setCenterPosY(centerY + 2 * scale);
            setPrevPosX(e.clientX);
            setPrevPosY(e.clientY);
            return;
        }
        if (prePosX < e.clientX && prePosY > e.clientY) {
            if (centerX >
                -300) setCenterPosX(centerX - 2 * scale);
            if (centerY < 300) setCenterPosY(centerY + 2 * scale);
            setPrevPosX(e.clientX);
            setPrevPosY(e.clientY);
            return;
        }
        if (prePosX > e.clientX && prePosY == e.clientY) {
            if (centerY > -300) setCenterPosY(centerY - 2 * scale);
            setPrevPosX(e.clientX);
            setPrevPosY(e.clientY);
            return;
        }
        if (prePosX > e.clientX && prePosY < e.clientY) {
            if (centerX < 300) setCenterPosX(centerX + 2 * scale);
            if (centerY > -300) setCenterPosY(centerY - 2 * scale);
            setPrevPosX(e.clientX);
            setPrevPosY(e.clientY);
            return;
        }
        if (prePosX >
            e.clientX && prePosY > e.clientY) {
            if (centerX > -300) setCenterPosX(centerX - 2 * scale);
            if (centerY > -300) setCenterPosY(centerY - 2 * scale);
            setPrevPosX(e.clientX);
            setPrevPosY(e.clientY);
            return;
        }
        if (prePosX == e.clientX && prePosY > e.clientY) {
            if (centerX > -300) setCenterPosX(centerX - 2 * scale);
            setPrevPosX(e.clientX);
            return;
        }
        if (prePosX == e.clientX && prePosY < e.clientY) {
            if (centerX < 300) setCenterPosX(centerX + 2 * scale);
            setPrevPosX(e.clientX);
            return;
        }
    }

    const setPrevPosX = async (posX) => {
        setPrePosX(posX);
    }

    const setPrevPosY = async (posY) => {
        setPrePosY(posY);
    }

    const setCenterPosX = async (centerX) => {
        setCenterX(centerX);
    }

    const setCenterPosY = async (centerY) => {
        setCenterY(centerY);
    }

    const onScroll = async (e) => {
        e = window.event || e;
        // e.preventDefault();
        if (e.deltaY >
            0 && scale >
            1) {
            setScale(scale - 0.5);
        }
        if (e.deltaY < 0 && scale < 5) {
            setScale(scale + 0.5);
        }
    }

    const onMouseOut = async (e) => {
        e = window.event || e;
        e.preventDefault();

        setPrePosX(0);
        setPrePosY(0);
        setOnClick(false);
    }

    return (
        <>
            <div role="presentation" className="MuiDialog-root mixtiles-dialog-root" style={{ position: 'fixed', zIndex: 1300, right: '0px', bottom: '0px', top: '0px', left: '0px' }}>
                <div className="MuiBackdrop-root mixtiles-backdrop" hidden={props.showAdjust} aria-hidden="true" style={{ opacity: 1, transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }} />
                <div tabIndex={0} data-test="sentinelStart" />
                <div className="MuiDialog-container MuiDialog-scrollPaper" role="none presentation" tabIndex={-1} style={{ opacity: 1, transform: 'none', transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }}>
                    <div className="MuiPaper-root MuiDialog-paper mixtiles-dialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiPaper-elevation24 MuiPaper-rounded" role="dialog">
                        <div className="tile-cropper" onMouseOutCapture={e => onMouseOut(e)}>
                            <div className="top-bar-container no-bottom-margin">
                                <div className="top-bar ">
                                    <div className="left-comp" onClick={props.onClickHiddenAdjust}>
                                        <div className="CloseButton">
                                            <img src="/images/icons/xIcon.svg" />
                                        </div>
                                    </div>
                                    <div className="title ">Tùy chỉnh</div>
                                    <div className="right-comp" onClick={e => props.changeImage(props.changeIdx, { scale, centerX: centerX * 0.84, centerY: centerY * 0.84, opacity, url: props.listImage[props.changeIdx].url })}>
                                        <div className="DoneButton">Done</div>
                                    </div>
                                </div>
                                <div className="bottom-comp" />
                            </div>
                            <div className="cropper-content filter-original">
                                <div className="cropper-text">PINCH AND ZOOM</div>
                                <div data-testid="container"
                                    style={{ textAlign: 'center', top: '102px', bottom: '100px' }}
                                    className="cropper-container-style css-1dkwqii"
                                    onMouseDown={async e => onMouseDown(e)}
                                    onMouseMove={async e => onMouseMove(e)}
                                    onMouseUp={async e => onMouseUp(e)}
                                    onWheel={async e => onScroll(e)}
                                >
                                    <img
                                        alt="" className="cropper-image-style css-ebdd77"
                                        src={props.listImage[props.changeIdx] ? props.listImage[props.changeIdx].url : ''}
                                        style={{ width: '283px', opacity: { opacity }, transform: `translate(${centerY}px, ${centerX}px) rotate(0deg) scale(${scale})` }}
                                        onMouseUp={e => onMouseUp(e)}
                                        ref={imgRef}
                                    />
                                    <div data-testid="cropper" className="cropper-area-style css-nikas5" style={{ width: '283px', height: '283px' }} />
                                </div>
                                <div className="frame-container">
                                    <div className="tile-base transparent" />
                                    <div className="TileFrame">
                                        <img className="frame" src={props.imgBg} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div tabIndex={0} data-test="sentinelEnd" />
            </div>
        </>
    );
}

export default Processor;