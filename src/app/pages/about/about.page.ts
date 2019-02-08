import {Component, OnInit, AfterViewInit, OnDestroy, NgZone} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldHigh';

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'page-about',
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.scss']
})

export class AboutPage implements  AfterViewInit, OnDestroy {
    private chart;

    constructor(private zone: NgZone) {}

    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {

            this.chart = am4core.createFromConfig({
                'projection': 'Miller',
                'geodata': am4geodata_worldLow,
                'series': [{
                    'type': 'MapPolygonSeries',
                    'useGeodata': true,
                    'include': ['PT', 'ES', 'FR', 'DE'],
                    'mapPolygons': {
                        'tooltipText': '{name}',
                        'states': {
                            'hover': {
                                'properties': {
                                    'fill': '#367B25'
                                }
                            }
                        }
                    }
                }]
            }, 'chartdiv', am4maps.MapChart);

        });
    }

    ngOnDestroy() {
        this.zone.runOutsideAngular(() => {
            if (this.chart) {
                this.chart.dispose();
            }
        });
    }
}
