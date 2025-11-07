"use client"
import React, { useState } from 'react'
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [err, setErr] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.status === 201) {
        router.push("/dashboard/login?success=Account has been created");
      } else {
        setErr(true);
      }
    } catch (error) {
      console.error(error);
      setErr(true);
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type='text' name='name' placeholder='Username' className={styles.input} required />
        <input type='email' name='email' placeholder='Email' className={styles.input} required />
        <input type='password' name='password' placeholder='Password' className={styles.input} required />
        <button className={styles.btn}>Register</button>
      </form>
      {err && <p style={{ color: 'red' }}>Something went wrong!</p>}
      <Link href="/dashboard/login">Login with an existing account</Link>
    </div>
  )
}
