// JavaScript Document
// set golbals
var key = 'api_key=2c8a02fa36fb5299dcd97bbc84609899';
var ImgPath = "http://image.tmdb.org/t/p/";
var urls = ["", "/cgi-bin/LWP.pl?url=http://en.wikipedia.org", ""];
var RTkey = "pfwh96pvezces4nybpv7qf8f";

$(function() {

  // $("#dialog").dialog({
  //   autoOpen: false,
  //   name: "untitled",
  //   width: 900,
  //   height: 600,
  //   modal: true,
  //   open: function() {
  //     $('.ui-widget-overlay').bind('click', function() {
  //       $('#dialog').dialog('close');
  //     })
  //   }
  // }); //   dialog   initalize

  // $("#dChoose").dialog({
  //   autoOpen: false,
  //   name: "untitled",
  //   width: 200,
  //   height: 300
  // });
  /**
   * Set up the Autocomplete for the list of films
   */
  $("#Films").autocomplete({
    //  source:   'auto_complete.json', //lets just use some local test data for now ;)
    //  source:     "/cgi-bin/TMDB1.pl",  
    source: function(request, response) {
      $.getJSON("http://api.themoviedb.org/3/search/tv?" + key, {
        query: request.term
      }, function(tvs) {
        response(tvs.results);

      });
    },
    minLength: 2, //no point in search for tvs with only 1 character (is there?)
    delay: 200, //wait 1/2 second before contacting the server
    focus: function(event, tv) {
      //an item is being focussed on
      $(this).val(tv.item.name);
      return false;
    },
    // select: function(event, tv) {
    //     var Bailey = "<img src='/Images/loading.gif' alt='loading this Page' border='0' />";
    //     $('#intro').html(Bailey);
    //     $('#intro').show();
    //     $('#results').hide();
    //     //an item has been selected so lets have a look at it
    //     //    console.log('tv Selected: ', tv + tv.item.id ); //take a look at the browser's console.
    //     //     html= "<div class='outer'><div class='inner'><span class='left'>" + tv.item.poster_path + "<\/span><span class='right'><strong>&nbsp; &nbsp; " + tv.item.title + "<\/strong>&nbsp; &nbsp; (" + tv.item.release_date +")<\/span></div></div>";
    //     var thistv = tv.item;
    //     console.log(thistv)
    //     html = "<div class='outer'><div class='inner'><span class='left'> <img  width='45' height='68' src=" + ImgPath + "w92" + thistv.poster_path + "><\/span><span class='right'><strong>&nbsp; &nbsp; " + thistv.name + "<\/strong>&nbsp; &nbsp; (" + thistv.first_air_date + ")<\/span></div></div>";

        //lets show the information that's been selected

        // $('#response').html(html);
        // var link = "http://api.themoviedb.org/3/tv/" + thistv.id;
        // var TMDB_id;
        // //  alert(link);   
        // $.ajax({
        //   type: 'GET',
        //   url: link + "?" + key + "&append_to_response=casts,images,trailers",
        //   async: false,
        //   jsonpCallback: 'testing',
        //   contentType: 'application/json',
        //   dataType: 'jsonp',
        //   success: function(json) {
        //     //           If get success responce build html output
        //     console.dir(json);
        //     $('#TMDBposter').html('<img src="' + ImgPath + 'w185' + json.poster_path + '" >');
        //     $('#tOverview').html(json.overview);
        //     $('#TMDBtitle').html('<h1>' + json.name + '</h1> (' + json.release_date + ') Run Time: ' + json.runtime + ' min');
        //     if (json.tagline.length > 0) {
        //       $('#TMDBTag').html('<h3>Tagline</h3><p>' + json.tagline + '</p>');
        //     } else {
        //       $('#TMDBTag').remove();
        //     }

        //     var total = json.casts.cast.length; // how many cast members
        //     var i = 0;
        //     var html = []; // html is an array use push to build array
        //     while (i < total) { // loop through cast members
        //       html.push('<li>');
        //       if (json.casts.cast[i].profile_path != null) // is there a  profile picture
        //       {
        //         html.push('<img src="' + ImgPath + 'w45' + json.casts.cast[i].profile_path + '" name="' + json.casts.cast[i].name + '"/>');
        //       } else {
        //         html.push('<img src="/Images/JohnWayneSml.png" name="No profile picture"/>');
        //       }
        //       var chars = json.casts.cast[i].character; // Only show 2  character
        //       var Len = chars.split('/').length;
        //       var character;
        //       if (Len > 2) {
        //         CHARS = chars.split('/');
        //         CT = [];
        //         C = 0;
        //         while (C < 2) {
        //           CT.push(CHARS[C]);
        //           C = C + 1;
        //         }
        //         character = CT.join(' / ');
        //       } else {
        //         character = json.casts.cast[i].character;
        //       }
        //       html.push('<div class="text"> <a href="http://api.themoviedb.org/3/person/' + json.casts.cast[i].id + '" class="actor">' + json.casts.cast[i].name, '</a><br />', character, '</div>');
        //       html.push('</li>');
        //       i = i + 1;
        //     }

        //     $('#castList').html(html.join('')); // print the html to castList dib

        //     var total = json.casts.crew.length; // do same for crew 
        //     var i = 0;
        //     var html = [];
        //     while (i < total) {
        //       html.push('<li <a href="http://api.themoviedb.org/3/person/' + json.casts.crew[i].id + '" class="actor" >');
        //       if (json.casts.crew[i].profile_path != null) {
        //         html.push('<img src="' + ImgPath + 'w45' + json.casts.crew[i].profile_path + '" name="' + json.casts.crew[i].name + '"/>');
        //       } else {
        //         html.push('<img src="/Images/JohnWayneSml.png" name="No profile picture"/>');
        //       }

        //       html.push('<div class="text"> <a href="http://api.themoviedb.org/3/person/' + json.casts.crew[i].id + '" class="actor">' + json.casts.crew[i].name, '</a><br />', json.casts.crew[i].job, '</div>');
        //       html.push('</a></li>');
        //       i = i + 1;
        //     }

        //     $('#crewList').html(html.join(''));

        //     var total = json.genres.length;
        //     var i = 0;
        //     var html = [];
        //     while (i < total) {
        //       html.push('<li>');
        //       html.push(json.genres[i].name);
        //       html.push('</li>');
        //       i = i + 1;
        //     }

        //     $('#genres').html(html.join(''));

        //     var total = json.images.backdrops.length; // build backdrops adding fancybox class & group
        //     var i = 0;
        //     var html = [];
        //     while (i < total) {
        //       html.push('<li>');
        //       html.push('<a href="' + ImgPath + 'original' + json.images.backdrops[i].file_path + '" class="Backdrops" data-fancybox-group="backdrops" >');
        //       html.push('<img src="' + ImgPath + 'w300' + json.images.backdrops[i].file_path + '"/>');
        //       html.push('</a></li>');
        //       i = i + 1;
        //     }

        //     $('#backdrops').html(html.join(''));
        //     var total = json.trailers.youtube.length;
        //     var i = 0;
        //     var html = [];
        //     var YTpath = "http://www.youtube.com/watch?v=";
        //     while (i < total) {
        //       html.push('<li>');
        //       html.push('<a href="' + YTpath + json.trailers.youtube[i].source + '" class="YT" >');
        //       html.push(json.trailers.youtube[i].name + ' ' + json.trailers.youtube[i].size);
        //       html.push('</a></li>');
        //       i = i + 1;
        //     }
        //     $('#trailers').html(html.join(''));

        //     var IMDB = json.imdb_id; // start building links to external sites
        //     //              $('#IMDB').atrr('link',IMDB);
        //     var imdb = IMDB.replace(/tt/, "");
        //     //              $('#Tomato').attr('link',imdb);
        //     var Title = json.name;
        //     var counter = Title.split(' ').length; // Count number of spaces in title

        //     var wiki = Title.replace(/ /g, "_");
        //     if (counter === 1) {
        //       wiki = wiki + "_(film)"

        //     }
        //     $('#Wiki').attr("href", "/cgi-bin/LWP.pl?url=http://en.wikipedia.org/wiki/" + wiki); //    wikipedia tab
        //     var Amazon = Title.replace(/ /g, "%20");
        //     $('#Amazon').html('<a target="_blank" href="http://www.amazon.co.uk/s/?_encoding=UTF8&camp=1634&creative=19450&field-keywords=' + Amazon + '&linkCode=ur2&tag=tonswor-21&url=search-alias%3Ddvd-uk"><img src="/Images/buy-from-tanCom.gif" /> </a><img src="https://ir-uk.amazon-adsystem.com/e/ir?t=tonswor-21&l=ur2&o=2" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />');
        //     $('#TMDB-Review').attr("href", json.id);
        //     var TMDBURL = Title.replace(/ /g, "-");
        //     $('#TMDB_url').html('<a target="_blank" href="http://www.themoviedb.org/tv/' + json.id + '-' + TMDBURL + '"> more about ' + json.name + ' on themoviedb</a>');
        //     $('#IMDB_url').html('<a target="_blank" href="http://www.imdb.com/title/' + IMDB + '"> more about ' + json.name + ' on IMDB</a>');


        //     $(".actor").click(function(evt) { // bind the actor class so when click on name it opens dialog box
        //       evt.preventDefault();
        //       FindActor.call(this, evt);
        //     });


        //     $(".YT").click(function() { // bind the youtube class so when click on link it opens in a fancy box            
        //       $.fancybox({
        //         'padding': 0,
        //         'autoScale': false,
        //         'transitionIn': 'none',
        //         'transitionOut': 'none',
        //         'name': this.name,
        //         'width': 680,
        //         'height': 495,
        //         'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
        //         'type': 'swf',
        //         'swf': {
        //           'wmode': 'transparent',
        //           'allowfullscreen': 'true'
        //         }
        //       });

        //       return false;
        //     });

        //     $('.Backdrops').fancybox({ // bind the backdrop class so when click on image it opens in a fancy box
        //       openEffect: 'none',
        //       closeEffect: 'none',

        //       prevEffect: 'none',
        //       nextEffect: 'none',

        //       closeBtn: false,

        //       helpers: {
        //         title: {
        //           type: 'inside'
        //         },
        //         buttons: {}
        //       },

        //       afterLoad: function() {
        //         this.name = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.name ? ' - ' + this.name : '');
        //       }
        //     }); //      Backdrops
        //     $('#tabs').tabs();
        //     $('#intro').hide();
        //     $('#results').show();
        //     // Load internal links into parent tab unless target = blank
        //     $("#tabs").children("div").on("click", "a[target!='_blank']", function(evt) {
        //       evt.preventDefault();
        //       var indexZeroBased = $(this).closest(".ui-tabs-panel").index("#tabs>div");
        //       if (indexZeroBased === 1) {
        //         var url = urls[indexZeroBased];
        //         var href = url + $(this).attr("href");
        //         //                     alert ("Clicked inside " + href);
        //         if (typeof(href) !== "undefined") {
        //           $(this).closest(".ui-tabs-panel").load(encodeURI(href));

        //         }
        //       }
        //     });

        //   },
        //   error: function(e) {
        //     console.log(e.message);
        //   }
        // }); // End Building response html



        // $('#TMDB-Review').click(function(evt) { // this link is in the document on load so dosn't need binding
        //   evt.preventDefault();
        //   $('#TMDBreviewWrap').toggle(); // show / hide this div must be hidden in css to start with
        //   $('#TMDB-Review').html(($('#rt').text() == 'Show reviews') ? 'Hide reviews' : 'Show reviews');
        //   var bg = "BGa"; //  set background color
        //   var link = "http://api.themoviedb.org/3/tv/" + $(this).attr('href') + "/reviews";
        //   //           console.log("Review link " + link);
        //   if (!$('#TMDBreviewWrap').attr('Done')) {
        //     $.ajax({
        //       type: 'GET',
        //       url: link + "?" + key,
        //       async: false,
        //       jsonpCallback: 'testing',
        //       contentType: 'application/json',
        //       dataType: 'jsonp',
        //       success: function(json) {
        //         //                     console.dir(json);
        //         if (json.total_results >= 1) {
        //           for (var i = 0; i < json.results.length; i++) {
        //             if (bg == "BGa") // altinate background color                                                              
        //             {
        //               bg = "BGb";
        //             } else {
        //               bg = "BGa";
        //             }
        //             $('#Treview').append('<div class="' + bg + '"><p><strong>Author:</strong> ' + json.results[i].author + '</p><p>' + json.results[i].content + '</p>');

        //           }
        //         } else {
        //           $('#Treview').html("<div class=" + bg + "><p><strong>Sorry No Reviews for this film</strong></p></div>")
        //         }
        //         $('#TMDBreviewWrap').attr('Done', "yes"); // when hide reveiws dosn't fetch them again
        //       },
        //       error: function(e) {
        //         console.log(e.message);
        //       }
        //     });

        //   }

        // }); // End loading reviews 


     // } //  end sucess loading  


    //format the response so it looks nice in the list
  }).data("uiAutocomplete")._renderItem = function(ul, tv) {
    console.log(tv)
    var inner_html = "<a><img width='45' height='68' src=" + ImgPath + "w92" + tv.poster_path + "> <strong>" + tv.name + "</strong> (" + tv.first_air_date + ")</a>";
    return $("<li></li>")
      .data("item.autocomplete", tv)
      .append(inner_html)
      .appendTo(ul);
  };



  //
  //    });                                                          // end rottentomatoes tab 

}); // end jQuery on load function

