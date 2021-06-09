import React from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

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

  const [data, setData] = React.useState('Not Found');
  console.log(data);
  return (
    <>
      <center>
        <span style={(data !== 'Not Found') ? styles.circleGreen : styles.circle} class="dot"></span>
      </center>
      <center>
        <BarcodeScannerComponent
          width={500}
          height={500}
          onUpdate={(err, result) => {
            if (result) setData(result.text)
            else setData('Not Found')
          }}
        />
        <p>{data}</p>
      </center>
    </>
  )
}

export default App;