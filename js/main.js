// CUSTOM JS FILE //

// Patterns defined using the RegEx syntax JS uses (a subset of PCRE)
var patterns = [
  [/.*personal.*information.*/, 'personal info', 'vid-working'],
  [/.*data*/, 'data', 'vid-info'],
  [/.*cambridge*/, 'cambridge', 'vid-average'],
  [/.*(risk)|(threat).*security.*/, 'security threat', 'vid-working'],
  [/.*more.*information.*/, 'more info', 'vid-info'],
  [/.*terms*/, 'terms', 'vid-average'],
  [/.*services*/, 'services', 'vid-average'],
  [/.*privacy*/, 'privacy', 'vid-average'],
  [/.*lead facebook.*/, 'lead facebook', 'vid-no'],
  [/.*personal.*/, 'personal', 'vid-working'],
  [/test/, 'test','vid-no']
]

// stop, reset, and hide all vids defined in the patterns
function stopVids(patterns){
  console.log("hiding all vids");
  for (var i = patterns.length - 1; i >= 0; i--) {
    if (patterns[i][2] == '')
      continue;
    var elem = document.getElementById(patterns[i][2]);
    console.log("hiding", patterns[i][2], elem);
    elem.pause();
    elem.currentTime = 0;
    elem.style.display = "none";
  }
}

// select the vid we want, unhide, and play.
function playVid(vidID){
  console.log("Attempting to play", vidID);
  var theVid = document.getElementById(vidID);
  theVid.style.display = "block";
  theVid.play();
}

$(document).ready(function(){

  // Bind a function to automatically hide vids when they end

  for (var i = patterns.length - 1; i >= 0; i--) {
    if (patterns[i][2] == '')
      continue;
    var vid = document.getElementById(patterns[i][2]);
    vid.onended = function() {
        stopVids(patterns);
    };
  }
    
   $('#questionForm').submit(function(ev) {
       ev.preventDefault(); // to stop the form from submitting

       var userInput = ev.target['userInput']
       console.log("Input3:", userInput.value);
       
       // naively stop and hide all vids
       stopVids(patterns);

       // For every pattern we have defined
       for (var i = patterns.length - 1; i >= 0; i--) {
        // Test it against the string to see if it matches
        var res = userInput.value.search(patterns[i][0])
        if ( res != -1 ){
          console.log("Pattern matched:", patterns[i][1])

          if (patterns[i][2] != '') {
            
            // Trigger a video playback here using patterns[i][1] as the key
            playVid(patterns[i][2]);    
          }
          break
        }
       }

   });
});

// function submitHandler(ev) {
//  ev.preventDefault(); // to stop the form from submitting
//  var userInput = ev.target['userInput']
//  console.log("Input3:", userInput.value);
// }




