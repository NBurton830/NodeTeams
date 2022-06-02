#!/usr/bin/env node

/**
 * nodecli
 *  A command-line application that calculates the ranking tables.
 *
 * @author Nyshawn Burton <null>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const fs = require('fs');

const input = cli.input;
const flags = cli.flags;

(async () => {
	
	// Initialize the application using the init function.
	await init();
	// Log the input and flags
	
   
	//Generally the module name and the variable name both are same
	

	// fs.readFileSync
	// Sync' part allows the node to read the file synchronusly meaning all file is read first before going through other code. 
	var sample = fs.readFileSync('./team-input.txt','utf8');
	// variable game is an array of each line in the file
	const game = sample.split('\n');
	// map each game and the team with the highest score and the lowest score
	let teams = {};
	game.map(team => {
		// if team is empty return
		if(!team) return;
		// split each team into an array
		let teamone = team.split(',')[0];
		let teamtwo = team.split(',')[1];
		// find integer in string and strip whitespace
		let teamoneint = parseInt(teamone.match(/\d+/g).join('').trim());
		let teamtwoint = parseInt(teamtwo.match(/\d+/g).join('').trim());
		// remove the int from the string
		teamonename = teamone.replace(/\d+/g, '').trim();
		teamtwoname = teamtwo.replace(/\d+/g, '').trim();
		// convert string to integer
		teamonescore = parseInt(teamoneint),
		teamtwoscore = parseInt(teamtwoint);
		//  if the name is not in the teams object then add it
		if(!teams[teamonename]){
			teams[teamonename] = {
				name: teamonename,
				finalScore: 0,
			};
		}
		if(!teams[teamtwoname]){
			teams[teamtwoname] = {
				name: teamtwoname,
				finalScore: 0,
			};
		}
		// if the team one score is greater than team two score then add three to the wins and add one to the losses
		if(teamonescore > teamtwoscore){
			teams[teamonename].finalScore += 3;
			
		}
		// if the team one score is less than team two score then add one to the losses and add three to the wins
		if(teamonescore < teamtwoscore){
			teams[teamtwoname].finalScore += 3;
			
		}
		// if the team one score is equal to team two score then add one to the ties
		if(teamonescore === teamtwoscore){
			teams[teamonename].finalScore++;
			teams[teamtwoname].finalScore++;
		}
		log(teams);
		// 
	});

	// If two or more teams have the same number of points, they should have the same rank and be printed in alphabetical order 
	const sorted = Object.values(teams).sort((a, b) => {
		if (a.finalScore > b.finalScore) {
			return -1;
		}
		if (a.finalScore < b.finalScore) {
			return 1;
		}
		if (a.finalScore === b.finalScore) {
			return a.name.localeCompare(b.name);
		}
	});
	// turn sorted object into an numbered string array
	let sortedStructure = sorted.map((team, index) => {
		return `${index + 1}. ${team.name}, ${team.finalScore} pts`;
	});
	
	// turn sortedStructure into a string
	let finalResults = sortedStructure.join('\n');


	fs.writeFileSync('output.txt',finalResults);
})();
