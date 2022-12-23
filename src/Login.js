import React, { useEffect } from "react";

const SPOTIFY_AUTH = 'https://accounts.spotify.com/authorize'
const CLIENT_ID = '733af5e266ba4f979a3efe3935eb9a4e';
const REDIRECT_URI = 'http://localhost:3000/'
const SCOPES = ['playlist-read-private', 'playlist-read-collaborative'];

const getTokens = (hash) => {
    const tokenString = hash.substring(1);
    const tokens = tokenString.split('&');
    const tokenData = tokens.reduce((accumulator, currentValue) => {
        const [key, value] = currentValue.split('=');
        accumulator[key] = value;
        return accumulator;
    }, {});
    return tokenData;
};

function Login() {

    useEffect(() => {
        if (window.location.hash) {
            const {access_token, token_type, expires_in} = getTokens(window.location.hash);
            localStorage.clear();
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("tokenType", token_type);
            localStorage.setItem("expiresIn", expires_in);
        }
    });

    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTH}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join('%20')}&response_type=token&show_dialog=true`;
    };

    return (
        <button onClick={handleLogin}>Log in to Spotify</button>
    );
};

export default Login;