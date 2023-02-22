﻿import { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


export default function Home() {


    return (

        <>
            <div className="d-flex full-height full-width " style={{}}  >
                {/* SIDEBAR */}
                <div className="d-flex flex-column flex-shrink-0 p-4 text-black bg-white full-height border " style={{ width: 300 }} >
                    <div className="d-flex align-content-center justify-content-center">
                        <div style={{ width: 160, height: 160 }} className="bg-primary rounded-circle d-flex justify-content-center align-content-center ">
                            <img src="https://cdn.discordapp.com/attachments/1024417997785399308/1077767238309924874/PXPNG.COMNicole_Watterson_The_Amazing_World_of_Gumball_PNG_Image_-_742x1077.png"
                                alt="" style={{ height: 150 }} className="mt-2" />
                        </div>
                    </div>

                    <div href="/" className=" mt-2 text-decoration-none">
                        <h4 className="fs-4 text-black text-center  "> Équipe 4 </h4>
                    </div>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <a href="/" className="nav-link active" aria-current="page">
                                <svg className="" width="16" height="16"><use xlinkHref="#home" /></svg>
                                <span className="text-xl">Tableau de bord</span>
                            </a>
                        </li>
                        <li>
                            <a href="/" className="nav-link  mt-4">
                                <svg className="" width="16" height="16"><use xlinkHref="#speedometer2" /></svg>
                                <span>Mon calendrier</span>
                            </a>
                        </li>
                    </ul>
                    <hr />
                    <div className="dropdown">
                        <button className="btn bg-primary text-white w-100 "> Déconnexion</button>
                    </div>
                </div>

                {/* Home */}
                <div className="w-100">
                    <div className="d-flex align-content-start">
                        <div className="t2 p-4">
                            <h1 className="text-black">Bonjour Équipe 4 ,</h1>
                            <h5 className="text-muted "> Bienvenue dans votre tableau de bord !</h5>
                        </div>
                    </div>


                <div className="d-flex flex-column  m-3 border casiWeight rounded" >
                    <div className="t1  p-4">
                        <h4>
                            Pour aujourd'hui ,
                        </h4>
                        <h4> vous avez un total de <g>55</g> Rendez-vous.</h4>
                    </div>

                    <div className="w-100 p-4 m-0 " >
                        <h6>Vos disponibilites :</h6>
                        <FullCalendar 
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            weekends={false}
                            events={[
                                { title: 'event 1', date: '2023-03-01' },
                                { title: 'event 2', date: '2021-03-02' }
                            ]}
                            height={300}
                            width={380}
                        />
                        <p className=""><small>*Pour une meilleure vue, vous pouvez <g>cliquez-ici </g>. </small></p>
                        <p className="text-black m-0">Vous souhaitez generer un lien pour que vos clients puisse prendre rendez-vous ?</p>
                    </div>
                    
                    <div className="p-4">
                        <button className="btn bg-primary text-white"> Générer un lien</button>
                    </div>
                </div>

                </div>

            </div>
        </>





    );
}
