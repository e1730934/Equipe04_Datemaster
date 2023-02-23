import { useEffect, useState } from "react";
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
// eslint-disable-next-line jsx-a11y/anchor-is-valid

import moment from 'moment';

import { useNavigate, useParams } from "react-router-dom";


export default function Calendrier() {

    // Get idProfessional from params
    const { idProfessional } = useParams();
    const [professionalData, setProfessionalData] = useState(null);
    const [events, setEvents] = useState(null);
    const [eventsConverted, setEventsConverted] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getProfessionalData() {
            const res = await fetch(`https://localhost:7087/api/Api/GetProfessional/${idProfessional}`);
            if (res.ok) {
                const data = await res.json();
                setProfessionalData(data.professional);
            } else {
                console.log(res.status);
            }
        }

        getProfessionalData();
    }, [idProfessional]);

    useEffect(() => {
        async function getEvents() {
            const res = await fetch(`https://localhost:7087/api/Api/GetEvents/${idProfessional}`);
            if (res.ok) {
                const data = await res.json();
                console.log(data.events);

                setEvents(data.events);
                
            } else {
                console.log(res.status);
            }
        }

        getEvents();
    }, [idProfessional]);


    const EventList = events && events.map((event) => {
        return {
            id: event.fakeId,
            title: event.title,
            start: new Date(event.start_time),
            end: new Date(event.end_time)
        }
    });
   
    function handleEventClick(clickInfo) {
        if (window.confirm(`Voulez-vous supprimer l'événement '${clickInfo.event.id}'`)) {
            
           
            
            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };

            fetch(`https://localhost:7087/api/Api/DeleteEvent/${clickInfo.event.id}`, requestOptions)
                .then(response => response.text())
                .then(result => {console.log(result); clickInfo.event.remove();})
                .catch(error => console.log('error', error));
        }
    }


  const handleDateSelect = (selectInfo)=>    {

 let calendarApi = selectInfo.view.calendar
        let start_time = selectInfo.startStr
        let end_time = selectInfo.endStr 

        let title   = prompt("Titre de l'événement");
        let description = prompt("Description de l'événement");
        let location = prompt("Lieu de l'événement");

       

        calendarApi.unselect() // clear date selection


        if(title == null || description == null || location == null ){

            return;
        }else{
            console.log(selectInfo);

        calendarApi.addEvent({
            id: Math.random(),
            title: title,
            start: start_time,
            end: end_time,
            allDay: selectInfo.allDay
        })
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        const fakeId = Math.random() * 1000;

        var urlencoded = new URLSearchParams();
        urlencoded.append("Title", title);
        urlencoded.append("Description", description);
        urlencoded.append("Location", location);
        urlencoded.append("Start_time", start_time);
        urlencoded.append("End_time", end_time);
        urlencoded.append("Organizer_id", idProfessional);
        urlencoded.append("FakeId", fakeId.toString());
        
        
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        



        fetch("https://localhost:7087/api/Api/CreateEvent", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            

        }).catch(error => console.log('error', error));
    }
       
    }


    
    return (
        <>
            <div className="d-flex full-height full-width " style={{}}>
                {/* SIDEBAR */}
                <div className="d-flex flex-column flex-shrink-0 p-4 text-black bg-white full-height border "
                    style={{ width: 300 }}>
                    <div className="d-flex align-content-center justify-content-center">
                        <div style={{ width: 160, height: 160 }}
                            className="bg-primary rounded-circle d-flex justify-content-center align-content-center ">
                            <img
                                src="https://cdn.discordapp.com/attachments/1024417997785399308/1077767238309924874/PXPNG.COMNicole_Watterson_The_Amazing_World_of_Gumball_PNG_Image_-_742x1077.png"
                                alt="" style={{ height: 150 }} className="mt-2" />
                        </div>
                    </div>
                    <>
                        {
                            professionalData && professionalData.firstName && (
                                <div href="/" className=" mt-2 text-decoration-none">
                                    <h4 className="fs-4 text-black text-center  ">{professionalData.lastName}, {professionalData.firstName}</h4>
                                </div>)
                        }
                    </>

                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            
                            <a onClick={
                                () => {
                                    navigate("/professional/" + idProfessional);
                                }
                            } className="nav-link " aria-current="page">
                                <svg className="" width="16" height="16">
                                    <use xlinkHref="#home" />
                                </svg>
                                <span className="text-xl">Tableau de bord</span>
                            </a>
                        </li>
                        <li>
                            <a href="/" className="nav-link active mt-4">
                                <svg className="" width="16" height="16">
                                    <use xlinkHref="#speedometer2" />
                                </svg>
                                <span>Mon calendrier</span>
                            </a>
                        </li>
                    </ul>
                    <hr />
                    <div className="dropdown">
                        <button className="btn bg-primary text-white w-100 " onClick={() => {
                            navigate("/");
                        }}>
                            Déconnexion
                        </button>
                    </div>
                </div>

                {/* CALENDAR */}
                <div className="full-height w-75">
            <FullCalendar
                // eslint-disable-next-line no-sparse-arrays
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView='dayGridMonth'
                editable={true}
                events={EventList}
                selectable={true}
                select={handleDateSelect}
                //eventContent={renderEventContent} // custom render function
                //eventsSet={this.handleEvents} 
                eventClick={handleEventClick} 
                height="750px"
                style={{ width: "100%" }}
          
          />
                </div>
                




            </div>
        </>
    );
}
