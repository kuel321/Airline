export class Utility {
     objToQueryString(obj) { 
        const keyValuePairs = [];
        for (const key in obj) {
          keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return '?' + keyValuePairs.join('&'); 
    };
     formatFetch(url, obj)
    {
        if( obj == null)
        {
            return url;
        }
        return url + this.objToQueryString(obj);
    };
   
}