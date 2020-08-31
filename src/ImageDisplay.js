import React, { useState, useRef } from 'react';
import "antd/dist/antd.css";
import Processor from './Processor';

const fakeData = [{
    opacity: 1,
    centerX: 0,
    centerY: 0,
    scale: 1,
    url: 'https://res.cloudinary.com/mixtiles/image/fetch/x_0,y_211,w_806,h_806,c_crop/c_thumb,w_472,h_472/https://mixtiles-uploads.s3.amazonaws.com/e66dc9c0cf9b2d334dbbbfdbee696daa_upload_web.jpg'
},
{
    opacity: 1,
    centerX: 0,
    centerY: 0,
    scale: 1,
    url: 'https://res.cloudinary.com/mixtiles/image/fetch/x_542,y_0,w_772,h_772,c_crop/c_thumb,w_472,h_472/https://mixtiles-uploads.s3.amazonaws.com/d0befd65429e47833ebbec7db3816d65_upload_web.jpg'
},
{
    opacity: 1,
    centerX: 0,
    centerY: 0,
    scale: 1,
    url: 'https://res.cloudinary.com/mixtiles/image/fetch/x_357,y_0,w_790,h_790,c_crop/c_thumb,w_472,h_472/https://mixtiles-uploads.s3.amazonaws.com/3a070ecd7541534e05306b0a8f7268b8_upload_web.jpg'
},
{
    opacity: 1,
    centerX: 0,
    centerY: 0,
    scale: 1,
    url: 'https://res.cloudinary.com/mixtiles/image/fetch/x_449,y_17,w_319,h_319,c_crop/c_thumb,w_472,h_472/https://mixtiles-uploads.s3.amazonaws.com/79ce4f447017226077196aec2c943838_upload_web.jpg'
},
{
    opacity: 1,
    centerX: 0,
    centerY: 0,
    scale: 1,
    url: 'https://res.cloudinary.com/mixtiles/image/fetch/x_1745,y_1189,w_800,h_800,c_crop/c_thumb,w_472,h_472/https://mixtiles-uploads.s3.amazonaws.com/5fa83dc9f034bad2861bf3db42b479f7_upload_web.jpg'
}]

