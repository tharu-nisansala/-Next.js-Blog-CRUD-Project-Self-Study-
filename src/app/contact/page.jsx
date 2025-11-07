import React from "react";
import Styles from "@/app/contact/contact.module.css";
import Image from "next/image";
import Button from "@/components/button/Button";
import contactImg from '../../../public/Contact.png';


export default function Contact() {
  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>Let's Keep in Touch</h1>
      <div className={Styles.content}>
        <div className={Styles.imgContainer}>
          <Image src={contactImg} alt="" fill={true} className={Styles.img}/>
        </div>
        <form className={Styles.form}>
          <input type="text" placeholder="name" className={Styles.input}/>
          <input type="text" placeholder="name" className={Styles.input}/>
          <textarea className={Styles.textarea} placeholder="message" cols={30} rows={10}/>
          <Button url="#" text="Send"/>
        </form>
      </div>
    </div>
  );
}
