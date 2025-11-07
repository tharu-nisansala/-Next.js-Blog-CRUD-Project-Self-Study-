import React from 'react'
import Styles from './page.module.css';
import Image from 'next/image';
import Button from '@/components/button/Button';

export default function about() {
  return (
    <div className={Styles.container}>
        <div className={Styles.imgContainer}>
           <Image src="https://images.pexels.com/photos/15965529/pexels-photo-15965529.jpeg" alt='' fill={true} className={Styles.img}/>
           <div  className={Styles.imgText}>
            <h1 className={Styles.imgTitle}>Digital StoryTellers</h1>
            <h2 className={Styles.imgDesc}>Handcrafting award winning digital experiences</h2>
           </div>
        </div>
        <div className={Styles.textContainer}>
             <div className={Styles.item}>
                <h1 className={Styles.title}>Who Are We?</h1>
                <p className={Styles.desc}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid, exercitationem dicta. Quas consequatur numquam labore molestiae ratione quos eligendi, tempore tenetur molestias voluptates ab quis voluptatem necessitatibus ad placeat. Laborum.</p>
             </div>
             <div className={Styles.item}>
                <h1 className={Styles.title}>What we do?</h1>
                <p className={Styles.desc}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid, exercitationem dicta. Quas consequatur numquam labore molestiae ratione quos eligendi, tempore tenetur molestias voluptates ab quis voluptatem necessitatibus ad placeat. Laborum.</p>
                <Button url = "/contact" text="Contact" />
             </div>
        </div>
            
    </div>
  )
}
