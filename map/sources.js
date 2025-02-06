var externalData = {
    sources: [

        {
            name: "landsat",
            // local stored COG tiles served by titiler
            tiles: [
                "http://localhost:8000/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x?url=/app/data/landsat.tiff&bidx=1&expression=b1&colormap_name=coolwarm"
            ],
            type: "raster",
            tileSize: 256,
            maxzoom: 12
        },

        {
            name: "harvey",
            // local stored COG tiles served by titiler
            tiles: [
                "http://localhost:8000/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x?url=/app/data/harvey.tiff&bidx=1&expression=b1&colormap_name=coolwarm"
            ],
            type: "raster"
        },
        
        {
            name: "libya", 
            // local stored COG tiles served by titiler
            tiles: [
                "http://localhost:8000/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x?url=/app/data/libya.tiff&bidx=1&expression=b1&colormap_name=coolwarm"
            ],
            type: "raster"
        }
    ],


    layers: [
        // Layers accessed via titiler
        {
            id: "landsat-tiles",
            type: "raster",
            source: "landsat",
            minzoom: 7,
            maxzoom: 12,
            paint: {
                "raster-opacity": 0.7  // The property name still requires quotes if it contains a hyphen
            }
        },
        {
            id: "harvey-tiles",
            type: "raster",
            source: "harvey",
            minzoom: 10,
            maxzoom: 15,
            paint: {
                "raster-opacity": 0.7  // Same here
            }
        },
        {
            id: "libya-tiles",
            type: "raster",
            source: "libya",
            minzoom: 12,
            maxzoom: 19,
            paint: {
                "raster-opacity": 0.7  // Same here
            }
        }    
    ]
};