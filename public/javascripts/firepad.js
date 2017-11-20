function init() {
    // Initialize Firebase.
    // TODO: replace with your Firebase project configuration.
    var config = {
        apiKey: "AIzaSyCI90prOBGvod-lFHYtFOKktnpXgolRWhE",
        authDomain: "note-taking-system.firebaseapp.com",
        databaseURL: "https://note-taking-system.firebaseio.com",
        projectId: "note-taking-system",
        storageBucket: "note-taking-system.appspot.com",
        messagingSenderId: "777619796758"
    };

    firebase.initializeApp(config);
    //var firepadRef = firebase.database().ref();
    var firepadRef = firebase.database().ref().child('text');

    var codeMirror = CodeMirror(document.getElementById('firepad-container'), { lineWrapping: true });
        
    var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror,
        { richTextToolbar: true, richTextShortcuts: true }
    );
    firepad.on('ready', function() {
        if(firepad.isHistoryEmpty()) {
            firepad.setHtml('<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/><br/>Collaborative-editing made easy.\n');
        }
    });
}