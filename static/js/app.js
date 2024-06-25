// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log("Metadata fetched:", data.metadata);

    // get the metadata field
    var metadata = data.metadata;
    

    // Filter the metadata for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    console.log("Filtered metadata:", results);

    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key}: ${value}`);
    });
    console.log("Metadata panel updated");
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log("Filtered sample:", results);

    // Get the samples field
    var samples = data.samples;

    // Filter the samples for the object with the desired sample number
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    // Get the otu_ids, otu_labels, and sample_values
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    console.log("otu_ids:", otu_ids);
    console.log("otu_labels:", otu_labels);
    console.log("sample_values:", sample_values);


    // Build a Bubble Chart
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 30}
    };

    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }
    ];
    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    console.log("Bubble chart rendered");

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    var barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
      }
    ];

    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", barData, barLayout);
    console.log("Bar chart rendered");
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log("Names fetched:", data.names);

    // Get the names field
     // Use d3 to select the dropdown with id of `#selDataset`
    var selector = d3.select("#selDataset");


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    data.names.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    console.log("First sample:", firstSample);

    // Get the first sample from the list
    const firstSample = data.names[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  console.log("New sample selected:", newSample);
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
