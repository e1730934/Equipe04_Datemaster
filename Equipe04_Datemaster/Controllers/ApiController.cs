using Equipe04_Datemaster.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Equipe04_Datemaster.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class ApiController : ControllerBase
{
    private readonly DbContext _context;

    public ApiController(DbContext context)
    {
        _context = context;
    }

    [HttpGet] // route: api/Api/Test (pour tester si le serveur est en ligne)
    public string Test()
    {
        return "Hello World!";
    }

    [HttpPost] // route: api/Api/SignupProfessional
    public async Task<IActionResult> SignupProfessional([FromForm] Professional professionalData)
    {
        Console.WriteLine(professionalData);

        var professional = new Professional
        {
            FirstName = professionalData.FirstName,
            LastName = professionalData.LastName,
            Address = professionalData.Address,
            Email = professionalData.Email,
            Phone = professionalData.Phone,
            Birthdate = professionalData.Birthdate,
            Gender = professionalData.Gender,
            Password = professionalData.Password,
            FakeId = professionalData.FakeId
        };

        _context.Professionals.Add(professional);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Professional created successfully", professional }); // 200 et sa retourne un json
    }

    // [HttpPost] // route: api/Api/LoginProfessional (fait comme en  haut c un post aussi)
    [HttpPost]
        public async Task<IActionResult> LoginProfessional([FromForm] ProfessionalLogin professionalData)
    {
        var professional = await _context.Professionals.FirstOrDefaultAsync(x => x.Email == professionalData.Email && x.Password == professionalData.Password);
        if (professional == null)
            return Unauthorized(new { message = "Username or password is incorrect" }); // 401

        return Ok(new { message = "Professional logged in successfully", professional }); // 200
    }


    //(GET) Voir les evenements d'un professionnel (avec son id) [FromForm]
    // route: api/Api/GetEvents
    [HttpGet]
    public async Task<IActionResult> GetEvents([FromForm] int professionalId)
    {
        var events = await _context.Events.Where(x => x.OrganizerId == professionalId).ToListAsync();
        if (events.Count == 0)
            return NotFound(new { message = "No events found" }); 
        else
            return Ok(new { message = "Events found", events }); 
    }



}


// CREATE TABLE Events (
// id INTEGER PRIMARY KEY AUTOINCREMENT,
// title TEXT NOT NULL,
// description TEXT,
// location TEXT,
// start_time TEXT NOT NULL,
// end_time TEXT NOT NULL,
// organizer_id INTEGER NOT NULL,
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// FOREIGN KEY (organizer_id) REFERENCES Professionals(Id)
// );

// -- Table pour les participants
// CREATE TABLE Participants (
// id INTEGER PRIMARY KEY AUTOINCREMENT,
// name TEXT NOT NULL,
// email TEXT NOT NULL,
// event_id INTEGER NOT NULL,
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// FOREIGN KEY (event_id) REFERENCES events(id)
// );

// -- Table pour les disponibilités des utilisateurs
// CREATE TABLE Availability (
// id INTEGER PRIMARY KEY AUTOINCREMENT,
// start_time TEXT NOT NULL,
// end_time TEXT NOT NULL,
// user_id INTEGER NOT NULL,
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// FOREIGN KEY (user_id) REFERENCES Professionals(Id)
// );