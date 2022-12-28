import axios from "axios";
import React, {useState, useEffect} from "react";
import { getGraph } from "./PlaylistGraph"

export let playlistData = {};

function Playlist({item}) {

    const [token, setToken] = useState("");
    const [data, setData] = useState({});
    let clicked = false;

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setToken(localStorage.getItem("accessToken"));
        }
    }, []);

    const handleClick = () => {
        if (!clicked) {
            handleClick1();
            clicked = true;
        }
        else {
            handleClick2();
        }
    }

    const handleClick2 = () => {
        /*const playlists = document.getElementById("playlists");
        playlists.innerHTML = data?.items ? (data.items.map((item) => 
            `<p key=${item.track.name}>${item.track.name}</p>
            <img src=${item.track.album.images[0].url} alt=${item.name}></img>`
        )) : null;
        playlists.innerHTML = playlists.innerHTML.replaceAll('</p>,', '');*/
        getGraph();
    };

    const handleClick1 = () => {
        axios.get(`https://api.spotify.com/v1/playlists/${item.id}/tracks`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        .then((response) => {
            setData(response.data);
            playlistData = response.data;
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div onClick={handleClick} id={item.name}>
            <p>
                {item.name}
            </p>
            <img src={item.images[0].url} alt={item.name}></img>
        </div>
    )
}

export default Playlist;