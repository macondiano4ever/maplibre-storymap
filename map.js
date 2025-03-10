var initLoad = true;
var layerTypes = {
    'fill': ['fill-opacity'],
    'line': ['line-opacity'],
    'circle': ['circle-opacity', 'circle-stroke-opacity'],
    'symbol': ['icon-opacity', 'text-opacity'],
    'raster': ['raster-opacity'],
    'fill-extrusion': ['fill-extrusion-opacity'],
    'heatmap': ['heatmap-opacity']
};

var alignments = {
    'left': 'lefty',
    'center': 'centered',
    'right': 'righty',
    'full': 'fully'
};

function getLayerPaintType(layer) {
    var layerType = map.getLayer(layer).type;
    return layerTypes[layerType];
}

function setLayerOpacity(layer) {
    var paintProps = getLayerPaintType(layer.layer);
    paintProps.forEach(function (prop) {
        var options = {};
        if (layer.duration) {
            var transitionProp = prop + "-transition";
            options = { "duration": layer.duration };
            map.setPaintProperty(layer.layer, transitionProp, options);
        }
        map.setPaintProperty(layer.layer, prop, layer.opacity, options);
    });
}

// add navigation control for interactive chapters
const navigation = new maplibregl.NavigationControl();

if (config.use3dTerrain) {
    map.addControl(
        new maplibregl.TerrainControl({
            source: 'terrainSource',
            exaggeration: 1
        })
    );
}

// add custom hover popups for interactive chapters
const popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
});

const popupHover = (e) => {
    map.getCanvas().style.cursor = 'pointer';
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.Community_;
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
};

const popupHoverAway = () => {
    popup.remove();
    map.getCanvas().style.cursor = 'default';
};

const turnPopupsOn = (layer) => {
    map.on('mouseenter', layer, popupHover);
    map.on('mouseleave', layer, popupHoverAway);
};

const turnPopupsOff = (layer) => {
    map.off('mouseenter', layer, popupHover);
    map.off('mouseleave', layer, popupHoverAway);
};

var story = document.getElementById('story');
var features = document.createElement('div');
features.setAttribute('id', 'features');

var header = document.createElement('div');

if (config.title) {
    var titleText = document.createElement('h1');
    titleText.innerText = config.title;
    header.appendChild(titleText);
}

// add logo if found in config
if (config.logo) {
    var image = new Image();
    image.src = config.logo;
    header.appendChild(image);
}

if (config.subtitle) {
    var subtitleText = document.createElement('h2');
    subtitleText.innerText = config.subtitle;
    header.appendChild(subtitleText);
}

if (config.byline) {
    var bylineText = document.createElement('p');
    bylineText.innerText = config.byline;
    header.appendChild(bylineText);
}

if (header.innerText.length > 0) {
    header.classList.add(config.theme);
    header.setAttribute('id', 'header');
    story.appendChild(header);
}

config.chapters.forEach((record, idx) => {
    var container = document.createElement('div');
    var chapter = document.createElement('div');

    if (record.title) {
        var title = document.createElement('h3');
        title.innerText = record.title;
        chapter.appendChild(title);
    }

    if (record.image) {
        var image = new Image();
        image.src = record.image;
        chapter.appendChild(image);
    }

    // add image caption to chapters if found in config
    if (record.caption) {
        caption = document.createElement('p');
        caption.setAttribute("class", "caption");
        caption.innerHTML = `<em>${record.caption}</em>`;
        chapter.appendChild(caption);
    }

    if (record.description) {
        var story = document.createElement('p');
        story.innerHTML = record.description;
        chapter.appendChild(story);

        // add author to chapters if found in config
        if (record.author) {
            author = document.createElement('p');
            author.innerHTML = '<strong>By ' + record.author + '</strong>';
            chapter.appendChild(author);
        }

        // add website to chapters if found in config
        if (record.website) {
            var website = document.createElement('p');
            website.innerHTML = `» ${record.website}`;
            chapter.appendChild(website);
        }

        // add return to top link to each chapter
        if (config.chapterReturn) {
            var returnTop = document.createElement('p');
            returnTop.setAttribute("class", "returntop");
            returnTop.innerHTML = '<a href="#header">Back to top</a>';
            chapter.appendChild(returnTop);
        }
    }

    // add legend to chapters if found in config
    if (record.legend) {
        var legend = document.createElement('div');
        legend.setAttribute("class", "legend");
        legend.setAttribute("id", (record.id + "Legend"));
        legend.innerHTML = '<div>' + record.legend + '</div>';
        document.body.append(legend);
    }

    container.setAttribute('id', record.id);
    container.classList.add('step');
    if (idx === 0) {
        container.classList.add('active');
    }

    chapter.classList.add(config.theme);
    container.appendChild(chapter);
    container.classList.add(alignments[record.alignment] || 'centered');
    if (record.hidden) {
        container.classList.add('hidden');
    }
    features.appendChild(container);
});

