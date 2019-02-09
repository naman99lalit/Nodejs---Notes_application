const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes=require('./notes1.js');

const titleOptions = {
  describe:'Title of note',
  demand:true,
  alias:'t'
};
const bodyOptions={
  describe:'Body of the note',
  demand:true,
  alias:'b'
};
const argv = yargs
    .command('add','Add a new note',{
      title:titleOptions,
      body:bodyOptions
    })
    .command('list','List all Nodes')
    .command('read','Reading the notes',{
      title:titleOptions
    })
    .command('remove','Removing a note',{
      title:titleOptions
    })
    .help()
    .argv;
var command = argv._[0];

if(command === 'add'){
  var note=notes.addNote(argv.title,argv.body);
  if(note){
    console.log('Note Created');
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
  }else{
    console.log('Note title taken');
  }
}
else if(command === 'list'){
  var allNotes=notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note)=>notes.logNote(note));
}
else if(command === 'read'){
  var readNotes=notes.getNote(argv.title);
  if(readNotes){
    console.log('Note Read');}
    else{
      console.log('Note not found in the list');
    }
}
else if(command ==='remove'){
  var noteRemoved=notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was Removed' : 'Note was not removed';
  console.log(message);
}
else{
  console.log('Nothing Entered');
}
