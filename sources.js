var externalData = {
    sources: {
        landsat: {
            tiles: [
                "http://localhost:8000/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x?url=/app/data/landsat.tiff&bidx=1&expression=b1&colormap_name=coolwarm"
            ],
            type: "raster",
            tileSize: 256,
            maxzoom: 12
        },
        harvey: {
            tiles: [
                "http://localhost:8000/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x?url=/app/data/harvey.tiff&bidx=1&expression=b1&colormap_name=coolwarm"
            ],
            type: "raster"
        },
        libya: {
            tiles: [
                "http://localhost:8000/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x?url=/app/data/libya.tiff&bidx=1&expression=b1&colormap_name=coolwarm"
            ],
            type: "raster"
        }
    },
    layers: [
        {
            "id": "landsat-tiles",
            "type": "raster",
            "source": "landsat",
            "minzoom": 7,
            "maxzoom": 12,
            "paint": {
                "raster-opacity": 0.7
            }
        },
        {
            "id": "harvey-tiles",
            "type": "raster",
            "source": "harvey",
            "minzoom": 10,
            "maxzoom": 15,
            "paint": {
                "raster-opacity": 0.7
            }
        },
        {
            "id": "libya-tiles",
            "type": "raster",
            "source": "libya",
            "minzoom": 12,
            "maxzoom": 19,
            "paint": {
                "raster-opacity": 0.7
            }
        }
    ]
};