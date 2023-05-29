import {toast, ToastContainer} from "react-toastify";
import axios from 'axios';
import { useEffect, useState} from 'react';
import QRCode from "qrcode";
import Combobox from "react-widgets/Combobox";

import {useRef} from "react";

const authorPath = "http://localhost:5000/api/v1/book/authors";

export default function App () {

    const canvasRef = useRef([]);

    const [author, setAuthor] = useState([]);
    useEffect(() => {
    axios.get(authorPath).then(data => setAuthor(data.data));
    }, []);
    console.log(author);

    function drawQRCode(path){
        if (path !== undefined)
            QRCode.toCanvas(canvasRef.current, path);
    }

    let res = author.map(function(item) {
        return <tr key={item.id}>
           <td>{item.name}</td>
           <td>{item.bio}</td>
           <td>
            {drawQRCode(item.bio)}
            {<canvas ref={canvasRef}/>}
        </td>
        </tr>;
     });

    return <div>
        <table>
      <thead>
         <tr>
            <td>Имя автора</td>
            <td>Биография автора</td>
            <td>QRCode</td>
         </tr>
      </thead>
      <tbody>
         {res}
      </tbody>
   </table>
    </div>;
}


//я пыталась сделать разные ссылки, но что-то пошло не так и у меня не получилось
/*
export default function App () {

    const canvasRef = useRef([]);

    const [author, setAuthor] = useState([]);
    useEffect(() => {
    axios.get(authorPath).then(data => setAuthor(data.data));
    }, []);
    console.log(author);

    function drawQRCode(path, i){
        if (path !== undefined)
            QRCode.toCanvas(canvasRef.current[i], path);
    }
let i = -1;
    let res = author.map(function(item) {
        i++;
        return <tr key={item.id}>
           <td>{item.name}</td>
           <td>{item.bio}</td>
           <td>
            {drawQRCode(item.bio, i)}
            {<canvas ref={canvasRef.current[i]}/>}
        </td>
        </tr>;
     });

    return <div>
        <table>
      <thead>
         <tr>
            <td>Имя автора</td>
            <td>Биография автора</td>
            <td>QRCode</td>
         </tr>
      </thead>
      <tbody>
         {res}
      </tbody>
   </table>
    </div>;
}*/