import {useState} from "react";
import {forEach} from "react-bootstrap/ElementChildren";

export default function Login() {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    
    
  

    async function login() {
        const formdata = new FormData();
        formdata.append("Email", Email);
        formdata.append("Password", Password);
        
        const response = await fetch("https://localhost:7087/api/Api/LoginProfessional", {
            method: "POST",
            body: formdata
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <>

            {/* TOP */}
            <div className="d-flex full-width justify-content-center align-content-center  border-bottom">
                <div className="bg-primary rounded-circle mb-2 mt-1" style={{width: 50, height: 50}}>
                    <div className="d-flex justify-content-center align-content-center">
                        <img
                            src="https://cdn.discordapp.com/attachments/1024417997785399308/1077767238309924874/PXPNG.COMNicole_Watterson_The_Amazing_World_of_Gumball_PNG_Image_-_742x1077.png"
                            alt="" style={{height: 40}} className="mt-2"/>
                    </div>
                </div>
            </div>


            {/* BODY */}
            <div className="d-flex">
                {/* BODY-LEFT */}
                <div class="d-flex w-50 full-height justify-content-center ">
                    <div class="full-height w-50 d-flex align-items-center">
                        <div class=" h-fit w-100 justify-content-center ">
                            <div class="txtlog1 mb-3">
                                <h2 class="text-black">Connexion</h2>
                            </div>
                            <div class="inputlog1 mb-3">
                                <input type="text" placeholder="Nom d'utilisateur" className="form-control mb-3"
                                       value={Email} autoComplete={Email} required
                                       onChange={(e) => setEmail(e.target.value)}/>
                                <input type="text" placeholder="Mot de passe" className="form-control"
                                       value={Password} autoComplete={Password} required
                                       onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div class="d-flex justify-content-center ">
                                <button class="btn bg-primary text-white w-100 " onClick={login}> Connexion</button>
                            </div>
                            <p class="text-black"><small></small>Vous n'avez pas de compte ? <g>Cliquez-ici</g></p>
                        </div>
                    </div>
                </div>
                {/* BODY-RIGHT */}
                <div className="d-flex w-50 full-height justify-content-center border-start align-content-center">
                    <div class="full-height  d-flex align-items-center">
                        <div class=" h-fit  justify-content-center ">
                            <h4 class="text-black"><small></small> Partie en contruction... 🐋</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}