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
        },
               
        // Add Sentinel-2 imagery source and layer
        {
            name: "sentinel",
            // remote tile 
            tiles: [
                "https://titiler.xyz/cog/tiles/{z}/{x}/{y}?url=https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/TCI.tif"
            ],
            type: "raster",            
            tileSize: 256,
            minzoom: 8,
            maxzoom: 14
        },


        {
            name: "rwanda",
            type: "geojson",
            data: "https://maplibre.org/maplibre-gl-js/docs/assets/rwanda-provinces.geojson"
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
        },

        // Tiles served by a remote server
        {
            id: "sentinel",
            type: "raster",
            source: "sentinel",
            minzoom: 8,
            maxzoom: 14//,
            // paint: {
            //   "raster-opacity": 0,
            //   "raster-fade-duration": 0,
            // }
        } // Last layer        
    ]
};