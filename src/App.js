import React, { useRef } from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import useSound from 'use-sound';
import boopSfx from './barcode.mp3';
import { stringify } from 'query-string';

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
  const [text, setText] = React.useState(0);
  const [data, setData] = React.useState(0);
  const [update, setUpdate] = React.useState(false);

  const handleUpdate = async (name) => {
    try {
      const datas = await fetch(`http://localhost:49160/grocery`, {
        method: 'POST',
        body: JSON.stringify({ name, data }), headers: { 'Content-Type': 'application/json' }
      });
      const final = await datas.json();
      console.log("data ", final);
    } catch (e) {
      console.log(e);
    }
  }

  const updateData = (text, setText) => {
    return (
      <div>
        <form>
          <label for="fname">Name</label>
          <br>
          </br>
          <input type="text" id="fname" name="fname" placeholder="Bush's beans" onChange={(e) => setText(e.target.value)} value={text}></input>
          <br></br>
          <input type="submit" name="Update" value="Update" onClick={() => handleUpdate(text)}></input>
        </form>
      </div>
    )
  }

  const handleOnChange = async (result) => {
    if (result !== undefined) {
      try {
        const datas = await fetch(`http://localhost:49160/grocery?${stringify({ code: data })}`);
        const final = await datas.json();
        setData(result.text);
        console.log("final ", final);
        if (final[0].name === "") {
          setUpdate(true);
        } else {
          setUpdate(false);
          setData(result.text);
          try {
            if (update === false) {
              console.log("we are sending data ", data);
              const datasq = await fetch(`http://localhost:49160/grocery/list`, {
                method: 'POST',
                body: JSON.stringify({ data: data }), headers: { 'Content-Type': 'application/json' }
              });
              const finals = await datasq.json();
              console.log("data ", finals);
              return finals;
            }
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  return (
    <>
      <center>
        <span style={(data) ? styles.circleGreen : styles.circle} class="dot"></span>
        {/* {(data !== last) ? play() : ""} */}
      </center>
      <center>
        <BarcodeScannerComponent
          width={200}
          height={200}
          onUpdate={(err, result) => handleOnChange(result)}
        />
        <p>{data}</p>
        {/* <button onClick={() => setUpdate(true)}>Update</button> */}
        {
          ((update === true) ? updateData(text, setText) : <div></div>)
        }
      </center>
    </>
  )
}

export default App;