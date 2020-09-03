import React, { useState, useRef, useEffect } from 'react';

const Processor = (props) => {
    const [opacity, setOpacity] = useState(1);
    const [centerX, setCenterX] = useState(0);
    const [centerY, setCenterY] = useState(0);
    const [scale, setScale] = useState(1);
    const [isOnClick, setOnClick] = useState(false);
    const imgRef = useRef();
    const [offsetX, setOffsetX] = useState(-1);
    const [offsetY, setOffsetY] = useState(-1);

    useEffect(() => {
        setCenterX(props.listImage[props.changeIdx].centerX);
        setCenterY(props.listImage[props.changeIdx].centerY);
        setScale(props.listImage[props.changeIdx].scale);
        setOpacity(props.listImage[props.changeIdx].opacity);
    }, []);

    const onMouseDown = async (e) => {
        e = window.event || e;
        e.preventDefault();
        setOffsetX(e.clientX);
        setOffsetY(e.clientY);
        setOnClick(true);
    }

    const onMouseUp = async (e) => {
        e = window.event || e;
        e.preventDefault();
        setOnClick(false);
        setCenterX(e.clientX - offsetX + centerX);
        setCenterY(e.clientY - offsetY + centerY);
    }

    const moveByRef = async (x, y) => {
        imgRef.current.style.transform = `translate(${x}px, ${y}px) rotate(0deg) scale(${scale})`;
        imgRef.current.style.cx = x;
        imgRef.current.style.cy = y;
    }

    const moveMoveMove = async (e) => {
        if (!isOnClick) return;
        e = window.event || e;
        e.preventDefault();
        if (offsetX !== -1 && offsetY !== -1) {
            await moveByRef(e.clientX - offsetX + centerX, e.clientY - offsetY + centerY);
        }
    }

    const onScroll = async (e) => {
        if (e.deltaY > 0 && scale > 1) {
            setScale(scale - 0.5);
        }
        if (e.deltaY < 0 && scale < 5) {
            setScale(scale + 0.5);
        }
    }

    const onMouseOut = (e) => {
        setOnClick(false);

        setOffsetX(-1);
        setOffsetY(-1);
    }

    const changeImg = async (e) => {
        e.preventDefault();
        await props.changeImage(props.changeIdx,
            {
                scale, centerX: (parseInt(imgRef.current.style.cy) || 0) * 0.84,
                centerY: (parseInt(imgRef.current.style.cx) || 0) * 0.84,
                opacity, url: props.listImage[props.changeIdx].url
            })
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
                                    <div className="title">Tùy chỉnh</div>
                                    <div className="right-comp" onClick={async e => await changeImg(e)}>
                                        <div className="DoneButton">Done</div>
                                    </div>
                                </div>
                                <div className="bottom-comp" />
                            </div>
                            <div className="cropper-content filter-original">
                                <div className="cropper-text">Dịch chuyển và thu phóng</div>
                                <div data-testid="container"
                                    style={{ textAlign: 'center', top: '102px', bottom: '100px' }}
                                    className="cropper-container-style css-1dkwqii"
                                    onMouseOutCapture={async e => onMouseOut(e)}
                                    onMouseDown={async e => await onMouseDown(e)}
                                    onMouseMove={async e => await moveMoveMove(e)}
                                    onMouseUp={async e => await onMouseUp(e)}
                                    onWheel={async e => await onScroll(e)}
                                >
                                    <img
                                        alt="" className="cropper-image-style css-ebdd77"
                                        src={props.listImage[props.changeIdx] ? props.listImage[props.changeIdx].url : ''}
                                        style={{ width: '283px', opacity: { opacity }, transform: `translate(${centerX}px, ${centerY}px) rotate(0deg) scale(${scale})` }}
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