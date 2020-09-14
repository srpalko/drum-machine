import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Sound from 'react-sound';
import './App.css';
import kick from './kick.wav';
import snare from './snare.wav';
import hihat from './hi-hat.wav';
import tom1 from './tom1.wav';
import tom2 from './tom2.wav';
import tom3 from './tom3.wav';
import crash1 from './crash1.wav';
import crash2 from './crash2.wav';
import crash3 from './crash3.wav';
import ReactFCCtest from 'react-fcctest';


const Display = (props) => {
  return (
    <div id="display">

    </div>
  )
};

const DrumPad = (props) => {
  return (
    <button className="drum-pad" id={props.id}>
      {props.kbd}
      <audio src={props.drum} className="clip" id={props.kbd}/>
    </button>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drumMap: {
        'q': crash1, 'w': crash2, 'e': crash3,
        'a': tom1, 's': tom2, 'd': tom3,
        'z': kick, 'x': snare, 'c': hihat,
      },
    }
  }

  render() {
    return (
      <div id="drum-machine">
        <Display />
        <table>
          <tr>
            <td><DrumPad id="crash1" drum={this.state.drumMap['q']} key="Q" kbd="Q"/></td>
            <td><DrumPad id="crash2" drum={this.state.drumMap['w']} key="W" kbd="W"/></td>
            <td><DrumPad id="crash3" drum={this.state.drumMap['e']} key="E" kbd="E"/></td>
          </tr>
          <tr>
            <td><DrumPad id="tom1" drum={this.state.drumMap['a']} key="A" kbd="A"/></td>
            <td><DrumPad id="tom2" drum={this.state.drumMap['s']} key="S" kbd="S"/></td>
            <td><DrumPad id="tom3" drum={this.state.drumMap['d']} key="D" kbd="D"/></td>
          </tr>
          <tr>
            <td><DrumPad id="kick" drum={this.state.drumMap['z']} key="Z" kbd="Z"/></td>
            <td><DrumPad id="snare" drum={this.state.drumMap['x']} key="X" kbd="X"/></td>
            <td><DrumPad id="hihat" drum={this.state.drumMap['c']} key="C" kbd="C"/></td>
          </tr>
        </table>
        <ReactFCCtest />
      </div>
    )
  }
}

const drumMapper = (setNum) => {

  const drumMaps = [{
    'q': crash1, 'w': crash2, 'e': crash3,
    'a': tom1, 's': tom2, 'd': tom3,
    'z': kick, 'x': snare, 'c': hihat,
  }];

  return drumMaps[setNum + 1];
}

export default App;

