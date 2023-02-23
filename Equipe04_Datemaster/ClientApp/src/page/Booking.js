import { useEffect, useState } from "react";
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useNavigate, useParams } from "react-router-dom";



export default function Booking() {

    // Get idProfessional from params
    const { idProfessional } = useParams();
    const [professionalData, setProfessionalData] = useState(null);
    const [events, setEvents] = useState(null);
    const [eventsConverted, setEventsConverted] = useState([]);

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
            title: event.title,
            start: new Date(event.start_time),
            end: new Date(event.end_time)
        }
    });

    function handleEventClick(clickInfo) {
        if (window.confirm(`Voulez-vous supprimer l'événement '${clickInfo.event.title}'`)) {
            var formdata = new FormData();
            formdata.append("professionalId", idProfessional);

            var requestOptions = {
                method: 'DELETE',
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://localhost:7087/api/Api/DeleteEvent", requestOptions)
                .then(response => response.text())
                .then(result => { console.log(result); clickInfo.event.remove(); })
                .catch(error => console.log('error', error));
        }
    }


    const handleDateSelect = (selectInfo) => {

        let calendarApi = selectInfo.view.calendar
        let start_time = selectInfo.startStr
        let end_time = selectInfo.endStr

        let title = prompt("Titre de l'événement");
        let description = prompt("Description de l'événement");
        let location = prompt("Lieu de l'événement");



        calendarApi.unselect() // clear date selection


        if (title == null || description == null || location == null) {

            return;
        } else {
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

            var urlencoded = new URLSearchParams();
            urlencoded.append("Title", title);
            urlencoded.append("Description", description);
            urlencoded.append("Location", location);
            urlencoded.append("Start_time", start_time);
            urlencoded.append("End_time", end_time);
            urlencoded.append("Organizer_id", idProfessional);
            urlencoded.append("FakeId", 1);


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

            <div class="full-height w-100  d-flex align-items-center justify-content-center flex-column border">
                <>
                        {
                            professionalData && professionalData.firstName && (
                                <div href="/" className=" mt-2 text-decoration-none">
                                    <h4 className="fs-4 text-black text-center  ">Page de booking pour {professionalData.lastName}, {professionalData.firstName}</h4>
                                </div>)
                        }
                </>
                <div className=" h-fit w-75">
                    <div className="container ">
                        <div className="row d-flex justify-content-center align-content-center">
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
                </div>
            </div>

        </>
    )
}