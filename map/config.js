var config = {
    // style: 'map/style.json',
    style: 'https://demotiles.maplibre.org/style.json',
    showMarkers: true,
    markerColor: '#3FB1CE',
    inset: true, // if inset map is set to true, legend will be disabled.
    legend: false, // if legend is set to true, inset will be disabled.
    theme: 'dark',
    use3dTerrain: false, //set true for enabling 3D maps. You will need to provide your own terrain tiles.
    // TODO: This option is not working !!!!
    useCustomLayers: true, //set true for enabling custom layers from sources.js
    bookmarks: true,
    chapterReturn: false,
    title: 'The Title Text of this Story',
    logo: '',
    subtitle: 'A descriptive and interesting subtitle to draw in the reader',
    byline: 'By a Digital Storyteller',
    mobileview: '<div id="rotate-mobile"><em>For optimal viewing of this storytelling map on mobile, rotate your device to a horizontal orientation.</em><br><br><img src="images/device.png">', // to add custom messaging in the header for mobile devices
    footer: 'Source: source citations, etc.<br> Created using <a href="https://github.com/digidem/maplibre-storymap" target="_blank">MapLibre Storytelling</a> template.',
    chapters: [
        {
            id: "overview",
            alignment: "left",
            hidden: false,
            title: "Overview",
            image: "",
            description:
              "This page showcases the creation of story maps using simple images stored locally or served by external resources as well as the use of Cloud Optimized GeoTIFF (COG) data",
            location: {
              center: [10, 60],
              zoom: 2,
              pitch: 0,
              bearing: 0,
            },
            mapAnimation: "flyTo",
            rotateAnimation: false,
            callback: "",
            onChapterEnter: [],
            onChapterExit: [],
        },
        {
            id: 'start-chapter-id',
            alignment: 'right',
            hidden: false,
            title: 'Just a picture of the northern light served locally',
            image: './map/images/norway.avif',
            description: 'Northern light in Norway',
            location: {                
                center: [18.9551, 69.6489],
                zoom: 6,
                pitch: 0,
                bearing: 0

            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            mapInteractive: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'countries-fill',
                    opacity: 0.9
                }
            ],
            onChapterExit: []
        },           

        {
            id: 'landsat-chapter-id',
            alignment: 'left',
            hidden: false,
            title: 'Landsat Imagery',
            image: './map/images/Landsat.jpg',
            description: 'The Landsat program is the longest-running enterprise for acquisition of satellite imagery of Earth',
            location: {                
                center: [-123.62974143772152, 37.46696993277803],
                zoom: 7,
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
        },            

        {
            id: 'landsat-chapter-id1',
            alignment: 'right',
            hidden: false,
            title: 'Another Landsat Image',
            image: './map/images/Landsat2.webp',
            description: 'This time the layer is zoomed in.',
            location: {                
                center: [-123.62974143772152, 37.46696993277803],
                zoom: 10,
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
        },   

        {
            id: 'harvey-chapter-id',
            alignment: 'left',
            hidden: false,
            title: 'Harvey Hurricane',
            image: './map/images/Harvey.jpg',
            description: 'With peak accumulations of 60.58 in (1,539 mm), in Nederland, Texas, Harvey was the wettest tropical cyclone on record in the United States. ',
            location: {
                // Harvet hurricane
                center: [-95.91106892560003, 29.567523145619013],
                zoom: 10,
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
                //     // opacity: 1,
                //     // duration: 300
                // }
            ],
            onChapterExit: []
        },   
        {
            id: 'libya-chapter-id',
            alignment: 'right',
            hidden: false,
            title: 'Libya',
            image: './map/images/Libya.jpg',
            description: 'The United States supports an immediate end to Libya’s ongoing conflict through mediation efforts under the United Nations Support Mission in Libya',
            caption: 'Source image caption',
            website: '<a href="" target="_blank">Website</a>',
            author: 'Digital Storyteller',
            legend: '<span style="font-size: 0.85em;"><em>Legend content</em></span>',
            location: {                
                center: [22.628278391361995, 32.774842775326846],
                zoom: 12,                
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            spinGlobe: true,
            mapInteractive: true,
            callback: '',
            onChapterEnter: [
                // {
                //     layer: 'layer-name',
                //     opacity: 1,
                //     duration: 5000
                // }
                // {
                //      layer: 'countries-fill',
                //      opacity: 1
                // }
            ],
            onChapterExit: [
                // {
                //     layer: 'layer-name',
                //     opacity: 0
                // }
            ]
        },
                
        {
          id: "conclusion",
          alignment: "left",
          hidden: false,
          title: "Conclusion",
          image: "",
          description:
            "Cloud Optimized GeoTIFFs provide an efficient way to serve and visualize large geospatial datasets, as demonstrated by these elevation and imagery examples.",
          location: {
            center: [-98.5795, 39.8283],
            zoom: 3,
            pitch: 0,
            bearing: 0,
          },
          mapAnimation: "flyTo",
          rotateAnimation: false,
          callback: "",
          onChapterEnter: [],
          onChapterExit: [],
        }
    ]
};