story.appendChild(features);

var footer = document.createElement('div');

// add bookmarks for chapters with title, append to header and footer
if (config.bookmarks) {
    var bookmarksText = "<strong>Bookmarks</strong>: ";
    for (i = 0; i < config.chapters.length; i++) {
        if (config.chapters[i].title) {
            bookmarksText += `<a href=#${config.chapters[i].id}>${config.chapters[i].title}</a>`;
            if (i != config.chapters.length - 1) {
                bookmarksText += " | ";
            }
        }
    }
    var headerBookmarks = document.createElement('h5');
    headerBookmarks.innerHTML = bookmarksText;
    header.appendChild(headerBookmarks);
    var footerBookmarks = document.createElement('p');
    footerBookmarks.innerHTML = bookmarksText;
    footer.appendChild(footerBookmarks);
}

// add prefix content for mobile view
if (config.mobileview) {
    var mobileText = document.createElement('p');
    mobileText.innerHTML = config.mobileview;
    header.appendChild(mobileText);
}

if (config.footer) {
    var footerText = document.createElement('p');
    footerText.innerHTML = config.footer;
    footer.appendChild(footerText);
}

if (footer.innerText.length > 0) {
    footer.classList.add(config.theme);
    footer.setAttribute('id', 'footer');
    story.appendChild(footer);
}

var map = new maplibregl.Map({
    container: 'map',
    style: config.style,
    center: config.chapters[0].location.center,
    zoom: config.chapters[0].location.zoom,
    bearing: config.chapters[0].location.bearing,
    pitch: config.chapters[0].location.pitch,
    // make storymap partially interactive
    interactive: true,
    dragPan: false,
    dragRotate: false,
    doubleClickZoom: false,
    scrollZoom: false,
    touchZoomRotate: false,
    maplibreLogo: true
});

// Create a inset map if enabled in config.js
if (config.inset && !config.legend) {
    var insetMap = new maplibregl.Map({
        container: 'mapInset', // container id
        style: config.style, // hosted style id
        center: config.chapters[0].location.center,
        // Hardcode above center value if you want insetMap to be static.
        zoom: 3, // starting zoom
        hash: false,
        interactive: false,
        attributionControl: false,
    });
}

if (config.showMarkers) {
    var marker = new maplibregl.Marker({ color: config.markerColor });
    marker.setLngLat(config.chapters[0].location.center).addTo(map);
}

// instantiate the scrollama
var scroller = scrollama();                  

