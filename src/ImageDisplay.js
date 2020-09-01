import React, { useState } from 'react';
import Processor from './Processor';

const fakeData = [{
    id: 0,
    opacity: 1,
    centerX: 0,
    centerY: 0,
    scale: 1,
    url: 'https://res.cloudinary.com/mixtiles/image/fetch/x_0,y_211,w_806,h_806,c_crop/c_thumb,w_472,h_472/https://mixtiles-uploads.s3.amazonaws.com/e66dc9c0cf9b2d334dbbbfdbee696daa_upload_web.jpg'
},
{
    id: 1,
    opacity: 1,
    centerX: 0,
    centerY: 0,
    scale: 1,
    url: 'https://res.cloudinary.com/mixtiles/image/fetch/x_542,y_0,w_772,h_772,c_crop/c_thumb,w_472,h_472/https://mixtiles-uploads.s3.amazonaws.com/d0befd65429e47833ebbec7db3816d65_upload_web.jpg'
},
{
    id: 2,
    opacity: 1,
    centerX: 0,
    centerY: 0,
    scale: 1,
    url: 'https://res.cloudinary.com/mixtiles/image/fetch/x_357,y_0,w_790,h_790,c_crop/c_thumb,w_472,h_472/https://mixtiles-uploads.s3.amazonaws.com/3a070ecd7541534e05306b0a8f7268b8_upload_web.jpg'
},
{
    id: 3,
    opacity: 1,
    centerX: 0,
    centerY: 0,
    scale: 1,
    url: 'https://res.cloudinary.com/mixtiles/image/fetch/x_449,y_17,w_319,h_319,c_crop/c_thumb,w_472,h_472/https://mixtiles-uploads.s3.amazonaws.com/79ce4f447017226077196aec2c943838_upload_web.jpg'
},
{
    id: 4,
    opacity: 1,
    centerX: 0,
    centerY: 0,
    scale: 1,
    url: 'https://res.cloudinary.com/mixtiles/image/fetch/x_1745,y_1189,w_800,h_800,c_crop/c_thumb,w_472,h_472/https://mixtiles-uploads.s3.amazonaws.com/5fa83dc9f034bad2861bf3db42b479f7_upload_web.jpg'
}]

const fakeUrl = [
    {
        id: 0,
        url: '/images/frames/none.svg'
    },
    {
        id: 1,
        url: '/images/frames/white.svg'
    },
    {
        id: 2,
        url: '/images/frames/black.svg'
    }
]
const ImageDisplay = () => {
    const [showModal, setShowModal] = useState(false);
    const [showAdjust, setShowAdjust] = useState(false);
    const [listImage, setListImage] = useState(fakeData);
    const [listBgImg, setListBgImg] = useState(fakeUrl);
    const [imgBg, setImgBg] = useState(fakeUrl[0].url);
    const [changeIdx, setChangeIdx] = useState();

    const onClickShowModal = (e, idx) => {
        e.preventDefault();
        setShowModal(true);
        setChangeIdx(idx);
    }

    const onClickHiddenModal = (e) => {
        e.preventDefault();
        setShowModal(false);
    }

    const onClickShowAdjust = (e) => {
        e.preventDefault();
        setShowAdjust(true);
        setShowModal(false);
    }

    const onClickHiddenAdjust = (e) => {
        e.preventDefault();
        setShowAdjust(false);
    }

    const setBackground = (e, idx) => {
        e.preventDefault();
        setImgBg(fakeUrl[idx].url);
    }

    const changeImage = (idx, img) => {
        let listTemp = [...listImage];
        listTemp[idx] = img;
        setListImage(listTemp);
        setShowAdjust(false);
    }

    const removeImg = (e) => {
        e.preventDefault();
        let listTemp = [...listImage];
        listTemp = listTemp.filter(x => x.id != listTemp[changeIdx].id);
        setListImage(listTemp);
        setShowModal(false);
    }

    return (
        <>
            <div id="review-order-page" className="review-order-page filter-original" style={{ height: '300px' }}>
                <div className="TilesStrip">
                    {listBgImg && listBgImg.map((item, idx) => {
                        return <div id={`tile-${idx}`} key={idx} className="tile" onClick={e => setBackground(e, idx)}>
                            <div className="tile-base" />
                            <div className="preview frameless" style={{ width: '239px', height: '239px' }}>
                                <img alt="" className="preview-image" style={{ opacity: 1, width: '100%' }} />
                            </div>
                            <div className="TileFrame">
                                <img className="frame" src={item.url} />
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div id="review-order-page" className="review-order-page filter-original">
                <div className="content">
                    <div className="TilesStrip">
                        {
                            listImage && listImage.map((item, idx) => {
                                return <div id={`tile-${idx}`} key={idx} className="tile">
                                    <div className="tile-base" />
                                    <div className="preview frameless" style={{ width: '235px', height: '235px' }}>
                                        <img alt="" className="preview-image" src={item.url} style={{ scale: item.scale, width: '100%', transform: `translate(${item.centerY}px, ${item.centerX}px) rotate(0deg) scale(${item.scale})` }} />
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
                                    <div className="text">Choose from Online Services</div>
                                </div>
                            </div>
                        </div>
                        {
                            showModal ? <>
                                <div role="presentation" className="MuiDialog-root mixtiles-dialog-root" style={{ position: 'fixed', zIndex: 1300, right: '0px', bottom: '0px', top: '0px', left: '0px' }}>
                                    <div className="MuiBackdrop-root" hidden={showModal} role="presentation" aria-hidden="true" style={{ opacity: 1, transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }} />
                                    <div tabIndex={0} data-test="sentinelStart" />
                                    <div className="MuiPaper-root MuiDrawer-paper adjust-tile-drawer MuiDrawer-paperAnchorBottom MuiPaper-elevation16" tabIndex={-1} style={{ transform: 'none', transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms' }}>
                                        <div className="adjust-tile-buttons">
                                            <div className="dialog-button no-border" onClick={e => onClickShowAdjust(e)}>Tùy chỉnh</div>
                                            <div className="dialog-button highlighted" onClick={e => removeImg(e)}>Xóa bỏ</div>
                                            <div className="dialog-button gray" onClick={e => onClickHiddenModal(e)}>Bỏ qua</div>
                                        </div>
                                    </div>
                                    <div tabIndex={0} data-test="sentinelEnd" />
                                </div>
                            </> : null
                        }
                    </div>
                </div>
            </div>
            {
                listImage && changeIdx >= 0 && showAdjust && <Processor
                    showAdjust={showAdjust}
                    onClickHiddenAdjust={onClickHiddenAdjust}
                    changeImage={changeImage}
                    changeIdx={changeIdx}
                    listImage={listImage}
                    imgBg={imgBg}
                />
            }
        </>
    );
}
export default ImageDisplay;