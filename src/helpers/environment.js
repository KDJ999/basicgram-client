let APIURL = "";
switch (window.location.hostname) {
  case "localhost" || "127.0.0.1":
    APIURL = "http://localhost:4000";
    break;
  case "kdj-basicgram-client":
    APIURL = "https://kdj-basicgram-server.herokuapp.com";
    break;
  default:
    APIURL = null;
}
export default APIURL;
