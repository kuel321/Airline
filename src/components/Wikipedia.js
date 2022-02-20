import axios from "axios";

var wikipedia = axios.create({
  baseURL: "https://en.wikipedia.org/api/rest_v1/page/summary/",
  params: {
    
   
    origin: "*"
   
  }
});
export default wikipedia;

//.https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&titles=Pet_door&formatversion=2&rvprop=content&rvslots=*