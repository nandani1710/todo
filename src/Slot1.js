// import logo from './logo.svg';
import './App.css';
import { useState } from "react";

function Slot1() {

  let [time1, setTime1] = useState("");
  let [time2, setTime2] = useState("");
  let [slots, setSlots] = useState([]);

  const generateSlots = () => {
    if (time1 && time2) {
      const [startHour, startMinute] = time1.split(":").map(Number);
      const [endHour, endMinute] = time2.split(":").map(Number);
      const startTime = new Date(2024, 0, 1, startHour, startMinute);
      let endTime = new Date(2024, 0, 1, endHour, endMinute);
      // If end time is before start time, assume it's on the next day
      if (endTime < startTime) {
        endTime.setDate(endTime.getDate() + 1);
      }
      const slotArray = [];
      let currentTime = startTime;
  
      while (currentTime <= endTime) {
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
  
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12 === 0 ? 12 : hours % 12).toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
  
        const timeString = `${formattedHours}:${formattedMinutes} ${period}`;
        slotArray.push(timeString);
  
        currentTime.setMinutes(currentTime.getMinutes() + 10);
      }
  
      setSlots(slotArray);
    }
  };
  

  return (
    <div className="App">
      <center>
        <div className='slot'>
          Enter Starting Time :<br /><input type='time' onChange={(e) => { setTime1(e.target.value) }}></input><br />
          Enter Ending Time :<br /><input type='time' onChange={(e) => { setTime2(e.target.value) }}></input>
        </div>
        <div className='slot_button'>
          <button onClick={generateSlots}>Click</button>
        </div>
        {
            slots.length > 0 && (
            <div>
                <h3>Time Slots:</h3>
                {slots.map((slot, index) => (
                    <table border={1}>
                        <tr>
                            <td key={index}>{slot}</td>
                        </tr>
                    </table>
                ))}
            </div>
            )
        }
      </center>
    </div>
  );
}

export default Slot1;