map.on("load", function () {
    // Load 3D terrain if applicable
    if (config.use3dTerrain) {
        map.addSource('terrainSource', {
            'type': 'raster-dem',
            'url': 'map/terrain-tiles/tiles.json',
            tileSize: 256
        });
        map.setTerrain({ 'source': 'terrainSource', 'exaggeration': 1 });
    }

    // Add custom sources and layers from sources.js
    if (config.useCustomLayers) {
        // Adding sources from externalData.sources directly
        externalData.sources.forEach(source => {
            map.addSource(source.name, source);  // `source.name` will be the key (or source ID)
        });

        // Adding layers from externalData.layers
        externalData.layers.forEach(layer => {
            map.addLayer(layer);  // Add each layer to the map
        });
    }

    // As the map moves, grab and update bounds in inset map.
    if (config.inset && !config.legend) {
        map.on('move', getInsetBounds);
    }

    // Setup the scrollama instance, pass callback functions
    scroller
        .setup({
            step: '.step',
            offset: 1.0,
            progress: false
        })
        .onStepEnter(async response => {
            var chapter = config.chapters.find(chap => chap.id === response.element.id);

            // Add legend to each chapter
            if (config.legend && !config.inset) {
                for (i = 0; i < config.chapters.length; i++) {
                    if (config.chapters[i].legend != undefined) {
                        if (config.chapters[i].id == response.element.id) {
                            document.getElementById(config.chapters[i].id + "Legend").style.display = "block";
                        } else {
                            document.getElementById(config.chapters[i].id + "Legend").style.display = "none";
                        }
                    }
                };
            }

            response.element.classList.add('active');
            map[chapter.mapAnimation || 'flyTo'](chapter.location);

            // Handle inset map
            // Incase you do not want to have a dynamic inset map,
            // rather want to keep it a static view but still change the
            // bbox as main map move: comment out the below if section.
            // TODO: Make configurable
            if (config.inset && !config.legend) {
                if (chapter.location.zoom < 5) {
                    insetMap.flyTo({ center: chapter.location.center, zoom: 0 });
                }
                else {
                    insetMap.flyTo({ center: chapter.location.center, zoom: 3 });
                }
            }

            if (config.showMarkers) {
                marker.setLngLat(chapter.location.center);
            }

            if (chapter.onChapterEnter.length > 0) {
                chapter.onChapterEnter.forEach(setLayerOpacity);
            }

            // set interactive properties for chapters set as mapInteractive = true
            if (chapter.mapInteractive) {
                map.addControl(navigation, 'top-left');
                map.dragPan.enable();
                map.doubleClickZoom.enable();
                map.getCanvas().style.cursor = 'grab';
            } else {
                if (map.hasControl(navigation)) {
                    map.removeControl(navigation);
                }
                map.dragPan.disable();
                map.doubleClickZoom.disable();
                map.getCanvas().style.cursor = 'default';
            }

            if (chapter.callback) {
                window[chapter.callback]();
            }

            if (chapter.rotateAnimation) {
                map.once('moveend', () => {
                    const rotateNumber = map.getBearing();
                    map.rotateTo(rotateNumber + 180, {
                        duration: 30000, easing: function (t) {
                            return t;
                        }
                    });
                });
            }

            if (chapter.spinGlobe) {
                map.once('moveend', () => {
                    const center = map.getCenter();
                    const newCenter = [center.lng + 360, center.lat];
                    map.easeTo({ center: newCenter, duration: 20000, easing: n => n });
                });
            }
        })
        .onStepExit(response => {
            var chapter = config.chapters.find(chap => chap.id === response.element.id);
            response.element.classList.remove('active');
            if (chapter.onChapterExit.length > 0) {
                chapter.onChapterExit.forEach(setLayerOpacity);
            }
        });
});

// Helper functions for insetmap
function getInsetBounds() {
    let bounds = map.getBounds();

    let boundsJson = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            bounds._sw.lng,
                            bounds._sw.lat
                        ],
                        [
                            bounds._ne.lng,
                            bounds._sw.lat
                        ],
                        [
                            bounds._ne.lng,
                            bounds._ne.lat
                        ],
                        [
                            bounds._sw.lng,
                            bounds._ne.lat
                        ],
                        [
                            bounds._sw.lng,
                            bounds._sw.lat
                        ]
                    ]
                ]
            }
        }]
    };

    if (initLoad) {
        addInsetLayer(boundsJson);
        initLoad = false;
    } else {
        updateInsetLayer(boundsJson);
    }
}

function addInsetLayer(bounds) {
    insetMap.addSource('boundsSource', {
        'type': 'geojson',
        'data': bounds
    });

    insetMap.addLayer({
        'id': 'boundsLayer',
        'type': 'fill',
        'source': 'boundsSource', // reference the data source
        'layout': {},
        'paint': {
            'fill-color': '#fff', // blue color fill
            'fill-opacity': 0.2
        }
    });

    insetMap.addLayer({
        'id': 'outlineLayer',
        'type': 'line',
        'source': 'boundsSource',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 1
        }
    });
}

function updateInsetLayer(bounds) {
    insetMap.getSource('boundsSource').setData(bounds);
}

// setup resize event
window.addEventListener('resize', scroller.resize);
