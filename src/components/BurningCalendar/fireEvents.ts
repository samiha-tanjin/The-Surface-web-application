import type { FireEvent } from "./types"

// Generated from wildfires_event_calendar.json (all 108 events).
// startExact = the source gives an exact start day, so the fire is named on that day in the calendar.
// Otherwise startDate/endDate are only the outer bounds of the stated period (e.g. "Summer 2005").
export const fireEvents: FireEvent[] = [
  {
    "id": "cerro-grande-fire-2000",
    "name": "Cerro Grande Fire",
    "year": 2000,
    "dates": "May 4 – June 6, 2000",
    "location": "Los Alamos, New Mexico, United States",
    "pattern": "A prescribed burn set by the National Park Service in Bandelier National Monument got out of control under high winds and severe drought.",
    "impact": "Burned 43,000 acres, destroyed over 235 structures, and forced the temporary evacuation of the Los Alamos National Laboratory.",
    "startExact": true,
    "startDate": "2000-05-04",
    "endDate": "2000-06-06",
    "endExact": true,
    "timeline": [
      {
        "when": "May 4, 2000",
        "label": "Fire began"
      },
      {
        "when": "June 6, 2000",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2000-southern-california-fires-2000",
    "name": "2000 Southern California Fires",
    "year": 2000,
    "dates": "Summer – Autumn 2000",
    "location": "Southern California, United States",
    "pattern": "Driven by severe drought, high temperatures, and offshore Santa Ana wind events, causing rapid brush and chaparral ignitions.",
    "impact": "Scorched hundreds of thousands of acres across multiple counties.",
    "startExact": false,
    "startDate": "2000-06-01",
    "endDate": "2000-11-30",
    "endExact": false,
    "timeline": [
      {
        "when": "Summer 2000",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "Autumn 2000",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2001-flattery-chisholm-fire-2001",
    "name": "2001 Flattery / Chisholm Fire",
    "year": 2001,
    "dates": "May 2001",
    "location": "Alberta, Canada",
    "pattern": "Fanned by unseasonably high temperatures, dry forest fuels, and winds gusting up to 80 km/h.",
    "impact": "Destroyed one-third of the town of Chisholm and consumed over 115,000 hectares of boreal forest.",
    "startExact": false,
    "startDate": "2001-05-01",
    "endDate": "2001-05-31",
    "endExact": false,
    "timeline": [
      {
        "when": "May 2001",
        "label": "Burning period (exact dates not recorded)"
      }
    ]
  },
  {
    "id": "hayman-fire-2002",
    "name": "Hayman Fire",
    "year": 2002,
    "dates": "June 8 – July 18, 2002",
    "location": "Pike National Forest, Colorado, United States",
    "pattern": "Human-caused (illegal campfire set by a US Forest Service employee). Driven by severe drought and extreme dry conditions.",
    "impact": "Burned 137,760 acres, destroyed 133 homes, and caused 6 fatalities.",
    "startExact": true,
    "startDate": "2002-06-08",
    "endDate": "2002-07-18",
    "endExact": true,
    "timeline": [
      {
        "when": "June 8, 2002",
        "label": "Fire began"
      },
      {
        "when": "July 18, 2002",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "rodeo-chediski-fire-2002",
    "name": "Rodeo–Chediski Fire",
    "year": 2002,
    "dates": "June 18 – August 14, 2002",
    "location": "Apache-Sitgreaves National Forests and Fort Apache Indian Reservation, Arizona, United States",
    "pattern": "Two separate fires (Rodeo started by arson, Chediski by an abandoned signal fire) merged into a massive megafire driven by historic drought.",
    "impact": "Burned over 469,000 acres and destroyed 467 structures.",
    "startExact": true,
    "startDate": "2002-06-18",
    "endDate": "2002-08-14",
    "endExact": true,
    "timeline": [
      {
        "when": "June 18, 2002",
        "label": "Fire began"
      },
      {
        "when": "August 14, 2002",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "biscuit-fire-2002",
    "name": "Biscuit Fire",
    "year": 2002,
    "dates": "July 13 – November 4, 2002",
    "location": "Siskiyou National Forest, Oregon and California, United States",
    "pattern": "Merged from multiple lightning-ignited fires under extreme drought and rugged mountain terrain, fueled by heavy timber loads.",
    "impact": "Burned nearly 500,000 acres, making it one of the largest modern wildfires in Oregon history.",
    "startExact": true,
    "startDate": "2002-07-13",
    "endDate": "2002-11-04",
    "endExact": true,
    "timeline": [
      {
        "when": "July 13, 2002",
        "label": "Fire began"
      },
      {
        "when": "November 4, 2002",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2003-canberra-bushfires-black-friday-2003",
    "name": "2003 Canberra Bushfires (\"Black Friday\")",
    "year": 2003,
    "dates": "January 8 – 18, 2003",
    "location": "Australian Capital Territory, Australia",
    "pattern": "Severe drought and extreme heatwave combined with gale-force winds to drive ember storms into suburban Canberra.",
    "impact": "Destroyed nearly 500 homes, claimed 4 lives, and severely damaged Mount Stromlo Observatory.",
    "startExact": true,
    "startDate": "2003-01-08",
    "endDate": "2003-01-18",
    "endExact": true,
    "timeline": [
      {
        "when": "January 8, 2003",
        "label": "Fire began"
      },
      {
        "when": "January 18, 2003",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2003-southern-california-wildfires-cedar-fire-old-fire-2003",
    "name": "2003 Southern California Wildfires (Cedar Fire & Old Fire)",
    "year": 2003,
    "dates": "October 21 – November 4, 2003",
    "location": "San Diego, San Bernardino, and Ventura counties, California, United States",
    "pattern": "Extreme Santa Ana winds blowing across bone-dry chaparral and timber during a multi-year drought. Cedar Fire sparked by a lost hunter's signal fire.",
    "impact": "Cedar Fire burned 273,246 acres, destroyed 2,232 homes, and caused 15 fatalities. Over 750,000 acres burned statewide.",
    "startExact": true,
    "startDate": "2003-10-21",
    "endDate": "2003-11-04",
    "endExact": true,
    "timeline": [
      {
        "when": "October 21, 2003",
        "label": "Fire began"
      },
      {
        "when": "November 4, 2003",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2004-alaskan-wildfire-season-2004",
    "name": "2004 Alaskan Wildfire Season",
    "year": 2004,
    "dates": "May – August 2004",
    "location": "Alaska, United States",
    "pattern": "A barrage of dry lightning storms during a record-warm, dry summer across remote boreal taiga forests.",
    "impact": "Shattered historical records with over 6.6 million acres burned across the state.",
    "startExact": false,
    "startDate": "2004-05-01",
    "endDate": "2004-08-31",
    "endExact": false,
    "timeline": [
      {
        "when": "May 2004",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "August 2004",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2005-iberian-wildfires-portugal-spain-2005",
    "name": "2005 Iberian Wildfires (Portugal & Spain)",
    "year": 2005,
    "dates": "Summer 2005",
    "location": "Portugal and Spain",
    "pattern": "Severe European drought combined with extreme heatwaves and high winds, exacerbated by pine and eucalyptus plantations.",
    "impact": "Burned hundreds of thousands of hectares and caused multiple civilian and firefighter fatalities.",
    "startExact": false,
    "startDate": "2005-06-01",
    "endDate": "2005-08-31",
    "endExact": false,
    "timeline": [
      {
        "when": "Summer 2005",
        "label": "Burning period (exact dates not recorded)"
      }
    ]
  },
  {
    "id": "2006-great-divide-fire-complex-2006",
    "name": "2006 Great Divide Fire Complex",
    "year": 2006,
    "dates": "June 19 – September 13, 2006",
    "location": "Florida and Georgia, United States (Okefenokee Swamp)",
    "pattern": "Lightning-ignited fire spreading through peat bogs and dry swamp timber under severe southeastern drought conditions.",
    "impact": "Burned over 570,000 acres across Florida and Georgia.",
    "startExact": true,
    "startDate": "2006-06-19",
    "endDate": "2006-09-13",
    "endExact": true,
    "timeline": [
      {
        "when": "June 19, 2006",
        "label": "Fire began"
      },
      {
        "when": "September 13, 2006",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2007-greek-forest-fires-black-summer-of-greece-2007",
    "name": "2007 Greek Forest Fires (\"Black Summer\" of Greece)",
    "year": 2007,
    "dates": "June – September 2007",
    "location": "Peloponnese, Euboea, and Attica, Greece",
    "pattern": "Severe successive heatwaves (temperatures over 40°C), prolonged drought, and strong winds. Many sparked by arson.",
    "impact": "Scorched over 270,000 hectares, destroyed over 1,000 homes, and claimed 84 lives.",
    "startExact": false,
    "startDate": "2007-06-01",
    "endDate": "2007-09-30",
    "endExact": false,
    "timeline": [
      {
        "when": "June 2007",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "September 2007",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2007-southern-california-wildfires-witch-fire-malibu-fires-2007",
    "name": "2007 Southern California Wildfires (Witch Fire & Malibu Fires)",
    "year": 2007,
    "dates": "October 20 – November 9, 2007",
    "location": "San Diego, Los Angeles, and Orange counties, California, United States",
    "pattern": "Fierce Santa Ana winds (gusts over 100 mph) and severe long-term drought. Witch Fire sparked by downed power lines.",
    "impact": "Witch Fire burned nearly 198,000 acres and forced the largest evacuation in San Diego County history (over 500,000 people).",
    "startExact": true,
    "startDate": "2007-10-20",
    "endDate": "2007-11-09",
    "endExact": true,
    "timeline": [
      {
        "when": "October 20, 2007",
        "label": "Fire began"
      },
      {
        "when": "November 9, 2007",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2008-california-lightning-siege-2008",
    "name": "2008 California Lightning Siege",
    "year": 2008,
    "dates": "June 20 – August 2008",
    "location": "California, United States",
    "pattern": "An unprecedented dry lightning storm on June 20–21 ignited over 2,000 separate fires across the state amidst severe drought.",
    "impact": "Burned over 1.2 million acres and blanketed California in thick smoke for weeks.",
    "startExact": true,
    "startDate": "2008-06-20",
    "endDate": "2008-08-31",
    "endExact": false,
    "timeline": [
      {
        "when": "June 20, 2008",
        "label": "Fire began"
      },
      {
        "when": "August 2008",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2009-australian-bushfires-black-saturday-2009",
    "name": "2009 Australian Bushfires (\"Black Saturday\")",
    "year": 2009,
    "dates": "February 7 – March 14, 2009",
    "location": "Victoria, Australia",
    "pattern": "Extreme weather conditions featuring record-shattering temperatures (up to 46.4°C), single-digit humidity, and hurricane-force winds following a decade of drought. Sparked by downed power lines and arson.",
    "impact": "Australia's worst bushfire disaster, burning over 450,000 hectares, destroying 2,090 homes, and claiming 173 lives.",
    "startExact": true,
    "startDate": "2009-02-07",
    "endDate": "2009-03-14",
    "endExact": true,
    "timeline": [
      {
        "when": "February 7, 2009",
        "label": "Fire began"
      },
      {
        "when": "March 14, 2009",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2010-russian-wildfires-2010",
    "name": "2010 Russian Wildfires",
    "year": 2010,
    "dates": "July – September 2010",
    "location": "Western Russia and Siberia",
    "pattern": "An unprecedented record-breaking heatwave (temperatures exceeding 40°C) and severe drought triggering peatland and forest fires.",
    "impact": "Burned over 2.3 million hectares, killed over 50 people, and choked Moscow in toxic smog.",
    "startExact": false,
    "startDate": "2010-07-01",
    "endDate": "2010-09-30",
    "endExact": false,
    "timeline": [
      {
        "when": "July 2010",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "September 2010",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "wallow-fire-2011",
    "name": "Wallow Fire",
    "year": 2011,
    "dates": "May 29 – July 8, 2011",
    "location": "Apache-Sitgreaves National Forest, Arizona, United States",
    "pattern": "Unattended campfire left by campers in the White Mountains, driven by high winds and severe drought.",
    "impact": "Burned 538,049 acres, making it the largest wildfire in modern Arizona history at the time.",
    "startExact": true,
    "startDate": "2011-05-29",
    "endDate": "2011-07-08",
    "endExact": true,
    "timeline": [
      {
        "when": "May 29, 2011",
        "label": "Fire began"
      },
      {
        "when": "July 8, 2011",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2011-texas-wildfire-season-bastrop-county-complex-fire-2011",
    "name": "2011 Texas Wildfire Season (Bastrop County Complex Fire)",
    "year": 2011,
    "dates": "September 4 – 24, 2011",
    "location": "Bastrop County and statewide, Texas, United States",
    "pattern": "Historic La Niña drought combined with tropical storm winds (Tropical Storm Lee) driving fire through dense pine and oak timber.",
    "impact": "Bastrop County Complex Fire destroyed 1,691 homes (the most destructive in Texas history at the time) and burned 32,400 acres. Over 4 million acres burned statewide in 2011.",
    "startExact": true,
    "startDate": "2011-09-04",
    "endDate": "2011-09-24",
    "endExact": true,
    "timeline": [
      {
        "when": "September 4, 2011",
        "label": "Fire began"
      },
      {
        "when": "September 24, 2011",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2012-colorado-wildfires-high-park-waldo-canyon-2012",
    "name": "2012 Colorado Wildfires (High Park & Waldo Canyon)",
    "year": 2012,
    "dates": "March – November 2012",
    "location": "Colorado, United States",
    "pattern": "Persistent drought, extreme heatwaves, exceptionally low humidity, and erratic gusty winds. High Park sparked by lightning; Waldo Canyon by human activity.",
    "impact": "High Park burned 87,284 acres and 259 homes; Waldo Canyon destroyed 347 homes in Colorado Springs.",
    "startExact": false,
    "startDate": "2012-03-01",
    "endDate": "2012-11-30",
    "endExact": false,
    "timeline": [
      {
        "when": "March 2012",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "November 2012",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "waddell-2012-california-wildfires-rush-fire-2012",
    "name": "Waddell / 2012 California Wildfires (Rush Fire)",
    "year": 2012,
    "dates": "May 24 – November 26, 2012",
    "location": "California, United States",
    "pattern": "High dry fuel loads and extreme summer drought. Rush Fire alone burned over 271,000 acres in CA (crossing into NV).",
    "impact": "Severe rangeland and timber destruction across Northern and Southern California.",
    "startExact": true,
    "startDate": "2012-05-24",
    "endDate": "2012-11-26",
    "endExact": true,
    "timeline": [
      {
        "when": "May 24, 2012",
        "label": "Fire began"
      },
      {
        "when": "November 26, 2012",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "little-bear-fire-2012",
    "name": "Little Bear Fire",
    "year": 2012,
    "dates": "June 4 – July 30, 2012",
    "location": "Lincoln National Forest, New Mexico, United States",
    "pattern": "Lightning strike during extreme drought, dry mountain fuels, and high winds.",
    "impact": "Burned 44,330 acres and destroyed 254 structures in Ruidoso.",
    "startExact": true,
    "startDate": "2012-06-04",
    "endDate": "2012-07-30",
    "endExact": true,
    "timeline": [
      {
        "when": "June 4, 2012",
        "label": "Fire began"
      },
      {
        "when": "July 30, 2012",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "long-draw-fire-2012",
    "name": "Long Draw Fire",
    "year": 2012,
    "dates": "July 8 – 15, 2012",
    "location": "Malheur County, southeastern Oregon, United States",
    "pattern": "Extreme drought, sagebrush/grass fuels, and high winds driving massive overnight burn expansions. Lightning-ignited.",
    "impact": "Burned 557,648 acres.",
    "startExact": true,
    "startDate": "2012-07-08",
    "endDate": "2012-07-15",
    "endExact": true,
    "timeline": [
      {
        "when": "July 8, 2012",
        "label": "Fire began"
      },
      {
        "when": "July 15, 2012",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "springs-fire-2013",
    "name": "Springs Fire",
    "year": 2013,
    "dates": "May 2 – 9, 2013",
    "location": "Ventura County (Camarillo, Point Mugu State Park, Pacific Coast Highway), California, United States",
    "pattern": "A wind-driven coastal brush fire powered by unseasonably strong Santa Ana winds (gusts up to 50 mph). Sparked by a discarded piece of burning debris or vehicle hardware along Highway 101.",
    "impact": "Swept downhill toward the Pacific Ocean across 24,251 acres.",
    "startExact": true,
    "startDate": "2013-05-02",
    "endDate": "2013-05-09",
    "endExact": true,
    "timeline": [
      {
        "when": "May 2, 2013",
        "label": "Fire began"
      },
      {
        "when": "May 9, 2013",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "powerhouse-fire-2013",
    "name": "Powerhouse Fire",
    "year": 2013,
    "dates": "May 30 – June 10, 2013",
    "location": "Los Angeles County (Angeles National Forest, Lake Hughes, Elizabeth Lake), California, United States",
    "pattern": "Sparked by power lines managed by the LADWP; driven by steep terrain, high temperatures, and low humidity.",
    "impact": "Consumed 30,274 acres and destroyed 58 structures.",
    "startExact": true,
    "startDate": "2013-05-30",
    "endDate": "2013-06-10",
    "endExact": true,
    "timeline": [
      {
        "when": "May 30, 2013",
        "label": "Fire began"
      },
      {
        "when": "June 10, 2013",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "west-fork-complex-fire-2013",
    "name": "West Fork Complex Fire",
    "year": 2013,
    "dates": "June 5 – July 15, 2013 (Fully controlled November 13)",
    "location": "Mineral, Hinsdale, and Rio Grande counties, Colorado (San Juan Mountains, Weminuche Wilderness, South Fork), United States",
    "pattern": "Formed from the merger of three lightning-ignited blazes (West Fork, Papoose, and Windy Pass fires). Driven by severe drought, high winds, and extensive stands of beetle-killed spruce trees.",
    "impact": "Burned 109,049 acres and forced the complete evacuation of South Fork.",
    "startExact": true,
    "startDate": "2013-06-05",
    "endDate": "2013-07-15",
    "endExact": true,
    "timeline": [
      {
        "when": "June 5, 2013",
        "label": "Fire began"
      },
      {
        "when": "July 15, 2013",
        "label": "Fire ended"
      },
      {
        "when": "November 13, 2013",
        "label": "Fully controlled"
      }
    ]
  },
  {
    "id": "black-forest-fire-2013",
    "name": "Black Forest Fire",
    "year": 2013,
    "dates": "June 11 – 20, 2013",
    "location": "El Paso County, Colorado (Black Forest, northern Colorado Springs), United States",
    "pattern": "Fueled by high ambient temperatures (97°F), low humidity, a dense ponderosa pine canopy, and winds gusting up to 47 mph. Human-caused (exact mechanism officially undetermined).",
    "impact": "Scorched 14,280 acres, destroyed 511 homes, and resulted in 2 civilian fatalities.",
    "startExact": true,
    "startDate": "2013-06-11",
    "endDate": "2013-06-20",
    "endExact": true,
    "timeline": [
      {
        "when": "June 11, 2013",
        "label": "Fire began"
      },
      {
        "when": "June 20, 2013",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "royal-gorge-fire-2013",
    "name": "Royal Gorge Fire",
    "year": 2013,
    "dates": "June 11 – 17, 2013",
    "location": "Fremont County, Colorado (Cañon City, Royal Gorge Park), United States",
    "pattern": "Pushed by steep canyon winds, jumping across the 1,000-foot-deep Royal Gorge canyon. Cause undetermined.",
    "impact": "Burned 3,218 acres and destroyed 48 of 52 buildings in Royal Gorge Park.",
    "startExact": true,
    "startDate": "2013-06-11",
    "endDate": "2013-06-17",
    "endExact": true,
    "timeline": [
      {
        "when": "June 11, 2013",
        "label": "Fire began"
      },
      {
        "when": "June 17, 2013",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "east-peak-fire-2013",
    "name": "East Peak Fire",
    "year": 2013,
    "dates": "June 19 – July 4, 2013",
    "location": "Huerfano and Las Animas counties, Colorado (East Spanish Peak, southwest of Walsenburg), United States",
    "pattern": "Lightning strike from a thunderstorm over East Spanish Peak, driven by rugged mountain terrain, dry timber, and gusty winds.",
    "impact": "Scorched 13,572 acres, destroyed 11 structures, and prompted evacuations near Walsenburg.",
    "startExact": true,
    "startDate": "2013-06-19",
    "endDate": "2013-07-04",
    "endExact": true,
    "timeline": [
      {
        "when": "June 19, 2013",
        "label": "Fire began"
      },
      {
        "when": "July 4, 2013",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "mountain-fire-2013",
    "name": "Mountain Fire",
    "year": 2013,
    "dates": "July 15 – 31, 2013",
    "location": "Riverside County (San Jacinto Mountains, Idyllwild, Mountain Center), California, United States",
    "pattern": "Electrical failure on private property. Burned rapidly through dry chaparral and timber in high-elevation terrain.",
    "impact": "Scorched 27,531 acres, threatened over 4,000 homes, and forced mandatory evacuations for Idyllwild.",
    "startExact": true,
    "startDate": "2013-07-15",
    "endDate": "2013-07-31",
    "endExact": true,
    "timeline": [
      {
        "when": "July 15, 2013",
        "label": "Fire began"
      },
      {
        "when": "July 31, 2013",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "beaver-creek-fire-2013",
    "name": "Beaver Creek Fire",
    "year": 2013,
    "dates": "August 7 – 31, 2013",
    "location": "Blaine County and Camas County, Idaho (Wood River Valley, Ketchum, Sun Valley, Hailey, Sawtooth National Forest), United States",
    "pattern": "Lightning strike in the Sawtooth National Forest, driven by extreme drought, dense timber, and high wind gusts up to 30 mph.",
    "impact": "Scorched 114,900 acres, threatened over 1,500 homes, forced the evacuation of St. Luke's Wood River Hospital, and triggered mass evacuations across Ketchum and Sun Valley.",
    "startExact": true,
    "startDate": "2013-08-07",
    "endDate": "2013-08-31",
    "endExact": true,
    "timeline": [
      {
        "when": "August 7, 2013",
        "label": "Fire began"
      },
      {
        "when": "August 31, 2013",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "silver-fire-2013",
    "name": "Silver Fire",
    "year": 2013,
    "dates": "August 7 – 12, 2013",
    "location": "Riverside County (Banning, Poppet Flats, Silent Valley), California, United States",
    "pattern": "Caused by a suppressed silent lightning strike or electrical equipment malfunction along Poppet Flats Road, with explosive wind-driven growth through steep canyon terrain.",
    "impact": "Consumed 20,292 acres in under 5 days, injured 1 civilian and 11 firefighters, and destroyed 48 structures.",
    "startExact": true,
    "startDate": "2013-08-07",
    "endDate": "2013-08-12",
    "endExact": true,
    "timeline": [
      {
        "when": "August 7, 2013",
        "label": "Fire began"
      },
      {
        "when": "August 12, 2013",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "rim-fire-2013",
    "name": "Rim Fire",
    "year": 2013,
    "dates": "August 17 – October 27, 2013",
    "location": "Tuolumne County, Stanislaus National Forest, and Yosemite National Park, California, United States",
    "pattern": "Driven by severe drought, dense un-thinned pine tree plantations, and steep canyon topography. Sparked by an illegal campfire set by a hunter.",
    "impact": "Burned 257,314 acres with extreme crown-fire behavior.",
    "startExact": true,
    "startDate": "2013-08-17",
    "endDate": "2013-10-27",
    "endExact": true,
    "timeline": [
      {
        "when": "August 17, 2013",
        "label": "Fire began"
      },
      {
        "when": "October 27, 2013",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "colby-fire-2014",
    "name": "Colby Fire",
    "year": 2014,
    "dates": "January 16 – 24, 2014",
    "location": "Glendora and Angeles National Forest, Los Angeles County, California, United States",
    "pattern": "Illegal campfire started by three individuals, whipped by gusty Santa Ana winds during severe drought.",
    "impact": "Burned 1,952 acres, destroyed 5 homes, and injured 3 people.",
    "startExact": true,
    "startDate": "2014-01-16",
    "endDate": "2014-01-24",
    "endExact": true,
    "timeline": [
      {
        "when": "January 16, 2014",
        "label": "Fire began"
      },
      {
        "when": "January 24, 2014",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2014-northwest-territories-wildfires-2014",
    "name": "2014 Northwest Territories Wildfires",
    "year": 2014,
    "dates": "May – September 18, 2014",
    "location": "Northwest Territories, Canada",
    "pattern": "Record dry lightning thunderstorm outbreaks during a historic drought, creating 385 individual fires across boreal forests.",
    "impact": "Burned 3.4 to 3.5 million hectares (8.4 to 8.6 million acres) and produced massive smoke plumes affecting air quality across North America.",
    "startExact": false,
    "startDate": "2014-05-01",
    "endDate": "2014-09-18",
    "endExact": true,
    "timeline": [
      {
        "when": "May 2014",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "September 18, 2014",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "cocos-fire-2014",
    "name": "Cocos Fire",
    "year": 2014,
    "dates": "May 14 – 22, 2014",
    "location": "San Diego County, California, United States",
    "pattern": "Arson. Driven by record heat (~100°F), single-digit humidity, and strong Santa Ana winds through chaparral canyons.",
    "impact": "Burned 1,995 acres, destroyed dozens of structures, and forced over 20,000 evacuations.",
    "startExact": true,
    "startDate": "2014-05-14",
    "endDate": "2014-05-22",
    "endExact": true,
    "timeline": [
      {
        "when": "May 14, 2014",
        "label": "Fire began"
      },
      {
        "when": "May 22, 2014",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "poinsettia-fire-2014",
    "name": "Poinsettia Fire",
    "year": 2014,
    "dates": "May 14 – 17, 2014",
    "location": "City of Carlsbad, San Diego County, California, United States",
    "pattern": "Undetermined origin near a golf course brush line; driven through coastal canyons and subdivisions by Santa Ana winds.",
    "impact": "Burned 400 to 600 acres, destroyed 8 homes, an 18-unit apartment complex, and a commercial building, caused 1 fatality, and forced 11,000+ evacuations.",
    "startExact": true,
    "startDate": "2014-05-14",
    "endDate": "2014-05-17",
    "endExact": true,
    "timeline": [
      {
        "when": "May 14, 2014",
        "label": "Fire began"
      },
      {
        "when": "May 17, 2014",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "tomahawk-fire-2014",
    "name": "Tomahawk Fire",
    "year": 2014,
    "dates": "May 14 – 19, 2014",
    "location": "Naval Weapons Station Fallbrook and Camp Pendleton, San Diego County, California, United States",
    "pattern": "Under investigation. Driven by high heat and Santa Ana wind gusts through coastal sage scrub.",
    "impact": "Burned 5,367 to 6,500 acres and forced base housing evacuations.",
    "startExact": true,
    "startDate": "2014-05-14",
    "endDate": "2014-05-19",
    "endExact": true,
    "timeline": [
      {
        "when": "May 14, 2014",
        "label": "Fire began"
      },
      {
        "when": "May 19, 2014",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "carlton-complex-fire-2014",
    "name": "Carlton Complex Fire",
    "year": 2014,
    "dates": "July 14 – August 24, 2014",
    "location": "Okanogan County and Methow Valley, Washington, United States",
    "pattern": "Four separate fires merged under extreme drought and 30–40 mph winds, making an explosive 35-mile run in a single day. Sparked by dry lightning.",
    "impact": "Burned 256,108 acres, destroyed over 300 homes, and stands as the largest wildfire in Washington state history.",
    "startExact": true,
    "startDate": "2014-07-14",
    "endDate": "2014-08-24",
    "endExact": true,
    "timeline": [
      {
        "when": "July 14, 2014",
        "label": "Fire began"
      },
      {
        "when": "August 24, 2014",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "meadow-fire-2014",
    "name": "Meadow Fire",
    "year": 2014,
    "dates": "July 19 – September 19, 2014",
    "location": "Yosemite National Park, Mariposa County, California, United States",
    "pattern": "Lightning strike. High winds on September 7 pushed a monitored wilderness fire across the valley.",
    "impact": "Burned 4,960 acres and required emergency helicopter evacuations of over 85 hikers stranded on Half Dome.",
    "startExact": true,
    "startDate": "2014-07-19",
    "endDate": "2014-09-19",
    "endExact": true,
    "timeline": [
      {
        "when": "July 19, 2014",
        "label": "Fire began"
      },
      {
        "when": "September 19, 2014",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "happy-camp-complex-fire-2014",
    "name": "Happy Camp Complex Fire",
    "year": 2014,
    "dates": "August 11 – October 21, 2014",
    "location": "Klamath National Forest, Siskiyou County, California, United States",
    "pattern": "Lightning strikes during a summer thunderstorm outbreak, merging multiple ignitions in steep, rugged timber topography.",
    "impact": "Burned 134,056 acres, becoming one of California's largest wildfires of 2014.",
    "startExact": true,
    "startDate": "2014-08-11",
    "endDate": "2014-10-21",
    "endExact": true,
    "timeline": [
      {
        "when": "August 11, 2014",
        "label": "Fire began"
      },
      {
        "when": "October 21, 2014",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "king-fire-2014",
    "name": "King Fire",
    "year": 2014,
    "dates": "September 13 – October 9, 2014",
    "location": "El Dorado and Placer counties, California, United States",
    "pattern": "Arson. Driven by dense timber and steep canyon terrain, exhibiting extreme pyrocumulus crown fire behavior.",
    "impact": "Burned 97,717 acres, destroyed 12 homes and 68 outbuildings, and forced over 2,700 evacuations.",
    "startExact": true,
    "startDate": "2014-09-13",
    "endDate": "2014-10-09",
    "endExact": true,
    "timeline": [
      {
        "when": "September 13, 2014",
        "label": "Fire began"
      },
      {
        "when": "October 9, 2014",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "sleepy-hollow-fire-2015",
    "name": "Sleepy Hollow Fire",
    "year": 2015,
    "dates": "June 28 – July 1, 2015",
    "location": "Chelan County, Washington, United States",
    "pattern": "Human-caused (fireworks/illegal burning) during high heat (105°F+) and 30 mph sustained gusts.",
    "impact": "Burned 2,950 acres, destroying 29 homes and multiple commercial and agricultural warehouses.",
    "startExact": true,
    "startDate": "2015-06-28",
    "endDate": "2015-07-01",
    "endExact": true,
    "timeline": [
      {
        "when": "June 28, 2015",
        "label": "Fire began"
      },
      {
        "when": "July 1, 2015",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "rocky-fire-2015",
    "name": "Rocky Fire",
    "year": 2015,
    "dates": "July 29 – August 14, 2015",
    "location": "Lake, Yolo, and Colusa Counties, California, United States",
    "pattern": "Faulty outdoor electrical wiring. Notable for erratic fire behavior, intense pyrocumulus formation, and rapid runs jumping multi-lane roadways.",
    "impact": "Burned 69,438 acres and destroyed 43 homes.",
    "startExact": true,
    "startDate": "2015-07-29",
    "endDate": "2015-08-14",
    "endExact": true,
    "timeline": [
      {
        "when": "July 29, 2015",
        "label": "Fire began"
      },
      {
        "when": "August 14, 2015",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "rough-fire-2015",
    "name": "Rough Fire",
    "year": 2015,
    "dates": "July 31 – November 5, 2015",
    "location": "Fresno and Tulare Counties, California, United States",
    "pattern": "Lightning strike. Sustained backing and flanking in steep, inaccessible wilderness terrain dominated by heavy conifer timber and chaparral.",
    "impact": "Burned 151,623 acres, threatening monarch giant sequoia groves.",
    "startExact": true,
    "startDate": "2015-07-31",
    "endDate": "2015-11-05",
    "endExact": true,
    "timeline": [
      {
        "when": "July 31, 2015",
        "label": "Fire began"
      },
      {
        "when": "November 5, 2015",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "cornet-windy-ridge-fire-2015",
    "name": "Cornet-Windy Ridge Fire",
    "year": 2015,
    "dates": "August 10 – September 1, 2015",
    "location": "Baker and Malheur Counties, Oregon, United States",
    "pattern": "Lightning strike merging separate rangeland and sagebrush fires during strong gusting winds.",
    "impact": "Scorched 103,887 acres of broad rangeland.",
    "startExact": true,
    "startDate": "2015-08-10",
    "endDate": "2015-09-01",
    "endExact": true,
    "timeline": [
      {
        "when": "August 10, 2015",
        "label": "Fire began"
      },
      {
        "when": "September 1, 2015",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "canyon-creek-complex-fire-2015",
    "name": "Canyon Creek Complex Fire",
    "year": 2015,
    "dates": "August 12 – October 25, 2015",
    "location": "Grant County, Oregon, United States",
    "pattern": "Lightning strike. Steep, rocky timbered slopes of the Strawberry Mountain Wilderness aligned with severe high-wind conditions.",
    "impact": "Burned 110,422 acres and destroyed 43 residences.",
    "startExact": true,
    "startDate": "2015-08-12",
    "endDate": "2015-10-25",
    "endExact": true,
    "timeline": [
      {
        "when": "August 12, 2015",
        "label": "Fire began"
      },
      {
        "when": "October 25, 2015",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "north-star-fire-2015",
    "name": "North Star Fire",
    "year": 2015,
    "dates": "August 13 – October 1, 2015",
    "location": "Okanogan and Ferry Counties, Washington, United States",
    "pattern": "Human-caused (unattended campfire source) with long-range spotting and heavy surface fuel loading.",
    "impact": "Burned 218,138 acres.",
    "startExact": true,
    "startDate": "2015-08-13",
    "endDate": "2015-10-01",
    "endExact": true,
    "timeline": [
      {
        "when": "August 13, 2015",
        "label": "Fire began"
      },
      {
        "when": "October 1, 2015",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "chelan-complex-fire-2015",
    "name": "Chelan Complex Fire",
    "year": 2015,
    "dates": "August 14 – September 23, 2015",
    "location": "Chelan County, Washington, United States",
    "pattern": "Lightning storm igniting six distinct fires that rapidly progressed across steep, grass- and brush-covered slopes.",
    "impact": "Scorched 88,985 acres and destroyed over 50 structures.",
    "startExact": true,
    "startDate": "2015-08-14",
    "endDate": "2015-09-23",
    "endExact": true,
    "timeline": [
      {
        "when": "August 14, 2015",
        "label": "Fire began"
      },
      {
        "when": "September 23, 2015",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "okanogan-complex-fire-2015",
    "name": "Okanogan Complex Fire",
    "year": 2015,
    "dates": "August 15 – September 19, 2015",
    "location": "Okanogan County, Washington, United States",
    "pattern": "Lightning strike complex under sustained gale winds and dry shrub-steppe fuels.",
    "impact": "Reached 304,782 acres, becoming the largest contiguous complex in recorded state history, and resulted in the line-of-duty deaths of 3 USFS firefighters.",
    "startExact": true,
    "startDate": "2015-08-15",
    "endDate": "2015-09-19",
    "endExact": true,
    "timeline": [
      {
        "when": "August 15, 2015",
        "label": "Fire began"
      },
      {
        "when": "September 19, 2015",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "butte-fire-2015",
    "name": "Butte Fire",
    "year": 2015,
    "dates": "September 9 – October 1, 2015",
    "location": "Amador and Calaveras Counties, California, United States",
    "pattern": "Overhead powerline contact with a tree, fanned by extremely steep topography, dense dead fuel loading, and heavy canyon drafts.",
    "impact": "Burned 70,868 acres, destroyed 818 structures, and caused 2 civilian fatalities.",
    "startExact": true,
    "startDate": "2015-09-09",
    "endDate": "2015-10-01",
    "endExact": true,
    "timeline": [
      {
        "when": "September 9, 2015",
        "label": "Fire began"
      },
      {
        "when": "October 1, 2015",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "valley-fire-2015",
    "name": "Valley Fire",
    "year": 2015,
    "dates": "September 12 – October 6, 2015",
    "location": "Lake, Napa, and Sonoma Counties, California, United States",
    "pattern": "Defective residential wiring on an unpermitted electrical connection to a hot tub. Fuel-driven, wind-dominated run through extremely dry brush and timber.",
    "impact": "Scorched 76,067 acres, destroyed 1,955 structures, and resulted in 4 civilian fatalities.",
    "startExact": true,
    "startDate": "2015-09-12",
    "endDate": "2015-10-06",
    "endExact": true,
    "timeline": [
      {
        "when": "September 12, 2015",
        "label": "Fire began"
      },
      {
        "when": "October 6, 2015",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2016-baker-canyon-fire-2016",
    "name": "2016 Baker Canyon Fire",
    "year": 2016,
    "dates": "March 3 – 28, 2016",
    "location": "Cochise County, Arizona and Southwestern New Mexico, United States",
    "pattern": "Sparked in a remote area near the border, fueled by dry vegetation, local winds, and dry winter conditions.",
    "impact": "Burned approximately 7,980 acres of rugged brush and grass terrain.",
    "startExact": true,
    "startDate": "2016-03-03",
    "endDate": "2016-03-28",
    "endExact": true,
    "timeline": [
      {
        "when": "March 3, 2016",
        "label": "Fire began"
      },
      {
        "when": "March 28, 2016",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2016-uttarakhand-forest-fires-2016",
    "name": "2016 Uttarakhand Forest Fires",
    "year": 2016,
    "dates": "Early April – May 5, 2016",
    "location": "Uttarakhand and Himachal Pradesh, India",
    "pattern": "Widespread surface and crown fires spanning nearly 1,600 individual incidents. Sparked by record-high summer temperatures, extended winter drought, and human agricultural burning.",
    "impact": "Destroyed approximately 4,538 hectares of forest cover, blanketing hill districts in thick smog.",
    "startExact": false,
    "startDate": "2016-04-01",
    "endDate": "2016-05-05",
    "endExact": true,
    "timeline": [
      {
        "when": "Early April 2016",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "May 5, 2016",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2016-fort-mcmurray-wildfire-the-beast-2016",
    "name": "2016 Fort McMurray Wildfire (\"The Beast\")",
    "year": 2016,
    "dates": "May 1 – July 5, 2016",
    "location": "Regional Municipality of Wood Buffalo, Alberta, Canada",
    "pattern": "Explosive crown fire driven by extreme fire behavior, long-range spotting, and rapid wind shifts. Sparked by a remote natural ignition and amplified by severe drought and spring temperatures exceeding 30°C.",
    "impact": "Scorched approximately 589,000 hectares, destroyed entire neighborhoods, and forced the evacuation of over 88,000 residents.",
    "startExact": true,
    "startDate": "2016-05-01",
    "endDate": "2016-07-05",
    "endExact": true,
    "timeline": [
      {
        "when": "May 1, 2016",
        "label": "Fire began"
      },
      {
        "when": "July 5, 2016",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2016-hayden-pass-fire-2016",
    "name": "2016 Hayden Pass Fire",
    "year": 2016,
    "dates": "July 8 – August 8, 2016",
    "location": "Fremont County, Colorado, United States",
    "pattern": "Lightning-ignited timber and brush wildfire during hot summer weather, exhibiting extreme fire behavior and long-range spotting.",
    "impact": "Scorched 16,553 acres of steep terrain and generated massive smoke plumes.",
    "startExact": true,
    "startDate": "2016-07-08",
    "endDate": "2016-08-08",
    "endExact": true,
    "timeline": [
      {
        "when": "July 8, 2016",
        "label": "Fire began"
      },
      {
        "when": "August 8, 2016",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2016-strawberry-fire-2016",
    "name": "2016 Strawberry Fire",
    "year": 2016,
    "dates": "August 17 – 28, 2016",
    "location": "Tuolumne County, California, United States",
    "pattern": "Human-caused (abandoned campfire) in a remote forest area, driven by severe summer heat and low humidity.",
    "impact": "Scorched 5,888 acres of steep, rugged mountainous terrain.",
    "startExact": true,
    "startDate": "2016-08-17",
    "endDate": "2016-08-28",
    "endExact": true,
    "timeline": [
      {
        "when": "August 17, 2016",
        "label": "Fire began"
      },
      {
        "when": "August 28, 2016",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "port-hills-fires-new-zealand-2017",
    "name": "Port Hills Fires, New Zealand",
    "year": 2017,
    "dates": "February 13 – Late February 2017",
    "location": "Christchurch, New Zealand",
    "pattern": "Spread rapidly through dry pasture, gorse, and pine plantations fanned by persistent nor’westerly winds (accidental ignition investigation).",
    "impact": "Burned 1,600 hectares, destroyed 9 homes, and claimed the life of helicopter pilot Steve Askin.",
    "startExact": true,
    "startDate": "2017-02-13",
    "endDate": "2017-02-28",
    "endExact": false,
    "timeline": [
      {
        "when": "February 13, 2017",
        "label": "Fire began"
      },
      {
        "when": "Late February 2017",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "kansas-wildfires-starbuck-wildfire-of-2017-2017",
    "name": "Kansas Wildfires (Starbuck Wildfire of 2017)",
    "year": 2017,
    "dates": "March 6 – 13, 2017",
    "location": "Southwestern and Midwestern Kansas, United States",
    "pattern": "Rapidly spreading grass and rangeland fires driven by extreme drought, low humidity, high temperatures, and severe winds exceeding 70 mph.",
    "impact": "The Starbuck Fire burned over 650,000 acres in Kansas alone, becoming the largest wildfire in state history.",
    "startExact": true,
    "startDate": "2017-03-06",
    "endDate": "2017-03-13",
    "endExact": true,
    "timeline": [
      {
        "when": "March 6, 2017",
        "label": "Fire began"
      },
      {
        "when": "March 13, 2017",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "bearskin-fire-2017",
    "name": "Bearskin Fire",
    "year": 2017,
    "dates": "Summer 2017",
    "location": "Valley County, Idaho, United States",
    "pattern": "Lightning-ignited in rugged backcountry.",
    "impact": "Managed via aerial support and ridge-line defenses.",
    "startExact": false,
    "startDate": "2017-06-01",
    "endDate": "2017-08-31",
    "endExact": false,
    "timeline": [
      {
        "when": "Summer 2017",
        "label": "Burning period (exact dates not recorded)"
      }
    ]
  },
  {
    "id": "2017-knysna-fires-south-africa-great-fire-of-knysna-2017",
    "name": "2017 Knysna Fires, South Africa (\"Great Fire of Knysna\")",
    "year": 2017,
    "dates": "June 7 – 14, 2017",
    "location": "Western Cape, South Africa",
    "pattern": "Driven by high-velocity berg winds and prolonged regional drought, exacerbated by heavy alien invasive plant fuel loads and antecedent smoldering.",
    "impact": "Triggered mass evacuations and widespread structural destruction across the Garden Route district.",
    "startExact": true,
    "startDate": "2017-06-07",
    "endDate": "2017-06-14",
    "endExact": true,
    "timeline": [
      {
        "when": "June 7, 2017",
        "label": "Fire began"
      },
      {
        "when": "June 14, 2017",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "tank-hollow-fire-2017",
    "name": "Tank Hollow Fire",
    "year": 2017,
    "dates": "Ignited June 19, 2017",
    "location": "Wasatch Plateau, Utah, United States",
    "pattern": "Lightning-ignited.",
    "impact": "Burned approximately 18,730 acres with managed resource benefit strategies.",
    "startExact": true,
    "startDate": "2017-06-19",
    "endDate": "2017-06-19",
    "endExact": false,
    "timeline": [
      {
        "when": "June 19, 2017",
        "label": "Fire ignited (end date not recorded)"
      }
    ]
  },
  {
    "id": "goodwin-fire-2017",
    "name": "Goodwin Fire",
    "year": 2017,
    "dates": "Ignited June 24, 2017",
    "location": "Yavapai County, Arizona, United States",
    "pattern": "Fanned by extreme heat and erratic winds.",
    "impact": "Burned 28,522 acres in the Bradshaw Mountains, threatening regional communities.",
    "startExact": true,
    "startDate": "2017-06-24",
    "endDate": "2017-06-24",
    "endExact": false,
    "timeline": [
      {
        "when": "June 24, 2017",
        "label": "Fire ignited (end date not recorded)"
      }
    ]
  },
  {
    "id": "highline-fire-2017",
    "name": "Highline Fire",
    "year": 2017,
    "dates": "July 28 – 29, 2017",
    "location": "Payette National Forest, Idaho, United States",
    "pattern": "Lightning-ignited.",
    "impact": "Burned approximately 84,619 acres.",
    "startExact": true,
    "startDate": "2017-07-28",
    "endDate": "2017-07-29",
    "endExact": true,
    "timeline": [
      {
        "when": "July 28, 2017",
        "label": "Fire began"
      },
      {
        "when": "July 29, 2017",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2018-california-wildfires-2018",
    "name": "2018 California Wildfires",
    "year": 2018,
    "dates": "December 4, 2017 – January 2019",
    "location": "California, United States",
    "pattern": "Exceptionally aggressive urban interface and wind-driven fires fueled by drought; sparked by electrical transmission lines (PG&E), equipment, and dry conditions.",
    "impact": "Burned over 1.97 million acres, including the Camp Fire (deadliest modern US wildfire) and the Woolsey Fire.",
    "startExact": true,
    "startDate": "2017-12-04",
    "endDate": "2019-01-31",
    "endExact": false,
    "timeline": [
      {
        "when": "December 4, 2017",
        "label": "Fire began"
      },
      {
        "when": "January 2019",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2018-british-columbia-wildfires-2018",
    "name": "2018 British Columbia Wildfires",
    "year": 2018,
    "dates": "April 1 – November 2018",
    "location": "British Columbia, Canada",
    "pattern": "Massive crown and interface fires sparked by dry lightning and human ignitions under prolonged drought.",
    "impact": "Burned over 1.35 million hectares, shattering previous provincial acreage records.",
    "startExact": true,
    "startDate": "2018-04-01",
    "endDate": "2018-11-30",
    "endExact": false,
    "timeline": [
      {
        "when": "April 1, 2018",
        "label": "Fire began"
      },
      {
        "when": "November 2018",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2018-nevada-wildfires-2018",
    "name": "2018 Nevada Wildfires",
    "year": 2018,
    "dates": "May – October 2018",
    "location": "Nevada, United States",
    "pattern": "Fast-moving rangeland and cheatgrass fires fueled by high winds and summer heat; ignited by dry lightning and human activity.",
    "impact": "Burned over 1 million total acres statewide, including the Martin Fire (over 435,000 acres).",
    "startExact": false,
    "startDate": "2018-05-01",
    "endDate": "2018-10-31",
    "endExact": false,
    "timeline": [
      {
        "when": "May 2018",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "October 2018",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2018-sweden-wildfires-2018",
    "name": "2018 Sweden Wildfires",
    "year": 2018,
    "dates": "Mid-May – August 2018",
    "location": "Sweden",
    "pattern": "Severe crown and ground fires in boreal forests driven by an unprecedented heatwave and severe drought.",
    "impact": "Required the invocation of the EU civil protection mechanism for international aerial firefighting assistance.",
    "startExact": false,
    "startDate": "2018-05-15",
    "endDate": "2018-08-31",
    "endExact": false,
    "timeline": [
      {
        "when": "Mid-May 2018",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "August 2018",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2018-attica-wildfires-greece-mati-and-kineta-fires-2018",
    "name": "2018 Attica Wildfires, Greece (Mati and Kineta Fires)",
    "year": 2018,
    "dates": "July 23 – 26, 2018",
    "location": "Attica region, Greece",
    "pattern": "Fast-moving crown fires fanned by gale-force winds up to 120 km/h; sparked by human negligence (brush burning).",
    "impact": "Massive structural destruction and severe loss of life in Mati.",
    "startExact": true,
    "startDate": "2018-07-23",
    "endDate": "2018-07-26",
    "endExact": true,
    "timeline": [
      {
        "when": "July 23, 2018",
        "label": "Fire began"
      },
      {
        "when": "July 26, 2018",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2019-bandipur-forest-fires-india-2019",
    "name": "2019 Bandipur Forest Fires, India",
    "year": 2019,
    "dates": "February 15 – 25, 2019",
    "location": "Bandipur National Park, Karnataka, India",
    "pattern": "Aggravated by prolonged dry spells, low humidity, dry leaf litter, and strong winds. Triggered by man-made arson and unattended human activity.",
    "impact": "Affected 10,000 to 15,000 acres, requiring Indian Air Force Mi-17 helicopter deployments.",
    "startExact": true,
    "startDate": "2019-02-15",
    "endDate": "2019-02-25",
    "endExact": true,
    "timeline": [
      {
        "when": "February 15, 2019",
        "label": "Fire began"
      },
      {
        "when": "February 25, 2019",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2019-goseong-fire-south-korea-2019",
    "name": "2019 Goseong Fire, South Korea",
    "year": 2019,
    "dates": "April 4 – 6, 2019",
    "location": "Gangwon Province, South Korea",
    "pattern": "Fueled by dry spring conditions and hurricane-force fœhn winds. Sparked by an electrical transformer/power line arc.",
    "impact": "Scorched 1,200 to 2,300 hectares, destroyed hundreds of homes, forced emergency evacuations, and triggered a Level 3 national emergency.",
    "startExact": true,
    "startDate": "2019-04-04",
    "endDate": "2019-04-06",
    "endExact": true,
    "timeline": [
      {
        "when": "April 4, 2019",
        "label": "Fire began"
      },
      {
        "when": "April 6, 2019",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2019-siberia-wildfires-russia-2019",
    "name": "2019 Siberia Wildfires, Russia",
    "year": 2019,
    "dates": "May – October 2019",
    "location": "Siberia and the Russian Far East",
    "pattern": "Driven by an extreme summer heatwave and prolonged drought. Ignited by dry lightning and human activity, with remote fires allowed to burn unchecked in 'control zones'.",
    "impact": "Burned over 13 million hectares, blanketing major Siberian cities in toxic smog.",
    "startExact": false,
    "startDate": "2019-05-01",
    "endDate": "2019-10-31",
    "endExact": false,
    "timeline": [
      {
        "when": "May 2019",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "October 2019",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2019-vietnam-forest-fires-2019",
    "name": "2019 Vietnam Forest Fires",
    "year": 2019,
    "dates": "June 22 – July 5, 2019",
    "location": "Central Vietnam",
    "pattern": "Driven by a prolonged heatwave exceeding 40°C, extreme drought, and hot, dry Föhn winds from Laos. Sparked by human activity.",
    "impact": "Forced nighttime evacuations of thousands in Hà Tĩnh province and temporarily cut off National Highway 1.",
    "startExact": true,
    "startDate": "2019-06-22",
    "endDate": "2019-07-05",
    "endExact": true,
    "timeline": [
      {
        "when": "June 22, 2019",
        "label": "Fire began"
      },
      {
        "when": "July 5, 2019",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2019-canary-islands-wildfires-spain-2019",
    "name": "2019 Canary Islands Wildfires, Spain",
    "year": 2019,
    "dates": "August 10 – 25, 2019",
    "location": "Gran Canaria, Spain",
    "pattern": "Fueled by a severe summer heatwave across rugged volcanic terrain. Sparked by human activity (accidental welding and arson).",
    "impact": "Scorched over 10,000 hectares, forced evacuations of over 9,000 residents, and marked Spain's worst wildfire in six years.",
    "startExact": true,
    "startDate": "2019-08-10",
    "endDate": "2019-08-25",
    "endExact": true,
    "timeline": [
      {
        "when": "August 10, 2019",
        "label": "Fire began"
      },
      {
        "when": "August 25, 2019",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2020-western-united-states-wildfire-season-2020",
    "name": "2020 Western United States Wildfire Season",
    "year": 2020,
    "dates": "Early 2020 – December 2020",
    "location": "Western United States (California, Oregon, Washington, Colorado, Idaho, Utah, Arizona)",
    "pattern": "Historic crown and surface fires driven by severe megadrought, heatwaves, and extreme offshore winds. Sparked by an August 'lightning siege' and human ignitions.",
    "impact": "Shattered historical records in California by crossing over 4 million acres burned, including the August Complex (first modern 'gigafire').",
    "startExact": false,
    "startDate": "2020-01-01",
    "endDate": "2020-12-31",
    "endExact": false,
    "timeline": [
      {
        "when": "Early 2020",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "December 2020",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "delta-del-paran-wildfires-argentina-2020",
    "name": "Delta del Paraná Wildfires, Argentina",
    "year": 2020,
    "dates": "Early 2020 – late 2022",
    "location": "Paraná River Delta wetlands, Argentina",
    "pattern": "Sprawling marshland and wetland fires burning deep into peat amidst a historic regional drought. Driven by intentional agricultural burning.",
    "impact": "Generated palls of acrid smoke that blanketed urban centers like Rosario and Buenos Aires.",
    "startExact": false,
    "startDate": "2020-01-01",
    "endDate": "2022-12-31",
    "endExact": false,
    "timeline": [
      {
        "when": "Early 2020",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "late 2022",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2020-russian-wildfires-2020",
    "name": "2020 Russian Wildfires",
    "year": 2020,
    "dates": "Early March – September/October 2020",
    "location": "Siberia and the Russian Far East",
    "pattern": "Massive continuous crown and ground fires in taiga forests and peat bogs. Triggered by multi-month heatwaves, dry weather, dry thunderstorms, and pest outbreaks.",
    "impact": "Burned an estimated 25 million hectares, sending massive smoke plumes across the Arctic Ocean.",
    "startExact": false,
    "startDate": "2020-03-01",
    "endDate": "2020-10-31",
    "endExact": false,
    "timeline": [
      {
        "when": "Early March 2020",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "September/October 2020",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2020-chernobyl-exclusion-zone-wildfires-2020",
    "name": "2020 Chernobyl Exclusion Zone Wildfires",
    "year": 2020,
    "dates": "April 3 – 14, 2020",
    "location": "Chernobyl Exclusion Zone, Northern Ukraine",
    "pattern": "Surface and crown fires driven by strong spring winds across dry grass and contaminated peatlands. Human negligence (grass burning).",
    "impact": "Consumed hundreds of hectares and released smoke carrying trace radionuclides toward Kyiv.",
    "startExact": true,
    "startDate": "2020-04-03",
    "endDate": "2020-04-14",
    "endExact": true,
    "timeline": [
      {
        "when": "April 3, 2020",
        "label": "Fire began"
      },
      {
        "when": "April 14, 2020",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2020-uttarakhand-forest-fires-2020",
    "name": "2020 Uttarakhand Forest Fires",
    "year": 2020,
    "dates": "Late May 2020 – October 2020 onwards",
    "location": "Uttarakhand, India",
    "pattern": "Ground fires spreading through dry foliage and pine needles, intensified by unseasonal dry spells and rising temperatures.",
    "impact": "Scorched tens of hectares across hill districts, persisting continuously for over six months.",
    "startExact": false,
    "startDate": "2020-05-20",
    "endDate": "2020-10-31",
    "endExact": false,
    "timeline": [
      {
        "when": "Late May 2020",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "October 2020 onwards",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2020-turkish-wildfires-2020",
    "name": "2020 Turkish Wildfires",
    "year": 2020,
    "dates": "June 29 – October 11, 2020",
    "location": "Mediterranean and Aegean coastal zones, Turkey",
    "pattern": "Surface and crown fires through dense red pine forests, fueled by prolonged heatwaves, low humidity, and high winds. Caused by human negligence and arson.",
    "impact": "Scorched roughly 21,000 hectares and forced mass evacuations of over 50,000 people in İzmir.",
    "startExact": true,
    "startDate": "2020-06-29",
    "endDate": "2020-10-11",
    "endExact": true,
    "timeline": [
      {
        "when": "June 29, 2020",
        "label": "Fire began"
      },
      {
        "when": "October 11, 2020",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2021-nuevo-le-n-wildfires-mexico-2021",
    "name": "2021 Nuevo León Wildfires, Mexico",
    "year": 2021,
    "dates": "March 14 – April 2021",
    "location": "Nuevo León and Coahuila states, Mexico",
    "pattern": "Crown and surface fires sweeping through pine-oak forests, driven by drought and gusty winds. Sparked by an unextinguished campfire.",
    "impact": "Burned over 13,000 hectares and threatened residential communities in Santiago.",
    "startExact": true,
    "startDate": "2021-03-14",
    "endDate": "2021-04-30",
    "endExact": false,
    "timeline": [
      {
        "when": "March 14, 2021",
        "label": "Fire began"
      },
      {
        "when": "April 2021",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2021-british-columbia-wildfires-2021",
    "name": "2021 British Columbia Wildfires",
    "year": 2021,
    "dates": "June – October 2021",
    "location": "British Columbia, Canada",
    "pattern": "Aggressive crown and surface fires driven by an unprecedented 'heat dome' (temperatures reaching 49.6°C), severe drought, and dry lightning.",
    "impact": "Destroyed 90% of the village of Lytton on June 30; scorched over 868,000 hectares.",
    "startExact": false,
    "startDate": "2021-06-01",
    "endDate": "2021-10-31",
    "endExact": false,
    "timeline": [
      {
        "when": "June 2021",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "October 2021",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2021-italian-wildfires-2021",
    "name": "2021 Italian Wildfires",
    "year": 2021,
    "dates": "Late June – Early September 2021",
    "location": "Southern Italy and major islands",
    "pattern": "Driven by the historic 'Lucifer' anticyclone heatwave (temperatures past 48.8°C in Sicily), drought, and extensive arson.",
    "impact": "Scorched over 150,000 hectares nationwide, heavily impacting Aspromonte and Sardinia.",
    "startExact": false,
    "startDate": "2021-06-20",
    "endDate": "2021-09-30",
    "endExact": false,
    "timeline": [
      {
        "when": "Late June 2021",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "Early September 2021",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2021-california-wildfires-dixie-caldor-fires-2021",
    "name": "2021 California Wildfires (Dixie & Caldor Fires)",
    "year": 2021,
    "dates": "July 13 – October 25, 2021",
    "location": "Northern California and Sierra Nevada, United States",
    "pattern": "Extreme crown fires driven by severe megadrought, dry timber, and erratic winds. Sparked by a PG&E power line (Dixie) and camper negligence (Caldor).",
    "impact": "Dixie Fire scorched over 963,000 acres and consumed Greenville; Caldor forced mass evacuations of South Lake Tahoe.",
    "startExact": true,
    "startDate": "2021-07-13",
    "endDate": "2021-10-25",
    "endExact": true,
    "timeline": [
      {
        "when": "July 13, 2021",
        "label": "Fire began"
      },
      {
        "when": "October 25, 2021",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2021-colorado-wildfires-marshall-fire-2021",
    "name": "2021 Colorado Wildfires (Marshall Fire)",
    "year": 2021,
    "dates": "December 30, 2021 – January 2, 2022",
    "location": "Boulder County, Colorado, United States",
    "pattern": "Fast-moving urban-wildland interface fire driven by hurricane-force wind gusts exceeding 100 mph and severe drought. Sparked by underground coal embers and downed power lines.",
    "impact": "Destroyed over 1,084 residential structures before being halted by a winter blizzard.",
    "startExact": true,
    "startDate": "2021-12-30",
    "endDate": "2022-01-02",
    "endExact": true,
    "timeline": [
      {
        "when": "December 30, 2021",
        "label": "Fire began"
      },
      {
        "when": "January 2, 2022",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2022-european-and-mediterranean-wildfires-2022",
    "name": "2022 European and Mediterranean Wildfires",
    "year": 2022,
    "dates": "March – October 2022",
    "location": "Southern Europe, North Africa, and Central/Western Europe",
    "pattern": "Synchronized megafires driven by successive heat domes exceeding 40°C–45°C, extended drought, and wind.",
    "impact": "Over 1.5 million hectares burned, marking the second-worst season in recorded European history.",
    "startExact": false,
    "startDate": "2022-03-01",
    "endDate": "2022-10-31",
    "endExact": false,
    "timeline": [
      {
        "when": "March 2022",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "October 2022",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2022-mongolian-wildfires-2022",
    "name": "2022 Mongolian Wildfires",
    "year": 2022,
    "dates": "April 18 – August 29, 2022",
    "location": "Eastern steppe rangelands and Northern Taiga, Mongolia",
    "pattern": "Hyper-velocity steppe grassland blazes and northern taiga fires driven by regional pressure gradients, spring aridity, and human negligence.",
    "impact": "97 separate outbreaks scorched over 1,000,000 hectares.",
    "startExact": true,
    "startDate": "2022-04-18",
    "endDate": "2022-08-29",
    "endExact": true,
    "timeline": [
      {
        "when": "April 18, 2022",
        "label": "Fire began"
      },
      {
        "when": "August 29, 2022",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2022-siberian-wildfires-2022",
    "name": "2022 Siberian Wildfires",
    "year": 2022,
    "dates": "May 6 – August 31, 2022",
    "location": "Siberian and Far Eastern territories, Russia",
    "pattern": "Crown and ground fires consuming dry spruce and pine forests, fueled by heat anomalies, high winds, downed electrical infrastructure, and open agricultural burns.",
    "impact": "Burned over 3.2 million hectares, destroying over 1,300 structures and causing 17 fatalities.",
    "startExact": true,
    "startDate": "2022-05-06",
    "endDate": "2022-08-31",
    "endExact": true,
    "timeline": [
      {
        "when": "May 6, 2022",
        "label": "Fire began"
      },
      {
        "when": "August 31, 2022",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2022-khyber-pakhtunkhwa-wildfires-pakistan-2022",
    "name": "2022 Khyber Pakhtunkhwa Wildfires, Pakistan",
    "year": 2022,
    "dates": "May 15 – June 20, 2022",
    "location": "Khyber Pakhtunkhwa, Pakistan",
    "pattern": "Fragmented, steep-ridgeline fires across chir pine stands driven by an early-summer heatwave (>40°C–45°C), low humidity, and arson.",
    "impact": "Over 400 discrete fire points burned 14,000–17,000 acres, causing 4 civilian fatalities.",
    "startExact": true,
    "startDate": "2022-05-15",
    "endDate": "2022-06-20",
    "endExact": true,
    "timeline": [
      {
        "when": "May 15, 2022",
        "label": "Fire began"
      },
      {
        "when": "June 20, 2022",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2022-moroccan-wildfires-2022",
    "name": "2022 Moroccan Wildfires",
    "year": 2022,
    "dates": "July 13 – 26, 2022",
    "location": "Northern Morocco",
    "pattern": "Simultaneous outbreaks across pine, oak, and cedar underbrush, driven by a Mediterranean heatwave surpassing 45°C and strong winds.",
    "impact": "Exceeded 10,300 hectares, forced evacuations of over 1,100 families, and impacted the Bouhachem Reserve.",
    "startExact": true,
    "startDate": "2022-07-13",
    "endDate": "2022-07-26",
    "endExact": true,
    "timeline": [
      {
        "when": "July 13, 2022",
        "label": "Fire began"
      },
      {
        "when": "July 26, 2022",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2023-california-wildfires-2023",
    "name": "2023 California Wildfires",
    "year": 2023,
    "dates": "February 25 – December 29, 2023",
    "location": "California, United States",
    "pattern": "Multi-regional wildfires ranging from desert woodland blazes to high-elevation timber complexes. Sparked by dry lightning sieges and human ignitions.",
    "impact": "7,127 incidents burned 324,917 acres, including the Smith River Complex and York Fire.",
    "startExact": true,
    "startDate": "2023-02-25",
    "endDate": "2023-12-29",
    "endExact": true,
    "timeline": [
      {
        "when": "February 25, 2023",
        "label": "Fire began"
      },
      {
        "when": "December 29, 2023",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2023-canadian-wildfires-2023",
    "name": "2023 Canadian Wildfires",
    "year": 2023,
    "dates": "May – October 2023",
    "location": "Canada",
    "pattern": "Unprecedented nationwide drought, record heatwaves, and massive dry lightning storms igniting boreal forests and peatlands.",
    "impact": "Scorched a record-shattering 18.5 million hectares (45 million acres) across Canada.",
    "startExact": false,
    "startDate": "2023-05-01",
    "endDate": "2023-10-31",
    "endExact": false,
    "timeline": [
      {
        "when": "May 2023",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "October 2023",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2023-arizona-wildfires-2023",
    "name": "2023 Arizona Wildfires",
    "year": 2023,
    "dates": "May 22 – December 1, 2023",
    "location": "Arizona, United States",
    "pattern": "Multi-county brush, desert chaparral, and pine forest blazes driven by high summer temperatures and erratic winds.",
    "impact": "1,837 incidents burned over 188,483 acres.",
    "startExact": true,
    "startDate": "2023-05-22",
    "endDate": "2023-12-01",
    "endExact": true,
    "timeline": [
      {
        "when": "May 22, 2023",
        "label": "Fire began"
      },
      {
        "when": "December 1, 2023",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2023-hawaii-wildfires-lahaina-upcountry-2023",
    "name": "2023 Hawaii Wildfires (Lahaina & Upcountry)",
    "year": 2023,
    "dates": "August 8 – September 9, 2023",
    "location": "Maui and Hawaiʻi, United States",
    "pattern": "Hurricane-force wind-driven urban interface and brush fires. Downslope wind gusts exceeding 100 mph pushed flames through non-native grasses. Triggered by downed power lines amidst severe drought.",
    "impact": "Scorched over 2,100 acres in Lahaina, destroyed 2,200+ structures, and caused 102 fatalities.",
    "startExact": true,
    "startDate": "2023-08-08",
    "endDate": "2023-09-09",
    "endExact": true,
    "timeline": [
      {
        "when": "August 8, 2023",
        "label": "Fire began"
      },
      {
        "when": "September 9, 2023",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2023-louisiana-wildfires-tiger-island-fire-2023",
    "name": "2023 Louisiana Wildfires (Tiger Island Fire)",
    "year": 2023,
    "dates": "August 22 – October 31, 2023",
    "location": "Louisiana, United States",
    "pattern": "Explosive pine timber and brush fires driven by exceptional drought, 100°F+ temperatures, and arson.",
    "impact": "Burned over 60,000 acres statewide; Tiger Island Fire alone scorched 33,000+ acres (largest in state history).",
    "startExact": true,
    "startDate": "2023-08-22",
    "endDate": "2023-10-31",
    "endExact": true,
    "timeline": [
      {
        "when": "August 22, 2023",
        "label": "Fire began"
      },
      {
        "when": "October 31, 2023",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2024-texas-wildfires-smokehouse-creek-windy-deuce-fires-2024",
    "name": "2024 Texas Wildfires (Smokehouse Creek & Windy Deuce Fires)",
    "year": 2024,
    "dates": "February – April 2024",
    "location": "Texas Panhandle and Western Oklahoma, United States",
    "pattern": "Catastrophic wind-driven rangeland and grass fires fueled by hurricane-force winds, dry grasses, and drought. Triggered by power line failures.",
    "impact": "Smokehouse Creek Fire consumed over 1.05 million acres, becoming the largest wildfire in Texas history.",
    "startExact": false,
    "startDate": "2024-02-01",
    "endDate": "2024-04-30",
    "endExact": false,
    "timeline": [
      {
        "when": "February 2024",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "April 2024",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2024-new-mexico-wildfires-south-fork-salt-fires-2024",
    "name": "2024 New Mexico Wildfires (South Fork & Salt Fires)",
    "year": 2024,
    "dates": "Spring – Summer 2024",
    "location": "New Mexico, United States (near Ruidoso)",
    "pattern": "Rapid, explosive crown runs through heavy timber and dry forest fuels under extreme drought, high winds, and steep terrain.",
    "impact": "Forced mass evacuations from Ruidoso, destroying hundreds of structures.",
    "startExact": false,
    "startDate": "2024-03-01",
    "endDate": "2024-08-31",
    "endExact": false,
    "timeline": [
      {
        "when": "Spring 2024",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "Summer 2024",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2024-canadian-wildfires-jasper-complex-national-season-2024",
    "name": "2024 Canadian Wildfires (Jasper Complex & National Season)",
    "year": 2024,
    "dates": "May – November 2024",
    "location": "Canada",
    "pattern": "Extreme crown runs, firestorms, and deep duff burning through dense boreal forests and subalpine timber. Driven by long-term drought, heatwaves, dry lightning, and human ignitions.",
    "impact": "Scorched millions of hectares, including the destructive Jasper Wildfire Complex in Alberta.",
    "startExact": false,
    "startDate": "2024-05-01",
    "endDate": "2024-11-30",
    "endExact": false,
    "timeline": [
      {
        "when": "May 2024",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "November 2024",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2024-washington-wildfires-2024",
    "name": "2024 Washington Wildfires",
    "year": 2024,
    "dates": "June – October 2024",
    "location": "Washington, United States",
    "pattern": "Lightning and human ignitions driving persistent slope-driven crown runs through steep canyon walls and dry rangelands.",
    "impact": "Included Pioneer Fire (49,131 acres), Retreat Fire (39,475 acres), and Swawilla Fire (52,000+ acres).",
    "startExact": false,
    "startDate": "2024-06-01",
    "endDate": "2024-10-31",
    "endExact": false,
    "timeline": [
      {
        "when": "June 2024",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "October 2024",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2024-oregon-wildfires-durkee-little-yamsay-fires-2024",
    "name": "2024 Oregon Wildfires (Durkee & Little Yamsay Fires)",
    "year": 2024,
    "dates": "July – October 2024",
    "location": "Oregon, United States",
    "pattern": "Explosive runs through cheatgrass, sagebrush rangelands, and dense timber propelled by high temperatures and drought. Sparked by dry lightning and human/vehicle activity.",
    "impact": "Durkee Fire surged past 293,000 acres.",
    "startExact": false,
    "startDate": "2024-07-01",
    "endDate": "2024-10-31",
    "endExact": false,
    "timeline": [
      {
        "when": "July 2024",
        "label": "Burning began (start date approximate)"
      },
      {
        "when": "October 2024",
        "label": "Burning ended (end date approximate)"
      }
    ]
  },
  {
    "id": "2025-red-river-shinnery-fire-oklahoma-2025",
    "name": "2025 Red River Shinnery Fire, Oklahoma",
    "year": 2025,
    "dates": "February 26 – March 4, 2025",
    "location": "Oklahoma, United States",
    "pattern": "Wind-driven pasture blaze sparked by roadside debris or vehicle catalytic converters under high-wind advisories.",
    "impact": "Burned 6,100 acres and prompted temporary highway closures.",
    "startExact": true,
    "startDate": "2025-02-26",
    "endDate": "2025-03-04",
    "endExact": true,
    "timeline": [
      {
        "when": "February 26, 2025",
        "label": "Fire began"
      },
      {
        "when": "March 4, 2025",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2025-crabapple-fire-texas-2025",
    "name": "2025 Crabapple Fire, Texas",
    "year": 2025,
    "dates": "March 8 – 16, 2025",
    "location": "Texas Hill Country, United States",
    "pattern": "Critical fire weather with relative humidity below 15% and 30 mph winds fueling growth through cedar brakes and oak scrub. Sparked by an escaped prescribed brush pile.",
    "impact": "Burned 5,750 acres with zero residential losses.",
    "startExact": true,
    "startDate": "2025-03-08",
    "endDate": "2025-03-16",
    "endExact": true,
    "timeline": [
      {
        "when": "March 8, 2025",
        "label": "Fire began"
      },
      {
        "when": "March 16, 2025",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2025-owyhee-complex-fire-nevada-2025",
    "name": "2025 Owyhee Complex Fire, Nevada",
    "year": 2025,
    "dates": "June 22 – July 5, 2025",
    "location": "Nevada, United States",
    "pattern": "Multiple lightning-ignited starts coalescing under low relative humidity and dry sagebrush conditions into active wind-driven runs.",
    "impact": "Scorched 31,400 acres.",
    "startExact": true,
    "startDate": "2025-06-22",
    "endDate": "2025-07-05",
    "endExact": true,
    "timeline": [
      {
        "when": "June 22, 2025",
        "label": "Fire began"
      },
      {
        "when": "July 5, 2025",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2025-burdoin-fire-washington-2025",
    "name": "2025 Burdoin Fire, Washington",
    "year": 2025,
    "dates": "August 6 – 15, 2025",
    "location": "Washington, United States",
    "pattern": "Rapidly climbing grass-and-brush fire triggered by mechanical sparking on a private utility right-of-way, propelled by Columbia River Gorge thermal winds.",
    "impact": "Scorched 2,150 acres and triggered Level 3 evacuations.",
    "startExact": true,
    "startDate": "2025-08-06",
    "endDate": "2025-08-15",
    "endExact": true,
    "timeline": [
      {
        "when": "August 6, 2025",
        "label": "Fire began"
      },
      {
        "when": "August 15, 2025",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2025-platte-valley-complex-wyoming-2025",
    "name": "2025 Platte Valley Complex, Wyoming",
    "year": 2025,
    "dates": "August 12 – September 3, 2025",
    "location": "Wyoming, United States",
    "pattern": "Intense crowning through beetle-kill lodgepole pine and dry sagebrush flats. Triggered by dual lightning strikes from a dry cold front.",
    "impact": "Burned 18,900 acres.",
    "startExact": true,
    "startDate": "2025-08-12",
    "endDate": "2025-09-03",
    "endExact": true,
    "timeline": [
      {
        "when": "August 12, 2025",
        "label": "Fire began"
      },
      {
        "when": "September 3, 2025",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2026-japan-wildfires-2026",
    "name": "2026 Japan Wildfires",
    "year": 2026,
    "dates": "March 15 – May 10, 2026",
    "location": "Iwate, Fukushima, Yamanashi, and Gunma Prefectures, Japan",
    "pattern": "Mountainous surface and brush fires driven by unusually dry spring winds and low seasonal precipitation, caused by dry weather and accidental outdoor burning.",
    "impact": "Required multi-agency ground and helicopter suppression across multiple prefectures.",
    "startExact": true,
    "startDate": "2026-03-15",
    "endDate": "2026-05-10",
    "endExact": true,
    "timeline": [
      {
        "when": "March 15, 2026",
        "label": "Fire began"
      },
      {
        "when": "May 10, 2026",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2026-indonesia-peatland-forest-fires-2026",
    "name": "2026 Indonesia Peatland & Forest Fires",
    "year": 2026,
    "dates": "June 1 – October 15, 2026",
    "location": "Riau, Central/West Kalimantan, South Sumatra, and Jambi, Indonesia",
    "pattern": "Smoldering underground peat fires and surface agricultural blazes caused by slash-and-burn land clearing exacerbated by dry El Niño weather patterns.",
    "impact": "Generated transboundary haze alerts across Sumatra and Borneo.",
    "startExact": true,
    "startDate": "2026-06-01",
    "endDate": "2026-10-15",
    "endExact": true,
    "timeline": [
      {
        "when": "June 1, 2026",
        "label": "Fire began"
      },
      {
        "when": "October 15, 2026",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2026-turkey-wildfires-2026",
    "name": "2026 Turkey Wildfires",
    "year": 2026,
    "dates": "June 18 – September 5, 2026",
    "location": "İzmir, Muğla, Antalya, and Çanakkale provinces, Turkey",
    "pattern": "Fast-moving crown and brush blazes fueled by gale-force winds and summer heatwaves, caused by dry lightning strikes and accidental human activity.",
    "impact": "Threatened coastal resorts and residential zones across Mediterranean and Aegean tourism hubs.",
    "startExact": true,
    "startDate": "2026-06-18",
    "endDate": "2026-09-05",
    "endExact": true,
    "timeline": [
      {
        "when": "June 18, 2026",
        "label": "Fire began"
      },
      {
        "when": "September 5, 2026",
        "label": "Fire ended"
      }
    ]
  },
  {
    "id": "2026-algeria-wildfires-2026",
    "name": "2026 Algeria Wildfires",
    "year": 2026,
    "dates": "July 12 – August 18, 2026",
    "location": "El Tarf, Bejaia, Jijel, Tizi Ouzou, and Skikda provinces, Algeria",
    "pattern": "Fast-spreading Mediterranean forest and brush blazes driven by intense heatwaves and high Sirocco winds, coupled with extreme summer temperatures and localized land clearing.",
    "impact": "Pushed fire fronts toward coastal communities in late July, prompting mass evacuations.",
    "startExact": true,
    "startDate": "2026-07-12",
    "endDate": "2026-08-18",
    "endExact": true,
    "timeline": [
      {
        "when": "July 12, 2026",
        "label": "Fire began"
      },
      {
        "when": "August 18, 2026",
        "label": "Fire ended"
      }
    ]
  }
]