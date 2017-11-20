requirejs.config({
    baseUrl: 'js',
    shim : {
        bootstrap : {
            deps : [ 'jquery']
        },
        highchartsExporting : {
            deps : [ 'highcharts']
        },
        highchartsMore : {
            deps : [ 'highcharts']
        },
        highchartsDrilldown : {
            deps : [ 'highcharts']
        },
        highchartsWordCloud : {
            deps : [ 'highcharts']
        },
        "datatables.net" : {
            deps : [ 'jquery']
        },
        dataTableBootstrap : {
            deps : [ 'datatables.net']
        },
        dataTableColVis : {
            deps : [ 'datatables.net-buttons']
        },
    },
    paths: {
        app: 'app',
        // Vendors
        jquery: 'vendor/jquery-3.2.1.min',
        bootstrap: 'vendor/boostrap.min',
        bibtex: 'vendor/bibtex-0.1.2',
        highcharts: 'vendor/highcharts',
        highchartsExporting: 'vendor/highcharts-exporting',
        highchartsMore: 'vendor/highcharts-more',
        highchartsDrilldown: 'vendor/highcharts-drilldown',
        highchartsWordCloud: 'vendor/highcharts-wordcloud',
        d3js: 'vendor/d3.v3.min',
        d3jsv4: 'vendor/d3.v4.min',
        "datatables.net": 'vendor/jquery.dataTables.min',
        dataTableBootstrap: 'vendor/dataTables.bootstrap.min',
        "datatables.net-buttons": 'vendor/dataTables.buttons.min',
        dataTableColVis: 'vendor/buttons.colVis.min',
        publications: 'vendor/publications',
        // Plugins
        parse: 'app/plugins/parse',
        publicationsByAuthor: 'app/plugins/chart-publications-by-author',
        publicationsByUniversity: 'app/plugins/chart-publications-by-university',
        publicationsByYear: 'app/plugins/chart-publications-by-year',
        publicationsByApplication: 'app/plugins/chart-publications-by-application',
        publicationsByAlgorithm: 'app/plugins/chart-publications-by-algorithm',
        dynamicPieChart: 'app/plugins/chart-dynamic-pie-chart',
        dynamicBubbleChart: 'app/plugins/chart-dynamic-bubble-chart',
        universityCollaborationNetwork: 'app/plugins/chart-collaboration-network-for-university',
        researchCollaborationNetwork: 'app/plugins/chart-collaboration-network-for-researcher',
        listOfPublications: 'app/plugins/chart-list-of-publications',
        wordCloudTitle: 'app/plugins/chart-word-cloud-title',
        wordCloudAbstract: 'app/plugins/chart-word-cloud-abstract',
        find: 'app/plugins/array-find',
        sortBy: 'app/plugins/array-sort-by',
        returnJust: 'app/plugins/array-return-just',
        split: 'app/plugins/array-split',
        unique: 'app/plugins/array-unique',
        insertUpdate: 'app/plugins/array-insert-update',
        plotVerticalColumns: 'app/plugins/highcharts-vertical-columns',
        plotHorizontalColumns: 'app/plugins/highcharts-horizontal-columns',
        plotPie: 'app/plugins/highcharts-pie',
        plotBubbleChart: 'app/plugins/highcharts-bubble-chart',
        plotWordCloud: 'app/plugins/highcharts-word-cloud',
        hierarchicalEdgeBundling: 'app/plugins/d3js-hierarchical-edge-bundling',
        forceDirectedGraph: 'app/plugins/d3js-force-directed-graph',

        utilUniversity: 'app/plugins/util-university',
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main']);
