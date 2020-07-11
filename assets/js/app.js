// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.scss";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
import socket from "./socket";
//
import "phoenix_html";

let chatChannel;

let userList = document.getElementById("user-list");
let btnJoin = document.getElementById("btn-join-game");
let gameIdField = document.getElementById("game-id");
let nameField = document.getElementById("name");

let handleShoutChannel = (payload) => {
  let li = document.createElement("li");
  li.innerHTML = "<b>" + payload.name + "</b> " + "has joined";
  userList.appendChild(li);
};

btnJoin.onclick = () => {
  chatChannel = socket.channel("chat:" + gameIdField.value, {});
  chatChannel.on("shout", handleShoutChannel);
  chatChannel
    .join()
    .receive("ok", (resp) => {
      console.log("Joined successfully", resp);
    })
    .receive("error", (resp) => {
      console.log("Unable to join", resp);
    });
  chatChannel.push("shout", {
    name: nameField.value,
  });
};