const fakeUrl = [
    {
        id: 1,
        url: '/images/frames/none.svg'
    },
    {
        id: 2,
        url: '/images/frames/white.svg'
    },
    {
        id: 3,
        url: '/images/frames/black.svg'
    }
]
const ImageDisplay = () => {
    const [opacity, setOpacity] = useState(1);
    const [centerX, setCenterX] = useState(0);
    const [centerY, setCenterY] = useState(0);
    const [scale, setScale] = useState(1);
    const [isOnClick, setOnClick] = useState(false);
    const [prePosX, setPrePosX] = useState(0);
    const [prePosY, setPrePosY] = useState(0);
    const [showModal, setShowModal] = useState(true);
    const [showAdjust, setShowAdjust] = useState(true);
    const [listImage, setListImage] = useState(fakeData);
    const [listBgImg, setListBgImg] = useState(fakeUrl);
    const [imgBg, setImgBg] = useState(fakeUrl[0].url);
    const [changeIdx, setChangeIdx] = useState();

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
        if (e.deltaY >
            0 && scale >
            1) {
            setScale(scale - 0.5);
        }
        if (e.deltaY < 0 && scale < 5) {
            setScale(scale + 0.5);
        }
    }

    const onClickShowModal = (e, idx) => {
        e.preventDefault();
        setShowModal(false);
        setChangeIdx(idx);              
    }

    const onClickHiddenModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    }

    const onClickShowAdjust = (e) => {
        e.preventDefault();
        setShowAdjust(false);
        setShowModal(true);
    }

    const onClickHiddenAdjust = (e) => {
        e.preventDefault();
        setShowAdjust(true);
    }

    const setBackground = (e, idx) => {
        e.preventDefault();
        setImgBg(fakeUrl[idx].url);
    }

    const changeImage = (idx, img) => {
        let listTemp = [...listImage];
        listTemp[idx] = img;
        setListImage(listTemp);
    }

    return (
        <>
            <div id="review-order-page" className="review-order-page filter-original" style={{ height: '300px' }}>
                <div className="TilesStrip">
                    {listBgImg && listBgImg.map((item, idx) => {
                        return <div id={`tile-${idx}`} className="tile" onClick={e => setBackground(e, idx)}>
                            <div className="tile-base" />
                            <div className="preview frameless">
                                <img alt="" className="preview-image" style={{ opacity: 1, width: '100%' }} />
                            </div>
                            <div className="TileFrame">
                                <img className="frame" src={item.url} />
                            </div>
                        </div>
                    })}

                    <div role="presentation" className="MuiDrawer-root MuiDrawer-modal" style={{ position: 'fixed', zIndex: 1300, right: '0px', bottom: '0px', top: '0px', left: '0px' }} hidden>
                        <div className="MuiBackdrop-root" aria-hidden="true" style={{ opacity: 1, transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }} />
                        <div tabIndex={0} data-test="sentinelStart" />
                        <div className="MuiPaper-root MuiDrawer-paper adjust-tile-drawer MuiDrawer-paperAnchorBottom MuiPaper-elevation16" tabIndex={-1} style={{ transform: 'none', transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms' }}>
                            <div className="adjust-tile-buttons">
                                <div className="dialog-button no-border">
                                    Adjust</div>
                                <div className="dialog-button highlighted">
                                    Remove</div>
                                <div className="dialog-button gray">
                                    Dismiss</div>
                            </div>
                        </div>
                        <div tabIndex={0} data-test="sentinelEnd" />
                    </div>
                    <div className="App" hidden>
                        <div role="presentation" className="MuiDialog-root mixtiles-dialog-root" style={{ position: 'fixed', zIndex: 1300, right: '0px', bottom: '0px', top: '0px', left: '0px' }}>
                            <div className="MuiBackdrop-root mixtiles-backdrop" aria-hidden="true" style={{ opacity: 1, transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }} />
                            <div tabIndex={0} data-test="sentinelStart" />
                            <div className="MuiDialog-container MuiDialog-scrollPaper" role="none presentation" tabIndex={-1} style={{ opacity: 1, transform: 'none', transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }}>
                                <div className="MuiPaper-root MuiDialog-paper mixtiles-dialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiPaper-elevation24 MuiPaper-rounded" role="dialog">
                                    <div className="tile-cropper">
                                        <div className="top-bar-container no-bottom-margin">
                                            <div className="top-bar ">
                                                <div className="left-comp">
                                                    <div className="CloseButton">
                                                        <img src="/images/icons/xIcon.svg" />
                                                    </div>
                                                </div>
                                                <div className="title ">
                                                    Adjust</div>
                                                <div className="right-comp">
                                                    <div className="DoneButton">
                                                        Done</div>
                                                </div>
                                            </div>
                                            <div className="bottom-comp" />
                                        </div>
                                        <div className="cropper-content filter-original">
                                            <div className="cropper-text">
                                                PINCH AND ZOOM</div>
                                            <div data-testid="container" className="cropper-container-style css-1dkwqii" style={{ textAlign: 'center' }}>
                                                <img alt="" className="cropper-image-style css-ebdd77" src="https://res.cloudinary.com/mixtiles/image/fetch/q_auto/https://mixtiles-uploads.s3.amazonaws.com/e66dc9c0cf9b2d334dbbbfdbee696daa_upload_web.jpg" style={{ width: '283px', transform: 'translate(0px, 0px) rotate(0deg) scale(1)' }} />
                                                <div data-testid="cropper" className="cropper-area-style css-nikas5" style={{ width: '283px', height: '283px' }} />
                                            </div>
                                            <div className="frame-container">
                                                <div className="tile-base transparent" />
                                                <div className="TileFrame">
                                                    <img className="frame" src="/images/frames/none.svg" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div tabIndex={0} data-test="sentinelEnd" />
                        </div>
                    </div>
                </div>
            </div>

            <div id="review-order-page" className="review-order-page filter-original">
                <div className="content">
                    <div className="TilesStrip">
                        <div className="SquareUploadButton left-side">
                            <div className="plus-icon">
                                <svg viewBox="0 0 37.76 38.93">
                                    <path className="plus-shape" d="M21.22,0V17.2H37.76v4.39H21.22V38.93H16.54V21.59H0V17.2H16.54V0Z" />
                                </svg>
                            </div>
                            <div className="split">
                                <div className="button top">
                                    <div className="tile-uploader skeleton">
                                        <div className="drop-zone" aria-disabled="false" style={{ position: 'relative' }}>
                                            <input accept="image/*" type="file" multiple autoComplete="off" style={{ position: 'absolute', top: '0px', right: '0px', bottom: '0px', left: '0px', opacity: '1e-05', pointerEvents: 'none' }} />
                                        </div>
                                    </div>
                                    <img className="icon" src="/images/uploader/uploadIcon.svg" />Upload Photos</div>
                                <div className="button bottom">
                                    <div className="cloud-icons">
                                        <img className="cloud-icon" src="/images/uploader/facebook.svg" />
                                        <img className="cloud-icon" src="/images/uploader/instagram.svg" />
                                        <img className="cloud-icon smaller" src="/images/uploader/googledrive.svg" />
                                    </div>
                                    <div className="text">
                                        Choose from Online Services</div>
                                </div>
                            </div>
                        </div>
                        {
                            listImage && listImage.map((item, idx) => {
                                return <div id={`tile-${idx}`} className="tile">
                                    <div className="tile-base" />
                                    <div className="preview frameless">
                                        <img alt="" className="preview-image" src={item.url} style={{ opacity: 1, width: '100%' }} />
                                    </div>
                                    <div className="TileFrame" onClick={e =>
                                        onClickShowModal(e, idx)}>
                                        <img className="frame" src={imgBg} />
                                    </div>
                                </div>
                            })
                        }
                        <div className="SquareUploadButton right-side">
                            <div className="plus-icon">
                                <svg viewBox="0 0 37.76 38.93">
                                    <path className="plus-shape" d="M21.22,0V17.2H37.76v4.39H21.22V38.93H16.54V21.59H0V17.2H16.54V0Z" />
                                </svg>
                            </div>
                            <div className="split">
                                <div className="button top">
                                    <div className="tile-uploader skeleton">
                                        <div className="drop-zone" aria-disabled="false" style={{ position: 'relative' }}>
                                            <input accept="image/*" type="file" multiple autoComplete="off" style={{ position: 'absolute', top: '0px', right: '0px', bottom: '0px', left: '0px', opacity: '1e-05', pointerEvents: 'none' }} />
                                        </div>
                                    </div>
                                    <img className="icon" src="/images/uploader/uploadIcon.svg" />Upload Photos</div>
                                <div className="button bottom">
                                    <div className="CloudTileUploader">
                                        <button name="filestack" className="upload-button">
                                            Click me</button>
                                        <div className="picker-content" />
                                    </div>
                                    <div className="cloud-icons">
                                        <img className="cloud-icon" src="/images/uploader/facebook.svg" />
                                        <img className="cloud-icon" src="/images/uploader/instagram.svg" />
                                        <img className="cloud-icon smaller" src="/images/uploader/googledrive.svg" />
                                    </div>
                                    <div className="text">
                                        Choose from Online Services</div>
                                </div>
                            </div>
                        </div>

                        <div hidden={showModal} role="presentation" className="MuiDrawer-root MuiDrawer-modal" style={{ position: 'fixed', zIndex: 1300, right: '0px', bottom: '0px', top: '0px', left: '0px' }}>
                            <div className="MuiBackdrop-root" aria-hidden="true" style={{ opacity: 1, transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }} />
                            <div tabIndex={0} data-test="sentinelStart" />
                            <div className="MuiPaper-root MuiDrawer-paper adjust-tile-drawer MuiDrawer-paperAnchorBottom MuiPaper-elevation16" tabIndex={-1} style={{ transform: 'none', transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms' }}>
                                <div className="adjust-tile-buttons">
                                    <div className="dialog-button no-border" onClick={e =>
                                        onClickShowAdjust(e)}>
                                        Adjust</div>
                                    <div className="dialog-button highlighted">
                                        Remove</div>
                                    <div className="dialog-button gray" onClick={e =>
                                        onClickHiddenModal(e)}>
                                        Dismiss</div>
                                </div>
                            </div>
                            <div tabIndex={0} data-test="sentinelEnd" />
                        </div>
                        {
                            listImage && changeIdx > -1 && <Processor
                                showAdjust={showAdjust}
                                onClickHiddenAdjust={onClickHiddenAdjust}
                                changeImage={changeImage}
                                changeIdx={changeIdx}
                                listImage={listImage}
                            />
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
export default ImageDisplay;