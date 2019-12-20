------------------------
The why of the project: 

Reading a bedtime story is a bonding ritual that almost every child gets to share with their parent.
It is both a teaching moment (helping your child to learn and appreciate the language that you share) as well 
as a shared moment in time that will never come again.

This tool allows a parent to read with their child and save that recording in real time, with all the 
laughs and giggles.

Once the book is recorded, the child (or others) can simply replay that reading with the click of a button.

------------------------
The overview of the project:

At a high level, what we are simply doing is creating a website that has a particular format to look and behave like a book (it contain pages of text and images that are sequential) AND more importantly, that allows anyone to simply recording someone reading that book and replay it at a later date. It also allows readers to share copies of their readings with others (such as distant relatives or parents when they are away from home).

Now, creating web content is not difficult and there are better platforms available than this if you do not want to embed audio. But, for this particular use case, this solution works well.

---------------
So, how do I do it?

If you want to record a book, you will simply:
  * download the contents of an ebook locally (example: into your Downloads folder in chrome).
  * Then you will run a local webserver (Called 'web server for chrome') that will serve up the 'ebook'.
  * then you will simply open your browser and record the book by pressing a button.

To replay the book, you simply open your browser and open the link. All of the previously saved audio is properly loaded into the book.

If you want to share it, the book(and associated files) can be simply pushed to a hosted website (like github.io) with two simple clicks.

It's just that easy.


--------------------------------------------------
High Level View (see next section for more Detailed Instructions)

1. Install two chrome extensions.
2. Download this site to your Downloads directory and unzip it.
3. Start the Webserver for chrome and point it at the downloads directory.
4. You now have an eBook (a website) specifically designed to allow the user to easily
   * Record reading the book 
   * Simply replay the reading by pushing a play button.

Why this is interesting: It is the simplicity of the model that allows a 5 year old (tested) or younger child to practice reading. It also allows a parent to simply record a book while reading with the child and to play it back whenever the child wishes.

The Story Player is 'browser agnostic' (the site works fine for playing the content in Safari on an Ipad, for example). 

The Story Recorder is a bit more restrictive (it currently requires Chrome), but it works very well on any Touch windows device. Seperate code is required for the webm to mp4 audio file transition to allow it to be used on an apple product (webm is coming soon to Apple - already in Beta).


Detailed Instructions:
=======================


To Record a Book:

1. Install two chrome programs. A Chrome Extension and a Chrome App.
  1.a. Chrome Extension: Install "Downloads Overwrite Already Existing Files"
    1.a.1.  In your chrome browser go to https://chrome.google.com/webstore/category/extensions?hl=en-US
            Install "Downloads Overwrite Already Existing Files"
            This extension allows us to save an audio file with the same name (it overwrites our previous recording)
            Here is the link:  
            https://chrome.google.com/webstore/detail/downloads-overwrite-alrea/lddjgfpjnifpeondafidennlcfagekbp?hl=en-US
            
            Don't trust the chrome store? Well, 
            The source code for extension is available at:
            https://github.com/zach-adams/downloads-overwrite-already-existing-files

  1.b. Chrome App: Install "Web Server for Chrome"
    A Web Server for Chrome, serves web pages from a local folder over the network, using HTTP. Runs offline.
    1.b.1. In your chrome browser go to the webstore and download it.
           https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en     
             Source Code: https://github.com/kzahel/web-server-chrome
           Once it is installed, you can access it via
            chrome://apps/
    1.b.2. Optional: Create a link on your desktop to quickly access the Chrome Server App without going through the store
    
      1.b.2.1 On a mac -  you will create a symbolic link (ln -s) to the application.
             Go to your desktop            
             /Users/administrator/Applications/Chrome Apps.localized/Web Server for Chrome.app

2. Download the book.  
  2.a. Download a sample story in the format - a Christmas Story
    2.a.1. Go to: https://github.com/chooseyourpath/chooseyourpath-private.github.io
    2.b.1. Select Clone or Download. Press "Download Zip". This will download the file to your Chrome Downloads Directory.
  2.b. Unzip the folder
    2.b.1. You should see the folder "chooseyourpath-private.github.io-master" in the root of your downloads folder
           NOTE: THE LOCATION OF THIS DIRECTORY MATTERS. If this folder is unzipped and you have a different directory structure
                 like Downloads/chooseyourpath-private.github.io-master/chooseyourpath-private.github.io-master/index 
                 You have a problem. This happened to me when I followed the instructions on windows.
 
 3. Start the local webserver and point it at your downloads directory. 
  3.a. If you installed it, you can start it by 
       https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en 
       and clicking "Launch App".
  3.b. Once the App Launches, you need to make one change (the directory you want to server the file from).
   3.b.1. To do this you need to Click "Choose Folder".
   3.b.2. Set this to your Chromes Download Directory
          don't know that that is, your Browsers current directory can be found listed in:
          Chrome Settings->Advanced->Downloads
4. View the website to either Record or Play your book
  4.a. Click the webserver URL http://127.0.0.1:8887/
        This will give you an Index of current directory...
  4.b. Click the folder chooseyourpath-private.github.io-master/
    4.b.1. This will read the index.html in that folder
    4.b.2. Enter your name as the reader and press "Start Recording"
           This will load the book with some starting parameters.
            http://127.0.0.1:8887/chooseyourpath-private.github.io-master/customer/17135/17135.html?bookID=17135&customerID=customer&recorderID=steve&recordbutton=
5. Recording the book.
  5.a.  Using the mouse (or tab keys to select), hover over the webpage.
        In recording mode, Text is grouped into <p> tags. Each <p> tag has an outline 
        mode.
  5.b.  Simply Press the "Red Record Button" on the left.
        This will start the recording. The Button will change to a darker red.
        If it is the first time you have recorded, you will be asked for permission
        to use your microphone.
  5.c.  To stop recording, press the Red Record button again.
  5.d.  What you just recorded will be played back automatically for you to review.
        You will be given a dialog box with an OK button and a Cancel Button with the text
        "I am playing your recording. Do you want me to save your recording?"
  5.e.  If you Press "OK", an audiofile containing your recording will be placed in your
        broswers default save folder (ie. "Downloads"). When you press the "Play button"
        to the immediate right of the record button, the recording that you just made will
        be played again.
  5.f. If you Press "Cancel", your current recording will be discarded.



To Playback the book:
1. Back at your list of books (index.html), is the list of books you can record or playback.
1.a. To playback your book, Simply 
  1.a.1.  open the website, type in the name you previously recorded the book as (ie. sophia or steve)
          ie.  Play a locally saved weBook  Reader's Name: steve Start Playing             
  1.a.2. Press Start Playing
   
