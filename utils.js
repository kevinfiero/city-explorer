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
            forecast: item.weather.description,
            time: item.datetime
        };
    }).slice(0,8);
}

function mungeTrails(trails) {
    console.log(trails)
    return trails.trails.map(item=> {
        return {
            name: item.name,
            location: item.location,
            length: item.length,
            stars: item.stars,
            star_votes: item.starVotes,
            summary: item.summary,
            trail_url: item.url,
            conditions: item.conditionDetails,
            condition_date: item.conditionDate.split(' ')[0],
            condition_time: item.conditionDate.split(' ')[1]
        };
    }).slice(0,8);
}

module.exports = { mungeMovie, mungeLocation, mungeWeather, mungeTrails };