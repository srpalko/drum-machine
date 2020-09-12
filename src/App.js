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

const Pad = (props) => {
  return (
    <button className="drum-pad">
      {props.value}
    </button>
  );
};

class Display extends React.Component {

  renderPad(letter, id) {
    return (
      <Pad 
        key={letter}
        value={letter}
        id={id}
      />
    );
  }

  renderRow(numColumns, keysetRow) {
    const keySet = [
      ['Q', 'W', 'E'],
      ['A', 'S', 'D'],
      ['Z', 'X', 'C'],
    ];
    const drumId = [
      ['crash1', 'crash2', 'crash3'],
      ['tom1', 'tom2', 'tom3'],
      ['kick', 'snare', 'hihat']
    ];

    let row = [];
    for (let i = 0; i < numColumns; i++) {
      row.push(this.renderPad(keySet[keysetRow][i], drumId[keysetRow][i]))
    }
    return row;
  }

  renderGrid(numRows, numColumns) {
    let grid = [];
    for (let i = 0; i < numRows; i++) {
      grid.push(<div key={i}>{this.renderRow(numColumns, i)}</div>);
    }
    return grid;
  }

  render() {
    return (
      <div className="keypad">
        {this.renderGrid(3, 3)}
      </div>
    );
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drum: '',
      drumSound: '',
      soundStatus: 'STOPPED',
      finished: false,
    }
  }

  playDrum(key) {
    const drumMap = {
      q: 'Crash 1', w: 'Crash 2', e: 'Crash 3',
      a: 'Tom 1', s: 'Tom 2', d: 'Tom 3',
      z: 'Kick', x: 'Snare', c: 'Hi-hat',
    };

    const soundMap = {
      q: crash1, w: crash2, e: crash3,
      a: tom1, s: tom2, d: tom3,
      z: kick, x: snare, c: hihat,
    };

    this.stopDrum()

    this.setState ({
      drum: drumMap[key],
      drumSound: soundMap[key],
      soundStatus: 'PLAYING'
    });
  }

  stopDrum() {
    this.setState ({
      soundStatus: 'STOPPED',
    });
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="display">
          <Display drum={this.props.drum}/>
          <div id="drum-info">DRUM {this.state.drum}</div>
        </div>
        <Sound 
          url={this.state.drumSound}
          playStatus={this.state.soundStatus}
          autoLoad={true}
        />
        <KeyboardEventHandler
          handleKeys={['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c']}
          handleEventType="keydown"
          onKeyEvent={(key) => {this.playDrum(key)}} 
          >
        </KeyboardEventHandler>
        <ReactFCCtest />
      </div>
    )
  }
}

export default App;

