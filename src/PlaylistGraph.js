import { playlistData } from "./Playlist";
import Graph from "graphology";
import Sigma from "sigma";

function getGraphData() {
    let graphData = {};
    for (let i = 0; i < playlistData.items.length; i++) {
        for (let j = 0; j < playlistData.items[i].track.artists.length; j++) {
            if (!(playlistData.items[i].track.artists[j].name in graphData)) {
                graphData[playlistData.items[i].track.artists[j].name] = {
                    "tracks": [],
                    "collabs": []
                }
            }
            if (!(graphData[playlistData.items[i].track.artists[j].name]["tracks"].includes(playlistData.items[i].track.name))) {
                graphData[playlistData.items[i].track.artists[j].name]["tracks"].push(playlistData.items[i].track.name);
            }
            for (let k = 0; k < playlistData.items[i].track.artists.length; k++) {
                if (!(graphData[playlistData.items[i].track.artists[j].name]["collabs"].includes(playlistData.items[i].track.artists[k].name))) {
                    if (playlistData.items[i].track.artists[k].name !== playlistData.items[i].track.artists[j].name) {
                        graphData[playlistData.items[i].track.artists[j].name]["collabs"].push(playlistData.items[i].track.artists[k].name);
                    }
                }
            }
        }
    }
    return graphData;
}

function getEdges(graphData) {
    let edges = [];
    for (let i = 0; i < Object.keys(graphData).length; i++) {
        for (let j = 0; j < graphData[Object.keys(graphData)[i]]["collabs"].length; j++) {
            edges.push([Object.keys(graphData)[i], graphData[Object.keys(graphData)[i]]["collabs"][j]]);
        }
    }
    return edges;
}

function getRandomPos() {
    const containerWidth = document.getElementById("playlists").clientWidth;
    const containerHeight = document.getElementById("playlists").clientHeight;

    return [Math.floor(Math.random() * containerWidth), Math.floor(Math.random() * containerHeight)];
}

function getGraph() {
    const graph = new Graph();

    const graphData = getGraphData();
    const edges = getEdges(graphData);

    for (let i = 0; i < Object.keys(graphData).length; i++) {
        const [x, y] = getRandomPos();
        graph.addNode(Object.keys(graphData)[i], {x: x, y: y, size: 3, label: Object.keys(graphData)[i], color: "blue"});
    }
    for (let j = 0; j < edges.length; j++) {
        graph.addEdge(edges[j][0], edges[j][1]);
    }

    const container = document.getElementById("playlists");
    const renderer = new Sigma(graph, container)
}

export {
    getGraph
}