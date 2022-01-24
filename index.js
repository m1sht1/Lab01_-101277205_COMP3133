const fs = require('fs');
const csv = require('csv-parser');
results = [];
var canada = 'country, year, population \n';
var usa = 'country, year, population \n';
countryRemaining = [];
var myFile = 'input_countries.csv';
fs.stat(myFile, (err, stat) => {
	if (err == null) {
		console.log('File eaists!! \n');
		readWrite();
	} else if (err.code === 'ENOENT') {
		console.log('File error');
	}
});
function readWrite() {
	fs.createReadStream(myFile)
		.pipe(csv())
		.on('error', (err) => {
			console.log('Error in reading the file', err);
		})
		.on('data', (line) => results.push(line))
		.on('end', () => {
			results.forEach((a) => {
				if (a.country === 'Canada') {
					canada += a.country + ', ' + a.year + ', ' + a.population + '\n';
				} else if(a.country === 'United States') {
					usa += a.country + ', ' + a.year + ', ' + a.population + '\n';
				}
			});
			filterAndWrite(canada, 'Canada');
			filterAndWrite(usa, 'Usa');
		});
	}

	function filterAndWrite(line, country) {
		var fileName = country + '.txt';
		fs.writeFile(fileName, line, (err) => {
			if (err) {
				console.log('Error creating ', country);
			} else {
				console.log("Successfully created");
			}
		});
	}

