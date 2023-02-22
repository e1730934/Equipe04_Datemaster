

export default function Register() {

    return (
        <>
            <div className="d-flex full-width justify-content-center align-content-center  border-bottom">
                <div className="bg-primary rounded-circle mb-2 mt-1" style={{ width: 50, height: 50 }}>
                    <div className="d-flex justify-content-center align-content-center">
                        <img src="https://cdn.discordapp.com/attachments/1024417997785399308/1077767238309924874/PXPNG.COMNicole_Watterson_The_Amazing_World_of_Gumball_PNG_Image_-_742x1077.png" alt="" style={{ height: 40 }} className="mt-2" />
                    </div>
                </div>
            </div>


            <div class="full-height w-100  d-flex align-items-center justify-content-center flex-column border">
                <h2 className="mb-5"> Incription </h2>
                <div className=" h-fit w-25   ">
                    <div className="container ">
                        <div className="row d-flex justify-content-center align-content-center">
                            <div className="col-5">
                                <input type="text" placeholder="Nom" className="form-control mb-3" />
                            </div>
                            <div className="col-5">
                                <input type="text" placeholder="Prénom" className="form-control mb-3" />
                            </div>
                            <div className="col-10">
                                <input type="text" placeholder="Adresse courriel" className="form-control mb-3" />
                            </div>
                            <div className="col-10">
                                <input type="text" placeholder="Numéro de téléphone" className="form-control mb-3" />
                            </div>
                            <div className="col-10">
                                <input type="text" placeholder="Mot de passe" className="form-control mb-3" />
                            </div>
                            <div className="col-10">
                                <input type="text" placeholder="Confirmer le mot de passe" className="form-control mb-3" />
                            </div>
                            <div className="col-10">
                                <input type="text" placeholder="Date de naissance" className="form-control mb-3" />
                            </div>
                            <div className="col-10">
                                <input type="text" placeholder="Genre" className="form-control mb-3" />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-content-center">
                        <button className="btn bg-primary text-white w-75 "> Créer un compte</button> 
                        
                    </div>
                   <p class="text-muted text-center"><small></small>Vous n'avez pas de compte ? <g>Cliquez-ici</g></p>
                </div>
            </div>
        </>
    );
}