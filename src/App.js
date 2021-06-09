import React,{useRef} from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import useSound from 'use-sound';
import boopSfx from './barcode.mp3';
import debounce from 'lodash.debounce';

const styles = {
  circle: {
    height: '25px',
    marginTop: '10px',
    width: '25px',
    backgroundColor: 'red',
    borderRadius: '50%',
    display: 'inline-block',
  },
  circleGreen: {
    height: '25px',
    marginTop: '10px',
    width: '25px',
    backgroundColor: 'green',
    borderRadius: '50%',
    display: 'inline-block',
  }
}

function App() {
  const [play] = useSound(boopSfx);
  const [data, setData] = React.useState(0);
  const [last, setLast] = React.useState(0);
  const debouncedSave = useRef(debounce(nextValue => setLast(nextValue), 10)).current;
    const handleOnChange = (result) =>{
      if(result!==undefined){
        setData(result.text);
        console.log("first ",data);
        console.log("saecond ",last);
        if(data!==last){
          debouncedSave(result.text);
          setLast(0);
        }
      }
    }
  return (
    <>
      <center>
        <span style={(data !== last) ? styles.circleGreen : styles.circle} class="dot"></span>
        {(data !== last) ? play() : ""}
      </center>
      <center>
        <BarcodeScannerComponent
          width={500}
          height={500}
          onUpdate={(err, result) => handleOnChange(result)}
        />
        <p>{data}</p>
      </center>
    </>
  )
}

export default App;