// function FindActor(evt) { // loads person deatail into dialog box
//   evt.preventDefault();
//   //     console.log(this); 
//   var link = $(this).attr("href") + '?' + key;
//   //      console.log(link); 
//   $.ajax({
//     type: 'GET',
//     url: link,
//     async: false,
//     jsonpCallback: 'ning',
//     contentType: 'application/json',
//     dataType: 'jsonp',
//     success: function(json) { // Build html
//       //               console.dir(json);
//       $('#Name').html(json.name);
//       if (json.profile_path != null) // is there a picture
//       {
//         $('#PeoplePoster').html('<img  class="FBimg" src="' + ImgPath + 'w150' + json.profile_path + '" name="' + json.name + '">');
//       } else {
//         $('#PeoplePoster').html('<img  class="FBimg" src="/Images/JohnWayneBig.png" name="No profile picture"/>');
//       }



//       $('#BioDiv').html(json.biography);
//       $('#pFactUL').empty();
//       if (json.also_known_as.length > 0) {
//         $('#pFactUL').append('<li><strong>Also Known As</strong> ' + json.also_known_as + '</li>');
//       }
//       $('#pFactUL').append('<li><strong>Date of Birth: </strong> ' + json.birthday + '</li>');
//       $('#pFactUL').append('<li><strong>Place of Birth: </strong> ' + json.place_of_birth + '</li>');
//       $('#pFactUL').append('<li><strong>IMDB: </strong><a class="actor" target="_blank" href="http://www.imdb.com/name/' + json.imdb_id + '">' + json.name + '</a></li>');
//       name = json.name.replace(/ /g, "-");

//       $('#pFactUL').append('<li><strong>TMDB: </strong><a class="actor" target="_blank" href="http://www.themoviedb.org/person/' + json.id + '-' + name + '">' + json.name + '</a></li>');
//       if (json.deathday.length > 0) // have thay died only creat html if yes
//       {
//         $('#pFactUL').append('<li><strong>Date of Death: </strong> ' + json.deathday + '</li>');
//       }
//       if (json.homepage.length > 0) {
//         //                   console.log("json.homepage " + json.homepage);
//         $('#pFactUL').append('<li><strong>Home Page: </strong><a target="_blank" href="' + json.homepage + '">' + json.homepage + '</a></li>');
//       }

//     },
//     error: function(e) {
//       console.log(e.message);
//       e.preventDefault();
//     }
//   });
//   $("#dialog").dialog("option", "name", $(this).text()).dialog("open");

// }
