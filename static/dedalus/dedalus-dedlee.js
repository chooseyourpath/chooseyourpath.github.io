/**
 * dedalus-dadlee.js v0.9.0
 * 2013, Gustavo Di Pietro
 * Licensed under the GPL license (http://www.gnu.org/licenses/gpl-2.0.html)
**/

/**
 * Parse a Dedalus story in dedlee format and generate a standard Dedalus HTML-like story
 * @param  {jQuery} inputSource jQuery element that contains, in its body, the dedlee source
 * @param  {jQuery} target      jQuery element where to append the  output of the parsing
 */
Dedalus.prototype.parseDedlee = function (inputSource, target) {
    "use strict";
    var defaultGoogleVoiceID='en-US-Standard-B';
    /*jslint evil: true, white: true, nomen: true */
    /*global $, Dedalus*/
    
    /** In this block, I added the two parameters to allow us to inject default images into the DOM
     *  A strange side-effect of defining the variables within parseDedlee means that their scope is acutally
     * local and not global. Thus I needed to essentially access the global Variable
     * I dont think this is good scoping on this, but I will leave it as we only parse this file once
     * Best is the enemy of Done.
    */
    
    if (typeof window.playButtonImage == 'undefined'){
        var playButtonImage="../../static/common/Play-rounded-button-outline.svg";
        console.debug("parseDedlee:playButtonImage is undefined in story. setting playButtonImage="+playButtonImage);
    }else {
        playButtonImage=window.playButtonImage;
        console.debug("parseDedlee:playButtonImage defined in another File, its value is=" + window.playButtonImage);
    }
    
    if (typeof window.recordButtonImage == 'undefined'){
        var recordButtonImage="../../static/common/Microphone-outlined-circular-button.svg";
        console.debug("parseDedlee:recordButtonImage is undefined in story. setting recordButtonImage="+recordButtonImage);
    } else {
        recordButtonImage=window.recordButtonImage;
        console.debug("parseDedlee:recordButtonImage defined in another File, its value is=" +window.recordButtonImage);
    }
    if (typeof window.recordPlayButtonImage == 'undefined'){
        
        var recordPlayButtonImage="../../static/common/Left-arrow-outline-in-circular-button.svg";
        console.debug("parseDedlee:recordButtonImage is undefined in story. setting recordPlayButtonImage="+recordPlayButtonImage);
    }else {
        recordPlayButtonImage=window.recordPlayButtonImage;
        console.debug("parseDedlee:recordPlayButtonImage defined in another File, its value is=" + window.recordPlayButtonImage);
    }

    // google image
    if (typeof window.googleRecordButtonImage == 'undefined'){
        var googleRecordButtonImage="../../static/common/Microphone-outlined-circular-button.svg";
        console.debug("parseDedlee:googleRecordButtonImage is undefined in story. setting googleRecordButtonImage="+googleRecordButtonImage);
    } else {
        googleRecordButtonImage=window.googleRecordButtonImage;
        console.debug("parseDedlee:googleRecordButtonImage defined in another File, its value is=" +window.googleRecordButtonImage);
    }
    if (typeof window.googlePlayButtonImage == 'undefined'){
        var googlePlayButtonImage="../../static/common/Left-arrow-outline-in-circular-button.svg";
        console.debug("parseDedlee:googleRecordButtonImage is undefined in story. setting googlePlayButtonImage="+googlePlayButtonImage);
    }else {
        googlePlayButtonImage=window.googlePlayButtonImage;
        console.debug("parseDedlee:googlePlayButtonImage defined in another File, its value is=" + window.googlePlayButtonImage);
    }
    
    var currentCustomerID;
    if (typeof window.currentCustomerID == 'undefined'){
        currentCustomerID="unknownCustomer";
        console.debug("parseDedlee:currentCustomerID is undefined. setting currentCustomerID="+currentCustomerID);
    } else if (window.currentCustomerID == ""){
        currentCustomerID="unknownCustomer";
        console.debug("parseDedlee:currentCustomerID is undefined. setting currentCustomerID="+currentCustomerID);
    } else {
        //console.debug("parseDedlee:currentCustomerID defined in another File, its value is=" + window.currentCustomerID);
        currentCustomerID=window.currentCustomerID;
        console.debug("parseDedlee:currentCustomerID="+currentCustomerID);
    }
    
    var currentBookID;
    if (typeof window.currentBookID == 'undefined'){
        currentBookID="unknownBook";
        console.debug("parseDedlee:currentBookID is undefined. setting currentBookID=" + currentBookID);
        
    } else if (window.currentBookID == ''){
        currentBookID="unknownBook";
        console.debug("parseDedlee:currentBookID is ''. setting currentBookID=" + currentBookID);
    }
    else {
        //console.debug("parseDedlee:currentBookID defined in another File, its value is=" + window.currentBookID);
        currentBookID=window.currentBookID;
        console.debug("parseDedlee:currentBookID="+currentBookID);
    }
    
    var currentReaderID;
    var currentReaderIDDir;
    if (typeof window.currentReaderID == 'undefined')
    {
        currentReaderID="default";
        console.debug("parseDedlee:curentReaderID is undefined in story. setting readerID="+currentReaderID);
        currentReaderIDDir=currentReaderID +"/";
    }
    else if (window.currentReaderID == "" ){
        currentReaderID="default";
        console.debug("parseDedlee:curentReaderID value is ''. setting readerID="+currentReaderID);
        currentReaderIDDir=currentReaderID +"/";
    }
    else {
        //console.debug("parseDedlee:readerID defined in another File, its value is=" + window.currentReaderID);
        currentReaderID=window.currentReaderID;
        console.debug("parseDedlee:currentReaderID="+currentReaderID);
        currentReaderIDDir=currentReaderID +"/";
    }
    
    var currentRecorderID;
    var currentRecorderIDDir;
    if (typeof window.currentRecorderID == 'undefined')
    {
        currentRecorderID="default";
        console.debug("parseDedlee:curentRecorderID is undefined in story. setting recorderID="+currentRecorderID);
        currentRecorderIDDir=currentRecorderID +"/";
    }
    else if (window.currentRecorderID == "" ){
        currentRecorderID="default";
        console.debug("parseDedlee:curentRecorderID value is ''. setting recorderID="+currentRecorderID);
        currentRecorderIDDir=currentRecorderID +"/";
    }
    else {
        //console.debug("parseDedlee:recorderID defined in another File, its value is=" + window.currentRecorderID);
        currentRecorderID=window.currentRecorderID;
        console.debug("parseDedlee:currentRecorderID="+currentRecorderID);
        currentRecorderIDDir=currentRecorderID +"/";
    }

    var currentGoogleVoiceID;
    var currentGoogleVoiceIDDir;
    if (typeof window.currentGoogleVoiceID == 'undefined')
    {
        currentGoogleVoiceID="google";
        console.debug("parseDedlee:currentGoogleVoiceID is undefined in story. setting currentGoogleVoiceID="+currentGoogleVoiceID);
        currentGoogleVoiceIDDir=currentGoogleVoiceID +"/";
    }
    else if (window.currentGoogleVoiceID == "" ){
        currentGoogleVoiceID=defaultGoogleVoiceID;
        console.debug("parseDedlee:currentGoogleVoiceID value is ''. setting currentGoogleVoiceID="+currentGoogleVoiceID);
        currentGoogleVoiceIDDir=currentGoogleVoiceID +"/";
    }
    else {
        console.debug("parseDedlee:currentGoogleVoiceID defined in another File, its value is=" + window.currentGoogleVoiceID);
        currentGoogleVoiceID=window.currentGoogleVoiceID;
        console.debug("parseDedlee:currentGoogleVoiceID="+currentGoogleVoiceID);
        currentGoogleVoiceIDDir=currentGoogleVoiceID +"/";
    }
    
    var i,
        lineCounter,
        cleanSource    = Dedalus.getRawContent(inputSource),
        sourceLines    = cleanSource.match(/[^\r\n]+/g),
        notEmptyLines  = removeEmptyLinesAndComments(sourceLines),
        source         = indentToMin(notEmptyLines),
        scriptTags     = ['initscript', 'beforeEveryThing', 'beforeEveryPageTurn', 'beforeEveryParagraphShown', 'afterEveryThing', 'afterEveryPageTurn', 'afterEveryParagraphShown'];

    /**
     * Actual function that operate the parsing based on rules and substitutions
     * @return {[type]} [description]
     */
    function parseBlock () {
        var lineNum         = 0,
            relativeLineNum = 0,
            line            = '',
            out             = '',
            rules           = [
                // Title tag. Get the first line of dedlee source and treat it like the story title
                {
                    type       : 'title',
                    check      : function () { return lineNum === 0; },
                    singleLine : true,
                    openTag    : function () { return '<title>' + line + '</title>'; },
                    closeTag   : null
                },
                // Initscript and before/after actions. Just add the content to the appropriate tag
                {
                    type       : 'scriptTag',
                    check      : function () { return scriptTags.indexOf(line) !== -1; },
                    singleLine : false,
                    openTag    : function () { return '<' + line + '>'; },
                    closeTag   : function () { return '</' + line + '>'; }
                },
                // Objects. Turn o.OBJECT_ID "OPTIONAL_INVENTORY_NAME" in
                // <obj id="OBJECT_ID" inventoryName="OPTIONAL_INVENTORY_NAME">
                {
                    type       : 'object',
                    check      : function () { return line.ltrim().startsWith('o.'); },
                    singleLine : false,
                    openTag    : function () {
                        var maybeInventory = (line.match(/\"(.*)\"/) || [])[1],
                            inventory      = maybeInventory ? 'inventoryName="' + maybeInventory + '"' : '',
                            cleanLine      = line.replace(/(\".*\")/, ''),
                            split          = cleanLine.trim().split('.'),
                            objectId       = split[1],
                            objectClass    = split.length === 3 ? 'class="' + split[2] + '"' : '';


                        return '<obj id="' + objectId + '" ' + inventory + ' ' + objectClass + '>';
                    },
                    closeTag   : function () { return '</obj>'; }
                },
                // Characters. Just like Objects
                {
                    type       : 'character',
                    check      : function () { return line.ltrim().startsWith('c.'); },
                    singleLine : false,
                    openTag    : function () {
                        var maybeInventory = (line.match(/\"(.*)\"/) || [])[1],
                            inventory      = maybeInventory ? 'inventoryName="' + maybeInventory + '"' : '',
                            split          = line.trim().split('.'),
                            characterId    = split[1],
                            characterClass = split.length === 3 ? 'class="' + split[2] + '"' : '';


                        return '<character id="' + characterId + '" ' + inventory + ' ' + characterClass + '>';
                    },
                    closeTag   : function () { return '</obj>'; }
                },
                // Object and characted actions. Look for every line in double quotes
                // and treat it the the action id, for example:
                //
                // "Examine"
                //      Handome as usual
                //
                // generates:
                // <action id="Examine">
                //      Handome as usual
                // </Action>
                {
                    type       : 'action',
                    check      : function (currentRule) { return (currentRule === 'object' || currentRule === 'character') && line.ltrim().startsWith('"'); },
                    singleLine : false,
                    openTag    : function () { return '<action id="' + line.ltrim().replace(/\"+/g, '') + '">'; },
                    closeTag   : function () { return '</action>'; }
                },
                // Action when clause. A string starting with "when", right after
                // the beninning of an action produces the <when> tag with its content
                {
                    type       : 'when',
                    check      : function (currentRule) { return currentRule === 'action' && line.ltrim().startsWith('when') && relativeLineNum === 0; },
                    singleLine : true,
                    openTag    : function () { return '<when>' + line.ltrim().replace(/^when /, '') + '</when>'; },
                    closeTag   : null
                },
                // Combination actions. Turn with.OBJECT_ID in <with id="object">
                {
                    type       : 'with',
                    check      : function (currentRule) { return currentRule === 'action' && line.ltrim().startsWith('with'); },
                    singleLine : false,
                    openTag    : function () {
                        var split    = line.trim().split('.'),
                            objectId = split[1];

                        return '<with id="' + objectId + '">';
                    },
                    closeTag   : function () { return "</with>"; }
                },
                // Pages. Turn p.PAGE_ID in <page id="PAGE_ID">
                {
                    type       : 'page',
                    check      : function () { return line.ltrim().startsWith('page.'); },
                    singleLine : false,
                    openTag    : function () {
                        var split      = line.trim().split('.'),
                            pageId     = split[1],
                            pageClass  = split.length === 3 ? 'class="' + split[2] + '"' : '';

                        return '<page id="' + pageId + '" ' + pageClass + '>';
                    },
                    closeTag   : function () { return '</page>'; }
                },
                // {
                //     type       : 'page_s',
                //     check      : function () { return line.ltrim().startsWith('page_s.'); },
                //     singleLine : false,
                //     openTag    : function () {
                //         var split      = line.trim().split('.'),
                //             pageId     = split[1],
                //             pageClass  = split.length === 3 ? 'class="' + split[2] + '"' : '';

                //         return '<page id="' + pageId + '" ' + pageClass + '>';
                //     },
                //     closeTag   : function () { 
                //         var split      = line.trim().split('.'),
                //             pageId     = split[1],
                //             pageClass  = split.length === 3 ? 'class="' + split[2] + '"' : '';
                //         console.debug("pageid="+pageId);
                //         var currentPageInt=parseInt(pageId);
                //         console.debug("currentPageInt:"+currentPageInt);
                //         var previousPageInt,nextPageInt;
                //         if (1==currentPageInt) {
                //             previousPageInt=1;
                //         } else {
                //             previousPageInt=currentPageInt-1;
                //         }
                //         nextPageInt=currentPageInt+1;
                //         var temp = "";
                //         var temp =
                //             "<hr>"+
                //             "<div class='container grid'>"+
                //             "<span class='item'><turn to='" + previousPageInt.toString()+"'>Previous Page</turn></span>"+
                //             "<span class='item'>- "+ currentPageInt.toString() + " -</span>"+
                //             "<span class='item'><turn to='" + nextPageInt.toString()+"'>Next Page</turn></span>"+
                //             "</div>";
                //         return temp + '</page>'; }
                // },
                {
                    type       : 'page-sequential-bottom',
                    check      : function () { return line.ltrim().startsWith('page_s_b.'); },
                    singleLine : false,
                    openTag    : function () {
                        var split      = line.trim().split('.'),
                            pageId     = split[1],
                            pageClass  = split.length === 3 ? 'class="' + split[2] + '"' : '';

                        return '<page id="' + pageId + '" ' + pageClass + '>';
                    },
                    closeTag   : function () { 
                        var split      = line.trim().split('.'),
                            pageId     = split[1],
                            pageClass  = split.length === 3 ? 'class="' + split[2] + '"' : '';
                        //console.debug("pageid="+pageId);
                        var currentPageInt=parseInt(pageId);
                        var previousPageInt,nextPageInt;
                        if (1==currentPageInt) {
                            previousPageInt=1;
                        } else {
                            previousPageInt=currentPageInt-1;
                        }
                        nextPageInt=currentPageInt+=1;
                        var temp = "";
                        var temp = 
                            "<div class='container grid'>"+
                            "<span class='item'><turn to='" + previousPageInt.toString()+"'>Previous Page</turn></span>"+
                            "<span class='item'>- "+ currentPageInt.toString() + " -</span>"+
                            "<span class='item'><turn to='" + nextPageInt.toString()+"'>Next Page</turn></span>"+
                            "</div>";
                        return temp + '</page>'; }
                },
              
                {
                    type       : 'page-sequential-top',
                    // check      : function () { return line.ltrim().startsWith('page_s_t.'); },
                    check      : function () { return line.ltrim().startsWith('page_s.'); },
                    singleLine : false,
                    openTag    : function () {
                        var split      = line.trim().split('.'),
                        pageId     = split[1],
                        pageClass  = split.length === 3 ? 'class="' + split[2] + '"' : '';
                        //console.debug("pageid="+pageId);
                        var currentPageInt=parseInt(pageId);
                        var previousPageInt,nextPageInt;
                        if (1==currentPageInt) {
                            previousPageInt=1;
                        } else {
                            previousPageInt=currentPageInt-1;
                        }
                        nextPageInt=currentPageInt+1;
                        //console.debug("page-sequential-top:previousPageInt="+previousPageInt);
                        //console.debug("page-sequential-top:curentPageInt="+currentPageInt);
                        //console.debug("page-sequential-top:nextPageInt="+nextPageInt);
                        var temp = "";
                        var temp = 
                            "<hr>" + 
                            "<div class='container grid'>"+
                            "<span class='item'><turn to='" + previousPageInt.toString()+"'>Previous</turn></span>"+
                            "<span class='item'>- "+ currentPageInt.toString() + " -</span>"+
                            "<span class='item'><turn to='" + nextPageInt.toString()+"'>Next</turn></span>"+
                            "</div>" +
                            "<hr>";
                        
                        return '<page id="' + pageId + '" ' + pageClass + '>'+temp;
                    },

                    closeTag   : function () { 
                        return '</page>'; }
                },
              
                // Paragraphs. Turn pa.PARAGRAPH_ID in <p id="PARAGRAPH_ID">
                {
                    type       : 'paragraphs',
                    check      : function () { return line.ltrim().startsWith('p.'); },
                    singleLine : false,
                    openTag    : function () {
                        var split          = line.trim().split('.'),
                            paragraphId    = split[1],
                            paragraphClass = split.length === 3 ? 'class="' + split[2] + '"' : '';
                        //origainl codereturn '<div class="outline"><p id="' + paragraphId + '" ' + paragraphClass + '>';
                        var temp = '<div class="outline"><p id="' + paragraphId + '" ' + paragraphClass + '>';
                        if ('1_1' == paragraphId ) console.debug("paragraphs:OpenTag:" + temp);
                        return temp;
                    },
                    closeTag   : function () { 
                        var split          = line.trim().split('.'),
                            paragraphId    = split[1],
                            paragraphClass = split.length === 3 ? 'class="' + split[2] + '"' : '';

                        //console.debug("screenreader="+screenreader);
                        //console.debug("playbutton="+playButton);
                        //console.debug("recordbutton="+recordButton);
                        var temp="";

                        //audio for playback
                        var playAudioID    = paragraphId + "_a";
                        var playAudioFileNameWebm = currentCustomerID + "." +
                                                    currentBookID + "." +
                                                    currentReaderID + "." + 
                                                    playAudioID + "." +
                                                    "webm";
                                                    
                        var playAudioFileNameMp3 = currentCustomerID + "." +
                                                    currentBookID + "." +
                                                    currentReaderID + "." + 
                                                    playAudioID + "." +
                                                    "mp3";
                                                    
                        var playButtonID       = paragraphId + "_a_pb";                           

                        //console.debug("dedalus-dedlee.js:recordedAudioFileName=" + recordedAudioFileName);
                        temp=temp.concat("<audio  id='"+ playAudioID + "' preload='none' onerror='this.onerror=null;console.debug(\"missing:\"+this.src);disableElements(\"" + paragraphId + "_a_pb\");'>");
                        temp=temp.concat("<source onerror=\"console.error('../../../playAudioFileNameWebm failedToLoad')\" src='" + "../../../" + playAudioFileNameWebm + "' type='audio/webm' > ");    
                        // from the github server (where we will copy the local copy)
                        temp=temp.concat("<source src='" + "audio/" + playAudioFileNameWebm + "' type='audio/webm' > ");
                        temp=temp.concat("<source src='" + "audio/" + playAudioFileNameMp3 + "' type='audio/mp3' > ");
                        temp=temp.concat("</audio>");
                

                        // temp=temp.concat("<div class='tooltip'>Hover over me");
                        // temp=temp.concat("<span class='tooltiptext'>Tooltip text</span>");
                        // temp=temp.concat("</div>");
                        if (true == playButton) {
                            //console.debug("dedalus-dedlee.js:playButton="+playButton);
                            temp=temp.concat("<div class='tooltip'>");
                                temp=temp.concat("<button id='" + playButtonID + "' tabindex='-1' class='playingButtons' onclick=\"pauseOthersAndTogglePlay('"+ playAudioID +"');\">");
                                    temp=temp.concat("<img src=\"" + playButtonImage + "\" alt=\"play\" width=\"95\" height=\"45\" >");               
                                    temp=temp.concat("<span class=\"tooltiptext\">Play as: " + currentReaderID + "</span>");
                                temp=temp.concat("</button> "); 
                            temp=temp.concat("</div>");
                         }
                        //audio for recording



                        //audio for playback
                        //NOTE 1: we want the recorded audio file name to be the same as play
                        var recordAudioID    = paragraphId + "_a_temp";
                        var recordAudioFileName = currentCustomerID + "." +
                                                currentBookID + "." +
                                                currentRecorderID + "." + 
                                                playAudioID;     
                        var recordAudioFileNameWebm = recordAudioFileName + "." + "webm";
                                                    
                        var recordAudioFileNameMp3 = recordAudioFileName + "." + "mp3";

                        var recordButtonId     = paragraphId + "_a_temp_rb";
                        var recordPlayButtonId = paragraphId + "_a_temp_pb";  

                        temp=temp.concat("<audio  id='"+ recordAudioID + "' preload='none' onerror='this.onerror=null;console.debug(\"missing:\"+this.src);disableElements(\"" + recordPlayButtonId + "\");'>");
                        temp=temp.concat("<source src='../../../"  + recordAudioFileNameWebm  + "' type='audio/webm' > ");
                        // from the github server (where we will copy the local copy)
                        temp=temp.concat("<source src='" + "audio/"  + recordAudioFileNameWebm + "' type='audio/webm' > ");                        
                        temp=temp.concat("</audio>");                  
                        
                        if(recordButton){
                            //console.debug("recordButtonId="+recordButtonId);
                            
                            var temp2 = "handleAction('" + recordAudioID + "','" + recordAudioFileName + "','" + recordButtonId + "','" + recordPlayButtonId + "')";
                            //console.debug("temp="+temp2);
                            temp=temp.concat("<div class='tooltip'>");
                                temp=temp.concat("<button id='"+ recordButtonId + "' type='button' tabindex='-1' class='recordingButtonsRecord' onmousedown="+ temp2 +">");
                                    temp=temp.concat("<img src=\"" + recordButtonImage   + "\" alt=\"start recording\" width=\"95\" height=\"45\" >");
                                    temp=temp.concat("<span class=\"tooltiptext\">Record as: "+currentRecorderID+"</span>");
                                temp=temp.concat("</button>");
                            temp=temp.concat("</div>");
                            
                            //console.debug("recordPlayButtonId="+recordPlayButtonId);
                            temp=temp.concat("<div class='tooltip'>");
                                temp=temp.concat("<button id='" + recordPlayButtonId + "' type='button' tabindex='-1' class='recordingButtonsPlay'  onclick=\"pauseOthersAndTogglePlay('" + recordAudioID + "');\">");
                                    temp=temp.concat("<img src=\"" + recordPlayButtonImage + "\" alt=\"play recording\"  width=\"95\" height=\"45\"> ");
                                    temp=temp.concat("<span class=\"tooltiptext\">Replay as: "+currentRecorderID+"</span>");
                                temp=temp.concat("</button>");
                            temp=temp.concat("</div>");
                        }


                        //todo: update the play and record audio file names to be constructed the same way
                        //NOTE 1: we want the googleed audio file name to be the same as play
                        var googleAudioID    = paragraphId + "_a_temp_google";
                        
                        var googleAudioFileName = currentCustomerID + "." +
                                                    currentBookID + "." +
                                                    currentRecorderID + "." + //NOTE THIS! not  google AudioID
                                                    playAudioID;
                        
                        var googleAudioFileNameWebm = googleAudioFileName + "." + "webm";
                                        //todo: change currentGoogleVoiceID to currentReaderGoogleID
                        var googleAudioFileNameMp3 = googleAudioFileName + "." + "mp3";

                        var googleRecordButtonId     = paragraphId + "_a_temp_google_rb";
                        var googlePlayButtonId = paragraphId + "_a_temp_google_pb";  

                        temp=temp.concat("<audio  id='"+ googleAudioID + "' preload='none' onerror='this.onerror=null;console.debug(\"missing:\"+this.src);disableElements(\"" + googlePlayButtonId + "\");'>");
                        temp=temp.concat("<source src='../../../"  + googleAudioFileNameWebm  + "' type='audio/webm' > ");
                        // from the github server (where we will copy the local copy)
                        temp=temp.concat("<source src='" + "audio/"  + googleAudioFileNameWebm + "' type='audio/webm' > ");                        
                        temp=temp.concat("</audio>");                  

                        if(googleButton){
                            //console.debug("googleRecordButtonId="+googleRecordButtonId);
                            //save audio based on text contained in paragraphId
                            console.log("dedalus-dedlee.js:516:currentGoogleVoiceID="+currentGoogleVoiceID);
                            var temp2="recordGoogleReading('"+paragraphId+"'"+ "," + "'"+googleAudioID+"'"+","+ "'"+googleAudioFileName+"'"+",'"+currentGoogleVoiceID+"')";
                            temp=temp.concat("<div class='tooltip'>");
                                temp=temp.concat("<button id='"+ googleRecordButtonId + "' type='button' tabindex='-1' class='recordingButtonsRecord' onmousedown="+ temp2 +">");
                                    temp=temp.concat("<img src=\"" + googleRecordButtonImage   + "\" alt=\"start googleing\" width=\"95\" height=\"45\" >");
                                    temp=temp.concat("<span class=\"tooltiptext\">Voice:"+currentGoogleVoiceID+"__Recordng as: "+currentRecorderID+"</span>");
                                temp=temp.concat("</button>");
                            temp=temp.concat("</div>");
                            
                            //console.debug("googlePlayButtonId="+googlePlayButtonId);
                            temp=temp.concat("<div class='tooltip'>");
                                temp=temp.concat("<button id='" + googlePlayButtonId + "' type='button' tabindex='-1' class='recordingButtonsPlay'  onclick=\"pauseOthersAndTogglePlay('" + googleAudioID + "');\">");
                                    temp=temp.concat("<img src=\"" + googlePlayButtonImage + "\" alt=\"play googleing\"  width=\"95\" height=\"45\"> ");
                                    temp=temp.concat("<span class=\"tooltiptext\">Replay as: "+currentRecorderID+"</span>");
                                temp=temp.concat("</button>");
                            temp=temp.concat("</div>");
                        }
                        temp=temp.concat('</p>');
                        temp=temp.concat(
                            "<script>" +
                            "if ( !screenreader && !playButton && !recordButton && !googleButton ){" +
                                "console.debug('!screenreader && !playButton && !recordButton:adding Hammer for:" + paragraphId + "');" +
                                "var myElement = returnLastElementByID('" + paragraphId + "');"+
                                "var mc = new Hammer.Manager(myElement);"+
                                "mc.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );"+
                                "mc.add( new Hammer.Tap({ event: 'singletap' }) );"+
                                "mc.get('doubletap').recognizeWith('singletap');"+
                                "mc.get('singletap').requireFailure('doubletap');"+
                                "mc.on('singletap' , function(ev) {"+
                                    "console.debug('singletap'+ev.type);"+
                                    "pauseOthersAndTogglePlay('" + paragraphId + "_a');"+
                                "});" +
                                "mc.on('doubletap', function(ev) {"+
                                    "console.debug('doubletap:'+ev.type+':doing nothing');"+
                                "});"+
                            "};"+
                        "</script>");
                        //console.debug("temp=\n"+temp);
                        
                        
                        temp=temp.concat("</div>");
                        if ('1_1' == paragraphId ) console.debug("paragraphs:CloseTag:" + temp);
                        return temp; 
                    }
                },
                // Everything else is just printed out like it is
                {
                    type       : 'other',
                    check      : function () { return true; },
                    singleLine : true,
                    openTag    : function () { return line; },
                    closeTag   : null
                }
            ],
            substRules = [
                // [[PAGE_ID]]link to page[[]] => <turn to="PAGE_ID">link to page</turn>
                {
                    applyTo    : 'page, paragraph, action',
                    replaceRgx : /\[\[(.*?)\]\](.*?)\[\[\]\]/g,
                    withRgx    : '<turn to="$1">$2</turn>'
                },
                // {{OBJECT_ID}}link to object{{}} => <interact with="OBJECT_ID">link to object</interact>
                {
                    applyTo    : 'page, paragraph, action',
                    replaceRgx : /\{\[(.*?)\]\}(.*?)\{\[\]\}/g,
                    withRgx    : '<interact with="$1">$2</interact>'
                },
                // (PARAGRAPH_ID))link to paragraph() => <show paragraph="PARAGRAPH_ID">link to paragraph</show>
                {
                    applyTo    : 'page, paragraph, action',
                    replaceRgx : /\(\((.*?)\)\)(.*?)\(\(\)\)/g,
                    withRgx    : '<show paragraph="$1">$2</show>'
                }
            ];

        /**
         * Recursive function to parse a block starting from the current line
         * to recognize a block, it uses the current indentation level and
         * keeps analyzing line by like till the block dedets (just like Python)
         * @param  {String} currentRule Parent block type (object, action, page...)
         */
        function _parseBlock (currentRule) {
            line            = source[lineNum];
            // Keep track of the line number *withing the block*
            relativeLineNum = 0;

            var i, rule,
                closeTag           = '',
                initialIndentation = intendationLevel(line);

            // Keep working till there are lines or code or the current block
            // ends
            do {
                // Search the appropriate rule
                for (i = 0; i < rules.length; i += 1) {
                        rule = rules[i];

                    if (rule.check.call(this, currentRule)) {
                        // Add the opening tag
                        out += rule.openTag() + '\n';

                        // Recursively analyze the block contained in the current
                        // one if it is not of type "single line"
                        if (!rule.singleLine) {
                            closeTag = rule.closeTag();

                            // Advance by one line to enter the contained block
                            // When done, go back by one line
                            lineNum += 1;
                            _parseBlock(rule.type);
                            lineNum -= 1;

                            // Close the tag
                            out += closeTag + '\n';
                        }

                        lineNum         += 1;
                        relativeLineNum += 1;
                        line            = source[lineNum];

                        break;
                    }
                }
            } while (line && intendationLevel(line) >= initialIndentation);
        }

        _parseBlock();

        target.append(out);

        // Withing every block of text that requires it, substitute placeholders
        // for links with actual <a>
        (function () {
            var substRule;

            function replaceLinks(index, el) {
                // Apply the replace rules to the raw content of the current element
                $(el).html(Dedalus.getRawContent($(el)).replace(substRule.replaceRgx, substRule.withRgx));

                // Search for <turn>, <show>, <interact> whose attribute contains a
                // dot and use it as an indicator of an id to be set. Example:
                // <turn to="page.pageId">link</turn> => <turn to="page" id="pageId">link</turn>
                // A third dot is treated like a class
                // <turn to="page.pageId.pageClass">link</turn> => <turn to="page" id="pageId" class="pageClass">link</turn>
                function setId(idx, e) {
                    e = $(e);
                    var split,
                        attrib    = (e.attr('to') && 'to') || (e.attr('with') && 'with') || (e.attr('paragraph') && 'paragraph'),
                        attribVal = e.attr(attrib);

                    if (attribVal.indexOf('.') !== -1) {
                        split = attribVal.split('.');
                        e.attr(attrib, split[0]);
                        e.attr('id', split[1]);
                        if (split.length === 3) {
                            e.addClass(split[2]);
                        }
                    }
                }
                $(el).find('turn, show, interact').each(setId);
            }

            for (i = 0; i < substRules.length; i += 1) {
                substRule = substRules[i];

                target.find(substRule.applyTo).each(replaceLinks);
            }
        }());

    }

    parseBlock();

    /* ** UTILITY FUNCTIONS ** */

    /**
     * Calculate the number of spaces in front of a string
     * @param  {String} str string to evaluate
     * @return {Integer}    number of spaces before the string
     */
    function intendationLevel(str) {
        return str.length - str.ltrim().length;
    }

    /**
     * Given an array of strings, return only those that are not empty and not
     * commented (staring with #)
     * @param  {Array} strings Strings to filter
     * @return {Array}         string without empty lines
     */
    function removeEmptyLinesAndComments(strings) {
        return strings.filter(function (str) {
            return str.trim() !== '' && !str.trim().startsWith('#');
        });
    }

    /**
     * Find the minimum indentation level of an array of strings and align
     * all of them to the lower one, for example:
     * ---
     *         AAA
     *             BBB
     *         CCC
     *                 DDD
     * ---
     * returns
     * ---
     * AAA
     *     BBB
     * CCC
     *         DDD
     * ---
     *
     * @param  {Array} strings String to align to the left
     * @return {Array}         Aligned strings
     */
    function indentToMin(strings) {
        var minIndentation =  Math.min.apply(Math,
                strings.map(function (line) {
                    return intendationLevel(line);
                }));

        return strings.map(function (line) {
            return line.substr(minIndentation).rtrim();
        });
    }

};
