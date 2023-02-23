import { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useNavigate, useParams } from "react-router-dom";


export default function Home() {

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

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
          .then(() => alert(`Votre lien est copie dans le presse papier :) !`))
          .catch((error) => console.error('Erreur lors de la copie du texte:', error));
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
                            <a href="/" className="nav-link active" aria-current="page">
                                <svg className="" width="16" height="16">
                                    <use xlinkHref="#home" />
                                </svg>
                                <span className="text-xl">Tableau de bord</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={
                                
                                () => {
                                    navigate(`/calendrier/${idProfessional}`);
                                }
                            } className="nav-link  mt-4">
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

                {/* Home */}
                <div className="w-100">
                    <div className="d-flex align-content-start">
                        <div className="t2 p-4">
                            <>
                                {
                                    professionalData && professionalData.firstName && (
                                        <h1 className="text-black">Bonjour {professionalData.firstName},</h1>)
                                }
                            </>
                            <h5 className="text-muted "> Bienvenue dans votre tableau de bord !</h5>
                        </div>
                    </div>


                    <div className="d-flex flex-column  m-3 border casiWeight rounded">
                        <div className="t1  p-4">
                            <h4>
                                Pour le moment,
                            </h4>
                            <h4> Vous avez un total de
                                <>{
                                    events && events.length && (
                                        <g> {events.length} rendez-vous.</g>)}
                                </>
                            </h4>
                        </div>

                        <div className="w-100 p-4 m-0 ">
                            <h6>Vos disponibilites :</h6>
                            <FullCalendar
                                // eslint-disable-next-line no-sparse-arrays
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                headerToolbar={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                }}
                                initialView='dayGridMonth'
                                events={EventList}
                                width={380}
                                height={300}
                            />
                            <p className="" onClick={() => { navigate(`/calendrier/${idProfessional}`); }}>
                                <small>*Pour une meilleure vue, vous pouvez <g>cliquez-ici </g>.
                                </small>
                                
                            </p>
                            <p className="text-black m-0">Vous souhaitez generer un lien pour que vos clients puisse
                                prendre rendez-vous ?</p>
                        </div>

                        <div className="p-4">
                            <button className="btn bg-primary text-white" onClick={() => copyToClipboard(`https://localhost:44479/booking/${idProfessional}`)}> Générer un lien</button>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}
