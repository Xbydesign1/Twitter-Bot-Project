/**
 * LMC 2700
 * ASSIGNMENT 5 - TWITTERBOT
 * GROUP 12
 * @version 1.0
 */


// DEBUG
var debug = false;

// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

// List of communities to repost in so our bot is not constantly spamming the same one.
var climateSearch = {q: "#climate", count: 1, result_type: "recent"};
var politicsSearch = {q: "#politics", count: 1, result_type: "recent"};
var techSearch = {q: "#tech", count: 1, result_type: "recent"};
var wildlifeSearch = {q: "#wildlife", count: 1, result_type: "recent"};

var paramList = [climateSearch, politicsSearch, techSearch, wildlifeSearch];


/**
 * Function that simply makes sure the code is compling without issue.
 */
function test() {
	let Str = 'test';
	console.log(Str);
}


/**
 * Function that retweets a recent tweet from the paramList of communities.
 * Calls editText() and tweetIt() to edit the tweet text and post.
 */
function reTweet() {
	T.get('search/tweets',paramList[Math.floor(Math.random()*4)] , function(error,data,response) {
		tweetIt(editText(data.statuses[0].text));
		if (response) {
			console.log('\nSuccess! Check your bot, it should have retweeted something.\n')
		} else if (error) {
			console.log('\nBack to the drawing board.\n', error)
		} else {
			console.log('\nThere was an error with your hashtag search:\n', error);
		}
	});
}


/**
 * Function modifies a string of text, capitalizing
 * every even char and adding a '? ;)' at the end.
 * @param tweetText - text taken in to be modified.
 * @returns a new modified string.
*/
function editText(tweetText) {
	let newTweet = '';
	i = 0;
	while (i < tweetText.length) {
		if (i % 2 == 0) { // Makes even chars uppercase
			newTweet = newTweet + tweetText[i].toUpperCase();
		} else {
			newTweet = newTweet + tweetText[i]; // Leaves odd chars alone
		}
		i++;
	}
	newTweet = newTweet + '? ;)'; // Adds a final flourish to the end of every retweet
	return newTweet;
}


/**
 * Function that posts a new  some text on command.
 * @param txt - a string that will be posted to Twitter.
*/
function tweetIt(txt) {
	var tweet = {
		status: txt
	}
	T.post('statuses/update', tweet, tweeted);
	function tweeted(err, data, response) {
		if (err) {
			console.log("Something went wrong in tweetIt()!");
		}
	}
}


/**
 * Function that automates our bot's retweeting.
*/
function runBot() {
	console.log('GT Bot Running...'); // Incation that things are happening
	console.log(" "); // For legible logs
	var d = new Date();
	var ds = d.toLocaleDateString() + " " + d.toLocaleTimeString();
	console.log(ds);  // date/time of the request	

	// Bot Logic
	var rand = Math.random();

 	if (rand <= 1.60) {      
		console.log("\nIncoming ReTweet...");
		reTweet();
	}
}


// Run the bot
runBot();

// Recycles every hour
setInterval(runBot, 1000 * 60 * 60);