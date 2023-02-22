import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


export default function Register() {

    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [Birthdate, setBirthdate] = useState("");
    const [Gender, setGender] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Address, setAddress] = useState("");
    
    const navigate = useNavigate();

    async function signup() {
        const fakeId = Math.floor(Math.random() * 1000);
        
        const formdata = new FormData();
        formdata.append("FirstName", FirstName);
        formdata.append("LastName", LastName);
        formdata.append("Email", Email);
        formdata.append("Phone", Phone);
        formdata.append("Birthdate", Birthdate);
        formdata.append("Address", Address);
        formdata.append("Gender",Gender);
        formdata.append("Password", Password);
        formdata.append("FakeId", fakeId.toString());
        
        const res = await fetch("https://localhost:7087/api/Api/SignupProfessional", {
            method: "POST",
            body: formdata
        });
        if(res.ok) {
            const data = await res.json();
            console.log(data);
            navigate("/")
        }else {
            alert("Erreur d'inscription");
            console.log(res.status)
        }
    }

    return (
        <>
            <div className="d-flex full-width justify-content-center align-content-center  border-bottom">
                <div className="bg-primary rounded-circle mb-2 mt-1" style={{width: 50, height: 50}}>
                    <div className="d-flex justify-content-center align-content-center">
                        <img
                            src="https://cdn.discordapp.com/attachments/1024417997785399308/1077767238309924874/PXPNG.COMNicole_Watterson_The_Amazing_World_of_Gumball_PNG_Image_-_742x1077.png"
                            alt="" style={{height: 40}} className="mt-2"/>
                    </div>
                </div>
            </div>


            <div class="full-height w-100  d-flex align-items-center justify-content-center flex-column border">
                <h2 className="mb-5"> Inscription </h2>
                <div className=" h-fit w-25   ">
                    <div className="container ">
                        <div className="row d-flex justify-content-center align-content-center">
                            <div className="col-5">
                                <input type="text" placeholder="Nom" className="form-control mb-3"
                                       value={LastName} onChange={(e) => setLastName(e.target.value)}/>
                            </div>
                            <div className="col-5">
                                <input type="text" placeholder="Prénom" className="form-control mb-3"
                                       value={FirstName} onChange={(e) => setFirstName(e.target.value)} a/>
                            </div>
                            <div className="col-10">
                                <input type="text" placeholder="Adresse courriel" className="form-control mb-3"
                                       value={Email} onChange={
                                    (e) => setEmail(e.target.value)
                                }/>
                            </div>
                            <div className="col-10">
                                <input type="text" placeholder="Numéro de téléphone" className="form-control mb-3"
                                       value={Phone} onChange={
                                    (e) => setPhone(e.target.value)
                                }/>
                            </div>
                            <div className="col-10">
                                <input type="text" placeholder="Addresse" className="form-control mb-3"
                                       value={Address} onChange={
                                    (e) => setAddress(e.target.value)
                                }/>
                            </div>
                            <div className="col-10">
                                <input type="text" placeholder="Mot de passe" className="form-control mb-3"
                                       value={Password} onChange={
                                    (e) => setPassword(e.target.value)
                                }/>
                            </div>
                            <div className="col-10">
                                <input type="text" placeholder="Confirmer le mot de passe" className="form-control mb-3"
                                       value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </div>
                            <div className="col-10">
                                <input type="text" placeholder="Date de naissance (AAAAMMJJ)"
                                       className="form-control mb-3" value={Birthdate}
                                       onChange={
                                           (e) => setBirthdate(e.target.value)
                                       }/>
                            </div>
                            <div className="col-10 mb-5">
                                <select className="form-select" onChange={(e) => setGender(e.target.value)}
                                        value={Gender}>
                                    <option className="form-control mb-3" value="0" onSelect={
                                       (e) => setGender(e.target.value)
                                    }>Homme</option>
                                    <option className="form-control mb-3" value="1" onSelect={
                                        (e) => setGender(e.target.value)
                                    }>Femme</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-content-center">
                        <button className="btn bg-primary text-white w-75 " onClick={signup}> Créer un compte</button>

                    </div>
                    <p class="text-muted text-center" onClick={() => navigate("/")}>
                        Vous avez déjà un compte ? <g>Cliquez-ici</g></p>
                </div>
            </div>
        </>
    );
}