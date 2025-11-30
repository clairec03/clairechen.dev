/**
 * Interactive World Map - Global Footprint
 * Modular and extensible system for displaying visited countries
 */

// COUNTRIES DATA - Easily extensible with more information
const countriesData = {
  USA: {
    name: "United States",
    description: "Where I'm based",
    photos: [],
    links: [],
    visitYear: "",
    studied: true
  },
  CHN: {
    name: "China",
    description: "Cultural roots and family heritage",
    photos: [],
    links: [],
    visitYear: "Multiple visits",
    studied: true
  },
  SGP: {
    name: "Singapore",
    description: "Gem of Southeast Asia",
    photos: [],
    links: [],
    visitYear: "Attended the American School in 2017-2019",
    studied: true
  },
  DEU: {
    name: "Germany",
    description: "Engineering excellence and innovation",
    photos: [],
    links: [],
    visitYear: ""
  },
  ITA: {
    name: "Italy",
    description: "Milan, Venice",
    photos: [],
    links: [],
    visitYear: "Visited in 2014"
  },
  HRV: {
    name: "Croatia",
    description: "Adriatic coast and medieval cities",
    photos: [],
    links: [],
    visitYear: "2014"
  },
  GRC: {
    name: "Greece",
    description: "Ancient history and island beauty",
    photos: [],
    links: [],
    visitYear: "2014"
  },
  CHE: {
    name: "Switzerland",
    description: "Alpine peaks and precision",
    photos: [],
    links: [],
    visitYear: "2025"
  },
  AUT: {
    name: "Austria",
    description: "Classical music and imperial heritage",
    photos: [],
    links: [],
    visitYear: "2025"
  },
  JPN: {
    name: "Japan",
    description: "Technology meets tradition",
    photos: [],
    links: [],
    visitYear: "2015"
  },
  MYS: {
    name: "Malaysia",
    description: "Multicultural melting pot",
    photos: [],
    links: [],
    visitYear: "2013"
  },
  IDN: {
    name: "Indonesia",
    description: "Phuket (for International History Bee & Bowl; team made it to Asian Championships here) and Bali",
    photos: [],
    links: [],
    visitYear: "2017 and 2018"
  },
  ECU: {
    name: "Ecuador",
    description: "Equator line and biodiversity",
    photos: [],
    links: [],
    visitYear: ""
  },
  PER: {
    name: "Peru",
    description: "Inca heritage and Machu Picchu",
    photos: [],
    links: [],
    visitYear: ""
  },
  TUR: {
    name: "Turkey",
    description: "Bridge between East and West",
    photos: [],
    links: [],
    visitYear: ""
  },
  CAN: {
    name: "Canada",
    description: "",
    photos: [],
    links: [],
    visitYear: ""
  },
  ISL: {
    name: "Iceland",
    description: "Land of fire and ice",
    photos: [],
    links: [],
    visitYear: ""
  },
  GBR: {
    name: "United Kingdom",
    description: "Student exchange in Chepstow at St John's on-the-Hill",
    photos: [],
    links: [],
    visitYear: "Visited in 2015",
    studied: true
  },
  ARE: {
    name: "UAE",
    description: "",
    photos: [],
    links: [],
    visitYear: ""
  },
  THA: {
    name: "Thailand",
    description: "",
    photos: [],
    links: [],
    visitYear: ""
  },
  KHM: {
    name: "Cambodia",
    description: "Angkor Wat and ancient temples",
    photos: [],
    links: [],
    visitYear: ""
  },
  AUS: {
    name: "Australia",
    description: "Great Ocean Road and incredible wildlife",
    photos: [],
    links: [],
    visitYear: ""
  },
  NZL: {
    name: "New Zealand",
    description: "Hiked in North Island",
    photos: [],
    links: [],
    visitYear: ""
  }
};

// Get list of visited country codes
const visitedCountries = Object.keys(countriesData);

// Prepare data for map coloring
const mapData = {};
visitedCountries.forEach(code => {
  mapData[code] = { fillKey: 'VISITED' };
});

