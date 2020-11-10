function mungeMovie(movie) {
    return {
        name: movie.original_title,
        description: movie.overview,
        genre1: movie.genres[0].name,
        genre2: movie.genres[1] ? movie.genres[1].name : 'N/A',
        dir_name: Math.random() > .5 ? 'Steven Spielberg' : 'Rob Reiner'
    }; 
}

function mungeLocation(location) {
    return {
        formatted_query: location[0].display_name,
        latitude: location[0].lat,
        longitude: location[0].lon
    }; 
}

function mungeWeather(weather) {
    
    return weather.data.map(item=> {
        return {
            forecast: weather.data[0].weather.description,
            time: weather.data[0].datetime
        };
    }).slice(0,8);
}


module.exports = { mungeMovie, mungeLocation, mungeWeather };