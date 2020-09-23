import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
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
     <h1 className="drum-info">{props.display}</h1>
    </div>
  )
};

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.playDrum = this.playDrum.bind(this);
  }

  playDrum(action, key) {
    if (action === 'clickPlay') {
      const drumSound = document.getElementById(key);
      drumSound.play();
    } else if (action === "keyPlay") {
        const formatKey = key.toUpperCase();
        const drumSound = document.getElementById(formatKey);
        drumSound.play();
    }
  }

  render() {
    return (
        <div className="drum-pad" id={this.props.id} 
            onClick={() => {this.playDrum('clickPlay', this.props.kbd);
            this.props.click(this.props.kbd.toLowerCase())}}>
          <KeyboardEventHandler
            handleKeys={[this.props.kbd]}
            onKeyEvent={(key) => this.playDrum('keyPlay', key)}/>
          {this.props.kbd}
          <audio className="clip" id={this.props.kbd} src={this.props.drum}/>
        </div>
    );
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playingDrum: ' ',
    }
    this.setDisplay = this.setDisplay.bind(this);
  }

  drumMap = {
    'q': crash1, 'w': crash2, 'e': crash3,
    'a': tom1, 's': tom2, 'd': tom3,
    'z': kick, 'x': snare, 'c': hihat,
  }

  drumDisplayMap = {
    'q': 'crash 1', 'w': 'crash 2', 'e': 'crash 3',
    'a': 'tom 1', 's': 'tom 2', 'd': 'tom 3',
    'z': 'kick', 'x': 'snare', 'c': 'hi-hat',
  }

  setDisplay(drum) {
    this.setState ({
      playingDrum: this.drumDisplayMap[drum],
    });
  }

  render() {
    return (
      <div id="drum-machine">
        <KeyboardEventHandler 
          handleKeys={['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c']}
          onKeyEvent = {(key) => {this.setDisplay(key)}}
        />
        <table className="keypad">
            <tbody>
            <tr>
              <td><DrumPad id="crash1" drum={this.drumMap['q']} key="q" kbd="Q" click={this.setDisplay}/></td>
              <td><DrumPad id="crash2" drum={this.drumMap['w']} key="w" kbd="W" click={this.setDisplay}/></td>
              <td><DrumPad id="crash3" drum={this.drumMap['e']} key="e" kbd="E" click={this.setDisplay}/></td>
            </tr>
            <tr>
              <td><DrumPad id="tom1" drum={this.drumMap['a']} key="a" kbd="A" click={this.setDisplay}/></td>
              <td><DrumPad id="tom2" drum={this.drumMap['s']} key="s" kbd="S" click={this.setDisplay}/></td>
              <td><DrumPad id="tom3" drum={this.drumMap['d']} key="d" kbd="D" click={this.setDisplay}/></td>
            </tr>
            <tr>
              <td><DrumPad id="kick" drum={this.drumMap['z']} key="z" kbd="Z" click={this.setDisplay}/></td>
              <td><DrumPad id="snare" drum={this.drumMap['x']} key="x" kbd="X" click={this.setDisplay}/></td>
              <td><DrumPad id="hihat" drum={this.drumMap['c']} key="c" kbd="C" click={this.setDisplay}/></td>
            </tr>
            </tbody>
        </table>
        <Display display={this.state.playingDrum}/>
        <ReactFCCtest />
      </div>
    )
  }
}

export default App;