// Initialize the map when document is ready
document.addEventListener('DOMContentLoaded', function() {
  // Create the map
  const map = new Datamap({
    element: document.getElementById('world-map'),
    projection: 'mercator',
    fills: {
      VISITED: '#00d9ff',  // Cyan for visited
      defaultFill: '#1a1f3a'  // Dark for unvisited
    },
    data: mapData,
    geographyConfig: {
      borderColor: 'rgba(0, 217, 255, 0.3)',
      borderWidth: 0.5,
      highlightFillColor: '#7c3aed',  // Purple on hover
      highlightBorderColor: '#00d9ff',
      highlightBorderWidth: 2,
      popupTemplate: function(geography, data) {
        // Only show popup for visited countries
        if (data && data.fillKey === 'VISITED') {
          const countryData = countriesData[geography.id];
          if (countryData) {
            let popupContent = `
              <div class="hoverinfo" style="
                background-color: #1a1f3a; 
                border: 2px solid #00d9ff; 
                border-radius: 8px; 
                padding: 15px; 
                color: #ffffff;
                box-shadow: 0 8px 16px rgba(0, 217, 255, 0.3);
                max-width: 300px;
              ">
                <h4 style="color: #00d9ff; margin: 0 0 10px 0; font-size: 18px; font-weight: bold;">
                  ${countryData.name}
                </h4>
                <p style="color: #94a3b8; margin: 0; font-size: 14px; line-height: 1.6;">
                  ${countryData.description}
                </p>
            `;
            
            // Add year if available
            if (countryData.visitYear) {
              popupContent += `
                <p style="color: #7c3aed; margin: 10px 0 0 0; font-size: 12px; font-style: italic;">
                  ${countryData.visitYear}
                </p>
              `;
            }
            
            // Add links if available
            if (countryData.links && countryData.links.length > 0) {
              popupContent += '<div style="margin-top: 10px;">';
              countryData.links.forEach(link => {
                popupContent += `
                  <a href="${link.url}" target="_blank" style="color: #00d9ff; text-decoration: none; font-size: 12px; margin-right: 10px;">
                    ${link.text} →
                  </a>
                `;
              });
              popupContent += '</div>';
            }
            
            popupContent += '</div>';
            return popupContent;
          }
        }
        return null; // Don't show popup for unvisited countries
      }
    },
    done: function(datamap) {
      // Add event listeners for visited countries only
      datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
        if (mapData[geography.id] && mapData[geography.id].fillKey === 'VISITED') {
          const countryData = countriesData[geography.id];
          if (countryData) {
            console.log(`Clicked on ${countryData.name}`);
            // You can add more interactions here, like opening a modal with photos
          }
        }
      });
    }
  });

  // Responsive resize
  window.addEventListener('resize', function() {
    map.resize();
  });

  // Generate country cards in the grid
  generateCountryGrid();
  
  // Update counter
  document.getElementById('country-count').textContent = visitedCountries.length;
});

/**
 * Generate country cards below the map
 */
function generateCountryGrid() {
  const grid = document.getElementById('countries-grid');
  
  // Sort countries alphabetically
  const sortedCountries = Object.entries(countriesData)
    .sort((a, b) => a[1].name.localeCompare(b[1].name));
  
  sortedCountries.forEach(([code, data]) => {
    const card = document.createElement('div');
    card.style.cssText = `
      background-color: #1a1f3a;
      border: 1px solid rgba(0, 217, 255, 0.3);
      border-radius: 8px;
      padding: 15px 20px;
      min-width: 150px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
    `;
    
    card.innerHTML = `
      <div style="color: #00d9ff; font-weight: 600; font-size: 14px; margin-bottom: 5px;">
        ${data.name}${data.studied ? ' ⭐' : ''}
      </div>
      <div style="color: #94a3b8; font-size: 12px;">
        ${code}
      </div>
    `;
    
    // Hover effect
    card.addEventListener('mouseenter', function() {
      this.style.backgroundColor = '#7c3aed';
      this.style.borderColor = '#7c3aed';
      this.style.transform = 'translateY(-3px)';
      this.style.boxShadow = '0 8px 16px rgba(124, 58, 237, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.backgroundColor = '#1a1f3a';
      this.style.borderColor = 'rgba(0, 217, 255, 0.3)';
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
    
    // Click to show details (can be extended)
    card.addEventListener('click', function() {
      alert(`${data.name}\n\n${data.description}`);
      // TODO: Replace with modal showing photos, links, detailed info
    });
    
    grid.appendChild(card);
  });
}

/**
 * EXTENSIBILITY GUIDE:
 * 
 * 1. To add a new country:
 *    - Add entry to countriesData object with ISO 3-letter code
 *    - Fill in name, description, photos array, links array, visitYear
 * 
 * 2. To add photos:
 *    - Add photo URLs to the photos array: photos: ['url1.jpg', 'url2.jpg']
 *    - Modify popupTemplate to display images
 * 
 * 3. To add links:
 *    - Add to links array: links: [{text: 'Blog Post', url: 'https://...'}]
 * 
 * 4. To customize interactions:
 *    - Modify the 'click' event handler in the done() function
 *    - Add modal dialogs, slideshows, or other interactive elements
 * 
 * 5. To change colors:
 *    - Modify fills object for country colors
 *    - Adjust highlightFillColor for hover effect
 *    - Update popup styling in popupTemplate
 */
