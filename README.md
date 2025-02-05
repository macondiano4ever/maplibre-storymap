# Interactive Storytelling with MapLibre

Some stories are best told with a map. Data journalists or scientists covering changing conditions in a population's demographics, the environment, an international conflict, or telling a simple travel story frequently provide geographic context in their graphics.

This template is designed to accelerate building out a "scrollytelling" map story. The primary input is a story broken into sections (chapters), each hooked to a particular view of a map.

This template is based on Mapbox's storytelling template but has been customized to work with MapLibre instead. The template can be self-hosted with your own tiles, online or offline, either as static HTML or using Node. To work with gzipped vector tiles, you will need to use Node.

## Prerequisites

No coding experience is required. 

To include some custom map layers, make yourself familiar with the [MapLibre style specifications](https://maplibre.org/maplibre-gl-js-docs/style-spec/), or use [MapTiler](https://www.maptiler.com/) or [Maputnik](https://github.com/maputnik) to design your own style.

The template does not rely on any particular CSS framework or fonts. There are some basic styles in the head of the HTML file that can be changed, so feel free to adapt and add to these to match your site and story brand. You can place your own image assets in the `images/` directory.

## Getting Started

Download this repository as a ZIP file using the button above, and unzip it. If you are using git, clone this repository.

Move to the `map` directory. Make a copy of `config.js` and `sources.js` and name them to`config_backup.js` and `sources_backup.js`. Open `config.js` and `sources.js` and modify them according to your needs.

### Steps

1. **Prepare your map tiles and design a MapLibre style**. This template comes configured with a default template (see`style: 'https://demotiles.maplibre.org/style.json'` in `map/config.js` but it can be overrided by replacing the style url with the path `map/style.json`. You could also place all of your map assets (tiles, sprites, font glyphs) under the `map` directory. You could change this, however. 

   * To test out the template, you could use the [MapLibre demo tiles](https://github.com/maplibre/demotiles). Download the repo and place it in this directory, and change the paths for fonts, sprites, and sources to your hosting path.

2. **Set the configuration options** as described in the next section. Add as many chapters in your template as needed. You'll need a `,` between each section, but no comma at the end. 

```javascript
{
    id: 'start-chapter-id0',
    alignment: 'left',
    hidden: false,
    title: 'Landsat Imagery',
    image: './map/images/norway.avif',
    description: 'Northern light in Norway',
    location: {                
        center: [10, 60],
        zoom: 2,
        pitch: 0,
        bearing: 0

    },
    mapAnimation: 'flyTo',
    rotateAnimation: false,
    mapInteractive: false,
    callback: '',
    onChapterEnter: [
        // {
        //     // layer: 'countries-fill',
        //     // opacity: 0
        // }
    ],
    onChapterExit: []
}
```

3. **Fill out your sections as needed.** Give each section a unique name in the `section id` property. This will become the HTML div id, so avoid spaces in the name. Set the location properties for each chapter. The title and description properties are optional. The description supports HTML tags. If you have an image that goes with that section of the story, add the path to the image in the `image` property.

### Configuration Options

Please see [CONFIG.md](CONFIG.md).

## Deployment

Host the files in this repository in the same directory. You can either deploy this tool as static HTML, or as a server using Node and Express.js.

For both options, you have to set absolute paths in your `style.json` for the sources, sprites, and font glyphs. 

### As Static HTML

This template will work as static HTML when hosted on a web-accessible location. Simply place the `dist/`, `images/`, `map/` (if you are hosting your own map and tiles), `config.js`, `index.html`, and `sources.js` (if you are using it) in the same directory. Accessing that directory in a browser should load the story map.

For hosting online, if you don't know where to start, look into GitHub Pages or Netlify.

### Using Node.js

You can deploy this template as a server using Node. 

First, make sure you have Node and npm (Node Package Manager) installed.

Next, in the directory, run `npm install` to set up your node packages. You can also run `npm run build` to bundle your scripts. (The repo comes with a pre-compiled `bundle.js` file, but this guarantees you bundle the latest versions of MapLibre etc.)

To initialize the server, run `npm run serve`. The default port is `5000`; if you want to change the port, run `npm run serve -- <port_number>`, replacing `<port_number>` with your desired port number. For example, to use port `8080`, you would run `npm run serve -- 8080`.

We are using Express.js to initialize the server and to handle gzipped vector tiles (with file extension `.vector.pbf`).

## Built with

- MapLibre GL JS
- Scrollama.js

## Storytelling with Maps using MapLibre Workshop

[@fmvaldezg](https://github.com/fmvaldezg) from Temple University Libraries created a [Storytelling with Maps using MapLibre Workshop](https://github.com/fmvaldezg/storytelling_maplibre_workshop), which could be helpful for learning how to use this template.

## Acknowledgment

This template is based on [Mapbox's Storytelling Template](https://github.com/mapbox/storytelling), which works great with maps designed in their Studio tool but requires a Mapbox access token.

---

### Custom Layers with External Data

In this template, you can incorporate custom raster layers by modifying the `externalData` variable. Here's an example of how you can define external data sources:

```js
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
            id: "landsat-tiles",
            type: "raster",
            source: "landsat",
            minzoom: 7,
            maxzoom: 12,
            paint: {
                "raster-opacity": 0.7
            }
        },
        {
            id: "harvey-tiles",
            type: "raster",
            source: "harvey",
            minzoom: 10,
            maxzoom: 15,
            paint: {
                "raster-opacity": 0.7
            }
        },
        {
            id: "libya-tiles",
            type: "raster",
            source: "libya",
            minzoom: 12,
            maxzoom: 19,
            paint: {
                "raster-opacity": 0.7
            }
        }
    ]
};
```

This will define raster tile layers for Landsat, Harvey, and Libya images. Each layer can be associated with different zoom levels and opacity.

### Using the Custom Layers in the Map

To enable the use of these custom layers, modify the `config.js`:

```js
var config = {
    style: 'https://demotiles.maplibre.org/style.json',
    useCustomLayers: true, // Set to true to enable custom layers from externalData
    showMarkers: true,
    markerColor: '#3FB1CE',
    inset: true,
    legend: false,
    theme: 'dark',
    use3dTerrain: false,
    bookmarks: true,
    chapterReturn: false,
    title: 'The Title Text of this Story',
    logo: '',
    subtitle: 'A descriptive and interesting subtitle to draw in the reader',
    byline: 'By a Digital Storyteller',
    footer: 'Source: source citations, etc.<br> Created using <a href="https://github.com/digidem/maplibre-storymap" target="_blank">MapLibre Storytelling</a> template.',
    chapters: [
        {
            id: 'landsat-chapter-id0',
            title: 'Landsat Imagery',
            location: {                
                center: [-123.62974143772152, 37.46696993277803],
                zoom: 7,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            mapInteractive: false
        },
        {
            id: 'harvey-chapter-id',
            title: 'Harvey Hurricane',
            location: {
                center: [-95.91106892560003, 29.567523145619013],
                zoom: 10,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            mapInteractive: false
        },
        {
            id: 'libya-chapter-id',
            title: 'Libya Conflict',
            location: {
                center: [22.628278391361995, 32.774842775326846],
                zoom: 12,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            mapInteractive: true
        }
    ]
};
```

With `useCustomLayers: true`, the `externalData` layers configured in `sources.js` will be used in the map view as specified. You can modify the chapters and layer visibility accordingly.