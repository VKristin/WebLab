import React from "react";
import { useEffect, useState } from 'react';
import './Styles.css';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import {useBooks} from './useDataBook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Title() {
  useEffect(() => {
    document.title = 'Добавить книгу';
  }, []);
}

const addBook = "http://localhost:5000/api/v1/book/books/new";

export default function AddInfoAboutBook() {
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
    const books = useBooks();
    let err;
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [arr, setValue] = useState(["", "", "", ""]);
    function AddBook(data){
      axios.post(addBook, {
        name: watch('name'),
        lang_name: watch('lang_name'),
        year: watch('year'),
        author_spec: watch('author_spec')
      }).catch(function (error){console.log(error); err=error})
      console.log(err)
      if (err === undefined)
      {
        showToast()
        document.getElementById('name').value = "";
        document.getElementById('lang_name').value = "";
        document.getElementById('year').value = "";
        document.getElementById('author_spec').value = "";
      }
      console.log(watch('author_spec'))
    }
//register
//watch (будет возвращать значение)
    return(
    <form onSubmit={handleSubmit(AddBook)}>
        <input {...register('name')} defaultValue={GetName(books)} onChange={SetName(books, arr)} id="name" required placeholder="Название книги" className="AddInput"></input>
        <p/>
        <input {...register('lang_name')} defaultValue={GetLang(books)} onChange={SetLang(books, arr)} id="lang_name" required placeholder="Язык" className="AddInput"></input>
        <p/>
        <input {...register('year')} defaultValue={GetYear(books)} onChange={SetYear(books, arr)} id="year" required placeholder="Год публикации" className="AddInput"></input>
        <p/>
        <input {...register('author_spec')} defaultValue={GetAuthor(books)} onChange={SetAuthor(books, arr)} id="author_spec" placeholder="Авторы книги через запятую" className="AddInput"></input>
        <p/>
        <button type='submit' id='Button' className="AddInput"> Добавить книгу</button>
        <ToastContainer />
    </form>
    )
}

function SetName(books, arr){
  if (document.getElementById('name') !== null){
    arr[0]= String(document.getElementById('name').value);
    books.set(arr)}
  document.getElementById('Button')
  console.log(books);
}

function GetName(books){
  if (books.get[0] !== "")
  return (books.get[0])
  else return ("")
}

function GetLang(books){
  if (books.get[1] !== "")
  return (books.get[1])
  else return ("")
}

function GetAuthor(books){
  if (books.get[3] !== "")
  return (books.get[3])
  else return ("")
}

function GetYear(books){
  if (books.get[2] !== "")
  return (books.get[2])
  else return ("")
}

function SetLang(books, arr){
  
  if (document.getElementById('lang_name') !== null){
    arr[1]= String(document.getElementById('lang_name').value);
    books.set(arr)}
  console.log(books);
}

function SetYear(books, arr){
  
  if (document.getElementById('year') !== null){
    arr[2]= String(document.getElementById('year').value);
    books.set(arr)}
  console.log(books);
}

function SetAuthor(books, arr){
  if (document.getElementById('author_spec') !== null){
    arr[3]= String(document.getElementById('author_spec').value);
    books.set(arr)}
  console.log(books);
}