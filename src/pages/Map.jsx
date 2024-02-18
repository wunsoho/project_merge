import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { renderToString } from 'react-dom/server';
import "../FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MapContent, MapHeader, MapMenu, MapTitle, MapNotice, GoogleMap, MarkerInfo, InfoPic, InfoTitle, InfoTime, InfoWord, InfoContent, InfoButton, InfoDetail, InfoDetilTime } from "../styled/Map.styled";
import InfoPicImg from '../img/roomimg.png'

function Map() {
  const [Token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    setToken(storedToken);
    console.log(storedToken);
  }, []);
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [buildingInfo, setBuildingInfo] = useState(null);
  let buildingId = (null);
  let [infoId, setInfoId] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const ref = useRef();
  const myStyles = [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
  ];
  const navigate = useNavigate(); 

  useEffect(() => {
      if (!selectedMarker) {
          setShowInfo(false);
      }
      else {
        map.panTo(selectedMarker.getPosition());
      }
  }, [map, selectedMarker]);

  useEffect(()=>{
      const newMap = new window.google.maps.Map(ref.current, {
          center: { lat: 35.5437, lng: 129.2562 },
          zoom: 17,
          options: {disableDefaultUI: true, styles: myStyles}
      });
      setMap(newMap);
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
          const result = await axios.get(
            'http://13.125.247.248:8080/api/v1/facility/map',
            {
              headers: {
                'Authorization': `Bearer ${Token}`,
              },
            }
          );
          if (result.data.isSuccess === true) {
            const { list } = result.data.result;
            const markerList = Object.values(list);
            setMarkerPosition(markerList);
          } else {
            console.error("서버 응답 오류:", result.data.message);
          }
        } catch (error) {
          console.error("서버 요청 오류:", error);
        }
      };
    fetchData();
  }, [Token]);

  useEffect(() => {
    if (map && markerPosition ) {
      const newMarkers = markerPosition.map(position => {
        const marker = new window.google.maps.Marker({
          position: { lat: position.latitude, lng: position.longitude },
          map: map,
          label: {
            text: position.label,
            color: '#FFFFFF',
          },
          data: { 
            id: position.id,
          },
          icon: {
            url: `data:image/svg+xml;utf-8,${encodeURIComponent(
              renderToString(
                <FontAwesomeIcon icon="location-pin" style={{ color: '#1FBC70' }} />
              )
            )}`,
            anchor: new window.google.maps.Point(20, 27),
            scaledSize: new window.google.maps.Size(30, 30),
            labelOrigin: new window.google.maps.Point(15, 12),
          },
        });
      return marker;
      });
    setMarkers(newMarkers);
    }
  }, [map, markerPosition]);

  useEffect(() => {
    const clickListeners = [];

    markers.forEach(marker => {
      const clickListener = marker.addListener('click', () => {
        if (selectedMarker === marker) {
          setSelectedMarker(null);
          setShowInfo(false);
          buildingId = null;
          setInfoId(null);
          console.log(buildingId);
          marker.setIcon({
            url: `data:image/svg+xml;utf-8,${encodeURIComponent(
              renderToString(
                <FontAwesomeIcon icon="location-pin" style={{ color: '#1FBC70' }} />
              )
            )}`,
            anchor: new window.google.maps.Point(20, 27),
            scaledSize: new window.google.maps.Size(30, 30),
            labelOrigin: new window.google.maps.Point(15, 12),
          });
        } else {

          if (selectedMarker) {
            selectedMarker.setIcon({
              url: `data:image/svg+xml;utf-8,${encodeURIComponent(
                renderToString(
                  <FontAwesomeIcon icon="location-pin" style={{ color: '#1FBC70' }} />
                )
              )}`,
              anchor: new window.google.maps.Point(20, 27),
              scaledSize: new window.google.maps.Size(30, 30),
              labelOrigin: new window.google.maps.Point(15, 12),
            });
          }

          setSelectedMarker(marker);
          setShowInfo(true);
          buildingId = marker.data.id;
          setInfoId(buildingId)
          console.log(buildingId);
          marker.setIcon({
            url: `data:image/svg+xml;utf-8,${encodeURIComponent(
              renderToString(
                <FontAwesomeIcon icon="location-pin" style={{ color: 'red' }} />
              )
            )}`,
            anchor: new window.google.maps.Point(20, 27),
            scaledSize: new window.google.maps.Size(30, 30),
            labelOrigin: new window.google.maps.Point(15, 12),
          });

          if(buildingId !== null){
            fetchBuildingInfo(buildingId)
              .then(() => {
                console.log(buildingId);
              });
          }
        }
      });

      clickListeners.push(clickListener);
    });

    return () => {
      clickListeners.forEach(listener => {
        window.google.maps.event.removeListener(listener);
      });
    };
  }, [markers, selectedMarker]);
  
  const fetchBuildingInfo = async (buildingId) => {
    try {
        const result = await axios.get(`http://13.125.247.248:8080/api/v1/facility/map/${buildingId}`, {
            headers: {
              'Authorization': `Bearer ${Token}`,
            },
        });
        if (result.data.isSuccess === true) {
            setBuildingInfo(result.data.result);
            console.log(result.data.result);
        } else {
            console.error("서버 응답 오류:", result.data.message);
        }
    } catch (error) {
        console.error("서버 요청 오류:", error);
    }
  };

  const detailInfoClick = (id) => {
    if (id !== null) {
      navigate(`/building/${id}`, { state: { id, Token } });
    }
  };

  return (
    <MapContent>
        <MapHeader>
            <MapMenu to="category">
              <FontAwesomeIcon
                  icon="bars"
                  style={{ fontSize: '1.6em' }} />
            </MapMenu>
            <MapTitle>지도</MapTitle>
        </MapHeader>
        <GoogleMap
            ref={ref}
            id="map"
            style={{ width: "100%", height: "100vh"}}
        ></GoogleMap>
        {showInfo ? (
          <MarkerInfo>
            <InfoContent>
              <InfoPic alt="Img" src={buildingInfo ? buildingInfo.imageURL : InfoPicImg}>
              </InfoPic>
              <InfoWord>
                <InfoTitle>
                  {buildingInfo ? buildingInfo.name : '건물명'}
                </InfoTitle>
                <InfoTime>
                  이용 가능 시간
                </InfoTime>
                <InfoDetilTime>
                  {buildingInfo ? buildingInfo.hours[0].openingTime : '오픈시간'} ~ {buildingInfo ? buildingInfo.hours[0].closingTime : '클로즈시간'} <br />
                </InfoDetilTime>
              </InfoWord>
            </InfoContent>
            <InfoButton>
              <InfoDetail id={infoId} onClick={() => detailInfoClick(infoId)}>상세정보</InfoDetail>
            </InfoButton>
          </MarkerInfo>
        ) : (
          <MapNotice>마커 클릭시 건물 정보를 확인할 수 있습니다.</MapNotice>
        )}
    </MapContent>
  );
}

export default Map;