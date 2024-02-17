import React, { useEffect } from 'react';

const KakaoMap = ({latitude, longitude}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=b808e3df6d2c1f8fc3352b318fd6902e&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('kakao-map');
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3, 
        };
        const map = new window.kakao.maps.Map(container, options);

        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(latitude, longitude),
          map: map,
        });
        marker.setMap(map);
        map.setCenter(marker.getPosition());
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [latitude, longitude]);

  return <div id="kakao-map" style={{ width: '400px', height: '200px', margin: '0 auto' }} />;
};

export default KakaoMap;