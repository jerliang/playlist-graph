import axios from "axios";
import React, { useEffect, useState } from "react";
import Playlist from "./Playlist";

function GetPlaylists() {

    const [token, setToken] = useState("");
    const [data, setData] = useState({});

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setToken(localStorage.getItem("accessToken"));
        }
    }, []);

    const handleGetPlaylists = () => {
        axios.get('https://api.spotify.com/v1/me/playlists', {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div>
            <button key='getPlaylists' onClick={handleGetPlaylists}>Get Playlists</button>
            <div key='playlists' id="playlists">
            {data?.items ? data.items.map((item) => 
                <Playlist key={item.name} item={item}/>
            ) : null}
            </div>
        </div>
    );
};

export default GetPlaylists;