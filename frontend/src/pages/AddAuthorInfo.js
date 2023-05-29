import React from "react";
import { useEffect, useState } from 'react';
import './Styles.css';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

function Title() {
  useEffect(() => {
    document.title = 'Добавить автора';
  }, []);
}

const addAuthor = "http://localhost:5000/api/v1/book/authors/new";

export default function AddInfoAboutAuthor() {
  Title();
  return (
      <div>
        <p/>
            <Forms/>
      </div>
  );
}

const showToast = () => {
  toast.success("Данные были добавлены!");
}

function Forms(){
    let err;
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    function AddAuthor(){
      axios.post(addAuthor, {
        name: document.getElementById('name').value,
        bio: document.getElementById('bio').value,
        birthday: document.getElementById('birthday').value,
        lang_spec: document.getElementById('langs').value,
      }).catch(function (error){console.log(error); err=error})
      console.log(err)
      if (err === undefined)
      {
        showToast()
        document.getElementById('name').value = "";
        document.getElementById('bio').value = "";
        document.getElementById('birthday').value = "";
        document.getElementById('langs').value = "";
      }
    }
    return(
    <form onSubmit={handleSubmit(AddAuthor)}>
        <input register="name" id="name" required placeholder="Имя автора" className="AddInput"></input>
        <p/>
        <input register = "bio" id="bio" placeholder="Биография" className="AddInput"></input>
        <p/>
        <input register = "birthday" id="birthday" required placeholder="Дата рождения гггг-мм-дд" className="AddInput"></input>
        <p/>
        <input register = "langs" required id="langs" placeholder="Языки на которых пишет автор через ;" className="AddInput"></input>
        <p/>
        <button className="AddInput" onClick={AddAuthor}>Добавить автора</button>
        <ToastContainer />
    </form>
    )
}
